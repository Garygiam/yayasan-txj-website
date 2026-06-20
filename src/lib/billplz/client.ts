type CreateBillInput = {
  collectionId: string
  amountSen: number
  description: string
  callbackUrl: string
  redirectUrl: string
  email?: string
}

export async function createBill(input: CreateBillInput) {
  const apiKey = process.env.BILLPLZ_API_KEY
  if (!apiKey) throw new Error('Missing BILLPLZ_API_KEY')

  const body = new URLSearchParams()
  body.set('collection_id', input.collectionId)
  body.set('description', input.description)
  body.set('amount', String(input.amountSen))
  body.set('callback_url', input.callbackUrl)
  body.set('redirect_url', input.redirectUrl)
  if (input.email) body.set('email', input.email)

  const auth = Buffer.from(`${apiKey}:`).toString('base64')
  const res = await fetch('https://www.billplz.com/api/v3/bills', {
    method: 'POST',
    headers: {
      authorization: `Basic ${auth}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!res.ok) throw new Error(`Billplz create bill failed: ${res.status}`)
  return res.json() as Promise<{id: string; url: string; paid: boolean}>
}

