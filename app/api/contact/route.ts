import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_FROM || process.env.CONTACT_EMAIL || 'info@karims.dev'}>`,
      to: process.env.CONTACT_EMAIL || 'info@karims.dev',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #050a0f;
              color: #e5e7eb;
              margin: 0;
              padding: 0;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #0a1118;
              border: 1px solid rgba(0, 102, 230, 0.3);
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(0, 102, 230, 0.15);
            }
            .header {
              background-color: #050a0f;
              padding: 30px;
              text-align: center;
              border-bottom: 1px solid rgba(0, 102, 230, 0.3);
            }
            .header h1 {
              color: #0066e6;
              margin: 0;
              font-size: 24px;
              font-weight: 700;
              letter-spacing: 0.5px;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 24px;
            }
            .label {
              display: block;
              font-size: 14px;
              color: #9ca3af;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value {
              font-size: 16px;
              color: #ffffff;
              background-color: rgba(255, 255, 255, 0.03);
              padding: 16px;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .message-box {
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              padding: 24px;
              background-color: #050a0f;
              border-top: 1px solid rgba(0, 102, 230, 0.2);
              font-size: 13px;
              color: #6b7280;
            }
            .accent {
              color: #0066e6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Karim Development</h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #9ca3af;">New Contact Form Submission</p>
            </div>
            
            <div class="content">
              <div class="field">
                <span class="label">Name</span>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <span class="label">Email Address</span>
                <div class="value"><a href="mailto:${email}" style="color: #0066e6; text-decoration: none;">${email}</a></div>
              </div>
              
              <div class="field">
                <span class="label">Message</span>
                <div class="value message-box">${message}</div>
              </div>
            </div>
            
            <div class="footer">
              This email was generated from the contact form on <span class="accent">karims.dev</span>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: String(error) },
      { status: 500 }
    );
  }
}
