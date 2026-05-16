import {Div, Nav, Ul, Li, A, Main, H2, Structure, P, Loop} from 'atlas-web/dom';

export const Layout = (...children: any[]) =>
{
    const sections = [
        {
            title: 'Core (atlas-web)',
            items: [
                {path: '/', text: 'Introduction'},
                {path: '/reactivity', text: 'Reactivity'},
            ]
        },
        {
            title: 'UI (atlas-web/dom)',
            items: [
                {path: '/dom', text: 'Declarative DOM'},
                {path: '/lifecycle', text: 'Lifecycle'},
            ]
        },
        {
            title: 'Router (atlas-web/router)',
            items: [
                {path: '/routing', text: 'Routing'},
            ]
        },
        {
            title: 'Query (atlas-web/query)',
            items: [
                {path: '/query', text: 'Query'},
            ]
        },
        {
            title: 'Reference',
            items: [
                {path: '/api', text: 'API Reference'}
            ]
        }
    ];

    return Structure(
        Div({className: 'sidebar'},
            H2({textContent: '🌍 Atlas'}),
            Nav({},
                Loop({
                    each:   () => sections,
                    render: (section) => (
                        Div({style: 'margin-bottom: 1.5rem;'},
                            P({
                                textContent: section.title,
                                style:       'font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 0.5rem 1rem; font-weight: 600;'
                            }),
                            Ul({style: 'list-style: none; padding: 0; margin: 0;'},
                                Loop({
                                    each:   () => section.items,
                                    render: (item) => (
                                        Li({style: 'margin-bottom: 0.25rem;'},
                                            A({
                                                href:      item.path,
                                                textContent: item.text,
                                                className: () => {
                                                    const path = window.location.pathname;
                                                    return path.endsWith(item.path) ? 'active' : '';
                                                }
                                            })
                                        )
                                    )
                                })
                            )
                        )
                    )
                })
            )
        ),
        Main({className: 'content'}, ...children)
    );
};