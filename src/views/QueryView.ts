import {Section, H1, P, H2, Ul, Li, Strong, Div, H3, Button} from 'atlas-web/dom';
import {Layout} from '../components/layout';
import {CodeBlock} from '../components/code-elements';

export const QueryView = () => Layout(
    Section({},
        H1({textContent: '🛰️ Query (atlas-web/query)'}),
        P({textContent: 'The query module provides reactive primitives for managing remote data. It distinguishes between Queries (fetching data) and Mutations (changing data).'}),

        H2({textContent: 'Queries: uFetch'}),
        P({textContent: '`uFetch` is used for retrieving data. It executes immediately and synchronizes the response with a reactive state object.'}),
        CodeBlock(`
import { uFetch } from 'atlas-web/query';

const { state, refresh } = uFetch('https://api.github.com/users/WooperLUA');

// Reactive UI binding
P({ 
    textContent: () => state.loading ? 'Loading...' : \`Hello, \${state.data.login}\` 
})
        `),
        H3({textContent: 'Custom Async Functions'}),
        P({textContent: "`uFetch` isn't limited to URLs. You can pass any custom async function, making it perfect for wrapping third-party SDKs or complex data transformations."}),
        CodeBlock(`
import { uFetch } from 'atlas-web/query';

const { state } = uFetch(async () => {
    const res = await myCustomSDK.getData();
    return res.transformedPayload;
});
        `),

        H2({textContent: 'Mutations: uMutation'}),
        P({textContent: '`uMutation` is for server-side side effects (POST, PUT, DELETE). Unlike queries, mutations do not run automatically; they provide an `execute` function for manual triggering.'}),
        CodeBlock(`
import { uMutation } from 'atlas-web/query';

const { state, execute } = uMutation(async (newBio: string) => {
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

        H2({textContent: 'The Reactive State'}),
        P({textContent: 'Both primitives return a uniform state proxy:'}),
        Ul({style: 'list-style: none; padding-left: 0;'},
            Li({style: 'margin-bottom: 0.5rem;'}, Strong({textContent: 'data: '}), 'The payload returned by the request.'),
            Li({style: 'margin-bottom: 0.5rem;'}, Strong({textContent: 'loading: '}), 'Boolean indicating active network activity.'),
            Li({style: 'margin-bottom: 0.5rem;'}, Strong({textContent: 'error: '}), 'Captured exception object if the operation fails.'),
            Li({style: 'margin-bottom: 0.5rem;'}, Strong({textContent: 'status: '}), 'The HTTP status code (0 for network/client errors).')
        ),
    )
);