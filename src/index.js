import React, {useState, useEffect} from 'react'
import {InputField} from './fields'
import {ImagePreview} from './fields'
import {component} from './functions'
const isServer = typeof window === 'undefined'
const CKEditor = isServer ? null : require('@ckeditor/ckeditor5-react')
const ClassicEditor = isServer ? null : require('@ckeditor/ckeditor5-build-classic')
const DefaultTextarea = (props) => <textarea {...props}/>
const DefaultLabel = (props) => <label {...props}/>
const DefaultTitle = (props) => <h3 {...props}>{props.children}</h3>
const DefaultDescription = (props) => <h4 {...props}>{props.children}</h4>
const DefaultSelect = (props) => <select {...props}/>
const DefaultError = (props) => <p {...props}>{props.children}</p>
const DefaultField = ({children}) => <div className={'form-generator-field'}>{children}</div>
const DefaultInput = (props) => <input {...props}/>

const TextAreaField = ({field, component, onChange, id, state, error}) => {
    const Component = component || DefaultTextarea

    return <Component
        {...field.properties}
        defaultValue={state}
        error={error}
        id={id}
        onChange={(event) => onChange(event.target.value)}
    />
}

const SelectField = ({field, component, onChange, id, state, error, request}) => {
    const Component = component || DefaultSelect
    const properties = field.properties
    const [options, setOptions] = useState(properties.options)

    useEffect(() => {
        if (properties.source) {
            fetch(properties.source, {
                headers: request.headers,
            })
                .then(response => response.json())
                .then(json => {

                    setOptions(properties.data_key ? json[properties.data_key] : json)
                })
        }
    }, [])

    const label_key = properties.label_key || 'label'
    const value_key = properties.value_key || 'value'

    return <Component
        defaultValue={state}
        {...properties}
        error={error}
        id={id}
        options={options}
        onChange={(event) => onChange(event.target.value)}
    >
        {Array.isArray(options) && options.map((option, index) => {
            return <option value={option[value_key]} key={index}>{option[label_key]}</option>
        })}
    </Component>
}

const Wysiwyg = ({state, field, onChange}) => {
    const config = field.properties.config || {}

    return (
        <CKEditor
            editor={ClassicEditor}
            data={state}
            config={config}
            onChange={(event, editor) => {
                onChange(editor.getData())
            }}
        />
    )
}

const Search = ({field, component, onChange, id, state, error}) => {
    // TODO implement own search component
    const Component = component
    const properties = field.properties

    return <Component
        defaultValue={state}
        {...properties}
        error={error}
        id={id}
        onChange={(event) => onChange(event.target.value)}
    />
}

const Fields = {
    input: InputField,
    textarea: TextAreaField,
    select: SelectField,
    wysiwyg: Wysiwyg,
    search: Search
}

const fields = (form, defaults) => {
    const fields = {}
    form.fields.forEach((field) => {
        const properties = field.properties
        if (properties.type !== 'file') {
            fields[properties.name] = ''
            if (field.element.name === 'select' && properties.options.length) {
                fields[properties.name] = properties.options[0].value
            }
            if (properties.default) {
                fields[properties.name] = properties.default
            }
            if (defaults && defaults[properties.name] !== undefined) {
                fields[properties.name] = defaults[properties.name]
            }
        }
    })

    return fields
}

export const FormBuilder = (props) => {
    const {onSubmit, onResponse, form, defaults, request, components, errors} = props
    const [model, setModel] = useState(fields(form, defaults))
    const submit = (event) => {
        event.preventDefault()
        let formData = new FormData()

        for (let name in model) {
            if (model.hasOwnProperty(name)) {
                formData.append(name, model[name])
            }
        }

        fetch(form.route, {
            method: 'post',
            body: formData,
            headers: request ? request.headers || {} : {},
        }).then((response) => {
            if (onResponse) {
                onResponse(response, model)
            }
        })
    }

    const children = React.Children.map(props.children, (child, index) =>
        React.cloneElement(child, {
            index,
            form,
            components,
            model,
            setModel,
            defaults,
            errors,
            request,
        }),
    )
    return (
        <form onSubmit={onSubmit ? (event) => onSubmit(event, model) : submit}>
            {children}
        </form>
    )
}

export const FormFields = ({form, components, model, setModel, defaults, errors, request}) => {
    const Label = component(components, 'label') || DefaultLabel
    const Error = component(components, 'error') || DefaultError
    const FormField = component(components, 'field') || DefaultField

    return (
        <React.Fragment>
            {
                form.fields.map((field, index) => {
                    const Field = Fields[field.element.name]
                    const properties = field.properties
                    const id = properties.id || `form-generator-field-${properties.name}`
                    const error = errors && !!errors[properties.name]

                    return (
                        <FormField key={index}>
                            {
                                properties.label &&
                                <Label error={error} htmlFor={id}>
                                    {properties.label}
                                </Label>
                            }
                            <Field
                                id={id}
                                field={field}
                                state={model[properties.name]}
                                error={error}
                                request={request || {}}
                                components={components}
                                model={model}
                                component={component(components, properties.type === 'file' ? 'input_file' : field.element.name)}
                                onChange={(value, append = false) => {
                                    if (append) {
                                        let collection = model[properties.name] || []
                                        // TODO fix the real problem why is the onChange listener being triggered twice?
                                        if (!collection.includes(value)) {
                                            collection.push(value)
                                        }
                                        value = collection
                                    }
                                    setModel({...model, [properties.name]: value})
                                }}
                            />
                            {
                                error && errors[properties.name].map((error, index) =>
                                    <Error key={index}>{error}</Error>,
                                )
                            }
                        </FormField>
                    )
                })
            }
        </React.Fragment>
    )
}

export const FormTitle = ({form, components}) => {
    const Title = component(components, 'title') || DefaultTitle
    return <Title>{form.title}</Title>
}

export const FormDescription = ({form, components}) => {
    const Description = component(components, 'description') || DefaultDescription
    return <Description>{form.description}</Description>
}

export const FormSubmit = ({components, value, onClick}) => {
    const Submit = component(components, 'submit') || DefaultInput
    return <Submit type={'submit'} value={value || 'Submit'} onClick={onClick}/>
}

const Form = (props) => {
    return (
        <FormBuilder {...props}>
            <FormTitle/>
            <FormDescription/>
            <FormFields/>
            <FormSubmit/>
        </FormBuilder>
    )
}

export default Form
