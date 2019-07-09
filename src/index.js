import React, {Component} from 'react'

const DefaultInput = (props) => <input {...props}/>
const DefaultTextarea = (props) => <textarea {...props}/>
const DefaultLabel = (props) => <label {...props}/>

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

export default class Form extends Component {
    constructor(props) {
        super(props)

        let model = {}
        const form = props.form

        form.fields.forEach((field) => {
            model[field.properties.name] = ''
        })

        this.state = {model, form}
    }

    fields = {
        input: InputField,
        textarea: TextAreaField,
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {model} = this.state

        let formData = new FormData()

        for (let name in model) {
            formData.append(name, model[name])
        }

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

        return (
          <div>
              <form onSubmit={this.handleSubmit}>
                  {form.label && <h3>{form.label}</h3>}
                  {form.description && <p>{form.description}</p>}
                  {
                      form.fields.map((field, index) => {
                          const Field = this.fields[field.element.name]
                          const id = `form-generator-field-${field.properties.name}`

                          return (
                            <div className={'form-generator-field'}>
                                {
                                    field.properties.label &&
                                    <Label for={id} key={index}>
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
          </div>
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
