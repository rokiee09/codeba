export function formatDate(date: Date) {
  return date
    .toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
    .toLocaleLowerCase('tr-TR');
}
