import { define } from 'trans-render/lib/define.js';
import { structuralClone } from 'trans-render/lib/structuralClone.js';
import { upSearch } from 'trans-render/lib/upSearch.js';
import { upShadowSearch } from 'trans-render/lib/upShadowSearch.js';
const PassPropMixin = (baseClass) => class extends baseClass {
    onFromRootNodeHost(self) {
        const rn = self.getRootNode();
        if (rn !== undefined) {
            self.hostToObserve = rn.host;
        }
    }
    onFromUpsearch(self) {
        const { fromUpsearch } = self;
        const up = upSearch(self, fromUpsearch);
    }
    onFromUpShadowSearch(self) {
        const { fromUpShadowSearch } = self;
        const up = upShadowSearch(self, fromUpShadowSearch);
    }
    onFromParent(self) {
        const parent = self.parentElement;
        if (parent !== null) {
            self.hostToObserve = parent;
            return true;
        }
        return false;
    }
    onFromParentOrHost(self) {
        if (this.onFromParent(self)) {
            this.onFromRootNodeHost(self);
        }
    }
    onHostToObserve(self) {
        const { hostToObserve, observeProp } = self;
        const currentVal = hostToObserve[observeProp];
        setVal(self, currentVal);
        self.subscribe(self);
    }
    subscribe(self) {
        self.hostToObserve.subscribe(new Set([self.observeProp]), (rs) => {
            const currentVal = self.hostToObserve[self.observeProp];
            setVal(self, currentVal);
        });
    }
    filterVal(val) { return val; }
};
export const PassProp = define({
    config: {
        tagName: 'pass-prop',
        actions: [
            {
                do: 'onFromRootNodeHost',
                upon: ['fromHost'],
                riff: '"'
            }, {
                do: 'onFromUpsearch',
                upon: ['fromUpsearch'],
                riff: '"'
            }, {
                do: 'onFromUpShadowSearch',
                upon: ['fromUpShadowSearch'],
                riff: '"'
            }, {
                do: 'onFromParent',
                upon: ['fromParent'],
                riff: '"'
            }, {
                do: 'onFromParentOrHost',
                upon: ['fromParentOrHost'],
                riff: '"'
            }, {
                do: 'onHostToObserve',
                upon: ['hostToObserve', 'observeProp'],
                riff: '"'
            }
        ]
    },
    mixins: [PassPropMixin]
});
function setVal(self, currentVal) {
    if (currentVal !== undefined) {
        if (typeof currentVal === 'object') {
            self.lastVal = self.filterVal(structuralClone(currentVal));
        }
        else {
            self.lastVal = self.filterVal(currentVal);
        }
    }
}
