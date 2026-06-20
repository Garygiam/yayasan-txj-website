import {describe, expect, it} from 'vitest'
import {buildManualPaymentWhatsAppUrl, formatDonationAmount} from './manualPayment'

describe('manual payment helpers', () => {
  it('formats whole-ringgit amounts for the panel summary', () => {
    expect(formatDonationAmount(50)).toBe('RM 50')
    expect(formatDonationAmount(125)).toBe('RM 125')
  })

  it('sanitizes the WhatsApp number and includes amount and email when email is provided', () => {
    const url = buildManualPaymentWhatsAppUrl({
      amountMYR: 100,
      donorEmail: 'donor@example.com',
      locale: 'en',
      whatsappNumber: '+60 13-757 9999',
    })

    expect(url).toContain('https://wa.me/60137579999?text=')
    expect(decodeURIComponent(url.split('text=')[1] ?? '')).toContain('RM 100')
    expect(decodeURIComponent(url.split('text=')[1] ?? '')).toContain('donor@example.com')
  })

  it('omits the email sentence when no email is provided', () => {
    const url = buildManualPaymentWhatsAppUrl({
      amountMYR: 20,
      donorEmail: '',
      locale: 'en',
      whatsappNumber: '60137579999',
    })

    expect(decodeURIComponent(url.split('text=')[1] ?? '')).toContain('RM 20')
    expect(decodeURIComponent(url.split('text=')[1] ?? '')).not.toContain('My email is')
  })

  it('builds localized WhatsApp confirmation text for bm and zh donors', () => {
    const bmUrl = buildManualPaymentWhatsAppUrl({
      amountMYR: 75,
      donorEmail: 'bm@example.com',
      locale: 'bm',
      whatsappNumber: '60137579999',
    })
    const zhUrl = buildManualPaymentWhatsAppUrl({
      amountMYR: 88,
      donorEmail: '',
      locale: 'zh',
      whatsappNumber: '60137579999',
    })

    expect(decodeURIComponent(bmUrl.split('text=')[1] ?? '')).toContain(
      'Salam, saya telah membuat bayaran sumbangan sebanyak RM 75.',
    )
    expect(decodeURIComponent(bmUrl.split('text=')[1] ?? '')).toContain(
      'Emel saya ialah bm@example.com.',
    )
    expect(decodeURIComponent(zhUrl.split('text=')[1] ?? '')).toContain(
      '您好，我已完成 RM 88 的捐款付款。',
    )
    expect(decodeURIComponent(zhUrl.split('text=')[1] ?? '')).not.toContain('我的电子邮箱是')
  })
})
