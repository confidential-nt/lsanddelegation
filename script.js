const TERM = "plate";

const form = document.querySelector(".add-items");
const plates = document.querySelector(".plates");
const plateArray = JSON.parse(localStorage.getItem(TERM)) || [];
const allChecker = document.querySelector("[id=all]");

const allCheckObj = { text: "all", checked: false };

function handleAllChecker(e) {
  plateArray.forEach((plate) => {
    if (e.target.checked) {
      plate.selected = true;
      allCheckObj.checked = true;
    } else {
      allCheckObj.checked = false;
      plate.selected = false;
    }
    setLocalStorage();
    drawPlates();
  });
}

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
  localStorage.setItem("all", JSON.stringify(allCheckObj));
  localStorage.setItem(TERM, JSON.stringify(plateArray));
}

function drawPlates() {
  const parsedCheckObj = JSON.parse(localStorage.getItem("all"));
  if (parsedCheckObj) allChecker.checked = parsedCheckObj.checked;
  if (plateArray.length) {
    plates.innerHTML = plateArray
      .map((el, i) => {
        return `<li>
     <input type="checkbox" id="item${i}" data-id="${i}" ${
          el.selected ? "checked" : parsedCheckObj.checked ? "checked" : ""
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
  setLocalStorage();
  drawPlates();

  form.reset();
}

if (localStorage.getItem(TERM)) {
  drawPlates();
}

form.addEventListener("submit", addListItem);
plates.addEventListener("click", handleChecking);
allChecker.addEventListener("change", handleAllChecker);
//챌린지 1. 모두 체크 2. 모두 안체크 3. 리스트 전부 리 렌더 하지말고 하나만
