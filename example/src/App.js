import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Form from 'react-form-foundry'

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
    margin-bottom: 10px;
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

const Title = styled.h3`
    text-align: center;
    color: slategrey;
    text-transform: uppercase;
`

const Description = styled.h5`
    text-align: center;
    color: slategrey;
    text-transform: uppercase;
`

const Select = styled.select`
    border: 1px solid gray;
    border-radius: 4px;
    width: 100%;
    padding: 10px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    
    &::after {
      content: 'halo'
      //content: 'http://cdn.onlinewebfonts.com/svg/img_295694.svg';
    }
`

export default () => {
    const [form, setForm] = useState({
        name: 'cateogories',
        label: 'Categories',
        description: 'This is a very accurate description',
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
            },
            {
                element: {
                    name: 'select'
                },
                properties: {
                    name: 'company',
                    label: 'Company',
                    options: [
                        {
                            value: 1,
                            label: 'Google'
                        },
                        {
                            value: 2,
                            label: 'Microsoft'
                        },
                    ]
                },
            },
            {
                element: {
                    name: 'input'
                },
                properties: {
                    name: 'user_id',
                    type: 'hidden',
                    required: true,
                },
            },
        ]
    })

    return (
      <Container>
          {
              form.name &&
              <Form
                defaults={{
                    user_id: 1
                }}
                components={{
                    input: Input,
                    submit: Submit,
                    label: Label,
                    textarea: Textarea,
                    title: Title,
                    description: Description,
                    select: Select,
                }}
                form={form}
              />
          }
      </Container>
    )
}
