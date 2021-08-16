import {define} from 'trans-render/lib/define.js';
import {IPassProp} from './types.d.js';

const PassPropMixin = (baseClass: {new(): any}) => class extends baseClass implements IPassProp{

};

define<IPassProp>({
    config:{
        tagName: 'pass-prop'
    },
    mixins: [PassPropMixin]
});