import {PDToFrom} from 'pass-down/types.js';
import {PassProp} from './pass-prop.js';
export interface IPassPropProps extends PDToFrom {

    /**
     * @prop fromHost {boolean} Observe property from ShadowRoot Host
     * @attr from-host
     */
    fromHost?: boolean,
    /**
     * @prop fromParent {boolean} Observe property from parent element
     * @attr from-parent
     */
    fromParent?: boolean,
    /**
     * Observe property fro parent element if available, otherwise from host.
     * @attr from-parent-or-host
     */
    fromParentOrHost?: boolean,
    /**
     * Search up the DOM Node Tree for an element matching this css selector
     * @attr from-upsearch
     */
    fromUpsearch?: string;
    /**
     * Name of property to observe
     * @attr observe-prop
     */
    observeProp?: string;
    /**
     * Host to observe.  Normally, this is determined internally.
     * But it can be passed in.
     */
    hostToObserve?: Element;
    /**
     * Useful for hiding element if property is falsy [TODO]
     */
    asFalsyAttr?: string;

}