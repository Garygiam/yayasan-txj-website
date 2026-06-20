export async function verifyHCaptcha(token: string) {
  const secret = process.env.HCAPTCHA_SECRET_KEY
  if (!secret) return false

  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)

  const res = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body,
  })

  if (!res.ok) return false
  const json = (await res.json()) as {success?: boolean}
  return Boolean(json.success)
}

