import { Section, H1, P, Div, H3, H2 } from 'atlas-web/dom';
import { Layout } from '../components/layout';

export const IntroView = () => Layout(
    Section({},
        H1({ textContent: '🌍 Atlas Framework' }),
        P({ textContent: 'Atlas is a lightweight, modular, and reactive TypeScript framework designed for building modern web applications with minimal overhead.' }),
        P({ textContent: 'The framework is divided into three specialized modules within the `atlas-web` package, allowing you to use only what you need.' }),

        H2({ textContent: '📦 Three Pillars' }),
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