import { define } from 'trans-render/lib/define.js';
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
};
define({
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
            }
        ]
    },
    mixins: [PassPropMixin]
});
