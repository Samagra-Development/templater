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
import HTMLRenderer from "./template-renderers/html-renderer";
import TransformData from "./transform-data";
import { Transformers } from "../lib/utility";
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
  const [template, setTemplate] = React.useState('');
  const [JSONContent, setJSONContent] = React.useState({updated_src: {name:'hima'}} as any);
  const [transformedData, setTransformedData] = React.useState(null as any);
  const [selectedTransformer, setSelectedTransformer] = React.useState('' as any);
  React.useEffect(()=>{
    if(Transformers.hasTransformer(selectedTransformer)){
      setTransformedData(Transformers.transform(selectedTransformer, JSONContent.updated_src));
    }else{
      setTransformedData(null);
    }
  }, [JSONContent, selectedTransformer]);
  
  return (
    <SimpleGrid columns={2} spacing={3}>
      <Box bg="transparent" height="40vh">
        <DynamicAceEditor
          style={{ height: "100%", width: "100%" }}
          mode="html"
          theme="monokai"
          value={template}
          onChange={setTemplate}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </Box>
      <Box height="40vh">
        <HTMLRenderer template={template} content={transformedData || JSONContent?.updated_src || {}}/>
      </Box>
      <Box bg="transparent" height="40vh">
        <DynamicReactJson
          src={JSONContent?.updated_src || {}}
          theme={"ashes"}
          onAdd={(add) => {}}
          onEdit={setJSONContent} //TODO: update the data
        />
      </Box>
      <Box height="40vh">
        <TransformData selectedTransformer={selectedTransformer} onTransformerChange={setSelectedTransformer} content={JSONContent?.updated_src || {}}/>
        <hr/>
        {
          transformedData &&  
          <DynamicReactJson
            src={transformedData}
            theme={"ashes"}
          />
        }
      </Box>
    </SimpleGrid>
  );
}
