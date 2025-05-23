import ReactDOM from 'react-dom/client';

import 'react-toastify/dist/ReactToastify.css';
import '~/assets/styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<App />);
