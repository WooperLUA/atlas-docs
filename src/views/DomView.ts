import {Section, H1, P, H2, Ul, Li, Strong, H3} from 'atlas-web/dom';
import {Layout} from '../components/layout';
import {CodeBlock} from '../components/code-elements';

export const DomView = () => Layout(
    Section({},
        H1({textContent: '🏗 Declarative UI (atlas-dom)'}),
        P({textContent: 'The `atlas-web/dom` package provides a functional way to build the DOM. It replaces HTML templates with pure TypeScript functions.'}),

        H2({textContent: 'Fragments'}),
        P({textContent: 'Every standard HTML tag has a corresponding capitalized fragment.'}),
        CodeBlock(`
import { Div, H1, P, Button } from 'atlas-web/dom';

const Header = () => 
    Div({ className: 'header' },
        H1({ textContent: 'Welcome' }),
        P({ textContent: 'Atlas makes UI simple.' })
    );
        `),

        H2({ textContent: 'AtlasTraits & Attributes' }),
        P({ textContent: 'The first argument is the `AtlasTraits` object. It handles attributes, styles, lifecycle hooks, and events.' }),
        Ul({},
            Li({}, Strong({ textContent: 'Native Events:' }), ' Use standard lowercase DOM event names (e.g., `onclick`, `oninput`, `onkeydown`).'),
            Li({}, Strong({ textContent: 'Lifecycle Hooks:' }), ' Atlas-specific hooks like `onMount`, `onUnmount`, and `onUpdate`.'),
            Li({}, Strong({ textContent: 'Dynamic Traits:' }), ' Pass a function returning a value to make the trait reactive.')
        ),
        CodeBlock(`
Button({ 
    className: () => state.active ? 'btn-active' : 'btn',
    onclick: () => state.active = !state.active, 
    textContent: 'Toggle'
})
        `),

        H2({ textContent: 'Scoped Styling' }),
        P({ textContent: 'Encapsulate component styles using `createStyleMap`. It generates a unique scope ID and prefixes your selectors, ensuring styles never leak out.' }),
        CodeBlock(`
import { createStyleMap, Div } from 'atlas-web/dom';

const scope = createStyleMap({
    'div': { padding: '20px', borderRadius: '8px' },
    'h1': { color: '#58f3e5' }
});

const Card = () => Div({ class: scope });
        `),

        H2({textContent: 'Structural Components'}),
        P({textContent: 'Atlas provides specialized components for common logic.'}),

        H3({textContent: '_Loop'}),
        P({textContent: 'For efficient list rendering. It synchronizes an array of data with DOM elements, minimizing updates.'}),
        CodeBlock(`
import { _Loop, Ul, Li } from 'atlas-web/dom';

const List = (items: string[]) =>
    Ul({},
        _Loop(() => items, (item) => Li({ textContent: item }))
    );
        `),

        H3({textContent: '_If'}),
        P({textContent: 'For sleek conditional rendering. Pass a reactive condition function as the first argument, followed directly by the elements to display.'}),
        CodeBlock(`
import { _If, Span, _Structure } from 'atlas-web/dom';

_If(() => state.isLoading,
    Span({ textContent: 'Loading core modules...' })
);

_Structure(
    _If(() => state.isLoggedIn, ProfileView()),
    _If(() => !state.isLoggedIn, LoginPrompt())
);
        `),

        H3({textContent: '_Portal'}),
        P({textContent: 'A portal allows a component to station an element at a remote location in the DOM (usually the document body) while maintaining its logical connection to the parent.'}),
        CodeBlock(`
import { _Portal, Div } from 'atlas-web/dom';

_Portal(
    Div({ class: 'tooltip' }, 'Stationed at the root'), 
    document.body
);
        `),

        H3({textContent: '_Structure'}),
        P({textContent: 'A component that returns a `DocumentFragment`. Useful for grouping elements without adding a wrapper `div` to the DOM.'}),
        CodeBlock(`
        import { _Structure } from 'atlas-web/dom';
        
        // Wraps the two components together but wont make it div wrapped
        _Structure(
            MyComponent(),
            MyOtherComponent(),
        );
        `),

    )
);