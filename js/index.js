/*Querys Selectors*/ 
const pokemonContainer = document.querySelector(".pokemon-container")
const spinner = document.querySelector("#spinner")
const previous = document.querySelector("#previous")
const next = document.querySelector("#next")
const buttonNav = document.querySelector("#checkbox_toggle")

const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0',
    electric: '#F7D02C', grass: '#7AC74C', ice: '#96D9D6',
    fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65',
    flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC',
    dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD'
}

const statLabels = {
    'hp': 'HP', 'attack': 'ATK', 'defense': 'DEF',
    'special-attack': 'SP.ATK', 'special-defense': 'SP.DEF', 'speed': 'SPD'
}

/*Limits get pokemons*/ 
let limit = 12
let offset = 1

/*Events*/
buttonNav.addEventListener("click" ,() =>{
    const cb = document.querySelector('#checkbox_toggle');
    if(cb.checked){
        const downCards = document.querySelector(".pokemon-container")
        downCards.style.marginTop = "150px"
    }
    else{
        const downCards = document.querySelector(".pokemon-container")
        downCards.style.marginTop = "20px"
    }
})

previous.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 9
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset, limit)
    }
})

next.addEventListener("click", () => {
    offset += 9
    removeChildNodes(pokemonContainer)
    fetchPokemons(offset, limit)
})

/*request to api*/
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data)
            spinner.style.display = "none"
        })
        .catch((error) => {
            alert("Please check your connection to internet")
        })
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block"
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i)
    }
}


function createPokemon(pokemon) {
    const primaryType = pokemon.types[0].type.name
    const typeColor = typeColors[primaryType] || '#888'

    const flipCard = document.createElement("div")
    flipCard.classList.add("flip-card")
    flipCard.style.setProperty('--type-color', typeColor)

    const cardContainer = document.createElement("div")
    cardContainer.classList.add("card-container")
    flipCard.appendChild(cardContainer)

    // --- FRONT ---
    const card = document.createElement("div")
    card.classList.add("pokemon-block")

    const spriteContainer = document.createElement("div")
    spriteContainer.classList.add("img-container")

    const sprite = document.createElement("img")
    sprite.src = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default
    sprite.alt = pokemon.name
    spriteContainer.appendChild(sprite)

    const number = document.createElement("p")
    number.classList.add("pokemon-number")
    number.textContent = `#${pokemon.id.toString().padStart(3, '0')}`

    const name = document.createElement("p")
    name.classList.add("name")
    name.textContent = pokemon.name

    const typesContainer = document.createElement("div")
    pokemon.types.forEach(t => {
        const badge = document.createElement("span")
        badge.classList.add("type-badge")
        badge.textContent = t.type.name
        badge.style.backgroundColor = typeColors[t.type.name] || '#888'
        typesContainer.appendChild(badge)
    })

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)
    card.appendChild(typesContainer)

    // --- BACK ---
    const cardBack = document.createElement("div")
    cardBack.classList.add("pokemon-block-back")
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)
    pokemonContainer.appendChild(flipCard)
}

function progressBars(stats) {
    const statsContainer = document.createElement("div")
    statsContainer.classList.add("stats-container")

    for (let i = 0; i < 6; i++) {
        const stat = stats[i]
        const statPercent = Math.min((stat.base_stat / 200) * 100, 100) + "%"

        const statContainer = document.createElement("div")
        statContainer.classList.add("stat-container")

        const statName = document.createElement("p")
        statName.textContent = statLabels[stat.stat.name] || stat.stat.name

        const progress = document.createElement("div")
        progress.classList.add("progress")

        const progressBar = document.createElement("div")
        progressBar.classList.add("progress-bar")
        progressBar.setAttribute("aria-valuenow", stat.base_stat)
        progressBar.setAttribute("aria-valuemin", 0)
        progressBar.setAttribute("aria-valuemax", 200)
        progressBar.style.width = statPercent

        const statValue = document.createElement("span")
        statValue.classList.add("stat-value")
        statValue.textContent = stat.base_stat

        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)
        statContainer.appendChild(statValue)

        statsContainer.appendChild(statContainer)
    }

    return statsContainer
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

fetchPokemons(offset, limit)
