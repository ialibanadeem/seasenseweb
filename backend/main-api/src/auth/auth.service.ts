import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/email.service';
import { PrismaService } from '../common/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private emailService: EmailService,
        private prisma: PrismaService,
    ) { }

    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException("This user doesn't exist");
        }
        if (!(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { password, ...result } = user;
        return result;
    }

    async login(user: any) {
        if (!user.isVerified) {
            throw new ForbiddenException('Please verify your email address to access the dashboard.');
        }

        const payload = { email: user.email, sub: user.id, role: user.role.name };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role.name,
            },
        };
    }

    async signup(userData: any) {
        const user = await this.usersService.create(userData);
        
        // Generate OTP and cache it
        const otp = this.generateOtp();
        this.usersService.setOtp(user.email, otp);
        
        // Send email
        try {
            await this.emailService.sendVerificationEmail(user.email, otp);
        } catch (error: any) {
            // Delete user if SMTP fails, so they can try again once credentials correspond
            await this.prisma.user.delete({ where: { id: user.id } });
            throw new BadRequestException('SMTP Error: Authentication Failed. Please check your Brevo credentials.');
        }
        
        return {
            status: 'success',
            message: 'requires_verification',
            email: user.email
        };
    }

    async verifyEmail(email: string, otp: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isValid = this.usersService.verifyOtp(email, otp);
        if (!isValid) {
            throw new BadRequestException('Invalid or expired OTP');
        }

        // Update database and login user
        await this.prisma.user.update({
            where: { email },
            data: { isVerified: true }
        });

        // Set isVerified true locally so login block works seamlessly
        user.isVerified = true;
        return this.login(user);
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('Account with this email does not exist.');
        }

        const otp = this.generateOtp();
        this.usersService.setOtp(email, otp);
        await this.emailService.sendPasswordResetEmail(email, otp);
        
        return { status: 'success' };
    }

    async resetPassword(email: string, otp: string, newPassword: string) {
        const isValid = this.usersService.verifyOtp(email, otp);
        if (!isValid) {
            throw new BadRequestException('Invalid or expired OTP');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        return { status: 'success', message: 'Password reset successfully' };
    }
}
