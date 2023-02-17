const app = document.getElementById("app");
const main = document.querySelector(".main");
const home = document.getElementById("home");
const completedListSection = document.getElementById("completed-list-section");
const uncompletedListSection = document.getElementById(
  "uncompleted-list-section"
);

let bookShelf = [];

const fetchBookData = () => {
  bookShelf = JSON.parse(localStorage.getItem("bookShelfLocalStore"));
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("bookShelfLocalStore")) {
    fetchBookData();
    app.dispatchEvent(new CustomEvent("render", { detail: bookShelf }));
  }

  form.remove();
  completedListSection.remove();
  uncompletedListSection.remove();
});

const generateId = () => {
  return +new Date() + Math.floor(Math.random() * 100000).toString(36);
};

const saveLocal = () => {
  localStorage.setItem("bookShelfLocalStore", JSON.stringify(bookShelf));
};

const form = document.getElementById("add-book-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;

  const bookObj = {
    id: generateId(),
    title: form["title"].value,
    author: form["author"].value,
    pageTotal: form["page_total"].value,
    pageRead: 0,
    year: form["year"].value,
    isComplete: form["isComplete"].checked,
  };

  bookShelf.push(bookObj);
  createPopup(form["title"].value, "Berhasil Ditambahkan");
  form.reset();
  saveLocal();
});

app.addEventListener("render", (e) => {
  const uncompletedList = document.getElementById("uncompleted-list");

  if (uncompletedList) {
    uncompletedList.innerHTML = "";
    for (const book of e.detail) {
      const listItem = createListElement(book);
      if (book.isComplete === false) {
        uncompletedList.append(listItem);
      }
    }
  }

  const completedList = document.getElementById("completed-list");
  if (completedList) {
    completedList.innerHTML = "";
    for (const book of bookShelf) {
      const listItem = createListElement(book);
      if (book.isComplete === true) {
        completedList.append(listItem);
      }
    }
  }
});
