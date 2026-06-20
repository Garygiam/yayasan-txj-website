import nodemailer from 'nodemailer'

export async function sendMail({subject, text}: {subject: string; text: string}) {
  const host = process.env.EMAIL_SMTP_HOST
  const port = process.env.EMAIL_SMTP_PORT ? Number(process.env.EMAIL_SMTP_PORT) : undefined
  const user = process.env.EMAIL_SMTP_USER
  const pass = process.env.EMAIL_SMTP_PASS
  const to = process.env.EMAIL_TO

  if (!host || !port || !user || !pass || !to) return {ok: false as const}

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {user, pass},
  })

  await transporter.sendMail({
    from: user,
    to,
    subject,
    text,
  })

  return {ok: true as const}
}

