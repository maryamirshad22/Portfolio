import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message is too short").max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: result.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    // NOTE: wire this up to an email provider (Resend, SendGrid, etc.) or a
    // database insert in production. Left as a clear integration point.
    console.log("New contact form submission:", result.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
