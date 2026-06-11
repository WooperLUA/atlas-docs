import { Section, H1, Div, Code, P, H2 } from 'atlas-web/dom';
import { Layout } from '../components/layout';

export const ApiView = () => Layout(
    Section({},
        H1({ textContent: '📚 API Reference' }),

        H2({ textContent: 'Core (atlas-web)' }),
        Div({ className: 'api-item' },
            Code({ textContent: 'uState<T>(initialState: T, fallbackName?: string): T' }),
            P({ textContent: 'Creates a deep reactive Proxy of the given object. Tracks property access for granular updates.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: 'uFormula<T>(calculation: () => T): () => T' }),
            P({ textContent: 'Creates a derived, read-only reactive getter. Automatically memoizes the result until dependencies change.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: 'uEffect(effect: () => void, dependencies?: (() => any) | (() => any)[]): () => void' }),
            P({ textContent: 'Creates a persistent side-effect. Returns a `dispose()` function for manual cleanup. Supports optional explicit dependency getters.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: 'uArchive<T>(key: string): T' }),
            Code({ textContent: 'uArchive<T>(key: string, initialState: T): T' }),
            P({ textContent: 'Singleton factory for localStorage-synced state. Provide `initialState` on first call to create/hydrate. Call with just `key` elsewhere to retrieve.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: 'uFlow<T>(name: string): T' }),
            Code({ textContent: 'uFlow<T>(name: string, initialState: T): T' }),
            P({ textContent: 'Singleton factory for global in-memory state. Provide `initialState` on first call to create. Call with just `name` elsewhere to retrieve.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: 'getRefs<T>(proxy: T): { [K in keyof T]: () => T[K] }' }),
            P({ textContent: 'Safely destructures a state proxy into individual reactive getter functions, preserving reactivity.' })
        ),

        H2({ textContent: 'UI (atlas-web/dom)' }),
        Div({ className: 'api-item' },
            Code({ textContent: 'Fragment(tag: string, traits: Traits, ...children: Children[]): AtlasNode' }),
            P({ textContent: 'The foundational function for element creation.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: 'Div, Span, H1, Button, ...' }),
            P({ textContent: 'Capitalized shorthand functions for all standard HTML/SVG tags.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: 'createStyleMap(css: Record<string, AtlasCSS>): string' }),
            P({ textContent: 'Generates a unique scope ID and injects prefixed CSS rules into the document head to prevent style leakage.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: '_Loop<T>(dataSource: () => T[], renderer: (item: T, index: () => number) => any, getKey?: (item: T) => string | number): DocumentFragment' }),
            P({ textContent: 'A component for efficient, keyed list synchronization. Always provide `getKey` for dynamic lists to preserve DOM state.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: '_If(when: () => boolean, ...children: Children[]): DocumentFragment' }),
            P({ textContent: 'A zero-config component for reactive conditional rendering. Automatically cleans up old effects when the condition changes.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: '_Structure(...children: Children[]): DocumentFragment' }),
            P({ textContent: 'Groups multiple children into a DocumentFragment without adding a wrapper DOM node.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: '_Portal(element: HTMLElement, target: HTMLElement | string = document.body): Comment' }),
            P({ textContent: 'Teleports an Atlas element into a different part of the DOM. Automatically removes the element when the parent unmounts.' })
        ),

        H2({ textContent: 'Router (atlas-web/router)' }),
        Div({ className: 'api-item' },
            Code({ textContent: 'new AtlasRouter({ rootId: string, routes: Route[], basePath?: string })' }),
            P({ textContent: 'Initializes the global router instance. Handles history API, parameter extraction, and internal link interception.' })
        ),

        H2({ textContent: 'Query (atlas-web/query)' }),
        Div({ className: 'api-item' },
            Code({ textContent: 'uFetch<T>(input: RequestInfo | (() => Promise<T>), options?: RequestInit): { state, refresh }' }),
            P({ textContent: 'Reactive wrapper for Fetch API that manages async states (loading, data, error, status). Executes immediately.' })
        ),
        Div({ className: 'api-item' },
            Code({ textContent: 'uMutation<T, V>(mutationFn: (variables: V) => Promise<T>): { state, execute }' }),
            P({ textContent: 'Reactive wrapper for manual asynchronous actions (POST, PUT, DELETE). Does not execute until `execute(vars)` is called.' })
        )
    )
);