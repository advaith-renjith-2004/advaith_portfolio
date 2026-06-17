/**
 * Formats a date string into "MMM 'YY" format (e.g., "JAN '22")
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const year = date.getFullYear().toString().slice(-2)
  return `${month} '${year}`
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
