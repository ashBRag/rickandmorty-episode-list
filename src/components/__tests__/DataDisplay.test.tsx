import { render, screen, waitFor } from '@testing-library/react';
import DataDisplay from '../DataDisplay';

// Mock the fetch function
global.fetch = jest.fn();

describe('DataDisplay', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    render(<DataDisplay />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays data when fetch is successful', async () => {
    const mockData = [
      { id: 1, title: 'Test Title', description: 'Test Description' }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<DataDisplay />);

    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  it('shows error message when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<DataDisplay />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });
  });
}); 