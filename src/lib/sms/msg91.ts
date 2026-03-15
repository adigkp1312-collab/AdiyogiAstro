/**
 * MSG91 SMS Integration
 *
 * Setup steps:
 * 1. Sign up at https://msg91.com
 * 2. Get your Auth Key from Dashboard → Developers → API Keys
 * 3. Create an OTP template in MSG91 Dashboard → SMS → Templates
 *    - Template should include {otp} variable, e.g.: "Your Nakshatra OTP is {otp}. Valid for 5 minutes."
 * 4. Get the Template ID after approval
 * 5. Add to .env.local:
 *    MSG91_AUTH_KEY=your_auth_key_here
 *    MSG91_TEMPLATE_ID=your_template_id_here
 *    MSG91_SENDER_ID=NKSHRA  (6 chars, register on MSG91)
 */

const MSG91_API_URL = 'https://control.msg91.com/api/v5/flow/';

interface MSG91Response {
  type: string;
  message: string;
  request_id?: string;
}

interface SendOTPResult {
  success: boolean;
  message: string;
  requestId?: string;
}

/**
 * Send OTP via MSG91 Flow API (transactional SMS)
 * @param phone - 10-digit Indian mobile number (without country code)
 * @param otp - The OTP code to send
 * @returns SendOTPResult
 */
export async function sendOTPviaMSG91(phone: string, otp: string): Promise<SendOTPResult> {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;

  if (!authKey || !templateId) {
    console.warn('[SMS] MSG91 credentials not configured. Set MSG91_AUTH_KEY and MSG91_TEMPLATE_ID in .env.local');
    return {
      success: false,
      message: 'SMS service not configured',
    };
  }

  try {
    const response = await fetch(MSG91_API_URL, {
      method: 'POST',
      headers: {
        'authkey': authKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        template_id: templateId,
        short_url: '0',
        recipients: [
          {
            mobiles: `91${phone}`,
            otp: otp,
          },
        ],
      }),
    });

    const data: MSG91Response = await response.json();

    if (data.type === 'success' || response.ok) {
      console.log(`[SMS] OTP sent to ${phone.slice(0, 4)}****${phone.slice(-2)} via MSG91`);
      return {
        success: true,
        message: 'OTP sent successfully',
        requestId: data.request_id,
      };
    } else {
      console.error('[SMS] MSG91 error:', data.message);
      return {
        success: false,
        message: data.message || 'Failed to send OTP',
      };
    }
  } catch (error) {
    console.error('[SMS] MSG91 network error:', error);
    return {
      success: false,
      message: 'SMS service temporarily unavailable',
    };
  }
}

/**
 * Check if MSG91 is configured
 */
export function isMSG91Configured(): boolean {
  return !!(process.env.MSG91_AUTH_KEY && process.env.MSG91_TEMPLATE_ID);
}
