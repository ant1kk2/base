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
  if (btn.previousElementSibling.value.trim() === "") return;
  headCell1.textContent = btn.previousElementSibling.value;
  const headCell2 = document.createElement("th");
  const headCell3 = document.createElement("th");

  [headCell1, headCell2, headCell3].forEach(cell => cell.className = "addprotmodal__th longcell")

  headCell3.textContent = "Видалити";
  headCell3.classList.add("addprotmodal__del-btn")
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

  deleteCell.classList.add("addprotmodal__del-btn")

  let prevOrderCell
  let prevRow = protTableBody.lastElementChild;
  while (prevRow) {
    if (prevRow.childElementCount === 4) {
      prevOrderCell = prevRow.firstElementChild
      break
    }
    prevRow = prevRow.previousElementSibling
  }

  orderCell.innerText = orderInput.value;
  jobCell.innerText = jobInput.value;

  if (orderInput.value === prevOrderCell?.innerText) {
    prevOrderCell.rowSpan += 1;
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
    for (const cell of row.nextElementSibling.children) {
      cell.classList.remove("longcell");
    }
    row.nextElementSibling.prepend(orderCell);
  }
  if (row.childElementCount === 3) {
    let sibling = row.previousElementSibling;
    while (sibling) {
      if (sibling.firstElementChild.rowSpan > 1) {
        sibling.firstElementChild.rowSpan -= 1
        break
      }
      sibling = sibling.previousElementSibling
    }
  }
  row.remove();

  const rows = document.querySelectorAll(".addprotmodal__tr")
  const longRows = [...rows].filter(row => row.childElementCount === 4)
  if (longRows.length > 1) {
    for (let i = 0; i < longRows.length - 1; i++) {
      const row = longRows[i];
      const nextRow = longRows[i + 1];
      if (row.firstElementChild.innerText === nextRow.firstElementChild.innerText) {
        row.firstElementChild.rowSpan += nextRow.firstElementChild.rowSpan;
        [...nextRow.children].forEach(cell => {
          cell.classList.add("longcell")
        })
        nextRow.firstElementChild.remove();
        break
      }
    }
  }
}

export function addExtraInfo(btn) {
  if (btn.previousElementSibling.value.trim() === "") return;

  const protTable = document.querySelector(".addprotmodal__table")
  const protTableFooter = document.querySelector(".addprotmodal__tfoot")
  protTable.append(protTableFooter);

  const footerRow = document.createElement("tr");
  footerRow.className = "addprotmodal__tr";
  const emptyCell = document.createElement("td");
  const genCell = document.createElement("td");
  const resultCell = document.createElement("td");

  const deleteCell = document.createElement("td");
  deleteCell.textContent = "Видалити";
  deleteCell.addEventListener("click", (e) => deleteExtraInfoRow(e));

  [emptyCell, genCell, resultCell, deleteCell].forEach(cell => cell.className = "addprotmodal__td")
  deleteCell.classList.add("addprotmodal__del-btn");
  genCell.textContent = btn.previousElementSibling.value;
  btn.previousElementSibling.value = "";

  if (protTableFooter.firstElementChild) {
    const exmptyCell = protTableFooter.firstElementChild.firstElementChild
    exmptyCell.rowSpan += 1;

    [genCell, resultCell, deleteCell].forEach((cell) =>
      cell.classList.add("longcell")
    );
    footerRow.append(genCell, resultCell, deleteCell);
    protTableFooter.append(footerRow);
    return;
  }
  protTableFooter.append(footerRow);

  footerRow.append(emptyCell, genCell, resultCell, deleteCell);
}

