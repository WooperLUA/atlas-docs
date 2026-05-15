import {Section, H1, P, H2, H3} from 'atlas-web/dom';
import {Layout} from '../components/layout';
import {CodeBlock} from '../components/code-elements';

export const ReactivityView = () => Layout(
    Section({},
        H1({textContent: '⚡ Core Reactivity (atlas)'}),
        P({textContent: 'The core of Atlas is a high-performance reactivity engine that uses JavaScript Proxies to observe changes to state objects.'}),

        H2({textContent: '1. createState'}),
        P({textContent: 'To create a reactive state, simply wrap any object with `createState`. This returns a proxy that tracks property access and updates.'}),
        CodeBlock(`
import { createState } from 'atlas';

const state = createState({
    count: 0,
    user: { name: 'John' }
});
        `),

        H2({textContent: '2. createFormula'}),
        P({textContent: 'Formulas represent derived state. They are read-only calculations that stay in sync with their source data.'}),
        CodeBlock(`
import { createFormula } from 'atlas';

const countSquared = createFormula(() => state.count * state.count);

// In the UI:
Span({ textContent: () => \`Squared: \${countSquared()}\` })
        `),
        P({textContent: 'Formulas are transparent: because they are functions, calling them inside a DOM trait automatically links that DOM node to the source state used in the calculation.'}),

        H2({textContent: '3. createEffect'}),
        P({textContent: 'Effects are used for side-effects—actions that should happen when state changes but don\'t necessarily return a UI element (e.g., logging, API calls, or document titles).'}),
        CodeBlock(`
import { createEffect } from 'atlas';

// Explicitly watch the 'state' object
createEffect(() => {
    console.log(\`Count is now: \${state.count}\`);
    document.title = \`Count: \${state.count}\`;
}, [state]); 
        `),
        P({textContent: 'Note: In Atlas, you pass the state object itself to the dependency array. This links the effect to any change within that specific state proxy.'}),

        H2({textContent: '4. createArchive'}),
        P({textContent: 'An Archive is a reactive state that persists across sessions. It automatically syncs its data to localStorage whenever a property is updated.'}),
        CodeBlock(`
import { createArchive } from 'atlas';

// Loads existing data from 'user-prefs' or uses the default
const settings = createArchive('user-prefs', {
    theme: 'dark',
    fontSize: 16
});

// Any change here is instantly saved to the browser storage
settings.theme = 'light';
        `),

        H2({textContent: 'The Subscription Mechanism'}),
        P({},
            'Atlas uses a "lazy subscription" model. When you pass a function to a trait in `atlas-dom`, Atlas executes it. If that function accesses any property of a reactive state, it is automatically subscribed to future changes.'
        ),
        CodeBlock(`
// Atlas detects state.count access via the arrow function
P({ 
    textContent: () => \`Count is: \${state.count}\` 
});
        `),

        H3({textContent: 'Performance'}),
        P({textContent: 'Because subscriptions are granular, only the specific DOM nodes or effects that depend on a changed property are executed. There is no global re-render or VDOM diffing overhead.'})
    )
);