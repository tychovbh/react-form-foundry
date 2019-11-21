import React from 'react'

const DefaultInput = (props) => <input {...props}/>

export default ({field, component, onChange, id, state, error}) => {
    const Component = component || DefaultInput
    const properties = field.properties
    let additionalProps = {}

    if (properties.type !== 'file' && properties.type !== 'radio') {
        additionalProps.value = state || ''
    }

    if (properties.type === 'radio' && state === properties.value) {
        additionalProps.checked = 'checked'
    }

    if (properties.autocomplete) {
        additionalProps.autoComplete = properties.autocomplete
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

                        if (file.type.includes('image/')) {
                            file.preview = window.URL.createObjectURL(file)
                        }

                        return onChange(file, field.properties.multiple)
                    }

                    onChange(event.target.value)
                }}
                className={`form-generator-input-${properties.type}`}
                id={id}
            />
        </div>

    )
}
