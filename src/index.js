import React, {Component} from 'react'

const DefaultInput = (props) => <input {...props}/>
const DefaultTextarea = (props) => <textarea {...props}/>
const DefaultLabel = (props) => <label {...props}/>
const DefaultTitle = (props) => <h3 {...props}>{props.children}</h3>
const DefaultDescription = (props) => <h4 {...props}>{props.children}</h4>
const DefaultSelect = (props) => <select {...props}/>


const InputField = ({field, component, onChange, id}) => {
    const Component = component || DefaultInput

    return <Component
        {...field.properties}
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

const TextAreaField = ({field, component, onChange, id}) => {
    const Component = component || DefaultTextarea

    return <Component
        {...field.properties}
        onChange={(event) => onChange(event.target.value)}
    />
}

const SelectField = ({field, component, onChange, id}) => {
    const Component = component || DefaultSelect

    return <Component
        {...field.properties}
        onChange={(event) => onChange(event.target.value)}
    >
        {field.properties.options.map((option, index) => {
            return <option key={index}>{option.label}</option>
        })}
    </Component>
}

export default class Form extends Component {
    constructor(props) {
        super(props)

        let model = {}
        const form = props.form

        form.fields.forEach((field) => {
            model[field.properties.name] = ''
            if (field.properties.default) {
                model[field.properties.name] = field.properties.default
            }
            if (props.defaults[field.properties.name]) {
                const value = props.defaults[field.properties.name]
                field.properties.default = value
                model[field.properties.name] = value
            }
        })

        this.state = {model, form}
    }

    fields = {
        input: InputField,
        textarea: TextAreaField,
        select: SelectField,
    }

    submit = (event) => {
        event.preventDefault()
        const {model} = this.state

        let formData = new FormData()

        for (let name in model) {
            formData.append(name, model[name])
        }

        console.log(model)

        fetch(this.state.form.route, {
            method: 'post',
            body: formData
        }).then((response) => {
            //
        })
    }

    component(name) {
        const {components} = this.props
        return components && components[name] ? components[name] : null
    }

    render() {
        const {model, form} = this.state
        const Submit = this.component('submit') || DefaultInput
        const Label = this.component('label') || DefaultLabel
        const Title = this.component('title') || DefaultTitle
        const Description = this.component('description') || DefaultDescription

        return (
            <form onSubmit={this.submit}>
                {form.label && <Title>{form.label}</Title>}
                {form.description && <Description>{form.description}</Description>}
                {
                    form.fields.map((field, index) => {
                        const Field = this.fields[field.element.name]
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
                                    component={this.component(field.element.name)}
                                    onChange={(value) => {
                                        model[field.properties.name] = value
                                        this.setState({model})
                                    }}/>
                            </div>
                        )
                    })
                }
                <Submit type={'submit'} value={'Submit'}/>
            </form>
        )
    }
}

// const Fields = {
//     text: TextField,
//     number: NumberField,
//     textarea: TextAreaField,
//     file: FileField,
// }
//
// export default ({form}) => {
//
//     const [model, setModel] = useState({})
//
//     /*  const handleSubmit = (event) => {
//           event.preventDefault()
//           const {model} = this.state
//
//           let formData  = new FormData()
//
//           for (let name in model) {
//               formData.append(name, model[name])
//           }
//
//           fetch(form.route, {
//               method: 'post',
//               body:  formData
//           }).then((response) => {
//               //
//           });
//       }*/
//
//
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <h3>Titel: {form.label}</h3>
//                 <p>Omschrijving: {form.description}</p>
//                 {
//                     form.fields.map((field, index) => {
//                         const Field = this.fields[field.input.name]
//
//                         return (
//                             <label key={index}>
//                                 {field.label}
//                                 <Field onChange={(value) => {
//                                     model[field.name] = value
//                                     setModel(model)
//                                 }} placeholder={field.placeholder}/>
//                             </label>
//                         )
//                     })
//                 }
//                 <input type={'submit'} value={'Submit'}/>
//             </form>
//         </div>
//     )
// }
