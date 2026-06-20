'use client'

import Script from 'next/script'
import {useState} from 'react'
import styles from './FormShell.module.css'

export type PartnerFormCopy = {
  companyLabel: string
  contactNameLabel: string
  emailLabel: string
  phoneLabel: string
  partnershipOptionsLegend: string
  optionLabels: {
    goodsSponsorship: string
    logisticsSupport: string
    employeeVolunteering: string
    financialSupport: string
  }
  messageLabel: string
  captchaNote: string
  submittingLabel: string
  submitLabel: string
  successMessage: string
  errorMessage: string
}

function getCaptchaToken() {
  return (document.querySelector('textarea[name="h-captcha-response"]') as HTMLTextAreaElement | null)?.value ?? ''
}

export function PartnerForm({copy}: {copy: PartnerFormCopy}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    const partnershipTypes = formData.getAll('partnershipTypes').map((v) => String(v))

    const payload = {
      type: 'partner' as const,
      companyName: String(formData.get('companyName') ?? ''),
      contactName: String(formData.get('contactName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      partnershipTypes,
      message: String(formData.get('message') ?? ''),
      hcaptchaToken: getCaptchaToken(),
    }

    const res = await fetch('/api/forms/submit', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      setStatus('error')
      return
    }

    setStatus('success')
    form.reset()
  }

  return (
    <>
      {siteKey ? <Script src="https://js.hcaptcha.com/1/api.js" async defer /> : null}
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>{copy.companyLabel}</span>
          <input className={styles.input} name="companyName" required />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{copy.contactNameLabel}</span>
          <input className={styles.input} name="contactName" required />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{copy.emailLabel}</span>
          <input className={styles.input} name="email" type="email" required />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{copy.phoneLabel}</span>
          <input className={styles.input} name="phone" required />
        </label>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{copy.partnershipOptionsLegend}</legend>
          <div className={styles.checkboxList}>
            <label className={styles.checkboxRow}>
              <input type="checkbox" name="partnershipTypes" value="goods-sponsorship" />
              <span>{copy.optionLabels.goodsSponsorship}</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" name="partnershipTypes" value="logistics-support" />
              <span>{copy.optionLabels.logisticsSupport}</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" name="partnershipTypes" value="employee-volunteering" />
              <span>{copy.optionLabels.employeeVolunteering}</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" name="partnershipTypes" value="financial-support" />
              <span>{copy.optionLabels.financialSupport}</span>
            </label>
          </div>
        </fieldset>
        <label className={styles.field}>
          <span className={styles.label}>{copy.messageLabel}</span>
          <textarea className={styles.textarea} name="message" required rows={4} />
        </label>
        {siteKey ? (
          <div className="h-captcha" data-sitekey={siteKey} />
        ) : (
          <p className={styles.captchaNote}>{copy.captchaNote}</p>
        )}
        <button type="submit" disabled={status === 'submitting'} className={styles.submitButton}>
          {status === 'submitting' ? copy.submittingLabel : copy.submitLabel}
        </button>
        {status === 'success' ? (
          <p className={`${styles.statusMessage} ${styles.statusSuccess}`}>{copy.successMessage}</p>
        ) : null}
        {status === 'error' ? (
          <p className={`${styles.statusMessage} ${styles.statusError}`}>{copy.errorMessage}</p>
        ) : null}
      </form>
    </>
  )
}
