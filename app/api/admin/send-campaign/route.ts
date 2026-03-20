import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { renderToStaticMarkup } from 'react-dom/server';
import { WelcomeTemplate, NewsletterTemplate, PromotionTemplate } from '@/components/email-templates';

export async function POST(req: Request) {
  try {
    // 1. Verify Authentication
    const authCookie = cookies().get('admin_auth');
    if (authCookie?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Request
    const { to, subject, template, customMessage } = await req.json();

    if (!to || !subject || !template || !customMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Process recipient list (comma separated)
    const recipientList = to.split(',').map((email: string) => email.trim());

    // 3. Select Template
    let reactTemplate;
    switch (template) {
      case 'welcome':
        reactTemplate = WelcomeTemplate({ firstName: 'Colleague', customMessage });
        break;
      case 'newsletter':
        reactTemplate = NewsletterTemplate({ customMessage });
        break;
      case 'promotion':
        reactTemplate = PromotionTemplate({ customMessage });
        break;
      default:
        reactTemplate = NewsletterTemplate({ customMessage });
    }

    const htmlContent = renderToStaticMarkup(reactTemplate);
    const token = process.env.RESEND_API_KEY || process.env.SMTP_PASS;

    // 4. Send via Native Fetch (bypassing SDK bugs)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        from: `Karim Development <${process.env.SMTP_FROM || 'info@karims.dev'}>`,
        to: recipientList,
        subject: subject,
        html: htmlContent,
        tags: [
          { name: 'campaign_type', value: template }
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API Error:', data);
      return NextResponse.json({ error: data.message || 'Failed to send' }, { status: response.status });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error('Campaign send logic error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
