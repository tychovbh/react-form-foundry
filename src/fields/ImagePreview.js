import React from 'react'

const DefaultImageContainer = (props) => <div {...props}>{props.children}</div>
const DefaultImage = (props) => <img {...props}/>

function uploads(uploaded, multiple) {
    let uploads = []
    if (uploaded && (uploaded.length || uploaded.preview)) {
        uploads = multiple ? uploaded : [uploaded]
    }
    return uploads.map((upload) => {
        return upload.preview
    })
}

export default ({Image, Container, defaults, uploaded, multiple}) => {
    const TheImage = Image || DefaultImage
    const ImageContainer = Container || DefaultImageContainer

    let images = []

    if (defaults && defaults.length) {
        images = multiple ? defaults : [defaults]
    }

    return (
        <ImageContainer>
            {
                Boolean(images.length) &&
                images.concat(uploads(uploaded, multiple)).map((image, index) =>
                <TheImage key={index} src={image}/>)
            }
        </ImageContainer>
    )
}
