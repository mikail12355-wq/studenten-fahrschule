import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  telefon: z.string().optional(),
  nachricht: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // In production: send email via nodemailer / Resend / etc.
    console.log("Kontaktformular-Einsendung:", data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Ungültige Daten" },
      { status: 400 }
    );
  }
}
