'use client'

import Script from 'next/script'
import {useState} from 'react'
import styles from '../get-involved/FormShell.module.css'

export type ContactFormCopy = {
  nameLabel: string
  emailLabel: string
  messageLabel: string
  captchaNote: string
  submittingLabel: string
  submitLabel: string
  successMessage: string
  errorMessage: string
  privacyNote: string
}

export function ContactForm({copy}: {copy: ContactFormCopy}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    const hcaptchaToken =
      (document.querySelector('textarea[name="h-captcha-response"]') as HTMLTextAreaElement | null)?.value ?? ''

    const payload = {
      type: 'contact' as const,
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      hcaptchaToken,
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
          <span className={styles.label}>{copy.nameLabel}</span>
          <input className={styles.input} name="name" required />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{copy.emailLabel}</span>
          <input className={styles.input} name="email" type="email" required />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{copy.messageLabel}</span>
          <textarea className={styles.textarea} name="message" required rows={5} />
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
      <p className={styles.privacyNote}>{copy.privacyNote}</p>
    </>
  )
}
