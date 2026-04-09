import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import * as path from "path";
import * as fs from 'fs';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ho3094101@gmail.com',
            pass: 'iesp yrqz rwgv wgqs',
        },
    });

    async sendOtp(email: string, otp: string) {
        const filePath = path.join(process.cwd(), "src/modules/auth/mail/otp.html");

        let html = fs.readFileSync(filePath, "utf-8");

        html = html.replace("{{otp}}", otp);

        await this.transporter.sendMail({
            from: 'ho3094101@gmail.com',
            to: email,
            subject: 'Reset Password OTP',
            html: html,
        });
    }
}