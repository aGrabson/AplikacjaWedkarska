import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StartingPage } from '../screens/StartingPage';

describe('StartingPage', () => {
  test('renders login and registration buttons', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const { getByText } = render(<StartingPage navigation={navigationMock} />);
    const loginButton = getByText('Logowanie');
    const registerButton = getByText('Rejestracja');

    expect(loginButton).toBeDefined();
    expect(registerButton).toBeDefined();
  });

  test('navigates to login page on login button press', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const { getByText } = render(<StartingPage navigation={navigationMock} />);
    const loginButton = getByText('Logowanie');

    fireEvent.press(loginButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('LoginPage');
  });

  test('navigates to registration page on registration button press', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const { getByText } = render(<StartingPage navigation={navigationMock} />);
    const registerButton = getByText('Rejestracja');

    fireEvent.press(registerButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('RegisterPage');
  });
});