import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router';

import SidebarWithHeader from './Sidebar';
import { TemplateLayout } from './layouts/template';

const queryClient = new QueryClient();

export function Layout(props: any) {
    let children;
    switch (props.location) {
        case 'template':
            children = <TemplateLayout />;
            break;
        case 'transformer':
            children = <TemplateLayout />;
            break;
        case 'lambda':
            children = <TemplateLayout />;
            break;
        default:
            children = <TemplateLayout />;
            break;
    }

    return (
        <Box textAlign="center" fontSize="xl">
            <SidebarWithHeader children={children} />
        </Box>
    );
}

export const App = () => (
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Layout location="template" />} />
                <Route path="home" element={<Layout location="template" />} />
                <Route
                    path="transformer"
                    element={<Layout location="transformer" />}
                />
            </Routes>
        </QueryClientProvider>
    </ChakraProvider>
);
