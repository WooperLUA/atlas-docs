import {Section, H1, Div, Code, P, H2} from 'atlas-web/dom';
import {Layout} from '../components/layout';

export const ApiView = () => Layout(
    Section({},
        H1({textContent: '📚 API Reference'}),

        H2({textContent: 'Core (atlas-web)'}),
        Div({className: 'api-item'},
            Code({textContent: 'createState<T>(initialState: T): T'}),
            P({textContent: 'Creates a deep reactive Proxy of the given object.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'createFormula<T>(calculation: () => T): T'}),
            P({textContent: 'Creates a derived, read-only reactive value.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'createEffect(effect: () => void, deps: any[]): void'}),
            P({textContent: 'Creates a persistent side-effect that re-runs whenever its state dependencies change.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'createArchive<T extends object>(key: string, initialState: T): T'}),
            P({textContent: 'Creates a reactive state that persists in localStorage.'})
        ),

        H2({textContent: 'UI (atlas-web/dom)'}),
        Div({className: 'api-item'},
            Code({textContent: 'Fragment(tag: string, traits: Traits, ...children: Children[]): HTMLElement'}),
            P({textContent: 'The foundational function for element creation.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'Div, Span, H1, Button, ...'}),
            P({textContent: 'Capitalized shorthand functions for all standard HTML tags.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'StyleMap(css: Record<string, AtlasCSS>): string'}),
            P({textContent: 'Generates a unique scope ID and injects prefixed CSS rules into the document head.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'Loop<T>({ each: () => T[], render: (item: T, index: number) => Children }): DocumentFragment'}),
            P({textContent: 'A component for efficient list synchronization.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'Gate({ when: () => boolean, fallback?: Children }, ...children: Children[]): DocumentFragment'}),
            P({textContent: 'A component for reactive conditional rendering.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'Structure(...children: Children[]): DocumentFragment'}),
            P({textContent: 'Groups multiple children into a DocumentFragment.'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'Overlay(element: HTMLElement, target: HTMLElement = document.body): Comment'}),
            P({textContent: 'Renders an Atlas element into a different part of the DOM.'})
        ),

        H2({textContent: 'Router (atlas-web/router)'}),
        Div({className: 'api-item'},
            Code({textContent: 'new AtlasRouter({ rootId: string, routes: Route[] })'}),
            P({textContent: 'Initializes the global router instance.'})
        ),

        H2({textContent: 'Fetch (atlas-web/fetch)'}),
        Div({className: 'api-item'},
            Code({textContent: 'createFetch<T>(input, options?): { state, refresh }'}),
            P({textContent: 'Reactive wrapper for Fetch API that manages async states (loading, data, error).'})
        ),
        Div({className: 'api-item'},
            Code({textContent: 'createMutation<T, V = void>(mutationFn: (variables: V) => Promise<T>)'}),
            P({textContent: 'Reactive wrapper for manual asynchronous actions (POST, PUT, DELETE).'})
        )
    )
);