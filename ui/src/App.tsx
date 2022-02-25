import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  SimpleGrid,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import SidebarWithHeader from "./Sidebar";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import JSONPretty from "react-json-pretty";

export function MainLayout() {
  return (
    <SimpleGrid columns={2} spacing={3}>
      <Box bg="transparent" height="40vh">
        <AceEditor
          style={{ height: "100%", width: "100%" }}
          mode="html"
          theme="monokai"
          onChange={() => {}}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </Box>
      <Box bg="tomato" height="40vh"></Box>
      <Box bg="transparent" height="40vh">
        <AceEditor
          style={{ height: "100%", width: "100%" }}
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

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <SidebarWithHeader children={<MainLayout />} />
    </Box>
  </ChakraProvider>
);
