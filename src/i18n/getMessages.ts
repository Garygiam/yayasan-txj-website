import type {Locale} from './config'

export async function getMessagesForLocale(locale: Locale) {
  const messages = await import(`../messages/${locale}.json`)
  return messages.default
}

