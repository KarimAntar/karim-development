const BaseStyle = `font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050a0f; color: #d1d5db; padding: 40px 20px; min-height: 100vh; -webkit-font-smoothing: antialiased;`;

const CardStyle = `max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #0a1118 0%, #050a0f 100%); border: 1px solid rgba(0, 102, 230, 0.2); border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 102, 230, 0.1);`;

const HeaderStyle = `padding: 40px 30px 30px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.05);`;

const ContentStyle = `padding: 30px; font-size: 16px; line-height: 1.7; color: #e5e7eb; white-space: pre-wrap;`;

const FooterStyle = `text-align: center; padding: 24px; font-size: 12px; color: #4b5563; background: #050a0f; border-top: 1px solid rgba(255, 255, 255, 0.02);`;

export const WelcomeTemplate = ({ firstName, customMessage }: { firstName: string; customMessage: string }) => `
  <div style="${BaseStyle}">
    <div style="${CardStyle}">
      <div style="${HeaderStyle}">
        <img src="https://karims.dev/logo_300x100_white.png" alt="Karim Development" style="max-width: 200px; height: auto; margin-bottom: 16px;" />
        <h1 style="margin: 0; color: #0066e6; font-size: 24px;">Welcome to Karim Development!</h1>
      </div>
      <div style="${ContentStyle}">
        <p>Hi ${firstName},</p>
        <div style="padding: 20px; background: rgba(0,102,230,0.05); border-radius: 8px; border-left: 4px solid #0066e6; margin: 20px 0;">
          ${customMessage}
        </div>
        <p>We are thrilled to have you here. If you need any web solutions built, don't hesitate to reach out.</p>
        <p>Best regards,<br/>Karim Antar</p>
      </div>
      <div style="${FooterStyle}">
        © ${new Date().getFullYear()} Karim Development. All rights reserved.<br/>
        <a href="https://karims.dev" style="color: #0066e6; text-decoration: none;">Visit our website</a>
      </div>
    </div>
  </div>
`;

export const NewsletterTemplate = ({ customMessage }: { customMessage: string }) => `
  <div style="${BaseStyle}">
    <div style="${CardStyle}">
      <div style="${HeaderStyle}">
        <img src="https://karims.dev/logo_300x100_white.png" alt="Karim Development" style="max-width: 160px; height: auto; margin-bottom: 16px;" />
        <p style="margin: 0; font-size: 14px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">Monthly Update</p>
      </div>
      <div style="${ContentStyle}">
        ${customMessage}
      </div>
      <div style="${FooterStyle}">
        You are receiving this email because you subscribed to our development updates.<br/>
        <a href="https://karims.dev" style="color: #0066e6; text-decoration: none;">karims.dev</a>
      </div>
    </div>
  </div>
`;

export const PromotionTemplate = ({ customMessage }: { customMessage: string }) => `
  <div style="${BaseStyle}">
    <div style="${CardStyle} border: 1px solid rgba(234, 179, 8, 0.3); box-shadow: 0 8px 32px rgba(234, 179, 8, 0.15);">
      <div style="${HeaderStyle} border-bottom: 1px solid rgba(234, 179, 8, 0.1);">
        <img src="https://karims.dev/logo_300x100_white.png" alt="Karim Development" style="max-width: 200px; height: auto; margin-bottom: 16px;" />
        <h2 style="margin: 0; color: #eab308; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">Special Offer Inside</h2>
      </div>
      <div style="padding: 40px 30px; text-align: center; font-size: 18px; color: #f3f4f6; line-height: 1.8; white-space: pre-wrap;">
        ${customMessage}
        
        <div style="margin-top: 30px;">
          <a href="https://karims.dev#contact" style="display: inline-block; padding: 14px 32px; background-color: #eab308; color: #000; text-decoration: none; font-weight: bold; border-radius: 8px; text-transform: uppercase; letter-spacing: 1px;">
            Claim Offer Now
          </a>
        </div>
      </div>
      <div style="${FooterStyle}">
        This is a limited time promotion from Karim Development.
      </div>
    </div>
  </div>
`;
