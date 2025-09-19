import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductListScreen from '@screens/ProductListScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

const queryClient = new QueryClient();

describe('ProductListScreen', () => {
  it('renders product list and handles loading state', async () => {
    const { getByText, getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ProductListScreen />
        </QueryClientProvider>
      </I18nextProvider>
    );
    // Loading skeletons
    expect(getByText(/products found/i)).toBeTruthy();
    await waitFor(() => {
      expect(getByTestId('products-list')).toBeTruthy();
    });
  });

  it('shows error message on fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null, { status: 500, statusText: 'Internal Server Error' }))
    );
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ProductListScreen />
        </QueryClientProvider>
      </I18nextProvider>
    );
    await waitFor(() => {
      expect(getByText(/error loading products/i)).toBeTruthy();
    });
  });
});
