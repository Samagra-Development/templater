import * as React from 'react';
import { Select } from '@chakra-ui/react'

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