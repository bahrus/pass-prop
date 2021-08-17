import {define} from 'trans-render/lib/define.js';
import {IPassProp} from './types.d.js';
import {structuralClone} from 'trans-render/lib/structuralClone.js';
import {upSearch} from 'trans-render/lib/upSearch.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';

const PassPropMixin = (baseClass: {new(): HTMLElement}) => class extends baseClass implements IPassProp{
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

export const PassProp = define<IPassProp>({
    config:{
        tagName: 'pass-prop',
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
    mixins: [PassPropMixin]
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