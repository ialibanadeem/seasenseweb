import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() signUpDto: any) {
        return this.authService.signup(signUpDto);
    }

    @Post('verify-email')
    async verifyEmail(@Body() body: { email: string; otp: string }) {
        return this.authService.verifyEmail(body.email, body.otp);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: any) {
        // Validation now perfectly throws NotFound or Unauthorized natively in service.
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return this.authService.login(user); 
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() body: { email: string }) {
        return this.authService.forgotPassword(body.email);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() body: { email: string; otp: string; newPassword: string }) {
        return this.authService.resetPassword(body.email, body.otp, body.newPassword);
    }
}
