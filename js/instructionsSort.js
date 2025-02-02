import { createFilteredRows } from "./instructionsFilterByDeveloper.js";

let sortFlagByNumber = "up";
let sortFlagByName = "up";
let sortFlagByDate = "up";

export function sortByNumber(instructions) {
  if (sortFlagByNumber === "down") {
    sortFlagByNumber = "up";
    const sortedInstructions = instructions?.sort((a, b) => {
      const num1 = a.number.split(" ")[0].split(".").join("");
      const num2 = b.number.split(" ")[0].split(".").join("");
      return num2 - num1;
    });
    createFilteredRows(sortedInstructions);
  } else {
    sortFlagByNumber = "down";
    const sortedInstructions = instructions?.sort((a, b) => {
      const num1 = a.number.split(" ")[0].split(".").join("");
      const num2 = b.number.split(" ")[0].split(".").join("");
      return num1 - num2;
    });
    createFilteredRows(sortedInstructions);
  }
}

export function sortByName(instructions) {
  if (sortFlagByName === "down") {
    sortFlagByName = "up";
    const sortedInstructions = instructions?.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title == b.title) return 0;
      if (a.title < b.title) return -1;
    });
    createFilteredRows(sortedInstructions);
  } else {
    sortFlagByName = "down";
    const sortedInstructions = instructions?.sort((a, b) => {
      if (a.title > b.title) return -1;
      if (a.title == b.title) return 0;
      if (a.title < b.title) return 1;
    });
    createFilteredRows(sortedInstructions);
  }
}

export function sortByDate(instructions) {
  if (sortFlagByDate === "down") {
    sortFlagByDate = "up";
    const sortedInstructions = instructions?.sort((a, b) => {
      const dateA = new Date(a.date.split(".").reverse().join("-"));
      const dateB = new Date(b.date.split(".").reverse().join("-"));
      return dateB - dateA;
    });
    createFilteredRows(sortedInstructions);
  } else {
    sortFlagByDate = "down";
    const sortedInstructions = instructions?.sort((a, b) => {
      const dateA = new Date(a.date.split(".").reverse().join("-"));
      const dateB = new Date(b.date.split(".").reverse().join("-"));
      return dateA - dateB;
    });
    createFilteredRows(sortedInstructions);
  }
}
