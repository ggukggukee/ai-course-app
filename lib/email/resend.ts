"use server";

export async function sendEmail({
  email,
  subject,
  text,
  html,
}: {
  email: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Altan School <info@notifications.altanschool.com>",
        to: [email],
        subject: subject,
        text: text,
        ...(html && { html }),
      }),
    });

    if (!response.ok) {
      return { message: "Не удалось отправить email" };
    }

    const data: { id: string } = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return { message: "Не удалось отправить email" };
  }
}
