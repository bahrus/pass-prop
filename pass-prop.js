import { PassDown } from 'pass-down/pass-down.js';
import { def } from 'trans-render/lib/def.js';
export class PassProp extends PassDown {
    static is = 'pass-prop';
    onFromProp(initVal) {
        if (this.observeHost)
            return initVal;
        return super..onFromProp(initVal);
    }
    attach(elementToObserve, { on, handleEvent }) {
        let prop = Object.getOwnPropertyDescriptor(elementToObserve, on);
        if (prop === undefined) {
            prop = Object.getOwnPropertyDescriptor(elementToObserve.constructor.prototype, on);
        }
        const setter = prop.set.bind(elementToObserve);
        const getter = prop.get.bind(elementToObserve);
        Object.defineProperty(elementToObserve, on, {
            get() {
                return getter();
            },
            set(nv) {
                setter(nv);
                const event = {
                    target: this
                };
                handleEvent(event);
            },
            enumerable: true,
            configurable: true,
        });
    }
}
def(PassProp);
