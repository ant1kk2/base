import instructions from "./library.js";
import { openInstructionModal } from "./modalController.js";

const table = document.querySelector(".table")
const tableBody = table.querySelector("tbody")

export function createFilteredRows(instruction) {
  tableBody.innerHTML = ""
  instruction?.forEach(instruction => {
    const instructionRow = document.createElement("tr")
    instructionRow.className = "table__instruction"
    const numberCell = document.createElement("td")
    numberCell.className = "table__instruction-number"
    numberCell.textContent = instruction.number
    const nameCell = document.createElement("td")
    nameCell.className = "table__instruction-name"
    nameCell.textContent = instruction.title
    const dateCell = document.createElement("td")
    dateCell.className = "table__instruction-date"
    dateCell.textContent = instruction.date
    instructionRow.appendChild(numberCell)
    instructionRow.appendChild(nameCell)
    instructionRow.appendChild(dateCell)
    tableBody.appendChild(instructionRow)
    instructionRow.addEventListener("dblclick", () => {
      openInstructionModal(instruction)
    })
  })

}

export function filterInstructions(unit, unitname) {
  const filteredInstructions = instructions.filter(instruction => instruction[unit] === unitname)
  createFilteredRows(filteredInstructions)
  return filteredInstructions
}