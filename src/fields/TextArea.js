import React from 'react'
export default (props) => <textarea {...props} onChange={(event) => props.onChange(event.target.value)}/>
