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
      host: process.env.SMTP_HOST || 'smtp.resend.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'resend',
        pass: process.env.SMTP_PASS || process.env.RESEND_API_KEY,
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
              font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #050a0f;
              color: #d1d5db;
              margin: 0;
              padding: 0;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              background-color: #050a0f;
              padding: 40px 20px;
              min-height: 100vh;
            }
            .card {
              max-width: 560px;
              margin: 0 auto;
              background: linear-gradient(145deg, #0a1118 0%, #050a0f 100%);
              border: 1px solid rgba(0, 102, 230, 0.2);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 32px rgba(0, 102, 230, 0.1);
            }
            .header {
              padding: 40px 30px 30px;
              text-align: center;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            .logo {
              max-width: 200px;
              height: auto;
              margin-bottom: 16px;
            }
            .header p {
              margin: 0;
              font-size: 14px;
              color: #9ca3af;
              letter-spacing: 0.5px;
              text-transform: uppercase;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 24px;
            }
            .label {
              display: block;
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 6px;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-weight: 600;
            }
            .value {
              font-size: 15px;
              color: #f3f4f6;
              background-color: rgba(0, 102, 230, 0.03);
              padding: 14px 16px;
              border-radius: 8px;
              border: 1px solid rgba(0, 102, 230, 0.1);
            }
            .value.message {
              white-space: pre-wrap;
              line-height: 1.7;
            }
            .value a {
              color: #0066e6;
              text-decoration: none;
              font-weight: 500;
              transition: color 0.2s ease;
            }
            .value a:hover {
              color: #3b82f6;
            }
            .footer {
              text-align: center;
              padding: 24px;
              font-size: 12px;
              color: #4b5563;
              background: #050a0f;
              border-top: 1px solid rgba(255, 255, 255, 0.02);
            }
            .footer a {
              color: #0066e6;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <img src="https://karims.dev/logo_300x100_white.png" alt="Karim Development" class="logo" />
                <p>New Message Received</p>
              </div>
              
              <div class="content">
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border-collapse: separate;">
                  <tr>
                    <td width="50%" valign="top" style="padding-right: 8px;">
                      <span class="label">Sender Name</span>
                      <div class="value" style="padding: 10px 14px;">${name}</div>
                    </td>
                    <td width="50%" valign="top" style="padding-left: 8px;">
                      <span class="label">Email Address</span>
                      <div class="value" style="padding: 10px 14px;"><a href="mailto:${email}">${email}</a></div>
                    </td>
                  </tr>
                </table>
                
                <div class="field">
                  <span class="label">Message</span>
                  <div class="value message">${message}</div>
                </div>
              </div>
              
              <div class="footer">
                Sent from <a href="https://karims.dev">karims.dev</a> on ${new Date().toLocaleString()}
              </div>
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
