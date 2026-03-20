import * as React from 'react';

const BaseStyle = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  backgroundColor: '#050a0f',
  color: '#d1d5db',
  padding: '40px 20px',
  minHeight: '100vh',
  WebkitFontSmoothing: 'antialiased',
};

const CardStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  background: 'linear-gradient(145deg, #0a1118 0%, #050a0f 100%)',
  border: '1px solid rgba(0, 102, 230, 0.2)',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 102, 230, 0.1)',
};

const HeaderStyle = {
  padding: '40px 30px 30px',
  textAlign: 'center' as const,
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
};

const ContentStyle = {
  padding: '30px',
  fontSize: '16px',
  lineHeight: '1.7',
  color: '#e5e7eb',
  whiteSpace: 'pre-wrap' as const,
};

const FooterStyle = {
  textAlign: 'center' as const,
  padding: '24px',
  fontSize: '12px',
  color: '#4b5563',
  background: '#050a0f',
  borderTop: '1px solid rgba(255, 255, 255, 0.02)',
};

// 1. Welcome Template
export const WelcomeTemplate = ({ firstName, customMessage }: { firstName: string; customMessage: string }) => (
  <div style={BaseStyle}>
    <div style={CardStyle}>
      <div style={HeaderStyle}>
        <img src="https://karims.dev/logo_300x100_white.png" alt="Karim Development" style={{ maxWidth: '200px', height: 'auto', marginBottom: '16px' }} />
        <h1 style={{ margin: 0, color: '#0066e6', fontSize: '24px' }}>Welcome to Karim Development!</h1>
      </div>
      <div style={ContentStyle}>
        <p>Hi {firstName},</p>
        <div style={{ padding: '20px', background: 'rgba(0,102,230,0.05)', borderRadius: '8px', borderLeft: '4px solid #0066e6', margin: '20px 0' }}>
          {customMessage}
        </div>
        <p>We are thrilled to have you here. If you need any web solutions built, don't hesitate to reach out.</p>
        <p>Best regards,<br/>Karim Antar</p>
      </div>
      <div style={FooterStyle}>
        © {new Date().getFullYear()} Karim Development. All rights reserved.<br/>
        <a href="https://karims.dev" style={{ color: '#0066e6', textDecoration: 'none' }}>Visit our website</a>
      </div>
    </div>
  </div>
);

// 2. Newsletter Template
export const NewsletterTemplate = ({ customMessage }: { customMessage: string }) => (
  <div style={BaseStyle}>
    <div style={CardStyle}>
      <div style={HeaderStyle}>
        <img src="https://karims.dev/logo_300x100_white.png" alt="Karim Development" style={{ maxWidth: '160px', height: 'auto', marginBottom: '16px' }} />
        <p style={{ margin: 0, fontSize: '14px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Update</p>
      </div>
      <div style={ContentStyle}>
        {customMessage}
      </div>
      <div style={FooterStyle}>
        You are receiving this email because you subscribed to our development updates.<br/>
        <a href="https://karims.dev" style={{ color: '#0066e6', textDecoration: 'none' }}>karims.dev</a>
      </div>
    </div>
  </div>
);

// 3. Promotion/Offer Template
export const PromotionTemplate = ({ customMessage }: { customMessage: string }) => (
  <div style={BaseStyle}>
    <div style={{ ...CardStyle, border: '1px solid rgba(234, 179, 8, 0.3)', boxShadow: '0 8px 32px rgba(234, 179, 8, 0.15)' }}>
      <div style={{ ...HeaderStyle, borderBottom: '1px solid rgba(234, 179, 8, 0.1)' }}>
        <img src="https://karims.dev/logo_300x100_white.png" alt="Karim Development" style={{ maxWidth: '200px', height: 'auto', marginBottom: '16px' }} />
        <h2 style={{ margin: 0, color: '#eab308', fontSize: '22px', textTransform: 'uppercase', letterSpacing: '2px' }}>Special Offer Inside</h2>
      </div>
      <div style={{ padding: '40px 30px', textAlign: 'center', fontSize: '18px', color: '#f3f4f6', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
        {customMessage}
        
        <div style={{ marginTop: '30px' }}>
          <a href="https://karims.dev#contact" style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#eab308', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Claim Offer Now
          </a>
        </div>
      </div>
      <div style={FooterStyle}>
        This is a limited time promotion from Karim Development.
      </div>
    </div>
  </div>
);
