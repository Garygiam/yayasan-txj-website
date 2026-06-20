import {NextResponse} from 'next/server'
import {createBill} from '@/lib/billplz/client'
import {createDonationSchema} from '@/lib/validation/donations'
import {upsertDonationTransaction} from '@/lib/sanity/write'

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = createDonationSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({error: 'invalid_payload'}, {status: 400})

  const collectionId = process.env.BILLPLZ_COLLECTION_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!collectionId || !siteUrl) return NextResponse.json({error: 'missing_config'}, {status: 500})

  const amountSen = Math.round(parsed.data.amountMYR * 100)

  const bill = await createBill({
    collectionId,
    amountSen,
    description: 'TXJ Care Donation',
    callbackUrl: `${siteUrl}/api/donations/billplz/webhook`,
    redirectUrl: `${siteUrl}/en/donate`,
    email: parsed.data.email,
  })

  await upsertDonationTransaction({
    billId: bill.id,
    amount: parsed.data.amountMYR,
    currency: 'MYR',
    status: 'pending',
    payerEmail: parsed.data.email,
  })

  return NextResponse.json({url: bill.url, id: bill.id})
}

