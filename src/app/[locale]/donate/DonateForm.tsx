'use client'

import Image from 'next/image'
import {useMemo, useState} from 'react'
import type {Locale} from '@/i18n/config'
import styles from '../get-involved/FormShell.module.css'
import {buildManualPaymentWhatsAppUrl, formatDonationAmount} from './manualPayment'
import {getManualPaymentContent} from './manualPaymentContent'
import pageStyles from './DonatePage.module.css'

const presetAmounts = [20, 50, 100, 200]

const donateFormCopy: Record<
  Locale,
  {
    selectAmountLabel: string
    customAmountLabel: string
    customAmountPlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    redirectingLabel: string
    continueLabel: string
    payByBankQrLabel: string
    errorMessage: string
    manualPaymentEyebrow: string
    manualPaymentHeading: string
    manualPaymentBody: string
    amountToPayLabel: string
    bankTransferHeading: string
    bankNameLabel: string
    accountNameLabel: string
    accountNumberLabel: string
    bankNote: string
    scanToPayLabel: string
    confirmWhatsAppLabel: string
  }
> = {
  en: {
    selectAmountLabel: 'Select amount',
    customAmountLabel: 'Custom amount (optional)',
    customAmountPlaceholder: 'e.g. 30',
    emailLabel: 'Email (optional)',
    emailPlaceholder: 'name@example.com',
    redirectingLabel: 'Redirecting...',
    continueLabel: 'Continue to donation',
    payByBankQrLabel: 'Pay by Bank / QR',
    errorMessage: 'Could not start donation. Check configuration and try again.',
    manualPaymentEyebrow: 'Manual payment',
    manualPaymentHeading: 'Manual payment details',
    manualPaymentBody:
      'Use the selected amount for bank transfer or QR payment, then confirm on WhatsApp after payment.',
    amountToPayLabel: 'Amount to pay',
    bankTransferHeading: 'Bank transfer',
    bankNameLabel: 'Bank name',
    accountNameLabel: 'Account name',
    accountNumberLabel: 'Account number',
    bankNote: 'Use the same selected amount and keep your payment proof for confirmation.',
    scanToPayLabel: 'Scan to pay',
    confirmWhatsAppLabel: 'Confirm payment on WhatsApp',
  },
  bm: {
    selectAmountLabel: 'Pilih jumlah',
    customAmountLabel: 'Jumlah tersuai (pilihan)',
    customAmountPlaceholder: 'contoh: 30',
    emailLabel: 'E-mel (pilihan)',
    emailPlaceholder: 'nama@contoh.com',
    redirectingLabel: 'Sedang mengalihkan...',
    continueLabel: 'Teruskan ke pembayaran',
    payByBankQrLabel: 'Bayar melalui Bank / QR',
    errorMessage: 'Tidak dapat memulakan sumbangan. Semak konfigurasi dan cuba lagi.',
    manualPaymentEyebrow: 'Bayaran manual',
    manualPaymentHeading: 'Butiran bayaran manual',
    manualPaymentBody:
      'Gunakan jumlah yang dipilih untuk pindahan bank atau pembayaran QR, kemudian sahkan melalui WhatsApp selepas pembayaran dibuat.',
    amountToPayLabel: 'Jumlah untuk dibayar',
    bankTransferHeading: 'Pindahan bank',
    bankNameLabel: 'Nama bank',
    accountNameLabel: 'Nama akaun',
    accountNumberLabel: 'Nombor akaun',
    bankNote: 'Gunakan jumlah yang sama dipilih dan simpan bukti pembayaran anda untuk pengesahan.',
    scanToPayLabel: 'Imbas untuk bayar',
    confirmWhatsAppLabel: 'Sahkan pembayaran di WhatsApp',
  },
  zh: {
    selectAmountLabel: '选择金额',
    customAmountLabel: '自定义金额（可选）',
    customAmountPlaceholder: '例如：30',
    emailLabel: '电子邮箱（可选）',
    emailPlaceholder: 'name@example.com',
    redirectingLabel: '跳转中...',
    continueLabel: '继续捐助',
    payByBankQrLabel: '银行转账 / 二维码支付',
    errorMessage: '无法开始捐助流程，请检查配置后再试一次。',
    manualPaymentEyebrow: '手动付款',
    manualPaymentHeading: '手动付款资料',
    manualPaymentBody: '请按所选金额进行银行转账或二维码付款，并在付款后通过 WhatsApp 确认。',
    amountToPayLabel: '应付金额',
    bankTransferHeading: '银行转账',
    bankNameLabel: '银行名称',
    accountNameLabel: '账户名称',
    accountNumberLabel: '账号',
    bankNote: '请使用相同金额付款，并保留付款凭证以便确认。',
    scanToPayLabel: '扫码支付',
    confirmWhatsAppLabel: '通过 WhatsApp 确认付款',
  },
}

