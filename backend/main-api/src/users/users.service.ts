import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
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
        // For the passwordless admin dashboard, just get the first created active user
        let user = await this.prisma.user.findFirst({
            where: { deletedAt: null },
            include: { role: true },
            orderBy: { createdAt: 'asc' }
        });

        // Auto-seed admin if database is completely empty so 404 failsafes don't trip
        if (!user) {
            let role = await this.prisma.role.findFirst({ where: { name: 'Admin' } });
            if (!role) {
                role = await this.prisma.role.create({ data: { name: 'Admin' } });
            }
            const bcrypt = require('bcrypt');
            user = await this.prisma.user.create({
                data: {
                    email: 'admin@seasense.com',
                    password: await bcrypt.hash('password', 10),
                    firstName: 'Danang',
                    lastName: 'Calvin',
                    roleId: role.id
                },
                include: { role: true }
            });
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
