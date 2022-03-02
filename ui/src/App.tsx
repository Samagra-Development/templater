import * as React from 'react';

import {
    Box,
    ChakraProvider,
    Code,
    Grid,
    Link,
    SimpleGrid,
    Text,
    VStack,
    theme,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import { useContext, useState } from 'react';

import AceEditor from 'react-ace';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import JSONPretty from 'react-json-pretty';
import { Language } from './types';
import { LanguageContext } from './contexts';
import SidebarWithHeader from './Sidebar';

require('ace-builds/src-noconflict/theme-monokai');

export function MainLayout() {
    const language = useContext(LanguageContext);
    if (true) {
        require(`ace-builds/src-noconflict/mode-${language.name.toLowerCase()}`);
    }
    console.log();

    return (
        <SimpleGrid columns={2} spacing={3}>
            <Box bg="transparent" height="40vh">
                <AceEditor
                    style={{ height: '100%', width: '100%' }}
                    mode={language.name.toLowerCase()}
                    theme="monokai"
                    onChange={() => {}}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                />
            </Box>
            <Box bg="tomato" height="40vh"></Box>
            <Box bg="transparent" height="40vh">
                <AceEditor
                    style={{ height: '100%', width: '100%' }}
                    mode="javascript"
                    theme="monokai"
                    onChange={() => {}}
                    name="JSON_EDITOR"
                    editorProps={{ $blockScrolling: true }}
                />
            </Box>
            <Box bg="tomato" height="40vh"></Box>
        </SimpleGrid>
    );
}

export function Home() {
    return (
        <Box textAlign="center" fontSize="xl">
            <SidebarWithHeader children={<MainLayout />} />
        </Box>
    );
}

export const App = () => (
    <ChakraProvider theme={theme}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
        </Routes>
    </ChakraProvider>
);
