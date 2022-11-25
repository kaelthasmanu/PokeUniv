const container1 = document.querySelector(".container1")
const container2 = document.querySelector(".container2")


function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data)
        })
}

function createPokemon(pokemon) {
    const flipCard = document.createElement("div")
    flipCard.classList.add("flip-card")

    const cardContainer = document.createElement("div")
    cardContainer.classList.add("card")

    flipCard.appendChild(cardContainer)

    const card = document.createElement("div")
    //card.classList.add("pokemon-block")

    const spriteContainer = document.createElement("div")
    //spriteContainer.classList.add("img-container")

    const sprite = document.createElement("img")
    sprite.src = pokemon.sprites.other.dream_world.front_default

    spriteContainer.appendChild(sprite)

    const number = document.createElement("p")
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement("p")
    //name.classList.add("name")
    name.textContent = pokemon.name

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)

    const cardBack = document.createElement("div")
    cardBack.classList.add("pokemon-block-back")

    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)
    container1.appendChild(flipCard)
}
