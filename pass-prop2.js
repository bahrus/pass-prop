import { define } from 'trans-render/lib/define.js';
const PassPropMixin = (baseClass) => class extends baseClass {
};
define({
    config: {
        tagName: 'pass-prop'
    },
    mixins: [PassPropMixin]
});
