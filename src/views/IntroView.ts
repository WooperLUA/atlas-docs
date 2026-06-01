import { Section, H1, P, Div, H3, H2 } from 'atlas-web/dom';
import { Layout } from '../components/layout';

export const IntroView = () => Layout(
    Section({},
        H1({ textContent: '🌍 Atlas Web Framework' }),
        P({ textContent: 'Atlas is a lightweight, modular, and reactive TypeScript framework designed for building modern web applications with minimal overhead.' }),
        P({ textContent: 'The framework is divided into four specialized modules within the `atlas-web` package, allowing you to use only what you need.' }),
        P({textContent : '(Ps : this doc is made using the Atlas Framework.)',
           style : {opacity : '0.61', fontStyle : 'italic'}}),

        H2({ textContent: '📦 Five Pillars' }),
        Div({ className: 'feature-grid' },
            Div({ className: 'feature-card' },
                H3({ textContent: 'atlas-web' }),
                P({ textContent: 'The core reactivity engine. Uses JavaScript Proxies to create transparently reactive state objects with no manual dependency tracking.' })
            ),
            Div({ className: 'feature-card' },
                H3({ textContent: 'atlas-web/dom' }),
                P({ textContent: 'A declarative UI library. Build components using functional tag shorthands, efficient list rendering (Loop), and conditional logic (Gate).' })
            ),
            Div({ className: 'feature-card' },
                H3({ textContent: 'atlas-web/router' }),
                P({ textContent: 'A lightweight client-side router with support for dynamic paths, parameters, and global navigation interception.' })
            ),
            Div({ className: 'feature-card' },
                H3({ textContent: 'atlas-web/query' }),
                P({ textContent: 'A powerful data-fetching and caching utility. It manages remote resource states, revalidation, and loading/error states seamlessly.' })
            ),
            Div({ className: 'feature-card' },
                H3({ textContent: 'atlas-web/devtools' }),
                P({ textContent: 'The best way to debug your states across your Atlas App.' })
            )
        ),

        H2({ textContent: '🚀 Core Philosophies' }),
        Div({ className: 'feature-grid' },
            Div({ className: 'feature-card' },
                H3({ textContent: 'No Virtual DOM' }),
                P({ textContent: 'Atlas updates the real DOM directly and precisely, avoiding the overhead of VDOM diffing and reconciliation.' })
            ),
            Div({ className: 'feature-card' },
                H3({ textContent: 'Functional API' }),
                P({ textContent: 'UI is defined as a composition of functions, making your code predictable, type-safe, and easy to refactor.' })
            ),
            Div({ className: 'feature-card' },
                H3({ textContent: 'Zero Config' }),
                P({ textContent: 'Works out of the box with standard TypeScript. No complex build steps or custom compilers required.' })
            )
        )
    )
);