import {NextResponse} from 'next/server'
import {verifyBillplzSignature} from '@/lib/billplz/verifySignature'
import {upsertDonationTransaction} from '@/lib/sanity/write'

export async function POST(req: Request) {
  const rawBody = await req.text()

  const signature =
    req.headers.get('x-signature') ?? req.headers.get('x-signature-sha256') ?? req.headers.get('X-Signature') ?? ''

  if (!signature || !verifyBillplzSignature(rawBody, signature)) {
    return NextResponse.json({error: 'invalid_signature'}, {status: 401})
  }

  const body = new URLSearchParams(rawBody)
  const billId = body.get('id') ?? body.get('billplz[id]') ?? ''
  const paid = body.get('paid') ?? body.get('billplz[paid]') ?? ''
  const amountSen = body.get('amount') ?? body.get('billplz[amount]') ?? ''
  const email = body.get('email') ?? body.get('billplz[email]') ?? undefined

  if (!billId) return NextResponse.json({error: 'missing_bill_id'}, {status: 400})

  const amountMYR = amountSen ? Number(amountSen) / 100 : 0
  const status = paid === 'true' || paid === '1' ? 'paid' : 'failed'

  await upsertDonationTransaction({
    billId,
    amount: amountMYR,
    currency: 'MYR',
    status,
    payerEmail: email ?? undefined,
  })

  return NextResponse.json({ok: true})
}

