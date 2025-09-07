import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { feedback, userEmail, downloadType } = await request.json();

        // Validate input
        if (!feedback || feedback.trim().length === 0) {
            return NextResponse.json({ error: 'Feedback is required' }, { status: 400 });
        }

        // Create transporter using Gmail credentials from environment
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_GMAIL_USER,
                pass: process.env.NEXT_GMAIL_PASSWORD,
            },
        });

        // Email content
        const emailSubject = `New Feedback from Expo Icon Generator - ${downloadType || 'Download'}`;
        const emailBody = `
      <h2>New User Feedback</h2>
      <p><strong>Download Type:</strong> ${downloadType || 'Unknown'}</p>
      <p><strong>User Email:</strong> ${userEmail || 'Not provided'}</p>
      <p><strong>Feedback:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${feedback.replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p><em>Sent from Expo Icon Generator Feedback System</em></p>
      <p><em>Timestamp: ${new Date().toISOString()}</em></p>
    `;

        // Send email
        const mailOptions = {
            from: process.env.NEXT_GMAIL_USER,
            to: 'bhosalenaresh73@gmail.com',
            subject: emailSubject,
            html: emailBody,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Feedback sent successfully! Thank you for helping us improve.'
        });

    } catch (error) {
        console.error('Error sending feedback email:', error);
        return NextResponse.json(
            { error: 'Failed to send feedback. Please try again later.' },
            { status: 500 }
        );
    }
}
