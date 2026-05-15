import { Section, H1 } from 'atlas-web/dom';
import { Layout } from '../components/layout';

export const ErrorView = () => Layout(
    Section({},
        H1({ textContent: '404 Not Found' }),
    )
);
