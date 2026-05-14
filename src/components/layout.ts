import {Div, Nav, Ul, Li, A, Main, H2, Structure, P, Loop} from 'atlas/dom';
import {docState} from '../state';

export const Layout = (...children: any[]) =>
{
    const sections = [
        {
            title: 'Core (atlas)',
            items: [
                {path: '/', text: 'Introduction'},
                {path: '/reactivity', text: 'Reactivity'},
            ]
        },
        {
            title: 'UI (atlas-dom)',
            items: [
                {path: '/dom', text: 'Declarative DOM'},
                {path: '/lifecycle', text: 'Lifecycle'},
            ]
        },
        {
            title: 'Router (atlas-router)',
            items: [
                {path: '/routing', text: 'Routing'},
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
                    render: (item) => (
                        Div({style: 'margin-bottom: 1.5rem;'},
                            P({
                                textContent: item.title,
                                style:       'font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 0.5rem 1rem; font-weight: 600;'
                            }),
                            Ul({style: 'list-style: none; padding: 0; margin: 0;'},
                                Loop({
                                    each:   () => item.items,
                                    render: (item) => (
                                        Li({style: 'margin-bottom: 0.25rem;'},
                                            A({
                                                href:      item.path,
                                                text:      item.text,
                                                className: () =>
                                                           {
                                                               const path = docState.currentPath;
                                                               return (path === item.path || (item.path === '/' && path === '')) ? 'active' : '';
                                                           },
                                                onClick:   (e: MouseEvent) =>
                                                           {
                                                               if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
                                                               docState.currentPath = item.path;
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
