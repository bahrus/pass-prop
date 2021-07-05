import {xc} from 'xtal-element/lib/XtalCore.js';
import {PassProp} from './pass-prop.js';

/**
 * @tag p-p
 */
export class PP extends PassProp{
    static is = 'p-p';
}
xc.define(PP);

declare global {
    interface HTMLElementTagNameMap {
        'p-p': PP;
    }
}