export function DonateForm({locale}: {locale: Locale}) {
  const [amount, setAmount] = useState<number>(50)
  const [custom, setCustom] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [showManualPayment, setShowManualPayment] = useState(false)
  const copy = donateFormCopy[locale]
  const manualPaymentContent = getManualPaymentContent(locale)

  const finalAmount = useMemo(() => {
    const parsed = custom ? Number(custom) : amount
    return Number.isFinite(parsed) ? parsed : 0
  }, [amount, custom])

  const isAmountValid = finalAmount > 0
  const formattedAmount = formatDonationAmount(finalAmount)
  const whatsappUrl = isAmountValid
    ? buildManualPaymentWhatsAppUrl({
        amountMYR: finalAmount,
        donorEmail: email,
        locale,
        whatsappNumber: manualPaymentContent.whatsappNumber,
      })
    : '#'

  async function onDonate() {
    setStatus('submitting')
    setShowManualPayment(false)

    const res = await fetch('/api/donations/billplz/create', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({amountMYR: finalAmount, email: email || undefined}),
    })

    if (!res.ok) {
      setStatus('error')
      return
    }

    const json = (await res.json()) as {url?: string}
    if (!json.url) {
      setStatus('error')
      return
    }

    window.location.href = json.url
  }

  function onShowManualPayment() {
    if (!isAmountValid) {
      return
    }

    setStatus('idle')
    setShowManualPayment(true)
  }

  return (
    <section className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{copy.selectAmountLabel}</legend>
        <div className={pageStyles.amountGrid}>
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              className={
                custom === '' && amount === preset
                  ? pageStyles.amountButtonActive
                  : pageStyles.amountButton
              }
              onClick={() => {
                setAmount(preset)
                setCustom('')
              }}
            >
              RM {preset}
            </button>
          ))}
        </div>
      </fieldset>

      <label className={styles.field}>
        <span className={styles.label}>{copy.customAmountLabel}</span>
        <input
          className={styles.input}
          type="number"
          min="1"
          inputMode="decimal"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder={copy.customAmountPlaceholder}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>{copy.emailLabel}</span>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.emailPlaceholder}
        />
      </label>

      <div className={pageStyles.actionRow}>
        <button
          type="button"
          onClick={onDonate}
          disabled={status === 'submitting' || !isAmountValid}
          className={styles.submitButton}
        >
          {status === 'submitting' ? copy.redirectingLabel : copy.continueLabel}
        </button>

        <button
          type="button"
          onClick={onShowManualPayment}
          disabled={status === 'submitting' || !isAmountValid}
          className={pageStyles.secondaryAction}
        >
          {copy.payByBankQrLabel}
        </button>
      </div>
      {status === 'error' ? (
        <p className={`${styles.statusMessage} ${styles.statusError}`}>
          {copy.errorMessage}
        </p>
      ) : null}

      {showManualPayment ? (
        <section className={pageStyles.manualPaymentPanel} aria-labelledby="manual-payment-heading">
          <div className={pageStyles.manualPaymentHeader}>
            <p className={pageStyles.panelEyebrow}>{copy.manualPaymentEyebrow}</p>
            <h3 id="manual-payment-heading">{copy.manualPaymentHeading}</h3>
            <p className={pageStyles.panelBody}>{copy.manualPaymentBody}</p>
          </div>

          <div className={pageStyles.amountSummary}>
            <span className={pageStyles.amountLabel}>{copy.amountToPayLabel}</span>
            <strong className={pageStyles.amountValue}>{formattedAmount}</strong>
          </div>

          <div className={pageStyles.manualPaymentGrid}>
            <article className={pageStyles.manualPaymentCard}>
              <h4>{copy.bankTransferHeading}</h4>
              <dl className={pageStyles.bankDetails}>
                <div>
                  <dt>{copy.bankNameLabel}</dt>
                  <dd>{manualPaymentContent.bankName}</dd>
                </div>
                <div>
                  <dt>{copy.accountNameLabel}</dt>
                  <dd>{manualPaymentContent.accountName}</dd>
                </div>
                <div>
                  <dt>{copy.accountNumberLabel}</dt>
                  <dd>{manualPaymentContent.accountNumber}</dd>
                </div>
              </dl>
              <p className={pageStyles.cardNote}>{copy.bankNote}</p>
            </article>

            <div className={pageStyles.qrSlotGrid}>
              {manualPaymentContent.qrSlots.map((slot) => (
                <article key={slot.title} className={pageStyles.manualPaymentCard}>
                  <h4>{slot.title}</h4>
                  <div className={pageStyles.qrCard}>
                    <Image
                      src={slot.imageSrc}
                      alt={slot.imageAlt}
                      width={240}
                      height={240}
                      className={pageStyles.qrImage}
                    />
                    <p className={pageStyles.cardNote}>
                      {copy.scanToPayLabel} {formattedAmount}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <a href={whatsappUrl} target="_blank" rel="noreferrer" className={pageStyles.whatsAppButton}>
            {copy.confirmWhatsAppLabel}
          </a>
        </section>
      ) : null}
    </section>
  )
}
