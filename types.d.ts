import {PDToFrom} from 'pass-down/types.js';

export interface PassPropProps extends PDToFrom {
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
     *  @prop {boolean} fromParentOrHost Observe property from parent element if available, otherwise from host.
     *  @attr {boolean} from-parent-or-host Observe property fro parent element if available, otherwise from host.
     */
    fromParentOrHost?: boolean,
    /**
     * @prop {string} fromUpsearch - Upsearch up the DOM Node Tree for an element matching this css selector
     * @attr {string} from-upsearch - Upsearch up the DOM Node Tree for an element matching this css selector
     */
    fromUpsearch?: string;

    /**
     * @prop {string} [fromUpShadowSearch] - Search by ID within the Shadow DOM realm of the element, or search up the ShadowDOM hierarchy, if the path starts with paths like ../../myElementId
     * @attr {string} [from-up-shadow-search] - Search by ID within the Shadow DOM realm of the element, or search up the ShadowDOM hierarchy, if the path starts with paths like ../../myElementId
     */
    fromUpShadowSearch?: string;
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

export interface IPassProp extends PassPropProps {
    
}

export interface PassPropExtProps extends PassPropProps{
    /**
    * @prop {string} JSONPath expression
    * @attr {string} val-filter JSONPath expression
    */
    valFilter: string;
    /**
     * @prop {string} valFilterScriptId Id within the ShadowDOM Realm of p-d-x of a script tag. The script tag is expected to have a property path where a custom filter function is specified. This custom filter function is applied to the value.
     * @attr {string} val-filter-script-id Id within the ShadowDOM Realm of p-d-x of a script tag. The script tag is expected to have a property path where a custom filter function is specified. This custom filter function is applied to the value.
     */
    valFilterScriptId: string;
    /**
     * @prop {string} [valFilterScriptPropPath=_modExport.filter] - Property path from the script tag, where custom filter function can be obtained.
     * @attr {string} val-filter-script-prop-path Property path from the script tag, where custom filter function can be obtained.
     */
    valFilterScriptPropPath: string;
}