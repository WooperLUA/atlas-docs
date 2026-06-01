import {Section, H1, P, H2, Ul, Li, Strong, H3} from 'atlas-web/dom';
import {Layout} from '../components/layout';
import {CodeBlock} from '../components/code-elements';

export const DevtoolsView = () => Layout(
    Section({},
        H1({textContent: '🔧 Devtools (atlas-devtools)'}),
        P({textContent: 'The `atlas-web/devtools` package provides tools to debug / observe states mutations accros the app.'}),

        H2({textContent: 'Usage'}),
        P({textContent: 'Just import it (usually in the entry point / router) and the Atlas icon will showup on the bottom right corner of your screen.'}),
        CodeBlock(`import 'atlas-web/devtools'; // Will automatically init the tools`),
    )
);