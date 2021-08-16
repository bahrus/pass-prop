import {define} from 'trans-render/lib/define.js';
import {IPassProp} from './types.d.js';
import {upSearch} from 'trans-render/lib/upSearch.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';

const PassPropMixin = (baseClass: {new(): any}) => class extends baseClass implements IPassProp{
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
};

type pp = IPassProp;

define<IPassProp>({
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
            }
        ]
    },
    mixins: [PassPropMixin]
});