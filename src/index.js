import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const H1 = (props) => <h1 {...props}>{props.children}</h1>

export default class Form extends Component {
    static propTypes = {
        text: PropTypes.string
    }

    render() {
        const {text, components} = this.props

        const Title = components && components.title || H1

        return (
          <div className={styles.test}>
              <Title>{text}</Title>
          </div>
        )
    }
}
