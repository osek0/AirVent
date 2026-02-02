'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Validate input
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        error: 'Proszę wypełnić wszystkie wymagane pola.',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: 'Proszę podać prawidłowy adres email.',
      };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'BS BestService <onboarding@resend.dev>', // Change this to your verified domain
      to: 'kontakt@bestservice.pl', // Your email address
      replyTo: formData.email,
      subject: `Nowe zapytanie od ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nowe zapytanie z formularza kontaktowego</h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Imię i nazwisko:</strong> ${formData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
            <p style="margin: 10px 0;"><strong>Telefon:</strong> ${formData.phone || 'Nie podano'}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Wiadomość:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p style="color: #666; font-size: 12px;">
            Ta wiadomość została wysłana z formularza kontaktowego na stronie BS BestService.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.',
    };
  }
}
