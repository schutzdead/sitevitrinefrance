import { NextResponse } from 'next/server';
import { EmailTemplate } from '../../../utils/email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, project, inspiration, colors, additional } = body;

    // Validation
    if (!name || !email || !company || !project) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'WebPro <onboarding@resend.dev>',
      to: ['lucas.soubry@gmail.com'],
      subject: `Nouvelle demande de ${name} - ${company}`,
      react: EmailTemplate({
        name,
        email,
        company,
        phone: phone || '',
        project,
        inspiration,
        colors,
        additional,
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Échec de l\'envoi de l\'email',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
