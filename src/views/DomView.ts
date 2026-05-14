import {Section, H1, P, H2, Ul, Li, Strong, H3} from 'atlas/dom';
import {Layout} from '../components/layout';
import {CodeBlock} from '../components/code-elements';

export const DomView = () => Layout(
    Section({},
        H1({textContent: '🏗 Declarative UI (atlas-dom)'}),
        P({textContent: 'The `atlas-dom` package provides a functional way to build the DOM. It replaces HTML templates with pure TypeScript functions.'}),

        H2({textContent: 'Fragments'}),
        P({textContent: 'Every standard HTML tag has a corresponding capitalized fragment.'}),
        CodeBlock(`
import { Div, H1, P, Button } from 'atlas/dom';

const Header = () => 
    Div({ className: 'header' },
        H1({ textContent: 'Welcome' }),
        P({ textContent: 'Atlas makes UI simple.' })
    );
        `),

        H2({textContent: 'Traits & Attributes'}),
        P({textContent: 'The first argument is the "Traits" object. It handles attributes, styles, and events.'}),
        Ul({},
            Li({}, Strong({textContent: 'Event Listeners:'}), ' Prefix with "on" (e.g., `onClick`, `onInput`).'),
            Li({}, Strong({textContent: 'Dynamic Traits:'}), ' Pass a function returning a value to make the trait reactive.')
        ),
        CodeBlock(`
Button({ 
    className: () => state.active ? 'btn-active' : 'btn',
    onClick: () => state.active = !state.active,
    textContent: 'Toggle'
})
        `),

        H2({ textContent: 'Scoped Styling' }),
        P({ textContent: 'Encapsulate component styles using `StyleMap`. It generates a unique scope ID and prefixes your selectors, ensuring styles never leak out.' }),
        CodeBlock(`
import { StyleMap, Div } from 'atlas/dom';

const scope = StyleMap({
    'div': { padding: '20px', borderRadius: '8px' },
    'h1': { color: '#58f3e5' }
});

const Card = () => Div({ class: scope }, ...);
        `),

        H2({textContent: 'Structural Components'}),
        P({textContent: 'Atlas provides specialized components for common logic.'}),

        H3({textContent: 'Loop'}),
        P({textContent: 'For efficient list rendering. It synchronizes an array of data with DOM elements, minimizing updates.'}),
        CodeBlock(`
import { Loop, Li } from 'atlas/dom';

const List = (items: string[]) =>
    Ul({},
        Loop({
            each: () => items,
            render: (item) => Li({ textContent: item })
        })
    );
        `),

        H3({textContent: 'Gate'}),
        P({textContent: 'For conditional rendering.'}),
        CodeBlock(`
import { Gate, Span } from 'atlas/dom';

Gate({ 
    when: () => state.isLoading,
    fallback: Span({ textContent: 'Content Loaded!' })
}, 
    Span({ textContent: 'Loading...' })
)
        `),

        H3({textContent: 'Overlay'}),
        P({textContent: 'An overlay allows a component to station an element at a remote location in the DOM (usually the document body) while maintaining its logical connection to the parent.'}),
        CodeBlock(`
import { Overlay, Div } from 'atlas/dom';

// Teleport this div to the very end of the document
Overlay(
    Div({ class: 'tooltip' }, 'Stationed at the root'),
    document.body
);
        `),

        H3({textContent: 'Structure'}),
        P({textContent: 'A component that returns a `DocumentFragment`. Useful for grouping elements without adding a wrapper `div` to the DOM.'})
    )
);
