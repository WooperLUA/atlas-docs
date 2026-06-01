import {Div, Nav, Ul, Li, A, Main, H2, _Structure, P, _Loop} from 'atlas-web/dom';

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
            title: 'Devtools (atlas-web/devtools)',
            items: [
                {path: '/devtools', text: 'Devtools'},
            ]
        },
        {
            title: 'Reference',
            items: [
                {path: '/api', text: 'API Reference'}
            ]
        }
    ];

    return _Structure(
        Div({className: 'sidebar'},
            H2({textContent: '🌍 Atlas'}),
            Nav({},
                _Loop(() => sections, (section) => (
                    Div({style: 'margin-bottom: 1.5rem;'},
                        P({
                            textContent: section.title,
                            style:       'font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 0.5rem 1rem; font-weight: 600;'
                        }),
                        Ul({style: 'list-style: none; padding: 0; margin: 0;'},
                            _Loop(() => section.items, (item) => (
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
                            ))
                        )
                    )
                ))
            )
        ),
        Main({className: 'content'}, ...children)
    );
};