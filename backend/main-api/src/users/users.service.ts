import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: any): Promise<User> {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        return this.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                role: {
                    connectOrCreate: {
                        where: { name: 'User' },
                        create: { name: 'User' }
                    }
                }
            },
            include: { role: true },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
    }

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { role: true },
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findAll() {
        return this.prisma.user.findMany({
            where: { deletedAt: null },
            include: { role: true },
        });
    }

    async getProfile() {
        const user = await this.prisma.user.findFirst({
            where: { deletedAt: null },
            include: { role: true },
            orderBy: { createdAt: 'asc' }
        });

        if (!user) {
            throw new NotFoundException('No active users found in the system');
        }
        
        return user;
    }

    private otpStore = new Map<string, { otp: string, expires: number }>();

    setOtp(userId: string, otp: string) {
        // Valid for 10 minutes
        this.otpStore.set(userId, { otp, expires: Date.now() + 10 * 60 * 1000 });
    }

    verifyOtp(userId: string, otp: string): boolean {
        const data = this.otpStore.get(userId);
        if (!data) return false;
        if (Date.now() > data.expires) return false;
        if (data.otp === otp) {
            this.otpStore.delete(userId);
            return true;
        }
        return false;
    }

    async updateProfile(id: string, data: Partial<Prisma.UserUpdateInput>) {
        return this.prisma.user.update({
            where: { id },
            data,
            include: { role: true }
        });
    }
}
