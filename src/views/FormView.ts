import { Section, H1, P, H2, Ul, Li, Strong, Div } from 'atlas-web/dom';
import { Layout } from '../components/layout';
import { CodeBlock } from '../components/code-elements';

export const FormView = () => Layout(
    Section({},
        H1({ textContent: '📝 Form Management (atlas-web/form)' }),
        P({ textContent: 'The `atlas-web/form` module provides `uForm`, a lightweight, reactive form state manager. It handles values, validation rules, dirty tracking, and async submission states with zero boilerplate.' }),

        H2({ textContent: 'Defining a Form' }),
        P({ textContent: 'Forms are defined using a configuration map. Each field specifies its initial `value` and an optional validation `rule` (or array of rules).' }),
        CodeBlock(`
import { uForm } from 'atlas-web/form';

const { values, onChange, meta, submit, reset } = uForm({
    email: {
        value: '',
        rules: [
            (v) => !v ? 'Email is required' : null,
            (v) => !v.includes('@') ? 'Invalid email format' : null
        ]
    },
    password: {
        value: '',
        rules: (v) => v.length < 8 ? 'Password must be at least 8 characters' : null
    }
});
        `),

        H2({ textContent: 'Explicit Reactive Bindings' }),
        P({ textContent: 'Atlas favors explicit bindings. Use `values` to read the state reactively and `onChange` to generate event handlers.' }),
        CodeBlock(`
import { Input, Label, Span, _If } from 'atlas-web/dom';

// Email Field
Label({ textContent: 'Email' }),
Input({ 
    type: 'email', 
    value: () => values.email, 
    onInput: onChange('email') 
}),
_If(() => !!meta.errors.email, 
    Span({ className: 'error', textContent: () => meta.errors.email })
)
        `),

        H2({ textContent: 'Handling Submissions & Meta State' }),
        P({ textContent: 'The `meta` object contains reactive flags for the form\'s lifecycle: `isValid`, `isDirty`, and `isSubmitting`. The `submit` method automatically validates the form, prevents submission if invalid, and manages the loading state.' }),
        CodeBlock(`
import { Button } from 'atlas-web/dom';

Button({
    textContent: () => meta.isSubmitting ? 'Logging in...' : 'Login',
    // Perfectly reactive: disables automatically if invalid or submitting
    disabled: () => meta.isSubmitting || !meta.isValid, 
    onClick: () => submit(async (vals) => {
        await api.login(vals);
    })
})
        `),

        H2({ textContent: 'Cross-Field Validation' }),
        P({ textContent: 'Validation rules receive the current field value as the first argument, and the entire reactive `values` proxy as the second argument. This makes cross-field validation trivial.' }),
        CodeBlock(`
const { values, onChange, meta } = uForm({
    password: {
        value: '',
        rules: (v) => v.length < 8 ? 'Too short' : null
    },
    confirmPassword: {
        value: '',
        // 'all' is the reactive proxy of all form values
        rules: (v, all) => v !== all.password ? 'Passwords do not match' : null 
    }
});
        `),

        H2({ textContent: 'Resetting the Form' }),
        P({ textContent: 'You can easily reset all fields, clear errors, and reset meta flags back to their initial state using the `reset` method.' }),
        CodeBlock(`
Button({
    textContent: 'Reset Form',
    onClick: () => reset()
})
        `),
    )
);