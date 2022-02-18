import * as React from "react";
import {
  Flex,
  Box,
  Link,
  Stack,
  useColorModeValue,
  Button,
  LinkProps,
  SimpleGrid,
} from "@chakra-ui/react";

dynamic(import("ace-builds/src-noconflict/ace"), { ssr: false });
dynamic(import("ace-builds/src-noconflict/mode-html"), { ssr: false });
dynamic(import("ace-builds/src-noconflict/mode-javascript"), { ssr: false });
dynamic(import("ace-builds/src-noconflict/theme-dracula"), { ssr: false });
dynamic(import("ace-builds/src-noconflict/theme-monokai"), { ssr: false });
const DynamicAceEditor = dynamic(import("react-ace"), { ssr: false });
import SidebarWithHeader from "./Sidebar";
import dynamic from "next/dynamic";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

interface Props {
  children: React.ReactNode;
}
export function Layout(props: Props) {
  return (
    <>
      <SidebarWithHeader children={<MainLayout />} />
    </>
  );
}

export function MainLayout() {
  return (
    <SimpleGrid columns={2} spacing={3}>
      <Box bg="transparent" height="40vh">
        <DynamicAceEditor
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
        <DynamicReactJson
          src={{}}
          theme={"ashes"}
          onAdd={(add) => {}}
          onEdit={(edit) => {}} //TODO: update the data
        />
      </Box>
      <Box bg="tomato" height="40vh"></Box>
    </SimpleGrid>
  );
}
