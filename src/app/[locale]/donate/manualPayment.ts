import type {Locale} from '@/i18n/config'

export function formatDonationAmount(amountMYR: number) {
  return `RM ${amountMYR}`
}

function sanitizeWhatsAppNumber(whatsappNumber: string) {
  return whatsappNumber.replace(/\D/g, '')
}

type BuildManualPaymentWhatsAppUrlParams = {
  amountMYR: number
  donorEmail?: string
  locale: Locale
  whatsappNumber: string
}

const manualPaymentMessageCopy: Record<
  Locale,
  {
    intro: (amount: string) => string
    email: (email: string) => string
  }
> = {
  en: {
    intro: (amount) => `Hello, I have made a donation payment of ${amount}.`,
    email: (email) => `My email is ${email}.`,
  },
  bm: {
    intro: (amount) => `Salam, saya telah membuat bayaran sumbangan sebanyak ${amount}.`,
    email: (email) => `Emel saya ialah ${email}.`,
  },
  zh: {
    intro: (amount) => `您好，我已完成 ${amount} 的捐款付款。`,
    email: (email) => `我的电子邮箱是 ${email}。`,
  },
}

export function buildManualPaymentWhatsAppUrl({
  amountMYR,
  donorEmail,
  locale,
  whatsappNumber,
}: BuildManualPaymentWhatsAppUrlParams) {
  const copy = manualPaymentMessageCopy[locale]
  const messageParts = [
    copy.intro(formatDonationAmount(amountMYR)),
    donorEmail ? copy.email(donorEmail) : '',
  ].filter(Boolean)

  return `https://wa.me/${sanitizeWhatsAppNumber(whatsappNumber)}?text=${encodeURIComponent(
    messageParts.join(' '),
  )}`
}
