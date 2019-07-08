import React from 'react'
export default (props) => <input {...props} onChange={(event) => console.log(event)} type={'file'}/>
