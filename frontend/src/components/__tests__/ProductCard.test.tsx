import React from 'react';
import { render } from '@testing-library/react-native';
import { expect } from '@jest/globals';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  it('renders product name and price', () => {
    const product = { name: 'Test Product', price: 99.99, image: '', brand: 'Brand' };
    const { getByText } = render(<ProductCard product={product} />);
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
  });
});