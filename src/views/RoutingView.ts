import { Section, H1, P, H2, Ul, Li, Strong } from 'atlas-web/dom';
import { Layout } from '../components/layout';
import { CodeBlock } from '../components/code-elements';

export const RoutingView = () => Layout(
    Section({},
        H1({ textContent: '🚦 Routing (atlas-router)' }),
        P({ textContent: '`atlas-web/router` is a lightweight client-side router designed to work seamlessly with Atlas components.' }),

        H2({ textContent: 'Configuration' }),
        P({ textContent: 'To initialize the router, provide a list of routes and the ID of the root element where views should be rendered.' }),
        CodeBlock(`
import { AtlasRouter } from 'atlas-web/router';

const routes = [
    { path: '/', view: () => 'Home' },
    { path: '/profile/:id', view: (params) => \`User ID: \${params.id}\` },
    { path: '*', view: () => '404 - Not Found' }
];

new AtlasRouter({
    rootId: 'app',
    routes
});
        `),

        H2({ textContent: 'Features' }),
        Ul({},
            Li({}, Strong({ textContent: 'Automatic Interception:' }), ' The router intercepts all internal link clicks and prevents full page reloads.'),
            Li({}, Strong({ textContent: 'Dynamic Parameters:' }), ' Use the `:name` syntax in paths to capture parameters, which are passed to the view function.'),
            Li({}, Strong({ textContent: 'Wildcards:' }), ' Use `*` for catch-all routes (e.g., for 404 pages).'),
            Li({}, Strong({ textContent: 'History API:' }), ' Uses the browser\'s History API (`pushState`) for clean URLs and "back" button support.')
        ),

        H2({ textContent: 'View Functions' }),
        P({ textContent: 'A view can be a function that returns a string, an HTMLElement, a DocumentFragment, or an array of Nodes. This flexibility allows you to render anything from simple text to complex Atlas components.' })
    )
);