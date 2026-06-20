import type {Locale} from '@/i18n/config'

export type ManualPaymentQrSlot = {
  title: string
  imageAlt: string
  imageSrc: string
}

export type ManualPaymentContent = {
  bankName: string
  accountName: string
  accountNumber: string
  whatsappNumber: string
  qrSlots: [ManualPaymentQrSlot, ManualPaymentQrSlot]
}

const manualPaymentContentByLocale: Record<Locale, ManualPaymentContent> = {
  en: {
    bankName: 'HLB',
    accountName: 'Yayasan TXJ malaysia',
    accountNumber: '7006672684',
    whatsappNumber: '013 757 9999',
    qrSlots: [
      {
        title: 'Malaysia National QR',
        imageAlt: 'Malaysia National QR',
        imageSrc: '/donate/malaysia-national-qr.jpeg',
      },
      {
        title: "Touch 'n Go QR",
        imageAlt: "Touch 'n Go QR",
        imageSrc: '/donate/donate-tng-qr.jpeg',
      },
    ],
  },
  bm: {
    bankName: 'HLB',
    accountName: 'Yayasan TXJ malaysia',
    accountNumber: '7006672684',
    whatsappNumber: '013 757 9999',
    qrSlots: [
      {
        title: 'QR Nasional Malaysia',
        imageAlt: 'Kod QR Nasional Malaysia',
        imageSrc: '/donate/malaysia-national-qr.jpeg',
      },
      {
        title: "QR Touch 'n Go",
        imageAlt: "Kod QR Touch 'n Go",
        imageSrc: '/donate/donate-tng-qr.jpeg',
      },
    ],
  },
  zh: {
    bankName: 'HLB',
    accountName: 'Yayasan TXJ malaysia',
    accountNumber: '7006672684',
    whatsappNumber: '013 757 9999',
    qrSlots: [
      {
        title: '马来西亚国家二维码',
        imageAlt: '马来西亚国家二维码',
        imageSrc: '/donate/malaysia-national-qr.jpeg',
      },
      {
        title: "Touch 'n Go 二维码",
        imageAlt: "Touch 'n Go 二维码",
        imageSrc: '/donate/donate-tng-qr.jpeg',
      },
    ],
  },
}

export function getManualPaymentContent(locale: Locale) {
  return manualPaymentContentByLocale[locale]
}
