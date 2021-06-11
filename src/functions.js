export const component = (components, name) => {
    return components && components[name] ? components[name] : null
}

export const option = (options, name) => {
    if (!options || !options[name]) {
        return {}
    }
    return options[name]
}
