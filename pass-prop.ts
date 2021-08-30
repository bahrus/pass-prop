import {CE, PropInfo} from 'trans-render/lib/CE.js';
import {PassPropActions, PassPropProps} from './types.js';
import {structuralClone} from 'trans-render/lib/structuralClone.js';
import {upSearch} from 'trans-render/lib/upSearch.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';
import {PDMixin} from 'pass-down/PDMixin.js';
import { addDefaultMutObs } from './node_modules/pass-down/PDMixin.js';


export class PassPropCore extends HTMLElement implements PassPropActions{

    connectedCallback(){
        addDefaultMutObs(this);
    }

    onFromRootNodeHost(self: this){
        const rn = self.getRootNode();
        if(rn !== undefined){
            self.hostToObserve = (<any>rn).host as HTMLElement;
        }
    }
    onFromUpsearch(self: this){
        const {fromUpsearch} = self;
        const up = upSearch(self, fromUpsearch!)
    }
    onFromUpShadowSearch(self: this){
        const {fromUpShadowSearch} = self;
        const up = upShadowSearch(self, fromUpShadowSearch!);
    }
    onFromParent(self: this){
        const parent = self.parentElement;
        if(parent !== null){
            self.hostToObserve = parent;
            return true;
        }
        return false;
    }
    onFromParentOrHost(self: this){
        if(this.onFromParent(self)){
            this.onFromRootNodeHost(self);
        }
    }
    onHostToObserve(self: this){
        const {hostToObserve, observeProp} = self;
        const currentVal = (<any>hostToObserve!)[observeProp!];
        setVal(self, currentVal);
        self.subscribe(self);        
    }

    get eventName(){
        return ce.toLisp(this.observeProp!) + '-changed';
    }

    subscribe({observeProp}: this){
        this.hostToObserve!.addEventListener(this.eventName, this.handlePropChange);
    }
    filterVal(val: any){return val;}

    handlePropChange = (e: Event) => {
        const currentVal = (<any>this.hostToObserve!)[this.observeProp!];
        setVal(this, currentVal);
    }

    disconnectedCallback(){
        this.hostToObserve?.removeEventListener(this.eventName, this.handlePropChange);
        this.hostToObserve = undefined;
    }
};

export interface PassPropCore extends PassPropProps{}

const stringProp: PropInfo = {
    type: 'String'
};
const nonParseable: PropInfo = {
    parse: false
};


export const ce = new CE<PassPropProps, PassPropActions>({
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
        actions:{
            onFromRootNodeHost: {
                ifAllOf: ['fromHost'],
            },
            onFromUpsearch: {
                ifAllOf: ['fromUpsearch'],
            },
            onFromUpShadowSearch: {
                ifAllOf: ['fromUpShadowSearch'],
            },
            onFromParent: {
                ifAllOf:  ['fromParent'],
            },
            onFromParentOrHost: {
                ifAllOf: ['fromParentOrHost'],
            }, 
            onHostToObserve: {
                ifAllOf: ['hostToObserve', 'observeProp'],
            }
        },
        style:{
            display: 'none',
        }
    },
    superclass: PassPropCore,
    mixins: [PDMixin]
});

function setVal(self: PassPropCore, currentVal: any){
    if(currentVal !== undefined){
        if(typeof currentVal === 'object'){
            self.lastVal = self.filterVal(structuralClone(currentVal));
        }else{
            self.lastVal = self.filterVal(currentVal);
        }
    }
}

/**
 * @tag pass-prop
 * @element pass-prop
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
export const PassProp = ce.classDef;

declare global {
    interface HTMLElementTagNameMap {
        'pass-prop': PassPropCore;
    }
}