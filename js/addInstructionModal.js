export function changeDevelopersBySector(e, group) {
  if (e.target.value === "davt") {
    group.innerHTML = `
      <option value="ssj1">Група ССЖ-1</option>
      <option value="szb1">Група СЗБ-1</option>
      `
  };
  if (e.target.value === "dkvp") {
    group.innerHTML = `
      <option value="vrt11">Група 1ВРТ-1</option>
      <option value="vrt12">Група 1ВРТ-2</option>
      `
  };
}