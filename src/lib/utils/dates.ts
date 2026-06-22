/**
 * Formats a date string into "DD Month YYYY" format (e.g., "25 May 2026")
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

/**
 * Formats a start and end date into a range string.
 * Example: "JAN '22 → Present" or "JAN '22 → DEC '23"
 */
export function formatDateRange(startDate: string | null, endDate: string | null): string {
  if (!startDate) return ''

  const start = formatDate(startDate)
  const end = endDate ? formatDate(endDate) : 'Present'

  return `${start} → ${end}`
}
