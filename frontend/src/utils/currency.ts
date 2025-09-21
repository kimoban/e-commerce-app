export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) => {
  try {
    return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', currencyDisplay: 'symbol', ...options }).format(value).replace('GHS', 'GH₵');
  } catch {
    // Fallback if Intl is not available in some RN runtimes
    const n = Number.isFinite(value) ? value : 0;
    return `GH₵${n.toFixed(2)}`;
  }
};
