const container1 = document.querySelector(".container1")
const container2 = document.querySelector(".container2")


function fetchPokemon(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data)
        })
        .catch((error) => {
            alert("The pokemon was not found, please write the name correctly or u not have connection to internet")
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
    stats(pokemon.stats)

    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)
    container1.appendChild(flipCard)
    container2.appendChild(stats(pokemon.stats))
}



function stats(stats) {
    const statsContainer = document.createElement("div")
    statsContainer.classList.add("stats-container")

    for (let i = 0; i < 6; i++) {
        const stat = stats[i]
        
        const statContainer = document.createElement("stat-container")
        statContainer.classList.add("stat-container")

        const statName = document.createElement("p")
        statName.textContent = stat.stat.name

        const progress = document.createElement("div")
        progress.classList.add("progress")

        const progressBar = document.createElement("div")
        progressBar.classList.add("progress-bar")

        progressBar.textContent = stat.base_stat

        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)

        statsContainer.appendChild(statContainer)

    }

    return statsContainer
    
}


function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}