"use strict";

const toDoInp = document.getElementById("to-do-inp");
const toDos = document.querySelector(".to-dos");
const sorting = document.querySelector(".sort");
const sortingItem = document.querySelectorAll(".sorting");
const sortAll = document.querySelector(".sort__all");
const sortActive = document.querySelector(".sort__active");
const sortCompleted = document.querySelector(".sort__completed");
const clearCompletedBtn = document.querySelector(".clear-completed");
const itemsLeft = document.querySelector(".items-left");
const header = document.querySelector(".header");
const body = document.querySelector(".container");
const lightTheme = document.querySelector(".sun-icon");
const darkTheme = document.querySelector(".moon-icon");
const html = document.documentElement;
html.dataset.theme = "dark-theme";

function addToDo() {
  const toDoText = toDoInp.value;
  if (toDoText === "") return;
  toDos.insertAdjacentHTML(
    "afterbegin",
    `<li class = "list-item" draggable = "true"><img src="./images/icon-check.svg" alt="check" class="icon-check"><span class="list-text">${toDoText}</span><img src="./images/icon-cross.svg" alt="delete" class="icon-cross"></li>`
  );
  toDoInp.value = "";

  const listItem = document.querySelector(".list-item");
  markCompleted(listItem);
  deleteToDo(listItem);
  sortToDos(listItem);
  clearCompleted(listItem);
  // makeListDraggable(listItem);
}

function markCompleted(listItem) {
  const checkIcon = document.querySelector(".icon-check");
  const listText = document.querySelector(".list-text");
  listItem.addEventListener("click", function (e) {
    checkIcon.classList.toggle("active-check");
    listText.classList.toggle("completed");
  });
}

function deleteToDo(listItem) {
  const deleteBtn = document.querySelector(".icon-cross");
  deleteBtn.addEventListener("click", function (e) {
    listItem.remove();
    updateItemsLeft();
  });
}

function sortToDos(listItem) {
  sortAll.addEventListener("click", function (e) {
    listItem.style.display = "flex";
  });

  let getListItem = listItem.firstElementChild;
  sortActive.addEventListener("click", function (e) {
    if (getListItem.classList.contains("active-check")) {
      listItem.style.display = "none";
    } else {
      listItem.style.display = "flex";
    }
  });

  sortCompleted.addEventListener("click", function (e) {
    if (!getListItem.classList.contains("active-check")) {
      listItem.style.display = "none";
    } else {
      listItem.style.display = "flex";
    }
  });
}

function clearCompleted(listItem) {
  clearCompletedBtn.addEventListener("click", function (e) {
    if (listItem.firstElementChild.classList.contains("active-check")) {
      listItem.remove();
      updateItemsLeft();
    }
  });
}

function updateItemsLeft() {
  let listItemsCount = document.getElementsByTagName("li");
  let totalListItems = listItemsCount.length - 1;
  itemsLeft.innerHTML = `${totalListItems} items left`;
}

toDoInp.addEventListener("keydown", function (e) {
  if (event.key === "Enter") {
    addToDo();
    updateItemsLeft();
  }
});

sortingItem.forEach((item) => {});

//Switching Themes
lightTheme.addEventListener("click", function (e) {
  html.dataset.theme = "light-theme";
  lightTheme.style.display = "none";
  darkTheme.style.display = "flex";
});
darkTheme.addEventListener("click", function (e) {
  html.dataset.theme = "dark-theme";
  lightTheme.style.display = "flex";
  darkTheme.style.display = "none";
});

const dragArea = toDos;
new Sortable(dragArea, {
  animation: 250,
});
