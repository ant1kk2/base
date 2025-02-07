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
  if (btn.previousElementSibling.value.trim() === "") return;
  headCell1.textContent = btn.previousElementSibling.value;
  const headCell2 = document.createElement("th");
  headCell2.className = "addprotmodal__th";
  const headCell3 = document.createElement("th");
  headCell3.className = "addprotmodal__th";
  headCell3.textContent = "Видалити";
  headCell3.addEventListener("click", (e) => deleteInfoRow(e, protTableHead));
  if (protTableHead.querySelectorAll(".addprotmodal__th").length === 2) {
    protTableHead.querySelector(".addprotmodal__tr").lastElementChild.remove();
    protTableHead
      .querySelector(".addprotmodal__tr")
      .append(headCell1, headCell2, headCell3);
    btn.previousElementSibling.value = "";
    return;
  }
  const headRow = document.createElement("tr");

  headRow.className = "addprotmodal__tr";
  protTableHead.querySelector(".addprotmodal__th").rowSpan = ++rowSpan;
  protTableHead.append(headRow);
  headRow.append(headCell1, headCell2, headCell3);
  btn.previousElementSibling.value = "";
}

export function addRepairType(btn) {
  if (btn.previousElementSibling.value.trim() === "") return;
  const repairTypeCell = document
    .querySelector(".addprotmodal__tbody")
    .querySelector(".addprotmodal__td");
  repairTypeCell.innerText = btn.previousElementSibling.value;
  btn.previousElementSibling.value = "";
}

function deleteInfoRow(e, head) {
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
    return;
  } else {
    e.target.parentElement.remove();
  }
}

let longOrderValue;
let longOrderCell;

export function addJob(btn) {
  const orderInput = btn.previousElementSibling.previousElementSibling;
  const jobInput = btn.previousElementSibling;
  const protTableBody = document.querySelector(".addprotmodal__tbody");
  if (orderInput.value.trim() === "" || jobInput.value.trim() === "") return;
  const jobRow = document.createElement("tr");
  jobRow.className = "addprotmodal__tr";
  const orderCell = document.createElement("td");
  const jobCell = document.createElement("td");
  const resultCell = document.createElement("td");
  const deleteCell = document.createElement("td");
  deleteCell.innerText = "Видалити";
  deleteCell.addEventListener("click", () => deleteJobRow(jobRow));
  [orderCell, jobCell, resultCell, deleteCell].forEach(
    (cell) => (cell.className = "addprotmodal__td")
  );

  const prevOrderCell = protTableBody.lastElementChild.firstElementChild;

  orderCell.innerText = orderInput.value;
  jobCell.innerText = jobInput.value;

  if (
    protTableBody.childElementCount > 1 &&
    prevOrderCell.innerText === orderInput.value &&
    !longOrderValue
  ) {
    longOrderValue = orderInput.value;
    longOrderCell =  prevOrderCell;
  }

  if (
    protTableBody.childElementCount > 1 &&
    longOrderCell?.innerText !== orderInput.value &&
    longOrderValue
  ) {
    longOrderValue = null;
    longOrderCell = null;
  }

  if (orderInput.value === longOrderValue) {
    longOrderCell.rowSpan += 1;
    [jobCell, resultCell, deleteCell].forEach((cell) =>
      cell.classList.add("longcell")
    );
    jobRow.append(jobCell, resultCell, deleteCell);
    protTableBody.append(jobRow);
    orderInput.value = "";
    jobInput.value = "";
    return;
  }
  jobRow.append(orderCell, jobCell, resultCell, deleteCell);
  protTableBody.append(jobRow);
  orderInput.value = "";
  jobInput.value = "";
}

function deleteJobRow(row) {
  if (row.firstElementChild.rowSpan > 1) {
    const firstCell = row.firstElementChild;
    const orderCell = document.createElement("td");
    orderCell.rowSpan = firstCell.rowSpan - 1;
    orderCell.innerText = firstCell.innerText;
    orderCell.className = "addprotmodal__td";
    longOrderCell = orderCell;
    for (const cell of row.nextElementSibling.children) {
      cell.classList.remove("longcell");
    }
    row.nextElementSibling.prepend(orderCell);
    row.remove();
    return;
  }
  
  row.remove();
}
