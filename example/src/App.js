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

const InputFileContainer = styled.div`
  position: relative;
    background-color: #f59e2b;
    color: white;
    border: 0;
    border-radius: 50px;
    width: 120px;
    margin: 1em auto;
    :hover {
        background-color: #CB7729;
    }
`

export const InputFileButton = styled(Input)`
    position: relative;
    margin: 0 auto;
    opacity: 0;
    width: 120px;
    height: 40px;
    z-index: 2;
`

export const InputFileText = styled.span`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 40px;
    text-align: center;
`

const InputFile = (props) => {
    return (
        <InputFileContainer>
            <InputFileButton {...props}/>
            <InputFileText>Upload</InputFileText>
        </InputFileContainer>
    )
}

export default () => {
    const [form] = useState({
        name: 'cateogories',
        label: 'Categories',
        title: 'Awesome Title',
        description: 'Totally Accurate Form Description',
        fields: [
            {
                element: {
                    name: 'input',
                },
                properties: {
                    name: 'firstname',
                    type: 'text',
                    required: true,
                    label: 'First name',
                },
            },
            {
                element: {
                    name: 'input',
                },
                properties: {
                    name: 'surname',
                    type: 'text',
                    required: true,
                    label: 'Surname',
                    autocomplete: 'off',
                },
            },
            {
                element: {
                    name: 'textarea',
                },
                properties: {
                    name: 'description',
                    label: 'Description',
                },
            },
            {
                element: {
                    name: 'select',
                },
                properties: {
                    name: 'company',
                    label: 'Company',
                    options: [
                        {
                            value: 1,
                            label: 'Google',
                        },
                        {
                            value: 2,
                            label: 'Microsoft',
                        },
                    ],
                },
            },
            {
                element: {
                    name: 'select',
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
                },
            },
            {
                element: {
                    name: 'input',
                },
                properties: {
                    name: 'images',
                    type: 'file',
                    label: 'Images',
                    multiple: true,
                },
            },
            {
                element: {
                    name: 'input',
                },
                properties: {
                    name: 'user_id',
                    type: 'hidden',
                    required: true,
                },
            },
            {
                element: {
                    name: 'input',
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
                    name: 'input',
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
            {
                element: {
                    name: 'wysiwyg',
                },
                properties: {
                    name: 'answer',
                    label: 'Answer',
                    config: {
                        toolbar: [ 'Heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'Link' ],
                        heading: {
                            options: [
                                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                            ]
                        }
                    },
                },
            },
        ],
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
                            images: [
                                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/136102464-1557142812.jpg',
                                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/136102464-1557142812.jpg'
                            ],
                            answer: '<p>My Answer</p>'
                        }}
                        errors={{
                            firstname: ['Firstname should be at least 2 characters long'],
                            surname: ['surname is required', 'surname should be 2 at least characters long'],
                        }}
                        request={{
                            headers: {'Authorization': 'Bearer {token}'},
                        }}
                        components={{
                            input: Input,
                            input_file: InputFile,
                            submit: Submit,
                            label: Label,
                            textarea: Textarea,
                            title: Title,
                            description: Description,
                            select: Select,
                            image: Image,
                            error: Error,
                            image_container: ImageContainer,
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
                    request={{
                        headers: {'Authorization': 'Bearer {token}'},
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
                        image_container: ImageContainer,
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
