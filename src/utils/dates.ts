/**
 * Formats date strings from ISO format (YYYY-MM) to localized format (Ocak 2023)
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const [year, month] = dateString.split('-');

  // Turkish month names
  const monthNames = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  const monthIndex = parseInt(month) - 1;
  return `${monthNames[monthIndex]} ${year}`;
};

/**
 * Calculates the duration between two dates
 */
export const calculateDuration = (
  startDate: string,
  endDate: string | 'present'
): string => {
  if (!startDate) return '';

  const start = new Date(startDate);
  const end = endDate === 'present' ? new Date() : new Date(endDate);

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} ay`;
  } else if (remainingMonths === 0) {
    return `${years} yıl`;
  } else {
    return `${years} yıl ${remainingMonths} ay`;
  }
};
