import {Section, H1, P, H2, H3, Span} from 'atlas-web/dom';
import {Layout} from '../components/layout';
import {CodeBlock} from '../components/code-elements';

export const ReactivityView = () => Layout(
    Section({},
        H1({textContent: '⚡ Core Reactivity (atlas)'}),
        P({textContent: 'The core of Atlas is a high-performance reactivity engine that uses JavaScript Proxies to observe changes to state objects.'}),

        H2({textContent: '1. createState'}),
        P({textContent: 'To create a reactive state, simply wrap any object with `createState`. This returns a proxy that tracks property access and updates.'}),
        CodeBlock(`
import { createState } from 'atlas-web';

const state = createState({
    count: 0,
    user: { name: 'John' }
});
        `),

        H2({textContent: '2. createFormula'}),
        P({textContent: 'Formulas represent derived state. They are read-only calculations that stay in sync with their source data.'}),
        CodeBlock(`
import { createFormula } from 'atlas-web';

const countSquared = createFormula(() => state.count * state.count);

Span({ textContent: () => \`Squared: \${countSquared()}\` })
        `),
        P({textContent: 'Formulas are transparent: because they are functions, calling them inside a DOM trait automatically links that DOM node to the source state used in the calculation.'}),

        H2({textContent: '3. createEffect'}),
        P({textContent: 'Effects are used for side-effects—actions that should happen automatically when state changes but don\'t necessarily return a UI element. Dependency tracking is completely automatic and requires no dependency arrays.'}),
        CodeBlock(`
import { createEffect } from 'atlas-web';

createEffect(() => {
    console.log(\`Count is now: \${state.count}\`);
    document.title = \`Count: \${state.count}\`;
}); 
        `),
        P({textContent: 'When an effect runs, it naturally listens to any reactive state properties read during execution.'}),

        H2({textContent: '4. createArchive'}),
        P({textContent: 'An Archive is a reactive state that persists across sessions. It automatically syncs its data to localStorage whenever a property is updated.'}),
        CodeBlock(`
import { createArchive } from 'atlas-web';

const settings = createArchive('user-prefs', {
    theme: 'dark',
    fontSize: 16
});

settings.theme = 'light';
        `),

        H2({textContent: 'The Subscription Mechanism'}),
        P({},
            'Atlas uses an implicit "lazy subscription" tracking window. When you pass a function to a trait or a side-effect block, Atlas temporarily establishes an active listener context. If that function accesses any proxy properties, it automatically wires up granular updates.'
        ),
        CodeBlock(`
P({ 
    textContent: () => \`Count is: \${state.count}\` 
});
        `),

        H3({textContent: 'Performance'}),
        P({textContent: 'Because subscriptions are granular, only the specific DOM nodes or effects that depend on a changed property are executed. There is no global re-render or VDOM diffing overhead.'})
    )
);