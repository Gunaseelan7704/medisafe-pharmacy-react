import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create a root and render the app
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Failed to find the root element');
}