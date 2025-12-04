// Email service utility for sending form submissions
// This uses a simple approach that can work with various email services

const RECIPIENT_EMAIL = 'codekidstech2025@gmail.com';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Format contact form submission email
export function formatContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): EmailData {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF4B8F, #7B3DFF, #2ED0FF); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
          .value { color: #333; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #7B3DFF; }
          .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <div class="value">${data.email}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <span class="label">Phone:</span>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Subject:</span>
              <div class="value">${data.subject}</div>
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the CodeKids Technologies website contact form.</p>
            <p>Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Subject: ${data.subject}

Message:
${data.message}

Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `;

  return {
    to: RECIPIENT_EMAIL,
    subject: `Contact Form: ${data.subject} - ${data.name}`,
    html,
    text,
  };
}

// Format pricing form submission email
export function formatPricingEmail(data: {
  name: string;
  email: string;
  phone: string;
  role: string;
  class?: string;
  mode: string;
  city?: string;
  message?: string;
}): EmailData {
  const roleLabels: Record<string, string> = {
    parent: 'Parent',
    student: 'Student',
    principal: 'Principal',
    'school-owner': 'School Owner',
  };

  const modeLabels: Record<string, string> = {
    online: 'Online',
    offline: 'Offline',
    both: 'Both Online & Offline',
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00E0FF, #3B7CFF); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
          .value { color: #333; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #00E0FF; }
          .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 3px solid #ffc107; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Pricing Request</h1>
          </div>
          <div class="content">
            <div class="highlight">
              <strong>New inquiry for CodeKids Jr Pricing Information</strong>
            </div>
            <div class="field">
              <span class="label">Name:</span>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <span class="label">Role:</span>
              <div class="value">${roleLabels[data.role] || data.role}</div>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <span class="label">Phone:</span>
              <div class="value">${data.phone}</div>
            </div>
            ${data.class ? `
            <div class="field">
              <span class="label">Child's Class / Grade:</span>
              <div class="value">${data.class}</div>
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Preferred Mode:</span>
              <div class="value">${modeLabels[data.mode] || data.mode}</div>
            </div>
            ${data.city ? `
            <div class="field">
              <span class="label">City:</span>
              <div class="value">${data.city}</div>
            </div>
            ` : ''}
            ${data.message ? `
            <div class="field">
              <span class="label">Message / Requirements:</span>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>This email was sent from the CodeKids Technologies pricing request form.</p>
            <p>Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p><strong>Action Required:</strong> Please contact ${data.name} at ${data.email} or ${data.phone} within 24 hours.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
New Pricing Request

Name: ${data.name}
Role: ${roleLabels[data.role] || data.role}
Email: ${data.email}
Phone: ${data.phone}
${data.class ? `Child's Class / Grade: ${data.class}` : ''}
Preferred Mode: ${modeLabels[data.mode] || data.mode}
${data.city ? `City: ${data.city}` : ''}
${data.message ? `\nMessage / Requirements:\n${data.message}` : ''}

Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Action Required: Please contact ${data.name} at ${data.email} or ${data.phone} within 24 hours.
  `;

  return {
    to: RECIPIENT_EMAIL,
    subject: `Pricing Request: ${roleLabels[data.role] || data.role} - ${data.name} (${data.mode})`,
    html,
    text,
  };
}

// Send email using fetch to API endpoint
export async function sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return { success: false, error: errorData.error || 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'Network error. Please try again later.' };
  }
}

