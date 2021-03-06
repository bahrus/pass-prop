import {PassProp} from './pass-prop.js';
import {xc, PropDef, PropDefMap} from 'xtal-element/lib/XtalCore.js';
import {PassPropExtProps} from './types.d.js';
import {jsonPath} from 'jsonpathesm/JSONPath.js';

/**
* @tag pass-prop-ext
* @element pass-prop-ext
* @prop {string} JSONPath expression
* @attr {string} val-filter JSONPath expression
* @prop {string} valFilterScriptId Id within the ShadowDOM Realm of p-d-x of a script tag. The script tag is expected to have a property path where a custom filter function is specified. This custom filter function is applied to the value.
* @attr {string} val-filter-script-id Id within the ShadowDOM Realm of p-d-x of a script tag. The script tag is expected to have a property path where a custom filter function is specified. This custom filter function is applied to the value.
* @prop {string} [valFilterScriptPropPath=_modExport.filter] - Property path from the script tag, where custom filter function can be obtained.
* @attr {string} val-filter-script-prop-path - Property path from the script tag, where custom filter function can be obtained.
 */
export class PassPropExt extends PassProp{
    static is='pass-prop-ext';
    override filterVal(val: any){
        let newVal = val;
        if(this.valFilter !== undefined){
            newVal = jsonPath(newVal, this.valFilter);
        }
        if(this.valFilterScriptId){
            const rn = this.getRootNode() as DocumentFragment;
            const filterScriptElement = rn.querySelector('script#' + this.valFilterScriptId) as any;
            if(filterScriptElement !== null){
                const filterPath = this.valFilterScriptPropPath || '_modExport.filter';
                const tokens = filterPath.split('.');
                let filterFn = filterScriptElement;
                for(const token of tokens){
                    if(filterFn !== undefined){
                        filterFn = filterFn[token];
                    }else{
                        break;
                    }
                }
                if(typeof filterFn === 'function'){
                    newVal = filterFn(newVal);
                }
            }
        }
        return newVal;
    }
    override connectedCallback(){
        super.connectedCallback();
        xc.mergeProps(this, slicedPropDefs);
    }
}
export interface PassPropExt extends PassPropExtProps{}
const strProp: PropDef = {
    dry: true,
    type: String,
};
const objProp: PropDef = {
    dry: true,
    type: Object
}
const propDefMap: PropDefMap<PassPropExt> = {
    valFilter: strProp,
    valFilterScriptId: strProp,
    valFilterScriptPropPath: strProp,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(PassPropExt, slicedPropDefs, 'onPropChange');
xc.define(PassPropExt);