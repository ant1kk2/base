import { filterInstructions } from "./instructionsFilterByDeveloper.js";
import { toogleGroups } from "./sideMenu.js";
import { sortByNumber, sortByName, sortByDate } from "./instructionsSort.js";
import {
  closeAddInstructionModal,
  closeAddProtModal,
  closeInstructionModal,
  openAddInstructionModal,
} from "./modalController.js";
import {
  addInstruction,
  addJob,
  addProtInfo,
  addRepairType,
} from "./addProtocolModal.js";
import { changeDevelopersBySector } from "./addInstructionModal.js";

const isAdmin = Boolean(localStorage.getItem("isAdmin"));

if (isAdmin) {
  const header = document.querySelector(".header");
  const addInstructionBtn = document.createElement("button");
  addInstructionBtn.className = "header-docs__add-btn";
  addInstructionBtn.innerText = "Додати інструкцію";
  header.prepend(addInstructionBtn);
  addInstructionBtn.addEventListener("click", () => {
    openAddInstructionModal();
  });
}

const addInstructionNextBtn = document.querySelector(".addmodal__btn");
const NumOfInstruction = document.querySelector("#instructionNum")
const NameOfInstruction = document.querySelector("#instructionName")
const DateOfInstruction = document.querySelector("#instructionDate")

NumOfInstruction.addEventListener("input", () => {
  NumOfInstruction.classList.remove("alerted")
})

NameOfInstruction.addEventListener("input", () => {
  NameOfInstruction.classList.remove("alerted")
})

DateOfInstruction.addEventListener("input", () => {
  DateOfInstruction.classList.remove("alerted")
})

addInstructionNextBtn.addEventListener("click", () => {
  const now = new Date();
  const inputDate = Date.parse(DateOfInstruction.value)
  if (NumOfInstruction.value.trim() === "") {
    NumOfInstruction.classList.add("alerted")
    return
  }
  if (NameOfInstruction.value.trim() === "") {
    NameOfInstruction.classList.add("alerted")
    return
  }
  if (now - inputDate < 0 || !inputDate) {
    DateOfInstruction.classList.add("alerted")
    return
  }
  addInstruction();
});

const addProtInfoBtn = document.querySelector("#add-info");

addProtInfoBtn.addEventListener("click", () => {
  addProtInfo(addProtInfoBtn);
});

const addRepairTypeBtn = document.querySelector("#add-repair-type");

addRepairTypeBtn.addEventListener("click", () => {
  addRepairType(addRepairTypeBtn);
});

const addJobBtn = document.querySelector('#add-job')

addJobBtn.addEventListener('click', () => {
  addJob(addJobBtn)
})

const gropsOpenBtns = document.querySelectorAll(".group__open");

gropsOpenBtns.forEach((openBtn) => {
  openBtn.addEventListener("click", () => {
    toogleGroups(openBtn);
  });
});

const tavBtn = document.querySelector("#tav");

const dkvpBtn = document.querySelector("#dkvp");
const vrt11Btn = document.querySelector("#vrt11");
const vrt12Btn = document.querySelector("#vrt12");

const davtBtn = document.querySelector("#davt");
const ssj1Btn = document.querySelector("#ssj1");
const szb1Btn = document.querySelector("#szb1");

const dsuzmBtn = document.querySelector("#dsuzm");
const dasutpBtn = document.querySelector("#dasutp");
const dremBtn = document.querySelector("#drem");
const dsuzeBtn = document.querySelector("#dsuze");

let filteredInstructions;

tavBtn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("department", "tav");
});

dkvpBtn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("sector", "dkvp");
});

vrt11Btn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("developer", "vrt11");
});

vrt12Btn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("developer", "vrt12");
});

davtBtn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("sector", "davt");
});

ssj1Btn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("developer", "ssj1");
});

szb1Btn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("developer", "szb1");
});

dsuzmBtn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("sector", "dsuzm");
});

dasutpBtn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("sector", "dasutp");
});

dremBtn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("sector", "drem");
});

dsuzeBtn.addEventListener("click", () => {
  filteredInstructions = filterInstructions("sector", "dsuze");
});

const sortInstructionByNumBtn = document.querySelector(
  "#sortInstructionByNumBtn"
);
const sortInstructionByNameBtn = document.querySelector(
  "#sortInstructionByNameBtn"
);
const sortInstructionByDateBtn = document.querySelector(
  "#sortInstructionByDateBtn"
);

sortInstructionByNumBtn.addEventListener("click", () => {
  sortByNumber(filteredInstructions);
});

sortInstructionByNameBtn.addEventListener("click", () => {
  sortByName(filteredInstructions);
});

sortInstructionByDateBtn.addEventListener("click", () => {
  sortByDate(filteredInstructions);
});

const closeInstructionModalBtn = document.querySelector(".imodal__close-btn");
const closeAddInstructionModalBtn = document.querySelector(
  ".addmodal__close-btn"
);

closeInstructionModalBtn.addEventListener("click", () => {
  closeInstructionModal();
});

closeAddInstructionModalBtn.addEventListener("click", () => {
  closeAddInstructionModal();
});

document.addEventListener("keydown", (e) => {
  const iModal = document.querySelector(".imodal");
  const addModal = document.querySelector(".addmodal");
  const addProtModal = document.querySelector(".addprotmodal");

  if (
    (e.key === "Escape" || e.key === "Esc") &&
    !iModal.classList.contains("hidden")
  ) {
    closeInstructionModal();
  }
  if (
    (e.key === "Escape" || e.key === "Esc") &&
    !addModal.classList.contains("hidden")
  ) {
    closeAddInstructionModal();
  }
  if (
    (e.key === "Escape" || e.key === "Esc") &&
    !addProtModal.classList.contains("hidden")
  ) {
    closeAddProtModal();
  }
});

document.addEventListener("click", (e) => {
  const iModal = document.querySelector(".imodal");
  const addModal = document.querySelector(".addmodal");
  const addProtModal = document.querySelector(".addprotmodal");
  if (e.target === iModal) {
    closeInstructionModal();
  }
  if (e.target === addModal) {
    closeAddInstructionModal();
  }
  if (e.target === addProtModal) {
    closeAddProtModal();
  }
});

const selectedSector = document.querySelector("#sector")
const selectedGroup = document.querySelector("#developer")

selectedSector.addEventListener("change", (e) => {
  changeDevelopersBySector(e, selectedGroup)
})
