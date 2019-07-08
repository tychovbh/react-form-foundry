import React, {Component} from 'react'

const Input = (props) => <input {...props}/>

const NumberField = (props) => {
    const Type = props.type || Input

    return <Type {...props} onChange={(event) => props.onChange(event.target.value)} type={'number'}/>
}
const TextField = (props) => <input {...props} onChange={(event) => props.onChange(event.target.value)} type={'text'}/>
const TextAreaField = (props) => <textarea {...props} onChange={(event) => props.onChange(event.target.value)}/>
const FileField = (props) => <input {...props} onChange={(event) => props.onChange(event.target.files[0])} type={'file'}/>

export default class Form extends Component {
    constructor(props) {
        super(props)

        let model = {}
        const form = props.form

        form.fields.forEach((field) => {
            model[field.name] = ''
        })

        this.state = {model, form}
    }

    fields = {
        text: TextField,
        number: NumberField,
        textarea: TextAreaField,
        file: FileField,
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const {model} = this.state

        let formData  = new FormData()

        for (let name in model) {
            formData.append(name, model[name])
        }

        fetch(this.state.form.route, {
            method: 'post',
            body:  formData
        }).then((response) => {
            //
        });
    }

    render() {
        const {model, form} = this.state
        const {components} = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Titel: {form.label}</h3>
                    <p>Omschrijving: {form.description}</p>
                    {
                        form.fields.map((field, index) => {
                            const Field = this.fields[field.input.name]

                            return (
                                <label key={index}>
                                    {field.label}
                                    <Field onChange={(value) => {
                                        model[field.name] = value
                                        this.setState({model})
                                    }} placeholder={field.placeholder}/>
                                </label>
                            )
                        })
                    }
                    <input type={'submit'} value={'Submit'}/>
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
