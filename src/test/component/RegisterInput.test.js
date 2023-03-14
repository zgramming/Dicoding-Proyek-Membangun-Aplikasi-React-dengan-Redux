import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RegisterInput from '../../components/RegisterInput';
import { renderWithProviders } from '../../utils/test-utils';

describe('Register Input Component', () => {
  it('should handle name typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <RegisterInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const nameInput = await screen.findByPlaceholderText('Your Name');

    /// Act
    await userEvent.type(nameInput, 'Zeffry Reynando');

    /// Assert
    expect(nameInput).toHaveValue('Zeffry Reynando'); // should be empty
  });

  it('should handle username typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <RegisterInput onSubmit={(values) => values} />
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
        <RegisterInput onSubmit={(values) => values} />
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
    const mockRegister = jest.fn();
    renderWithProviders(
      <BrowserRouter>
        <RegisterInput onSubmit={mockRegister} />
      </BrowserRouter>,
    );

    const nameInput = await screen.findByPlaceholderText('Your Name');
    await userEvent.type(nameInput, 'Zeffry Reynando');
    const emailInput = await screen.findByPlaceholderText('your@email.com');
    await userEvent.type(emailInput, 'zeffry.reynando@gmail.com');
    const passwordInput = await screen.findByPlaceholderText('******');
    await userEvent.type(passwordInput, 'zeffry');
    const registerButton = await screen.findByRole('button', { name: 'Register' });

    /// Act
    await userEvent.click(registerButton);

    /// Assert
    expect(mockRegister).toBeCalledWith({
      email: 'zeffry.reynando@gmail.com',
      password: 'zeffry',
      name: 'Zeffry Reynando',
    });
  });
});
