# pass-prop

<a href="https://nodei.co/npm/pass-prop/"><img src="https://nodei.co/npm/pass-prop.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/pass-prop">

pass-prop is a web component that passes a prop from a higher component to downstream siblings.  It shares much common code and syntax with other components of the [p-et-alia](https://github.com/bahrus/p-et-alia) framework of components, but, like the other components in that framework, pass-prop can serve a useful purpose as a standalone component.  The other components in the framework have a name that is globally unique (based on npm package name uniqueness constraints), but also have shorter "nicknames" which might clash with other libraries.  In the case of pass-prop, that nickname is "p-p".  


## Syntax

```html
<my-custom-element>
    #shadowDOM
        <laissez-dom>
            <template>
                <pass-prop from-host observe-prop=items to=[-list] ></pass-prop>
                <i-bid -list></i-bid>
            </template>
        </laissez-dom>
</my-custom-element>
```


## Purpose

One of the most boring boilerplate tasks for markup-centric web components (which may see a resurgence with HTML Modules) is passing public properties of the web component down to sub components within its Shadow DOM realm (possibly with some minor modifications).  And boilerplate JS is expensive, both in terms of performance, and incurs higher risk maintenance costs.  In other words, pass-prop places a premium on declarative binding, over boilerplate JS.

Additionally, as seen in the example above, web component libraries may not have a very clear strategy as far as allowing sub-components to "spontaneously" generate content, which then needs to partake in binding to the host.

## Alternatives

With template instantiation, some of that binding could be built into the platform.  But it is unclear how extensive that binding will be at this time.  For example, will template instantiation support inserted DOM nodes, post node cloning, i.e. lazy loaded content?

A component like pass-prop may be just enough to allow a web component to remain 100% declarative, even as the complexity of the component increases, should declarative web components become a thing.

## Assumptions

pass-prop assumptions that property changes of interest will be paired with dispatched events.  It assumes that the name of the event will be the lisp-cased name of the property, followed by a "-changed.".  However, we can specify a specific event name to listen to via property/attribute propChangeEventName/prop-change-event-name.

Some checklists of good web component design advocate not firing events associated with public properties where the value is passed in.  However, it does fit a useful purpose, in conjunction with a web component like pass-prop.  A good comprise might be to automatically "echo" the public property to a less advertised "doppel"-prop.



## [API Reference](https://bahrus.github.io/wc-info/cdn-base.html?npmPackage=pass-prop)


