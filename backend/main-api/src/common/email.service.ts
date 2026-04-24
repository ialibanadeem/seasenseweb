import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(EmailService.name);

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_HOST'),
            port: this.configService.get<number>('SMTP_PORT'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: this.configService.get<string>('SMTP_USER'),
                pass: this.configService.get<string>('SMTP_PASSWORD'),
            },
        });
    }

    async sendVerificationEmail(to: string, otp: string) {
        const mailOptions = {
            from: `"SeaSense" <${this.configService.get<string>('SMTP_FROM_EMAIL')}>`,
            to,
            subject: 'Verify your email address',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #1e293b;">
                    <h2 style="color: #4f46e5;">Verify your email address</h2>
                    <p>Thanks for signing up! To verify your email address, please enter the following 6-digit code:</p>
                    <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p style="font-size: 14px; color: #64748b;">This code will expire in 10 minutes. If you didn't create an account, you can safely ignore this email.</p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Verification email dispatched successfully to ${to}`);
        } catch (error) {
            this.logger.error(`CRITICAL: SMTP Transport Failed reaching ${to}`, error);
            throw error;
        }
    }

    async sendPasswordResetEmail(to: string, otp: string) {
        const mailOptions = {
            from: `"SeaSense" <${this.configService.get<string>('SMTP_FROM_EMAIL')}>`,
            to,
            subject: 'Reset your password',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #1e293b;">
                    <h2 style="color: #4f46e5;">Reset Your Password</h2>
                    <p>We received a request to reset the password for <strong>${to}</strong>.</p>
                    <p>If you made this request, please click the secure link below to reset your password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${this.configService.get('FRONTEND_URL')}/reset-password?email=${encodeURIComponent(to)}&otp=${otp}" 
                           style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);">
                            Reset Password
                        </a>
                    </div>
                    <p style="font-size: 13px; color: #64748b; margin-top: 20px;">
                        If you didn't request a password reset, you can safely ignore this email. The link will expire in 10 minutes.
                    </p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Password reset email dispatched successfully to ${to}`);
        } catch (error) {
            this.logger.error(`CRITICAL: SMTP Transport Failed reaching ${to}`, error);
            throw error;
        }
    }
}
