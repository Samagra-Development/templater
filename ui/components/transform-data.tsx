import * as React from 'react';
import { Select } from '@chakra-ui/react'
import ReactJson from 'react-json-view'
import dynamic from 'next/dynamic';
// const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });
interface Props {
    content: any,
    selectedTransformer: string,
    onTransformerChange : (transformer: string) =>void
}
const TransformData = (props: Props)=>{    
    return <div>
        <h5>Transformer</h5>
        <Select placeholder='Select Transformer' onChange={(e)=>props.onTransformerChange(e.target.value)}>
            <option value=''>Remove Transformer</option>
            <option value={'capitalize'}>Capitalize</option>
        </Select>

    </div>;
}
export default TransformData;