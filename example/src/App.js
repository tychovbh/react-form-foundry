import React, {Component} from 'react'

import Form from 'react-form-generator'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

export default class App extends Component {
    render() {
        return (
            <div>
              <Form
                    components={{
                        title: Title
                    }}
                    text='Modern React component module'/>
            </div>
        )
    }
}
