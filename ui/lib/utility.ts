export const replaceItemsInTheTemplate=(template: string, content: any)=>{
    if(content && template){
        for(let c in content){
            template = template.replaceAll(`{{${c}}}`, content[c]);
        }
    }
    return template;
}
const  capitalizeFirstLetter = (string: string) =>{
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  }
  
const capitalize  = (content: any)=>{
    if(content){
        for(let c in content){
            content[c] = content[c]?.length ? capitalizeFirstLetter(content[c]) : content[c]   
        }
    }
    return content;
}
interface TransformersInterface {
    [key: string]: any
}
export class Transformers {
    static TRANSFORMERS: TransformersInterface = {
        capitalize
    };
    static hasTransformer (type: string){
        return Transformers.TRANSFORMERS[type]
    }
    static transform(type: string, content: any){
        if(!content ||  !type || !Transformers.hasTransformer(type)){
            return content;
        }
        let result = JSON.parse(JSON.stringify(content));
        return Transformers.TRANSFORMERS[type](result);
    }
}