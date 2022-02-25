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

import SidebarWithHeader from "./Sidebar";

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
        {/* <DynamicAceEditor
          style={{ height: "100%", width: "100%" }}
          mode="html"
          theme="monokai"
          onChange={() => {}}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        /> */}
      </Box>
      <Box bg="tomato" height="40vh"></Box>
      <Box bg="transparent" height="40vh"></Box>
      <Box bg="tomato" height="40vh"></Box>
    </SimpleGrid>
  );
}
