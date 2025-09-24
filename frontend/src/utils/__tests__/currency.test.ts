import { formatCurrency } from '../../utils/currency';

describe('formatCurrency', () => {
  it('formats numbers as GH₵ currency', () => {
    expect(formatCurrency(1234.56)).toContain('GH₵');
  });
});
