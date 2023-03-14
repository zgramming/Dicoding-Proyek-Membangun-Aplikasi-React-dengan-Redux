import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThreadInputModalInput from '../../components/ThreadInputModalInput';
import { renderWithProviders } from '../../utils/test-utils';

describe('Thread Input Component', () => {
  it('should handle title typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <ThreadInputModalInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const titleInput = await screen.findByPlaceholderText('Judul');

    /// Act
    await userEvent.type(titleInput, 'Tips Menjadi Ganteng');

    /// Assert
    expect(titleInput).toHaveValue('Tips Menjadi Ganteng'); // should be empty
  });

  it('should handle category typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <ThreadInputModalInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const categoryInput = await screen.findByPlaceholderText('Kategori');

    /// Act
    await userEvent.type(categoryInput, 'Kesehatan');

    /// Assert
    expect(categoryInput).toHaveValue('Kesehatan'); // should be empty
  });

  it('should handle content typing correctly', async () => {
    /// Arrange
    renderWithProviders(
      <BrowserRouter>
        <ThreadInputModalInput onSubmit={(values) => values} />
      </BrowserRouter>,
    );
    const contentInput = await screen.findByPlaceholderText('Your body');

    /// Act
    await userEvent.type(contentInput, 'Jangan lupa minum air putih');

    /// Assert
    expect(contentInput).toHaveValue('Jangan lupa minum air putih'); // should be empty
  });

  it('should handle submit button click correctly', async () => {
    /// Arrange
    const mockSubmit = jest.fn();
    renderWithProviders(
      <BrowserRouter>
        <ThreadInputModalInput onSubmit={(values) => mockSubmit(values)} />
      </BrowserRouter>,
    );

    const titleInput = await screen.findByPlaceholderText('Judul');
    await userEvent.type(titleInput, 'Tips Menjadi Ganteng');

    const categoryInput = await screen.findByPlaceholderText('Kategori');
    await userEvent.type(categoryInput, 'Kesehatan');

    const contentInput = await screen.findByPlaceholderText('Your body');
    await userEvent.type(contentInput, 'Jangan lupa minum air putih');

    const submitButton = await screen.findByRole('button', {
      name: 'Posting',
    });

    /// Act
    await userEvent.click(submitButton);

    /// Assert
    expect(mockSubmit).toBeCalledWith({
      title: 'Tips Menjadi Ganteng',
      category: 'Kesehatan',
      body: 'Jangan lupa minum air putih',
    });
  });
});
