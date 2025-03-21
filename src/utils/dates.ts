function getLocale(language?: string): string {
  if (!language) {
    return navigator.language
  } else if (language.length === 2) {
    return `${language}-${language.toUpperCase()}`
  }
  return language
}

export function getDateFormatByLocale(language?: string): string {
  const locale = getLocale(language)
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(new Date())

  const order = parts.map((part) => part.type)
  const formatMap: Record<string, string> = {
    year: 'yyyy',
    month: 'MM',
    day: 'dd',
  }
  const dateFormat = order
    .map((type, index) => formatMap[type] ?? parts[index].value)
    .join('')
    .toLocaleLowerCase()

  return dateFormat
}

export function getDateTimeFormatByLocale(language?: string): string {
  const locale = getLocale(language)
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const parts = formatter.formatToParts(new Date())

  const order = parts.map((part) => part.type)
  const formatMap: Record<string, string> = {
    year: 'yyyy',
    month: 'MM',
    day: 'dd',
    hour: 'hh',
    minute: 'mm',
    dayPeriod: 'A', // AM/PM
  }

  const dateTimeFormat = order
    .map((type, index) => formatMap[type] ?? parts[index].value)
    .join('')
    .toLocaleLowerCase()

  return dateTimeFormat
}

export function getDaysOfWeekByLocale(language?: string): string[] {
  const locale = getLocale(language)
  const daysOfWeek: string[] = []
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const currentYear = new Date().getUTCFullYear()

  for (let i = 0; i < 7; i++) {
    const day = new Date(Date.UTC(currentYear, 0, 2))
    day.setUTCDate(day.getUTCDate() + i)
    const dayOfWeek = formatter
      .format(day)
      .replace(/^\w/, (c) => c.toUpperCase())
    daysOfWeek.push(dayOfWeek)
  }

  return daysOfWeek
}

export function getMonthsByLocale(language?: string): string[] {
  const locale = getLocale(language)
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' })
  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date()
    date.setMonth(index)
    return formatter.format(date).replace(/^\w/, (c) => c.toUpperCase())
  })
}

export function getDateStringByLocale({
  isRange,
  startDate,
  endDate,
  language,
  withTime,
}: {
  isRange: boolean
  startDate: Date | null
  endDate?: Date | null
  language?: string
  withTime?: boolean
}): string {
  const config: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(withTime && { hour: '2-digit', minute: '2-digit' }),
  }
  const locale = getLocale(language)

  if (isRange && startDate && endDate) {
    return `${new Intl.DateTimeFormat(locale, config).format(startDate)} ~ ${new Intl.DateTimeFormat(locale, config).format(endDate)}`
  }

  return startDate
    ? new Intl.DateTimeFormat(locale, config).format(startDate)
    : ''
}
