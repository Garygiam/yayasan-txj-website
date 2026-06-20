import type {FormPayload} from '@/lib/validation/forms'
import {getSanityWriteClient} from './client'

export async function createFormSubmission(payload: FormPayload) {
  const client = getSanityWriteClient()
  if (!client) return null

  const base = {
    _type: 'formSubmission',
    type: payload.type,
    createdAt: new Date().toISOString(),
    status: 'new',
  }

  const doc =
    payload.type === 'contact'
      ? {...base, name: payload.name, email: payload.email, message: payload.message}
      : payload.type === 'volunteer'
          ? {
              ...base,
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              preferredRoles: payload.preferredRoles,
              availability: payload.availability,
              location: payload.location,
              message: payload.message ?? '',
            }
          : {
              ...base,
              name: payload.contactName,
              email: payload.email,
              phone: payload.phone,
              partnershipTypes: payload.partnershipTypes,
              message: payload.message,
              location: '',
              availability: '',
            }

  return client.create(doc)
}

export async function upsertDonationTransaction(input: {
  billId: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'failed' | 'cancelled'
  payerEmail?: string
}) {
  const client = getSanityWriteClient()
  if (!client) return null

  const existing = await client.fetch<{_id: string} | null>(
    `*[_type == "donationTransaction" && billId == $billId][0]{_id}`,
    {billId: input.billId},
  )

  const now = new Date().toISOString()

  if (existing?._id) {
    return client
      .patch(existing._id)
      .set({
        status: input.status,
        amount: input.amount,
        currency: input.currency,
        payerEmail: input.payerEmail,
        updatedAt: now,
      })
      .commit()
  }

  return client.create({
    _type: 'donationTransaction',
    provider: 'billplz',
    billId: input.billId,
    amount: input.amount,
    currency: input.currency,
    status: input.status,
    payerEmail: input.payerEmail,
    createdAt: now,
    updatedAt: now,
  })
}
