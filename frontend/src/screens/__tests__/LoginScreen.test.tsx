import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginScreen from '../LoginScreen';

const mockStore = configureStore([]);
const navigation = { replace: jest.fn() };

describe('LoginScreen', () => {
  it('renders login form', () => {
    const store = mockStore({ auth: { loading: false } });
  const { getByPlaceholderText, getAllByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={navigation} />
      </Provider>
    );
  expect(getByPlaceholderText('Email or Username')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
  expect(getAllByText('Sign In').length).toBeGreaterThan(0);
  });

  it('shows loading indicator when logging in', () => {
    const store = mockStore({ auth: { loading: true } });
    const { getByTestId } = render(
      <Provider store={store}>
        <LoginScreen navigation={navigation} />
      </Provider>
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
