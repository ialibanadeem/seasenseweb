import { z } from 'zod';

// List of common temporary / disposable email domains
const TEMP_EMAIL_DOMAINS = [
    'tempmail.com', '10minutemail.com', 'throwawaymail.com', 'guerrillamail.com',
    'mailinator.com', 'yopmail.com', 'temp-mail.org', 'tempmail.ninja',
    'fakemail.net', 'tempmailaddress.com', 'tempmail.net'
];

export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((val) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
    .refine((val) => /[a-z]/.test(val), 'Password must contain at least one lowercase letter')
    .refine((val) => /[0-9]/.test(val), 'Password must contain at least one number')
    .refine((val) => /[^A-Za-z0-9]/.test(val), 'Password must contain at least one special character');

export const emailSchema = z
    .string()
    .email('Please enter a valid email address')
    .refine((val) => {
        const domain = val.split('@')[1];
        return !TEMP_EMAIL_DOMAINS.includes(domain?.toLowerCase() || '');
    }, 'Temporary or disposable email addresses are not permitted.');
