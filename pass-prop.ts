import {define, PropInfo} from 'trans-render/lib/define.js';
import {IPassProp} from './types.js';
import {structuralClone} from 'trans-render/lib/structuralClone.js';
import {upSearch} from 'trans-render/lib/upSearch.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';
import {PDMixin} from 'pass-down/PDMixin.js';
import { addDefaultMutObs } from './node_modules/pass-down/PDMixin.js';


class PassPropCore extends HTMLElement implements IPassProp{

    connectedCallback(){
        this.style.display = 'none';
        addDefaultMutObs(this);
    }

    onFromRootNodeHost(self: pp){
        const rn = self.getRootNode();
        if(rn !== undefined){
            self.hostToObserve = (<any>rn).host as HTMLElement;
        }
    }
    onFromUpsearch(self: pp){
        const {fromUpsearch} = self;
        const up = upSearch(self, fromUpsearch!)
    }
    onFromUpShadowSearch(self: pp){
        const {fromUpShadowSearch} = self;
        const up = upShadowSearch(self, fromUpShadowSearch!);
    }
    onFromParent(self: pp){
        const parent = self.parentElement;
        if(parent !== null){
            self.hostToObserve = parent;
            return true;
        }
        return false;
    }
    onFromParentOrHost(self: pp){
        if(this.onFromParent(self)){
            this.onFromRootNodeHost(self);
        }
    }
    onHostToObserve(self: pp){
        const {hostToObserve, observeProp} = self;
        const currentVal = (<any>hostToObserve!)[observeProp!];
        setVal(self, currentVal);
        self.subscribe(self);        
    }

    subscribe(self: pp){
        (<any>self.hostToObserve!).subscribe(new Set([self.observeProp!]), (rs: HTMLElement) => {
            const currentVal = (<any>self.hostToObserve!)[self.observeProp!];
            setVal(self, currentVal);
        });
    }
    filterVal(val: any){return val;}
};

type pp = IPassProp;
const stringProp: PropInfo = {
    type: 'String'
};
const nonParseable: PropInfo = {
    parse: false
};

/**
 * @tag pass-prop
 * @prop {boolean} fromHost  Observe property from ShadowRoot Host
 * @attr {boolean} from-host Observe property from ShadowRoot Host
 * @prop {boolean} fromParent  Observe property from parent element
 * @attr {boolean} from-parent Observe property from parent element     
 * @prop {boolean} fromParentOrHost Observe property fro parent element if available, otherwise from host.
 * @attr {boolean} from-parent-or-host Observe property fro parent element if available, otherwise from host.
 * @prop {string} fromUpsearch - Upsearch up the DOM Node Tree for an element matching this css selector
 * @attr {string} from-upsearch - Upsearch up the DOM Node Tree for an element matching this css selector
 * @prop {string} [fromUpShadowSearch] - Search by ID within the Shadow DOM realm of the element, or search up the ShadowDOM hierarchy, if the path starts with paths like ../../myElementId
 * @attr {string} [from-up-shadow-search] - Search by ID within the Shadow DOM realm of the element, or search up the ShadowDOM hierarchy, if the path starts with paths like ../../myElementId
 * @prop {string} observeProp Name of property to observe
 * @attr {string} observe-prop Name of property to observe
 * @prop {string} asFalsyAttr Useful for hiding element if property is falsy [TODO]
 * @attr {string} as-falsy-attr Useful for hiding element if property is falsy [TODO]
 */
export const PassProp = define<IPassProp>({
    config:{
        tagName: 'pass-prop',
        propDefaults:{
            fromHost: false,
            fromParent: false,
            fromParentOrHost: false,
        },
        propInfo:{
            fromUpsearch: stringProp, hostToObserve: nonParseable,
        },
        actions:[
            {
                do: 'onFromRootNodeHost',
                upon: ['fromHost'],
                riff: '"'
            },{
                do: 'onFromUpsearch',
                upon: ['fromUpsearch'],
                riff: '"'
            },{
                do: 'onFromUpShadowSearch',
                upon: ['fromUpShadowSearch'],
                riff: '"'
            },{
                do: 'onFromParent',
                upon:  ['fromParent'],
                riff: '"'
            },{
                do: 'onFromParentOrHost',
                upon: ['fromParentOrHost'],
                riff: '"'
            }, {
                do:'onHostToObserve',
                upon: ['hostToObserve', 'observeProp'],
                riff: '"'
            }
        ]
    },
    superclass: PassPropCore,
    mixins: [PDMixin]
}) as {new(): pp}

function setVal(self: pp, currentVal: any){
    if(currentVal !== undefined){
        if(typeof currentVal === 'object'){
            self.lastVal = self.filterVal(structuralClone(currentVal));
        }else{
            self.lastVal = self.filterVal(currentVal);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pass-prop': pp;
    }
}