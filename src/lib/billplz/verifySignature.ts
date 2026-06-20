import {createHmac} from 'crypto'

export function verifyBillplzSignature(rawBody: string, signature: string) {
  const key = process.env.BILLPLZ_X_SIGNATURE_KEY
  if (!key) return false
  const computed = createHmac('sha256', key).update(rawBody).digest('hex')
  return computed === signature
}

