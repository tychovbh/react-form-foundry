import React, {useState, useEffect} from 'react'

import Form from 'react-form-generator'

export default () => {
    const [form, setForm] = useState({})

    useEffect(() => {
        if (!form.name) {
            fetch('http://local.bureausterk.api/categories/create').then((response) => {
                return response.json()
            }).then((json) => {
                setForm(json.data)
            })
        }

    });

    return (
        <div>
            {form.name && <Form form={form}/>}
        </div>
    )
}
