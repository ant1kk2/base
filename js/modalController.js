export function openInstructionModal(instruction) {
  const modal = document.querySelector(".imodal");
  const modalContainer = document.querySelector(".imodal__container");

  const modalTitle = document.createElement("h4");
  modalTitle.className = "imodal__title";
  modalTitle.textContent = `${instruction.number} ${instruction.title}`;
  modalContainer.prepend(modalTitle);

  const instructionWordLink = document.querySelector(".imodal__save-link");
  instructionWordLink.href = instruction.iPathWord;

  modal.classList.remove("hidden");
}

export function closeInstructionModal() {
  const modal = document.querySelector(".imodal");
  modal.classList.add("hidden");

  const modalTitle = document.querySelector(".imodal__title");
  modalTitle.remove();

  const instructionWordLink = document.querySelector(".imodal__save-link");
  instructionWordLink.href = "#";
}

export function openAddInstructionModal() {
  const modal = document.querySelector(".addmodal");
  modal.classList.remove("hidden");
}

export function closeAddInstructionModal() {
  const modal = document.querySelector(".addmodal");
  modal.classList.add("hidden");
  document.querySelector("#instructionNum").value = "";
  document.querySelector("#instructionName").value = "";
  document.querySelector("#instructionDate").value = "";
}

export function openAddProtModal() {
  const modal = document.querySelector(".addprotmodal");
  modal.classList.remove("hidden");
}

export function closeAddProtModal() {
  const modal = document.querySelector(".addprotmodal");
  document.querySelector(".addprotmodal__form").innerHTML = `
              <table class="addprotmodal__table">
                <thead class="addprotmodal__thead">
                  <tr class="addprotmodal__tr">
                    <th class="addprotmodal__th"></th>
                    <th class="addprotmodal__th" colspan="2"></th>
                  </tr>
                </thead>
                <tbody class="addprotmodal__tbody">
                  <tr class="addprotmodal__tr">
                    <td class="addprotmodal__td"></td>
                    <td class="addprotmodal__td">Роботи, що виконуються</td>
                    <td class="addprotmodal__td">Результат</td>
                  </tr>
                </tbody>
              </table>
  `;
  modal.classList.add("hidden");
}
