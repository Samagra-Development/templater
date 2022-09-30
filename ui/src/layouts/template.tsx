import AceEditor, { IAceOptions } from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/webpack-resolver';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { LanguageContext } from '../contexts';
import { jsonIncorrectData, templateDummyData } from '../tests/data';

const queryClient = new QueryClient();

require(`ace-builds/src-noconflict/mode-json`);
require('ace-builds/src-noconflict/theme-monokai');
require('ace-builds/src-noconflict/ext-language_tools');

export function BodyEditor(props: any) {
    const language = props.language;
    if (true) {
        require(`ace-builds/src-noconflict/mode-${language.name.toLowerCase()}`);
        require(`brace/ext/language_tools`);
    }

    return (
        <Box bg="transparent" height="40vh">
            <AceEditor
                style={{ height: '100%', width: '100%' }}
                mode={language.name.toLowerCase()}
                theme="monokai"
                onChange={(val) => {
                    props.setBodyValue(val);
                }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                    useWorker: false,
                }}
                name="UNIQUE_ID_OF_DIV"
                value={props.bodyValue}
                editorProps={{ $blockScrolling: true }}
            />
        </Box>
    );
}

export function RenderedTemplate(props: any) {
    const language = props.language;
    if (true) {
        require(`ace-builds/src-noconflict/mode-${language.name.toLowerCase()}`);
    }

    let { isLoading, error, data } = useQuery(
        'renderedData' +
            JSON.stringify({ data: props.dataValue, body: props.bodyValue }),
        async () => {
            const rawResponse = await axios.post(
                'http://localhost:3000/process/test',
                {
                    sampleData: props.dataValue,
                    meta: {},
                    body: props.bodyValue,
                    type: 'JS_TEMPLATE_LITERALS',
                }
            );
            return rawResponse.data;
        }
    );

    if (isLoading)
        return (
            <Box bg="transparent" height="40vh">
                <AceEditor
                    style={{ height: '100%', width: '100%' }}
                    mode={language.name.toLowerCase()}
                    theme="monokai"
                    value={'Loading...'}
                    readOnly={true}
                    name="RENDERED_TEMPLATE"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        useWorker: false,
                    }}
                />
            </Box>
        );

    if (error)
        return (
            <Box bg="transparent" height="40vh">
                <AceEditor
                    style={{ height: '100%', width: '100%' }}
                    mode={language.name.toLowerCase()}
                    theme="monokai"
                    value={'An error has occurred: ' + error}
                    readOnly={true}
                    name="RENDERED_TEMPLATE"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        useWorker: false,
                    }}
                />
            </Box>
        );

    return (
        <Box bg="transparent" height="40vh">
            <AceEditor
                style={{ height: '100%', width: '100%' }}
                mode={language.name.toLowerCase()}
                theme="monokai"
                value={data.processed}
                readOnly={true}
                name="RENDERED_TEMPLATE"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    useWorker: false,
                }}
            />
        </Box>
    );
}

export function DataEditor(props: any) {
    return (
        <Box bg="transparent" height="40vh">
            <AceEditor
                style={{ height: '100%', width: '100%' }}
                mode="json"
                theme="monokai"
                name="JSON_EDITOR"
                showGutter={true}
                value={props.dataValue}
                onValidate={() => {
                    console.log('An error has occured');
                }}
                onChange={(val) => {
                    // try {
                    //     let myResponse = JSON.parse(val);
                    // } catch (e) {
                    console.log(val);
                    // }
                    props.setDataValue(val);
                }}
                editorProps={{ $blockScrolling: true }}
            />
        </Box>
    );
}

export function TemplateLayout() {
    const language = useContext(LanguageContext);

    const [bodyValue, setBodyValue] = useState(templateDummyData);
    const [dataValue, setDataValue] = useState(jsonIncorrectData);

    return (
        <SimpleGrid columns={2} spacing={3}>
            <BodyEditor
                language={language}
                setBodyValue={setBodyValue}
                bodyValue={bodyValue}
            />
            <RenderedTemplate
                language={language}
                bodyValue={bodyValue}
                dataValue={dataValue}
            />
            <DataEditor setDataValue={setDataValue} dataValue={dataValue} />
            <Box bg="tomato" height="40vh"></Box>
        </SimpleGrid>
    );
}
