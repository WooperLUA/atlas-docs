import { Section, H1, P, H2, Ul, Li, Strong, H3 } from 'atlas/dom';
import { Layout } from '../components/layout';
import { CodeBlock } from '../components/code-elements';

export const LifecycleView = () => Layout(
    Section({},
        H1({ textContent: '🔄 Component Lifecycle' }),
        P({ textContent: 'Atlas uses a MutationObserver to automatically detect when elements are added to or removed from the document, triggering lifecycle hooks defined in traits.' }),
        
        H2({ textContent: 'Lifecycle Hooks' }),
        Ul({},
            Li({}, Strong({ textContent: 'onMount:' }), ' Called when the element is inserted into the DOM.'),
            Li({}, Strong({ textContent: 'onUnmount:' }), ' Called when the element is removed from the DOM.'),
            Li({}, Strong({ textContent: 'onUpdate:' }), ' Called whenever a reactive trait of the element is updated.')
        ),
        
        H2({ textContent: 'Example' }),
        P({ textContent: 'Lifecycle hooks are useful for manual DOM manipulations, setting up third-party libraries, or cleanup.' }),
        CodeBlock(`
import { Div } from 'atlas/dom';

const MyComponent = () =>
    Div({
        onMount: (el) => {
            console.log('Element mounted:', el);
            el.focus();
        },
        onUnmount: (el) => {
            console.log('Element unmounted');
        },
        onUpdate: (el) => {
            console.log('Element traits updated');
        }
    }, 'Content');
        `),
        H3({ textContent: 'Global Observer' }),
        P({ textContent: 'The lifecycle system is global and works for any element created via Atlas functions. You don\'t need to manually register observers for individual components.' })
    )
);
