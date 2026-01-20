import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';

const renderWithProviders = (component) => {
  return render(
    <ThemeProvider>
      <ProgressProvider>
        {component}
      </ProgressProvider>
    </ThemeProvider>
  );
};

test('renders plagiarism split checker heading', () => {
  renderWithProviders(<App />);
  const headingElement = screen.getByRole('heading', { name: /📄 Plagiarism Split Checker/i });
  expect(headingElement).toBeInTheDocument();
});

test('renders upload step initially', () => {
  renderWithProviders(<App />);
  const uploadText = screen.getByText(/Upload Document/i);
  expect(uploadText).toBeInTheDocument();
});

test('displays wizard progress with 4 steps', () => {
  renderWithProviders(<App />);
  const stepLabels = screen.getAllByText(/Upload|Split|Check|Results/);
  expect(stepLabels.length).toBeGreaterThanOrEqual(4);
});
