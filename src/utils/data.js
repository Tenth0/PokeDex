export const getAllPokemon = (url) => {
    return new Promise((resolve) => {
        fetch(url).then((res) => res.json())
        .then((data) => resolve(data))
    })
}

export const getPoke = (url) => {
    return new Promise((resolve) => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
    })
}