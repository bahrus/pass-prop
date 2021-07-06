import { xc } from 'xtal-element/lib/XtalCore.js';
import { structuralClone } from 'xtal-element/lib/structuralClone.js';
import { passVal } from 'on-to-me/on-to-me.js';
import { addDefaultMutObs } from 'pass-down/pdUtils.js';
import { upShadowSearch } from 'trans-render/lib/upShadowSearch.js';
import 'mut-obs/mut-obs.js';
import { MutObs } from 'mut-obs/mut-obs.js';
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
export class PassProp extends HTMLElement {
    static is = 'pass-prop';
    /**
     * @private
     */
    propActions = propActions;
    /**
     * @private
     */
    self = this;
    /**
     * @private
     */
    reactor = new xc.Rx(this);
    subscribe(self) {
        self.hostToObserve.reactor.subscribe(new Set([self.observeProp]), rs => {
            const currentVal = self.hostToObserve[self.observeProp];
            setVal(this, currentVal);
        });
    }
    connectedCallback() {
        this.style.display = 'none';
        xc.mergeProps(this, slicedPropDefs);
        addDefaultMutObs(this);
    }
    disconnectedCallback() {
        const m = MutObs.toString;
        //if(this.hostToObserve !== undefined)
        //TODO unsubscribe
    }
    onPropChange(n, propDef, nv) {
        this.reactor.addToQueue(propDef, nv);
    }
    filterVal(val) { return val; }
}
export function upSearch(el, css) {
    if (css === 'parentElement')
        return el.parentElement;
    let upEl = el.previousElementSibling || el.parentElement;
    while (upEl && !upEl.matches(css)) {
        upEl = upEl.previousElementSibling || upEl.parentElement;
    }
    return upEl;
}
const onFromRootNodeHost = ({ fromHost, self }) => {
    const rn = self.getRootNode();
    if (rn !== undefined) {
        self.hostToObserve = rn.host;
    }
};
const onFromUpsearch = ({ fromUpsearch, self }) => {
    const up = upSearch(self, fromUpsearch);
    if (up !== null) {
        self.hostToObserve = up;
    }
};
const onFromUpShadowSearch = ({ fromUpShadowSearch, self }) => {
    const up = upShadowSearch(self, fromUpShadowSearch);
    if (up !== null) {
        self.hostToObserve = up;
    }
};
const onFromParent = ({ fromParent, self }) => {
    const parent = self.parentElement;
    if (parent !== null) {
        self.hostToObserve = parent;
    }
};
const onFromParentOrHost = ({ fromParentOrHost, self }) => {
    const parent = self.parentElement;
    if (parent !== null) {
        self.hostToObserve = parent;
    }
    else {
        const rn = self.getRootNode();
        if (rn !== undefined) {
            self.hostToObserve = rn.host;
        }
    }
};
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
const onHostToObserve = ({ hostToObserve, observeProp, self }) => {
    const currentVal = hostToObserve[observeProp];
    setVal(self, currentVal);
    self.subscribe(self);
};
const onLastVal = ({ lastVal, to, careOf, from, prop, as, self }) => {
    passVal(lastVal, self, to, careOf, self.m, from, prop, as);
};
const propActions = [
    onFromRootNodeHost,
    onHostToObserve,
    onLastVal,
    onFromUpsearch,
    onFromParent,
    onFromParentOrHost,
    onFromUpShadowSearch
];
const baseProp = {
    dry: true,
    async: true,
};
const boolProp1 = {
    ...baseProp,
    type: Boolean,
};
const boolProp2 = {
    ...boolProp1,
    stopReactionsIfFalsy: true,
};
const strProp1 = {
    ...baseProp,
    type: String,
};
const strProp2 = {
    ...strProp1,
    stopReactionsIfFalsy: true,
};
const objProp1 = {
    ...baseProp,
    type: Object
};
const objProp2 = {
    ...objProp1,
    stopReactionsIfFalsy: true,
};
const objProp3 = {
    async: true,
    type: Object,
};
const objProp4 = {
    ...objProp3,
    stopReactionsIfFalsy: true,
    parse: true,
};
const numProp1 = {
    ...baseProp,
    type: Number,
};
const propDefMap = {
    fromHost: boolProp2,
    fromUpsearch: strProp2,
    fromUpShadowSearch: strProp2,
    fromParent: boolProp2,
    fromParentOrHost: boolProp2,
    to: strProp1,
    careOf: strProp1,
    from: strProp1,
    prop: strProp1,
    as: strProp1,
    lastVal: objProp2,
    observeProp: strProp2,
    hostToObserve: objProp2,
    //mutateEvents: objProp4,
    m: numProp1,
    log: boolProp1,
    debug: boolProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(PassProp, slicedPropDefs, 'onPropChange');
xc.define(PassProp);
