import React, {useState} from 'react'

const DefaultInput = (props) => <input {...props}/>
const DefaultTextarea = (props) => <textarea {...props}/>
const DefaultLabel = (props) => <label {...props}/>
const DefaultTitle = (props) => <h3 {...props}>{props.children}</h3>
const DefaultDescription = (props) => <h4 {...props}>{props.children}</h4>
const DefaultSelect = (props) => <select {...props}/>


const InputField = ({field, component, onChange, id, state}) => {
    const Component = component || DefaultInput

    return <Component
        {...field.properties}
        value={state}
        onChange={(event) => {
            if (field.properties.type === 'file') {
                return onChange(event.target.files[0])
            }

            onChange(event.target.value)
        }}
        className={`form-generator-input-${field.properties.type}`}
        id={id}
    />
}

const TextAreaField = ({field, component, onChange, id, state}) => {
    const Component = component || DefaultTextarea

    return <Component
        {...field.properties}
        value={state}
        id={id}
        onChange={(event) => onChange(event.target.value)}
    />
}

const SelectField = ({field, component, onChange, id, state}) => {
    const Component = component || DefaultSelect

    return <Component
        defaultValue={state}
        {...field.properties}
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
        fields[field.properties.name] = ''
        if (field.element.name === 'select' && field.properties.options.length) {
            fields[field.properties.name] = field.properties.options[0].value
        }
        if (field.properties.default) {
            fields[field.properties.name] = field.properties.default
        }
        if (defaults && defaults[field.properties.name]) {
            fields[field.properties.name] = defaults[field.properties.name]
        }
    })

    return fields
}

export default ({form, onSubmit, onResponse, components, defaults}) => {
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
            body: formData
        }).then((response) => {
            if (onResponse) {
                onResponse(response, model)
            }
        })
    }

    const component = (name) => {
        return components && components[name] ? components[name] : null
    }

    const Submit = component('submit') || DefaultInput
    const Label = component('label') || DefaultLabel
    const Title = component('title') || DefaultTitle
    const Description = component('description') || DefaultDescription

    return (
        <form onSubmit={onSubmit ? (event) => onSubmit(event, model) : submit}>
            {form.label && <Title>{form.label}</Title>}
            {form.description && <Description>{form.description}</Description>}
            {
                form.fields.map((field, index) => {
                    const Field = Fields[field.element.name]
                    const id = `form-generator-field-${field.properties.name}`

                    return (
                        <div className={'form-generator-field'} key={index}>
                            {
                                field.properties.label &&
                                <Label htmlFor={id}>
                                    {field.properties.label}
                                </Label>
                            }
                            <Field
                                id={id}
                                field={field}
                                state={model[field.properties.name]}
                                component={component(field.element.name)}
                                onChange={(value) => {
                                    setModel({...model, [field.properties.name]: value})
                                }}/>
                        </div>
                    )
                })
            }
            <Submit type={'submit'} value={'Submit'}/>
        </form>
    )
}
