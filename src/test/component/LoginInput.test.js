import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginInput from '../../components/LoginInput';
import { renderWithProviders } from '../../utils/test-utils';

describe('Login Input Component', () => {
  it('should handle username typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <LoginInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const emailInput = await screen.findByPlaceholderText('your@email.com');

    /// Act
    await userEvent.type(emailInput, 'zeffry.reynando@gmail.com');

    /// Assert
    expect(emailInput).toHaveValue('zeffry.reynando@gmail.com'); // should be empty
  });

  it('should handle password typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <LoginInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const passwordInput = await screen.findByPlaceholderText('******');

    /// Act
    await userEvent.type(passwordInput, 'zeffry');

    /// Assert
    expect(passwordInput).toHaveValue('zeffry'); // should be empty
  });

  it('should handle login button click correctly', async () => {
    /// Arrange
    const mockLogin = jest.fn();
    renderWithProviders(
      <BrowserRouter>
        <LoginInput onSubmit={mockLogin} />
      </BrowserRouter>,
    );
    const emailInput = await screen.findByPlaceholderText('your@email.com');
    await userEvent.type(emailInput, 'zeffry.reynando@gmail.com');
    const passwordInput = await screen.findByPlaceholderText('******');
    await userEvent.type(passwordInput, 'zeffry');
    const loginButton = await screen.findByRole('button', { name: 'Login' });

    /// Act
    await userEvent.click(loginButton);

    /// Assert
    expect(mockLogin).toBeCalledWith({ email: 'zeffry.reynando@gmail.com', password: 'zeffry' });
  });
});
