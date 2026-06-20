import type {LocaleKey, LocaleString, LocaleText} from './types'

export function pickLocaleString(value: LocaleString | undefined, locale: LocaleKey) {
  return value?.[locale] ?? value?.en ?? ''
}

export function pickLocaleText(value: LocaleText | undefined, locale: LocaleKey) {
  return value?.[locale] ?? value?.en ?? ''
}

