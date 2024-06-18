import { ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { ErrorLayout, LoadingLayout } from '~/components/layouts';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '~/core/redux/store';
import { Provider } from 'react-redux';

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider = (props: AppProviderProps) => {
    const { children } = props;

    return (
        <Suspense fallback={<LoadingLayout />}>
            <ErrorBoundary FallbackComponent={ErrorLayout}>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <HelmetProvider>
                            <BrowserRouter>{children}</BrowserRouter>
                            <ToastContainer
                                position="top-right"
                                theme="colored"
                                autoClose={1500}
                            />
                        </HelmetProvider>
                    </PersistGate>
                </Provider>
            </ErrorBoundary>
        </Suspense>
    );
};
