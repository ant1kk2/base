import instructions from "./library.js";
import {
  closeAddInstructionModal,
  openAddProtModal,
} from "./modalController.js";

export function addInstruction() {
  const addInstructionForm = document.querySelector(".addmodal__form");
  const department = addInstructionForm.querySelector("#department").value;
  const sector = addInstructionForm.querySelector("#sector").value;
  const developer = addInstructionForm.querySelector("#developer").value;
  const number = addInstructionForm.querySelector("#instructionNum").value;
  const name = addInstructionForm.querySelector("#instructionName").value;
  const date = addInstructionForm.querySelector("#instructionDate");
  const formattedDate = date.value.split("-").reverse().join(".");
  instructions.push({
    developer: developer,
    sector: sector,
    department: department,
    number: number,
    title: name,
    date: formattedDate,
    iPathWord: `./base/${name}/${name}.doc`,
  });
  closeAddInstructionModal();
  openAddProtModal();
  const cellInstNum = document.querySelector(".addprotmodal__th");
  cellInstNum.innerText = `№ пункту ${number}`;
}

let rowSpan = 1;

export function addProtInfo(btn) {
  const protTableHead = document.querySelector(".addprotmodal__thead");
  const headCell1 = document.createElement("th");
  headCell1.className = "addprotmodal__th";
  if (btn.nextElementSibling.value.trim() === "") return;
  headCell1.textContent = btn.nextElementSibling.value;
  const headCell2 = document.createElement("th");
  headCell2.className = "addprotmodal__th";
  const headCell3 = document.createElement("th");
  headCell3.className = "addprotmodal__th";
  headCell3.textContent = "Видалити";
  headCell3.addEventListener("click", (e) => {
    deleteRow(e, protTableHead);
  });
  if (protTableHead.querySelectorAll(".addprotmodal__th").length === 2) {
    protTableHead.querySelector(".addprotmodal__tr").lastElementChild.remove();
    protTableHead
      .querySelector(".addprotmodal__tr")
      .append(headCell1, headCell2, headCell3);
    btn.nextElementSibling.value = "";
    return;
  }
  const headRow = document.createElement("tr");

  headRow.className = "addprotmodal__tr";
  protTableHead.querySelector(".addprotmodal__th").rowSpan = ++rowSpan;
  protTableHead.append(headRow);
  headRow.append(headCell1, headCell2, headCell3);
  btn.nextElementSibling.value = "";
}

export function addRepairType(btn) {
  if (btn.nextElementSibling.value.trim() === "") return;
  const repairTypeCell = document
    .querySelector(".addprotmodal__tbody")
    .querySelector(".addprotmodal__td");
  repairTypeCell.innerText = btn.nextElementSibling.value;
  btn.nextElementSibling.value = "";
}

function deleteRow(e, head) {
  const mainCellValue = head.querySelector(".addprotmodal__th").innerText;
  const firstRow = head.querySelector(".addprotmodal__tr");
  if (head.childElementCount === 1) {
    head.innerHTML = `
      <tr class="addprotmodal__tr">
          <th class="addprotmodal__th">${mainCellValue}</th>
          <th class="addprotmodal__th" colspan="2"></th>
      </tr>
    `;
    rowSpan = 1;
    return;
  }
  if (firstRow.contains(e.target)) {
    const newMainCell = document.createElement("th");
    newMainCell.rowSpan = --rowSpan;
    newMainCell.className = "addprotmodal__th";
    newMainCell.innerText = mainCellValue;
    firstRow.nextElementSibling.prepend(newMainCell);
    firstRow.remove();
    return
  } else {
    e.target.parentElement.remove()
  }
}
