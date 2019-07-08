import React from 'react'
export default (props) => <input {...props} onChange={(event) => props.onChange(event.target.value)} type={'number'}/>
