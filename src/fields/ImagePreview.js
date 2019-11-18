import React from 'react'

const DefaultImageContainer = (props) => <div {...props}>{props.children}</div>
const DefaultImage = (props) => <img {...props}/>

function uploads(uploaded, multiple) {
    let uploads = []
    if (uploaded && (uploaded.length || uploaded.preview)) {
        uploads = multiple ? uploaded : [uploaded]
    }
    return uploads.map((upload) => {
        return checkFileType(upload) ? upload.preview : null
    })
}

export function checkFileType(upload) {
    const types_allowed = ['jpg', 'jpeg', 'png', 'svg']
    let allowed = false

    for (var type of types_allowed) {
        if (upload.type.includes('image/' + type)) {
            allowed = true
        }
    }
    return allowed
}

export default ({Image, Container, defaults, uploaded, multiple}) => {
    const TheImage = Image || DefaultImage
    const ImageContainer = Container || DefaultImageContainer

    let images = []

    if (defaults && defaults.length) {
        images = multiple ? defaults : [defaults]
    }

    images = images.concat(uploads(uploaded, multiple))

    return (
        <ImageContainer>
            {
                Boolean(images.length) && images.map((image, index) => {
                    return image ? <TheImage key={index} src={image}/> : ''
                })
            }
        </ImageContainer>
    )
}
