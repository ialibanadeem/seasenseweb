import { Controller, Get, Put, Body, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('profile')
    async getProfile() {
        const profile = await this.usersService.getProfile();
        if (!profile) throw new NotFoundException('Profile not found in database.');
        // Don't leak the password hash back to the frontend
        const { password, ...safeProfile } = profile;
        return safeProfile;
    }

    @Put('profile')
    async updateProfile(@Body() body: any) {
        const profile = await this.usersService.getProfile();
        if (!profile) throw new NotFoundException('Profile not found in database.');
        
        // Ensure no protected fields are blindly updated
        delete body.password;
        delete body.id;
        delete body.roleId;

        const updated = await this.usersService.updateProfile(profile.id, body);
        const { password, ...safeProfile } = updated;
        return safeProfile;
    }

    @Put('change-password-direct')
    async changePasswordDirect(@Body() body: any) {
        const { currentPassword, newPassword } = body;
        
        const profile = await this.usersService.getProfile();
        if (!profile) throw new NotFoundException('User profile not found');

        const bcrypt = require('bcrypt');
        const isValid = await bcrypt.compare(currentPassword, profile.password);
        if (!isValid) {
            throw new HttpException('Incorrect current password', HttpStatus.FORBIDDEN);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.updateProfile(profile.id, { password: hashedPassword });

        return { success: true };
    }
}