function deleteExtraInfoRow(e) {
  const protTableFooter = document.querySelector(".addprotmodal__tfoot")
  const firstFooterRow = protTableFooter.firstChild
  const rowSpan = firstFooterRow.firstChild.rowSpan

  if (protTableFooter.childElementCount === 1) {
    protTableFooter.innerHTML = ``;
    return;
  }
  if (firstFooterRow.contains(e.target)) {
    const newEmptyCell = document.createElement("td");
    newEmptyCell.rowSpan = rowSpan - 1;
    newEmptyCell.className = "addprotmodal__td";
    firstFooterRow.nextElementSibling.prepend(newEmptyCell);
    firstFooterRow.remove();
    return;
  } else {
    e.target.parentElement.remove();
  }
}

export function addZvt() {
  const protForm = document.querySelector('.addprotmodal__form');
  const zvtTable = document.querySelector('.addprotmodal__zvt-table');
  if (!zvtTable) {
    const zvtText = document.createElement("p");
    zvtText.className = "addprotmodal__zvt-text";
    zvtText.innerText = "При роботі використовувались ЗВТ:";

    const zvtTable = document.createElement("table");
    zvtTable.className = "addprotmodal__zvt-table";
    protForm.append(zvtText, zvtTable);

    const zvtTableHead = document.createElement("thead");
    zvtTableHead.className = "addprotmodal__zvt-thead"
    zvtTable.append(zvtTableHead)

    const zvtTableHeadRow = document.createElement("tr");
    zvtTableHeadRow.className = "addprotmodal__zvt-tr"
    zvtTableHead.append(zvtTableHeadRow)

    const zvtTableHeadCell1 = document.createElement("th");
    zvtTableHeadCell1.innerText = "Найменування";
    const zvtTableHeadCell2 = document.createElement("th");
    zvtTableHeadCell2.innerText = "Тип";
    const zvtTableHeadCell3 = document.createElement("th");
    zvtTableHeadCell3.innerText = "Заводський номер";
    const zvtTableHeadCell4 = document.createElement("th");
    zvtTableHeadCell4.innerText = "Дата наступної перевірки";
    [zvtTableHeadCell1, zvtTableHeadCell2, zvtTableHeadCell3, zvtTableHeadCell4].forEach(cell => cell.className = "addprotmodal__zvt-th")
    zvtTableHeadRow.append(zvtTableHeadCell1, zvtTableHeadCell2, zvtTableHeadCell3, zvtTableHeadCell4)


    const zvtTableBody = document.createElement("tbody");
    zvtTableBody.className = "addprotmodal__zvt-tbody"
    zvtTable.append(zvtTableBody)
  }
  const zvtTableBody = document.querySelector(".addprotmodal__zvt-tbody")
  const zvtTableBodyRow = document.createElement("tr");
  zvtTableBodyRow.className = "addprotmodal__zvt-tr"
  zvtTableBody.append(zvtTableBodyRow)

  const zvtTableBodyCell1 = document.createElement("th");
  const zvtTableBodyCell2 = document.createElement("th");
  const zvtTableBodyCell3 = document.createElement("th");
  const zvtTableBodyCell4 = document.createElement("th");
  const delBtn = document.createElement("th");
  [zvtTableBodyCell1, zvtTableBodyCell2, zvtTableBodyCell3, zvtTableBodyCell4].forEach(cell => cell.className = "addprotmodal__zvt-td")
  delBtn.className = "addprotmodal__zvt-td addprotmodal__zvt-del-btn";
  delBtn.innerText = "Видалити";
  zvtTableBodyRow.append(zvtTableBodyCell1, zvtTableBodyCell2, zvtTableBodyCell3, zvtTableBodyCell4,
    delBtn);
  delBtn.addEventListener("click", () => {
    deleteZvtRow(zvtTableBodyRow)
  })
}

function deleteZvtRow(row) {
  const zvtTableBody = document.querySelector(".addprotmodal__zvt-tbody");
  const zvtTable = document.querySelector('.addprotmodal__zvt-table');
  if (zvtTableBody.childElementCount === 1) {
    zvtTable.remove()
    return
  }
  row.remove()
}
