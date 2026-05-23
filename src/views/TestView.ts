import { H1, H2, P, Ul, _Loop, Li, Button, Div, Span, _Portal, _If } from 'atlas-web/dom';
import { createState, createFormula, createEffect, createArchive } from 'atlas-web';
import { createFetch } from 'atlas-web/query';
import { Layout } from "../components/layout.ts";

export const TestView = () =>
{
    const state = createState({
        count: 0,
    });

    const countSquared = createFormula(() => state.count * state.count);

    // Initializing the reactive localStorage archive
    const settings = createArchive('atlas-settings', {
        theme:         'dark',
        notifications: true
    });

    const { state: userState, refresh: refreshUser } = createFetch('https://api.github.com/users/WooperLUA');

    // Cleaned up effect - dropped the dependency tracking array
    createEffect(() =>
    {
        console.log(`Log: Count is ${state.count}, Squared is ${countSquared()}`);
        document.title = `Atlas: ${state.count}`;
    });

    return Layout(
        _Portal(H1({ textContent: 'Hello, World!' }), document.body),

        Div({ style: 'align-content: center; height:100svh;' },
            Div({ style: 'align-content: center;' },
                H1({ style: "color : #e2e8f0;" },
                    "Count : ",
                    Span({
                        style:       "color : #58f3e5;",
                        textContent: () => `${state.count}`
                    })
                ),
                H1({ style: "color : #e2e8f0;" },
                    "Count squared : ",
                    Span({
                        style:       "color : #58f3e5;",
                        textContent: () => `${countSquared()}`
                    })
                ),
                Button({
                    style:       "width : 150px; height : 80px",
                    textContent: "Increment",
                    onClick:     () =>
                                 {
                                     state.count++;
                                 },
                })
            )
        ),

        Div({},
            H2({ textContent: 'Github Fetch' }),

            _If(() => userState.loading,
                P({ textContent: 'Loading github profile...' })
            ),

            _If(() => !userState.loading,
                Ul({ style: 'list-style: none; padding: 0;' },

                    _Loop(
                        () => userState.data ? Object.entries(userState.data) : [],
                        ([key, value]) => Li({
                            innerHTML: `<strong>${key}:</strong> ${String(value)}`
                        })
                    )
                )
            ),

            Button({
                style: 'margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer;',
                textContent: 'Refresh Profile',
                onClick: () => refreshUser()
            })
        )
    )
};