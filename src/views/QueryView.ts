import { Section, H1, P, H2, Ul, Li, Strong, Div, Code } from 'atlas-web/dom';
import { Layout } from '../components/layout';
import { CodeBlock } from '../components/code-elements';

export const QueryView = () => Layout(
    Section({},
        H1({ textContent: '🛰️ Query (atlas-web/query)' }),
        P({ textContent: 'The query module provides reactive primitives for managing remote data. It distinguishes between Queries (fetching data) and Mutations (changing data).' }),

        H2({ textContent: 'Queries: createFetch' }),
        P({ textContent: '`createFetch` is used for retrieving data. It executes immediately and synchronizes the response with a reactive state object.' }),
        CodeBlock(`
import { createFetch } from 'atlas-web/query';

const { state, refresh } = createFetch('https://api.github.com/users/WooperLUA');

// Reactive UI binding
P({ 
    textContent: () => state.loading ? 'Loading...' : \`Hello, \${state.data.login}\` 
})
        `),

        H2({ textContent: 'Mutations: createMutation' }),
        P({ textContent: '`createMutation` is for server-side side effects (POST, PUT, DELETE). Unlike queries, mutations do not run automatically; they provide an `execute` function for manual triggering.' }),
        CodeBlock(`
import { createMutation } from 'atlas-web/query';

const { state, execute } = createMutation(async (newBio: string) => {
    return await fetch('/api/user/update', {
        method: 'POST',
        body: JSON.stringify({ bio: newBio })
    });
});

// Triggering the action
Button({
    textContent: 'Update Bio',
    onClick: () => execute('Explorer of the Atlas ecosystem')
})
        `),

        H2({ textContent: 'The Reactive State' }),
        P({ textContent: 'Both primitives return a uniform state proxy:' }),
        Ul({ style: 'list-style: none; padding-left: 0;' },
            Li({ style: 'margin-bottom: 0.5rem;' }, Strong({ textContent: 'data: ' }), 'The payload returned by the request.'),
            Li({ style: 'margin-bottom: 0.5rem;' }, Strong({ textContent: 'loading: ' }), 'Boolean indicating active network activity.'),
            Li({ style: 'margin-bottom: 0.5rem;' }, Strong({ textContent: 'error: ' }), 'Captured exception object if the operation fails.'),
            Li({ style: 'margin-bottom: 0.5rem;' }, Strong({ textContent: 'status: ' }), 'The HTTP status code (0 for network/client errors).')
        ),

        H2({ textContent: 'When to use which?' }),
        Div({ style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;' },
            Div({ style: 'padding: 1rem; border: 1px solid #1e293b; border-radius: 8px;' },
                Strong({ textContent: 'createFetch' }),
                P({ textContent: 'Use for GET requests, dashboard data, and content that should be visible as soon as the view loads.' })
            ),
            Div({ style: 'padding: 1rem; border: 1px solid #1e293b; border-radius: 8px;' },
                Strong({ textContent: 'createMutation' }),
                P({ textContent: 'Use for form submissions, deleting records, or any action that modifies data on the server.' })
            )
        ),

        H2({ textContent: 'Architecture' }),
        P({ textContent: 'By separating read and write operations into distinct primitives, Atlas-Query ensures that side-effects are predictable and that your UI remains in sync without the need for complex lifecycle management code.' })
    )
);