const TERM = "plate";

const form = document.querySelector(".add-items");
const plates = document.querySelector(".plates");
const plateArray = JSON.parse(localStorage.getItem(TERM)) || [];

function handleChecking(e) {
  if (!e.target.matches("input")) return;
  const index = parseInt(e.target.dataset.id, 10);
  plateArray[index].selected = !plateArray[index].selected;
  setLocalStorage();
}

function makeArray(text) {
  const obj = { text: text, selected: false };
  plateArray.push(obj);
}

function setLocalStorage() {
  localStorage.setItem(TERM, JSON.stringify(plateArray));
}

function drawPlates() {
  if (plateArray.length) {
    plates.innerHTML = plateArray
      .map((el, i) => {
        return `<li>
     <input type="checkbox" id="item${i}" data-id="${i}" ${
          el.selected ? "checked" : ""
        }>
    <label for="item${i}">${el.text}</label></li>`;
      })
      .join("");
  }
}

function addListItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  makeArray(text);
  drawPlates();
  setLocalStorage();
  form.reset();
}

if (localStorage.getItem(TERM)) {
  drawPlates();
}
form.addEventListener("submit", addListItem);
plates.addEventListener("click", handleChecking);
