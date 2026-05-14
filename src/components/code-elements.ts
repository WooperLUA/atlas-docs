import { Pre, Code } from 'atlas/dom';

declare const hljs: any;

export const CodeBlock = (code: string) => {
    const highlight = (el: HTMLElement) => {
        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(el);
        }
    };

    return Pre({}, 
        Code({ 
            textContent: code.trim(),
            onMount: highlight,
            onUpdate: highlight
        })
    );
};

export const InlineCode = (textContent: string) =>
    Code({ textContent });
