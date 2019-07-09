import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Form from 'react-form-generator'

const Container = styled.div`
    max-width: 320px;
    margin: 2em auto;
    border-radius: 4px;
    border: 1px solid gray;
    padding: 2em;
`

const Input = styled.input`
    border: 1px solid gray;
    border-radius: 4px;
    width: 100%;
    padding: 10px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 1em;
`

const Submit = styled(Input)`
    border-color: green;,
    font-weight: bold;
    color: green;
    max-width: 150px;
    display: block;
    margin: 2em auto 0;
    
    :hover {
        color: lightgreen;
        border-color: lightgreen;
    }
`

const Textarea = styled.textarea`
    border: 1px solid gray;
    border-radius: 4px;
    width: 100%;
    padding: 10px 10px;
    min-height: 100px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    resize: none;
`

const Label = styled.label`
    margin-bottom: 5px;
    display: block;
`

export default () => {
    const [form, setForm] = useState({
        name: 'Cateogories',
        fields: [
            {
                element: {
                    name: 'input'
                },
                properties: {
                    name: 'firstname',
                    type: 'text',
                    required: true,
                    label: 'First name'
                },
            },
            {
                element: {
                    name: 'input'
                },
                properties: {
                    name: 'surname',
                    type: 'text',
                    required: true,
                    label: 'Surname'
                },
            },
            {
                element: {
                    name: 'textarea'
                },
                properties: {
                    name: 'description',
                    label: 'Description'
                },
            }
        ]
    })

    useEffect(() => {
        if (!form.name) {
            fetch('http://local.bureausterk.api/categories/create').then((response) => {
                return response.json()
            }).then((json) => {
                setForm(json.data)
            })
        }

    })

    return (
      <Container>
          {
              form.name &&
              <Form
                components={{
                    input: Input,
                    submit: Submit,
                    label: Label,
                    textarea: Textarea
                }}
                form={form}
              />
          }
      </Container>
    )
}
