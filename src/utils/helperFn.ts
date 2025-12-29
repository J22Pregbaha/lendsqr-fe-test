export function formatDateShortComma(date: Date | string, long?: boolean): string {
  const _date = new Date(date)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return long
    ? `${months[_date.getMonth()]} ${_date.getDate()}, ${_date.getFullYear()}`
    : `${months[_date.getMonth()]}, ${_date.getFullYear()}`
}
