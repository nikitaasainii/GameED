import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    const data = await resend.emails.send({
      from: 'GameEd Security <onboarding@resend.dev>', // Resend's free testing address
      to: "nikitasaini0912@gmail.com", // This MUST match the email you used to sign up for Resend!
      subject: 'Your GameEd Parent Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d2b5e; color: white; border-radius: 10px;">
          <h2 style="color: #ff8c6b;">GameEd Parent Check</h2>
          <p>Someone is trying to change the screen time limits for your child.</p>
          <p>Your 4-digit verification code is:</p>
          <h1 style="font-size: 40px; letter-spacing: 5px; color: #ff8c6b;">${otp}</h1>
          <p style="color: #888; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}