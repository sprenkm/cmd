const afbeeldingInput = document.querySelector("#bestand-input")
const knopAfbeeldingInput = document.querySelector("#bestand-knop")
const img = document.querySelector("#voorbeeld")
const bestandsnaam = document.querySelector("#bestandsnaam")
bestandsnaam.textContent = "Geen afbeelding geselecteerd..."

knopAfbeeldingInput.addEventListener("click", () => {
    afbeeldingInput.click()
})

function voorbeeldAfbeelding() {
    const bestand = afbeeldingInput.files[0]
    img.file = bestand
    img.src = URL.createObjectURL(bestand)
    img.style.width = "315px"
    bestandsnaam.textContent = `${bestand.name}`
}

afbeeldingInput.addEventListener("input", voorbeeldAfbeelding)