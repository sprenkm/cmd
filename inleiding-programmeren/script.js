console.log("aaaaaaaaaaaaaa")

// Naam wijzigen

const naam = document.querySelector("span")
const input = document.querySelector("input[name='name']")
const btnWijzig = document.getElementById("naam-wijzigen")
const btnBevestig = document.getElementById("naam-bevestigen")

// Zodra je op de wijzigknop klikt, worden de input en de bevestigingsknop getoond
function wijzigNaam() {
    naam.classList.add("onzichtbaar")
    btnWijzig.classList.add("onzichtbaar")

    input.classList.remove("onzichtbaar")
    btnBevestig.classList.remove("onzichtbaar")

    input.focus()
    input.select() 
}

// De waarde van de input wordt als nieuwe naam gebruikt
function bevestigNaam() {
    const nieuweNaam = input.value
    naam.textContent = `${nieuweNaam}`

    input.classList.add("onzichtbaar")
    btnBevestig.classList.add("onzichtbaar")

    naam.classList.remove("onzichtbaar")
    btnWijzig.classList.remove("onzichtbaar")
}

btnWijzig.addEventListener("click", wijzigNaam)
btnBevestig.addEventListener("click", bevestigNaam)

// Kledingstukken aanmaken

class Kledingstukken {
    constructor(id, alt, src) {
        this.id = id
        this.alt = alt
        this.src = src
    }

    aanmaken() {
        const afbeelding = new Image()
        afbeelding.id = this.id
        afbeelding.alt = this.alt
        afbeelding.src = this.src
        afbeelding.setAttribute("draggable", "false")
        afbeelding.style.position = "absolute"
        afbeelding.style.translate = this.berekenen()
        afbeelding.style.zIndex = 2
        afbeelding.style.cursor = "move"
        document.getElementById("kleding").insertAdjacentElement("afterbegin", afbeelding)
    }

    // Ieder kledingstuk krijgt een willekeurige positie toegekend
    berekenen() {
        const x = Math.floor(Math.random()*70)
        const y = Math.floor(Math.random()*70)
        return `${x}vw ${y}vh`
    }
}

const kledingstukBolhoed = new Kledingstukken("bolhoed", "Een lichtblauwe bolhoed", "afbeeldingen/bolhoed.png")
kledingstukBolhoed.aanmaken()

const kledingstukZonnebril = new Kledingstukken("zonnebril", "Een paarse zonnebril", "afbeeldingen/zonnebril.png")
kledingstukZonnebril.aanmaken()

const kledingstukMicrofoon = new Kledingstukken("microfoon", "Een gele microfoon", "afbeeldingen/microfoon.png")
kledingstukMicrofoon.aanmaken()

const kledingstukRok = new Kledingstukken("rok", "Een oranje rok", "afbeeldingen/rok.png")
kledingstukRok.aanmaken()

const btnAfspelen = document.getElementById("afspelen")
const audioBestanden = ["https://upload.wikimedia.org/wikipedia/commons/0/0c/Meow_domestic_cat.ogg", "https://upload.wikimedia.org/wikipedia/commons/2/21/Mysterykilled.wav", "https://upload.wikimedia.org/wikipedia/commons/0/0d/Shoot2.wav"]

// Kledingstukken verplaatsen

// Met behulp van "page" en "offset" wordt de nieuwe positie van het kledingstuk berekend
let pageXmove = null
let pageYmove = null

let pageX = null
let pageY = null

document.onmousemove = (e) => {
	pageXmove = `${e.pageX}`
	pageYmove = `${e.pageY}`
}

document.onmouseup = (e) => {
	pageX = `${e.pageX}`
	pageY = `${e.pageY}`
}

let offsetX = null
let offsetY = null

let positieX = null
let positieY = null

let kledingstuk = null

function offset(e) {
    offsetX = `${e.offsetX}`
    offsetY = `${e.offsetY}`
    kledingstuk = e.target
    document.addEventListener("mousemove", verplaatsen)
}

// Zodra de cursor beweegt, beweegt het kledingstuk mee
function verplaatsen() {
    positieX = pageXmove - offsetX
    positieY = pageYmove - offsetY
    kledingstuk.style.translate = `${positieX}px ${positieY}px`
    document.addEventListener("mouseup", neerleggen)

    // De microfoon biedt hierna een extra functie (en hier een mager voorbeeld van if/else...)
    if (kledingstuk == microfoon) {
        const x = positieX + 30
        const y = positieY - 80
        btnAfspelen.style.translate = `${x}px ${y}px`
    }
}

// Wanneer je het kledingstuk loslaat, blijft het op deze positie staan
function neerleggen() {
    positieX = pageX - offsetX
    positieY = pageY - offsetY
    kledingstuk.style.translate = `${positieX}px ${positieY}px`
    document.removeEventListener("mousemove", verplaatsen)
    document.removeEventListener("mouseup", neerleggen)

    if (kledingstuk == microfoon) {
        const x = positieX + 30
        const y = positieY - 80
        btnAfspelen.classList.remove("onzichtbaar")
        btnAfspelen.style.translate = `${x}px ${y}px`
        btnAfspelen.addEventListener("click", function() {
            const random = Math.floor(Math.random()*3)
            const audio = new Audio(audioBestanden[random])
            audio.play()
        })
    }
}

const bolhoed = document.getElementById("bolhoed")
const zonnebril = document.getElementById("zonnebril")
const microfoon = document.getElementById("microfoon")
const rok = document.getElementById("rok")

bolhoed.addEventListener("mousedown", offset)
zonnebril.addEventListener("mousedown", offset)
microfoon.addEventListener("mousedown", offset)
rok.addEventListener("mousedown", offset)

// Wijzigingen ongedaan maken

const btnReset = document.getElementById("reset")

btnReset.addEventListener("click", function() {
    location.reload() 
    // *insert evil laughter*
})
