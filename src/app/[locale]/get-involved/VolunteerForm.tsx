'use client'

import Script from 'next/script'
import {useState} from 'react'
import styles from './FormShell.module.css'

export type VolunteerFormCopy = {
  nameLabel: string
  emailLabel: string
  phoneLabel: string
  preferredRolesLegend: string
  roleOptions: {
    packing: string
    distribution: string
    assessment: string
    youthAmbassador: string
  }
  availabilityLabel: string
  availabilityPlaceholder: string
  locationLabel: string
  locationPlaceholder: string
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

export function VolunteerForm({copy}: {copy: VolunteerFormCopy}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    const preferredRoles = formData.getAll('preferredRoles').map((v) => String(v))

    const payload = {
      type: 'volunteer' as const,
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      preferredRoles,
      availability: String(formData.get('availability') ?? ''),
      location: String(formData.get('location') ?? ''),
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
          <span className={styles.label}>{copy.nameLabel}</span>
          <input className={styles.input} name="name" required />
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
          <legend className={styles.legend}>{copy.preferredRolesLegend}</legend>
          <div className={styles.checkboxList}>
            <label className={styles.checkboxRow}>
              <input type="checkbox" name="preferredRoles" value="packing" />
              <span>{copy.roleOptions.packing}</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" name="preferredRoles" value="distribution" />
              <span>{copy.roleOptions.distribution}</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" name="preferredRoles" value="assessment" />
              <span>{copy.roleOptions.assessment}</span>
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" name="preferredRoles" value="youth-ambassador" />
              <span>{copy.roleOptions.youthAmbassador}</span>
            </label>
          </div>
        </fieldset>
        <label className={styles.field}>
          <span className={styles.label}>{copy.availabilityLabel}</span>
          <input
            className={styles.input}
            name="availability"
            required
            placeholder={copy.availabilityPlaceholder}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{copy.locationLabel}</span>
          <input className={styles.input} name="location" required placeholder={copy.locationPlaceholder} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{copy.messageLabel}</span>
          <textarea className={styles.textarea} name="message" rows={4} />
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
