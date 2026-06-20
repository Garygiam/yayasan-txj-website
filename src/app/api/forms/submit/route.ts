import {NextResponse} from 'next/server'
import {sendMail} from '@/lib/email/sendMail'
import {verifyHCaptcha} from '@/lib/security/hcaptcha'
import {createFormSubmission} from '@/lib/sanity/write'
import {formSchema} from '@/lib/validation/forms'

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = formSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({error: 'invalid_payload'}, {status: 400})

  const okCaptcha = await verifyHCaptcha(parsed.data.hcaptchaToken)
  if (!okCaptcha) return NextResponse.json({error: 'captcha_failed'}, {status: 400})

  await createFormSubmission(parsed.data)

  const subject = `[TXJ Care] New ${parsed.data.type} submission`
  await sendMail({subject, text: JSON.stringify(parsed.data, null, 2)})

  return NextResponse.json({ok: true})
}

