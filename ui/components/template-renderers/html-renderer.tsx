import * as React from 'react';
import { replaceItemsInTheTemplate } from '../../lib/utility';
const HTMLRenderer = (props: {template: string, content: any})=>{
    
    return <div dangerouslySetInnerHTML={{__html: replaceItemsInTheTemplate(props.template, props.content)}}/>;
}
export default HTMLRenderer;