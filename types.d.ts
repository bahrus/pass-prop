import {PDToFrom} from 'pass-down/types.js';
import {PassProp} from './pass-prop.js';
export interface IPassPropProps extends PDToFrom {

    /**
    * @prop {boolean} fromHost  Observe property from ShadowRoot Host
    * @attr {boolean} from-host Observe property from ShadowRoot Host
     */
    fromHost?: boolean,
    /**
     * @prop {boolean} fromParent  Observe property from parent element
     * @attr {boolean} from-parent Observe property from parent element
     */
    fromParent?: boolean,
    /**
     *  @prop {boolean} fromParentOrHost Observe property fro parent element if available, otherwise from host.
     *  @attr {boolean} from-parent-or-host Observe property fro parent element if available, otherwise from host.
     */
    fromParentOrHost?: boolean,
    /**
     * @prop {string} fromUpearch Upsearch up the DOM Node Tree for an element matching this css selector
     * @attr {string} from-upsearch Upsearch up the DOM Node Tree for an element matching this css selector
     */
    fromUpsearch?: string;
    /**
     * @prop {string} observeProp Name of property to observe
     * @attr {string} observe-prop Name of property to observe
     */
    observeProp?: string;
    /**
     * @prop {Element} hostToObserve Host to observe.  Normally, this is determined internally. But it can be passed in.
     * @attr {string} host-to-observe Host to observe.  Normally, this is determined internally. But it can be passed in.
     */
    hostToObserve?: Element;
    /**
     * @prop {string} asFalsyAttr Useful for hiding element if property is falsy [TODO]
     * @attr {string} as-falsy-attr Useful for hiding element if property is falsy [TODO]
     */
    asFalsyAttr?: string;

}