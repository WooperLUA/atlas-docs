import {H1, Button, Div, Span, Overlay} from 'atlas-web/dom';
import {createState, createFormula, createEffect, createArchive} from 'atlas-web';
import {Layout} from "../components/layout.ts";

export const TestView = () =>
{
    const state = createState({
        count: 0,
    });

    const countSquared = createFormula(() => state.count * state.count);

    const settings = createArchive('atlas-settings', {
        theme:         'dark',
        notifications: true
    });

    createEffect(() =>
    {
        console.log(`Log: Count is ${state.count}, Squared is ${countSquared()}`);
        document.title = `Atlas: ${state.count}`;
    }, [state]);

    return Layout(
        Overlay(H1({textContent: 'Hello, World!'}), document.body),
        Div({style: 'align-content: center; height:100svh;'},
            Div({style: 'align-content: center;'},
                H1({style: "color : #e2e8f0;",},
                    "Count : ",
                    Span({
                        style:       "color : #58f3e5;",
                        textContent: () => `${state.count}`
                    })
                ),
                H1({style: "color : #e2e8f0;",},
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
        )
    );
};