import { Section, H1, P, H2, H3, Span, Div } from 'atlas-web/dom';
import { Layout } from '../components/layout';
import { CodeBlock } from '../components/code-elements';

export const ReactivityView = () => Layout(
    Section({},
        H1({ textContent: '⚡ Core Reactivity (atlas)' }),
        P({ textContent: 'The core of Atlas is a high-performance reactivity engine that uses JavaScript Proxies to observe changes to state objects with zero manual dependency tracking.' }),

        H2({ textContent: '1. uState' }),
        P({ textContent: 'To create a reactive state, wrap any object with `uState`. This returns a proxy that tracks property access and updates.' }),
        CodeBlock(`
import { uState } from 'atlas-web';

const state = uState({
    count: 0,
    user: { name: 'John' }
});
        `),

        H2({ textContent: '2. uFormula' }),
        P({ textContent: 'Formulas represent derived state. They are read-only calculations that automatically memoize their result and only recalculate when their tracked dependencies change.' }),
        CodeBlock(`
import { uFormula } from 'atlas-web';

const countSquared = uFormula(() => state.count * state.count);

Span({ textContent: () => \`Squared: \${countSquared()}\` })
        `),
        P({ textContent: 'Because formulas are functions, calling them inside a DOM trait automatically links that DOM node to the source state used in the calculation.' }),

        H2({ textContent: '3. uEffect' }),
        P({ textContent: 'Effects are used for side-effects. Dependency tracking is completely automatic. `uEffect` also returns a `dispose` function to manually clean up the effect and its dependencies.' }),
        CodeBlock(`
import { uEffect } from 'atlas-web';

const dispose = uEffect(() => {
    console.log(\`Count is now: \${state.count}\`);
    document.title = \`Count: \${state.count}\`;
});

// Later, to stop listening and clean up:
// dispose();
        `),
        H3({ textContent: 'Explicit Dependencies' }),
        P({ textContent: 'If you want to disable implicit tracking and only listen to specific properties, pass getter functions as the second argument:' }),
        CodeBlock(`
uEffect(
    () => console.log('Only runs when count changes'), 
    () => state.count // Explicit dependency
);
        `),

        H3({ textContent: 'Utility Wrappers: uOnceEffect, uWatchEffect & uDebounceEffect' }),
        P({ textContent: 'For specific side-effect patterns, Atlas provides tiny wrappers around `uEffect`:' }),
        CodeBlock(`
import {uState, uOnceEffect, uWatchEffect, uDebounceEffect } from 'atlas-web';

// uOnce: Perfect for one-time initialization or analytics
uOnceEffect(() => {
    if (authState.isLoggedIn) {
        fetchUserProfile(); // Only runs the very first time this becomes true
    }
});

// uWatch: Perfect for comparing values or triggering specific transitions
uWatchEffect(
    () => routeState.currentPath,
    (newPath, oldPath) => {
        console.log(\`Navigated from \${oldPath} to \${newPath}\`);
    }
);

// uDebounceEffect : Perfect for delaying effects
const search = uState({ term: '', results: [] });

// Only runs 500ms after the user stops typing.
// If they type again before 500ms, the timer resets.
uDebounceEffect(() => {
    if (search.term.length > 2) {
        console.log(\`Fetching results for: "\${search.term}"\`);
        // fetch(\`/api/search?q=\${search.term}\`).then(...)
    }
}, 500);

uDebounceEffect(() => {
    if (search.term.length > 2) {
        console.log(\`Fetching results for: "\${search.term}"\`);
        // fetch(\`/api/search?q=\${search.term}\`).then(...)
    }
}, 500, () => search.term); // Explicit dependencies tracking for sync tracking.

const SearchView = () => Input({
    placeholder: 'Type to search...',
    value: () => search.term,
    onInput: (e) => search.term = (e.target as HTMLInputElement).value
});

`),

        H2({ textContent: '4. uArchive (Singleton)' }),
        P({ textContent: 'An Archive is a reactive state that persists across sessions. It acts as a singleton: provide an `initialState` on the first call to create and hydrate it, or call it with just the `key` anywhere else in your app to retrieve the existing instance.' }),
        CodeBlock(`
import { uState, uArchive } from 'atlas-web';

// File: settings.ts (Initialize once)
export const settings = uArchive('user-prefs', uState({
    theme: 'dark',
    fontSize: 16
}));

// File: header.ts (Retrieve anywhere)
import { uArchive } from 'atlas-web';
const settings = uArchive<{ theme: string, fontSize: number }>('user-prefs');

settings.theme = 'light'; // Automatically syncs to localStorage
        `),

        H2({ textContent: '5. uFlow (Global State)' }),
        P({ textContent: 'For state that needs to be accessed across completely different parts of your application without passing props, Atlas provides a global registry via Flows. Like `uArchive`, it acts as a singleton.' }),
        CodeBlock(`
import { uFlow } from 'atlas-web';

// File: auth.ts (Initialize once)
export const auth = uFlow('auth', { user: null, isAuthenticated: false });

// File: header.ts (Retrieve anywhere)
import { uFlow } from 'atlas-web';
const auth = uFlow<{ user: any, isAuthenticated: boolean }>('auth');

P({ textContent: () => auth.isAuthenticated ? 'Welcome back!' : 'Please log in.' })
        `),

        H2({ textContent: '6. Destructuring (getRefs)' }),
        P({ textContent: 'Standard JavaScript destructuring breaks Proxy reactivity. Use `getRefs` to safely destructure a state object into individual reactive getter functions.' }),
        CodeBlock(`
import { uState, getRefs } from 'atlas-web';

const state = uState({ count: 0, active: true });
const { count, active } = getRefs(state);

// Call the destructured refs as functions to maintain reactivity
Button({ 
    textContent: () => \`Clicked \${count()} times\`,
    disabled: () => !active()
})
        `),

        H2({ textContent: 'The Subscription Mechanism' }),
        P({},
            'Atlas uses an implicit "lazy subscription" tracking window. When you pass a function to a trait or a side-effect block, Atlas temporarily establishes an active listener context. If that function accesses any proxy properties, it automatically wires up granular updates.'
        ),
        CodeBlock(`
P({ 
    textContent: () => \`Count is: \${state.count}\` 
});
        `),
    )
);