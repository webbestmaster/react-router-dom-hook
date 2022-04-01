import {StrictMode} from 'react';

import {AppProvider} from './app-provider';
import {AppRouting} from './app-routing';

export function App(): JSX.Element {
    return (
        <StrictMode>
            <AppProvider>
                <AppRouting />
            </AppProvider>
        </StrictMode>
    );
}
