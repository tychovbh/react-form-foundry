import React, {useState} from 'react'

const DefaultInput = (props) => <input {...props}/>
const DefaultTextarea = (props) => <textarea {...props}/>
const DefaultLabel = (props) => <label {...props}/>
const DefaultTitle = (props) => <h3 {...props}>{props.children}</h3>
const DefaultDescription = (props) => <h4 {...props}>{props.children}</h4>
const DefaultSelect = (props) => <select {...props}/>
const DefaultImage = (props) => <img {...props}/>
const DefaultError = (props) => <p {...props}>{props.children}</p>
const DefaultImageContainer = (props) => <div {...props}>{props.children}</div>

const component = (components, name) => {
    return components && components[name] ? components[name] : null
}

const option = (options, name) => {
    if (!options || !options[name]) {
        return {}
    }
    return options[name]
}

const InputField = ({field, component, onChange, id, state, error}) => {
    const Component = component || DefaultInput
    const properties = field.properties
    let additionalProps = {}

    if (properties.type !== 'file') {
        additionalProps.value = state
    }

    return (
        <div>
            <Component
                {...properties}
                {...additionalProps}
                error={error}
                onChange={(event) => {
                    if (properties.type === 'file') {
                        let file = event.target.files[0]
                        file.preview = window.URL.createObjectURL(file)
                        return onChange(file)
                    }

                    onChange(event.target.value)
                }}
                className={`form-generator-input-${properties.type}`}
                id={id}
            />
        </div>

    )
}

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

const SelectField = ({field, component, onChange, id, state, error}) => {
    const Component = component || DefaultSelect

    return <Component
        defaultValue={state}
        {...field.properties}
        error={error}
        id={id}
        onChange={(event) => onChange(event.target.value)}
    >
        {field.properties.options.map((option, index) => {
            return <option value={option.value} key={index}>{option.label}</option>
        })}
    </Component>
}

const Fields = {
    input: InputField,
    textarea: TextAreaField,
    select: SelectField,
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
            if (defaults && defaults[properties.name]) {
                fields[properties.name] = defaults[properties.name]
            }
        }
    })

    return fields
}

export const FormBuilder = (props) => {
    const {onSubmit, onResponse, children, form, defaults} = props
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
        }).then((response) => {
            if (onResponse) {
                onResponse(response, model)
            }
        })
    }

    let collection = []

    if (children) {
        collection = Array.isArray(children) ? children : [children]
    }

    return (
        <form onSubmit={onSubmit ? (event) => onSubmit(event, model) : submit}>
            {
                collection.map((child, index) =>
                    React.cloneElement(child, {...props, model, setModel, key: index}),
                )
            }
        </form>
    )
}

export const FormFields = ({form, components, model, setModel, defaults, errors, options}) => {
    const Label = component(components, 'label') || DefaultLabel
    const Error = component(components, 'error') || DefaultError
    const Image = component(components, 'image') || DefaultImage
    const ImageContainer = component(components, 'image_container') || DefaultImageContainer

    const getPreview = (field) => {
        const properties = field.properties
        if (model[properties.name] && model[properties.name].preview) {
            return model[properties.name].preview
        }

        if (defaults[properties.name] && !properties.multiple) {
            return defaults[properties.name]
        }

        return  ''
    }

    return (
        <React.Fragment>
            {
                form.fields.map((field, index) => {
                    const Field = Fields[field.element.name]
                    const properties = field.properties
                    const id = `form-generator-field-${properties.name}`
                    const preview = getPreview(field)
                    const error = errors && !!errors[properties.name]

                    return (
                        <div className={'form-generator-field'} key={index}>
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
                                component={component(components, field.element.name)}
                                onChange={(value) => {
                                    setModel({...model, [properties.name]: value})
                                }}/>
                            {
                                properties.type === 'file' &&
                                    <ImageContainer>
                                        {preview && <Image src={preview} alt={properties.alt}/>}
                                        {
                                            properties.multiple &&
                                            defaults[properties.name] &&
                                            <Image src={defaults[properties.name]} alt={properties.alt}/>
                                        }
                                    </ImageContainer>
                            }
                            {
                                error && errors[properties.name].map((error, index) =>
                                    <Error key={index}>{error}</Error>
                                )
                            }
                        </div>
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

export const FormSubmit = ({components}) => {
    const Submit = component(components, 'submit') || DefaultInput
    return <Submit type={'submit'} value={'Submit'}/>
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
