import { Routes } from '~/routes/Routes';
import { AppProvider } from './core/provider/app/AppProvider';

const App = () => {
    return (
        <AppProvider>
            <Routes />
        </AppProvider>
    );
};

export default App;
