import React, {useState} from 'react'
import styled from 'styled-components'
import Form, {FormBuilder, FormFields, FormSubmit, FormTitle, FormDescription} from 'react-form-foundry'

const Container = styled.div`
    max-width: 320px;
    margin: 2em auto;
    border-radius: 4px;
    border: 1px solid gray;
    padding: 2em;
`

const Input = styled.input`
    border: 1px solid ${props => props.error ? 'red' : 'gray'};
    border-radius: 4px;
    width: 100%;
    padding: 10px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 1em;
`

const Submit = styled(Input)`
    border-color: 1px solid ${props => props.error ? 'red' : 'green'};
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
    border: 1px solid ${props => props.error ? 'red' : 'gray'};
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
    color: ${props => props.error ? 'red' : 'initial'};
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
    border: 1px solid ${props => props.error ? 'red' : 'gray'};
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
`

const Image = styled.img`
    background: darkgrey;
    width: 100px;
    height: 100px;
`

const Error = styled.p`
     color: red; 
     font-size: 10px;
     text-align: center;
`

const ImageContainer = styled.div`
     border: 1px solid gray;
`

export default () => {
    const [form] = useState({
        name: 'cateogories',
        label: 'Categories',
        title: 'Awesome Title',
        description: 'Totally Accurate Form Description',
        fields: [
            {
                element: {
                    name: 'input'
                },
                properties: {
                    name: 'firstname',
                    type: 'text',
                    required: true,
                    label: 'First namee'
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
                    name: 'select'
                },
                properties: {
                    name: 'todo',
                    label: 'Todos',
                    options: [],
                    source: 'https://jsonplaceholder.typicode.com/todos',
                    label_key: 'title',
                    value_key: 'id',
                },
            },
            {
                element: {
                    name: 'input',
                },
                properties: {
                    name: 'image',
                    type: 'file',
                    label: 'Image',
                    multiple: true
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
            {
                element: {
                    name: 'input'
                },
                properties: {
                    id: 'landscape',
                    name: 'landscape',
                    label: 'Portrait',
                    type: 'radio',
                    value: 0,
                    required: true,
                },
            },
            {
                element: {
                    name: 'input'
                },
                properties: {
                    id: 'landscape',
                    name: 'landscape',
                    label: 'Landscape',
                    type: 'radio',
                    value: 1,
                    required: true,
                },
            },
        ]
    })

    return (
        <>
            <Container>
            <h1>Form</h1>
            {
                form.name &&
                <Form
                    onSubmit={(event, model) => {
                        event.preventDefault()
                        console.log(model)
                    }}
                    defaults={{
                        user_id: 1,
                        landscape: 1,
                        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/136102464-1557142812.jpg',
                    }}
                    errors={{
                        firstname: ['Firstname should be at least 2 characters long'],
                        surname: ['surname is required', 'surname should be 2 at least characters long'],
                    }}
                    request={{
                        headers: {'Authorization': 'Bearer {token}' }
                    }}
                    components={{
                        input: Input,
                        submit: Submit,
                        label: Label,
                        textarea: Textarea,
                        title: Title,
                        description: Description,
                        select: Select,
                        image: Image,
                        error: Error,
                        image_container: ImageContainer
                    }}
                    form={form}
                />
            }
            </Container>
            <Container>
            <h1>Form Builder</h1>
            <FormBuilder
                onSubmit={(event, model) => {
                    event.preventDefault()
                    console.log(model)
                }}
                defaults={{
                    user_id: 1,
                    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/136102464-1557142812.jpg',
                }}
                errors={{
                    firstname: ['Firstname should be at least 2 characters long'],
                    surname: ['surname is required', 'surname should be 2 at least characters long'],
                }}
                request={{
                    headers: {'Authorization': 'Bearer {token}' }
                }}
                components={{
                    input: Input,
                    submit: Submit,
                    label: Label,
                    textarea: Textarea,
                    title: Title,
                    description: Description,
                    select: Select,
                    image: Image,
                    error: Error,
                    image_container: ImageContainer
                }}
                form={form}
            >
                <FormTitle/>
                <FormDescription/>
                <p><strong>Before fields</strong></p>
                <FormFields/>
                <p><strong>After fields</strong></p>
                <FormSubmit/>
            </FormBuilder>
            </Container>
        </>
    )
}
