import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { FunctionComponent, ReactNode } from 'react';

const queryClient = new QueryClient()

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default Providers;