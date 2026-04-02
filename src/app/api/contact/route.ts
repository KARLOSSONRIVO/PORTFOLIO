import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";
import { buildContactEmailHtml } from "@/lib/contactEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate on the server too — never trust client-side alone
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid form data." },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["karlosrivo@gmail.com"],
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: buildContactEmailHtml(name, email, message),
    });

    if (error) {
      console.error("[contact/route] Resend error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
