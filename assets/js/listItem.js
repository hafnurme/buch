const color = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
  "#FFFFFC",
];
const randomNumber = () => {
  return Math.floor(Math.random() * 9);
};
const createListElement = (item) => {
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "book__list__item");
  listItem.setAttribute("style", `background:${color[randomNumber()]}`);

  const title = document.createElement("h4");
  title.setAttribute("class", "book__item__title");
  title.innerText = item["title"];

  const author = document.createElement("span");
  author.setAttribute("class", "book__item__author");
  author.innerText = item["author"] + " | " + item["year"];

  const page = document.createElement("span");
  page.setAttribute("class", "book__item__page");
  page.innerText = "Progress : " + item["pageRead"] + " / " + item["pageTotal"];

  const itemDetail = document.createElement("div");
  itemDetail.append(title);
  itemDetail.append(author);
  itemDetail.append(page);

  listItem.append(itemDetail);
  listItem.append(createButtonOptions(item["isComplete"], item["id"], item));

  return listItem;
};

const createButtonOptions = (isComplete, bookId) => {
  const optionsContainer = document.createElement("div");
  if (isComplete === false) {
    const completeButton = document.createElement("span");
    completeButton.setAttribute("class", "icon-button");
    completeButton.innerHTML = `<img src="./assets/icon/tick-circle.svg" />`;
    completeButton.addEventListener("click", () => {
      markBookAsComplete(bookId);
    });

    const editButton = document.createElement("span");
    editButton.setAttribute("class", "icon-button");
    editButton.innerHTML = `<img src="./assets/icon/edit.svg" />`;
    editButton.addEventListener("click", () => {
      editBook(bookId);
    });

    optionsContainer.append(editButton);
    optionsContainer.append(completeButton);
  }
  if (isComplete === true) {
    const undoCompleteButton = document.createElement("span");
    undoCompleteButton.setAttribute("class", "icon-button");
    undoCompleteButton.innerHTML = `<img src="./assets/icon/undo.svg" />`;

    undoCompleteButton.addEventListener("click", () => {
      markBookAsUncomplete(bookId);
    });

    optionsContainer.append(undoCompleteButton);
  }

  const deleteButton = document.createElement("span");
  deleteButton.setAttribute("class", "icon-button");
  deleteButton.innerHTML = `<img src="./assets/icon/trash.svg" />`;

  deleteButton.addEventListener("click", () => {
    removeFromShelf(bookId);
  });

  optionsContainer.append(deleteButton);
  optionsContainer.setAttribute("class", "item__options");
  return optionsContainer;
};

const markBookAsComplete = (id) => {
  bookShelf.some((book, index) => {
    if (book.id === id) {
      book.isComplete = true;

      app.dispatchEvent(new CustomEvent("render", { detail: bookShelf }));
      createPopup(book.title, "ditandai selesai dibaca.");
      saveLocal();
    }
  });
};
const markBookAsUncomplete = (id) => {
  bookShelf.some((book, index) => {
    if (book.id === id) {
      book.isComplete = false;

      app.dispatchEvent(new CustomEvent("render", { detail: bookShelf }));
      createPopup(book.title, "ditaindai belum selesai dibaca.");
      saveLocal();
    }
  });
};

const removeFromShelf = (id) => {
  bookShelf.some((book, index) => {
    if (book.id === id) {
      const deleteDialog = makeDeleteDialog(book, index);
      app.append(deleteDialog);

      const confirmButton = document.getElementById("confirm-delete");
      confirmButton.addEventListener("click", () => {
        bookShelf.splice(index, 1);
        app.dispatchEvent(new CustomEvent("render", { detail: bookShelf }));
        saveLocal();
        deleteDialog.remove();
        createPopup(book.title, "dihapus.");
      });

      const cancelButton = document.getElementById("delete-cancel");
      cancelButton.addEventListener("click", () => {
        deleteDialog.remove();
      });
    }
  });
};

const editBook = (id) => {
  bookShelf.some((book, index) => {
    const titleTemp = book.title;
    if (book.id === id) {
      const editDialog = makeEditDialog(book);
      app.append(editDialog);

      const editForm = document.getElementById("edit-book-form");
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target;

        book.title = form["title"].value;
        book.author = form["author"].value;
        book.year = form["year"].value;
        book.pageRead = form["page_read"].value;
        book.pageTotal = form["page_total"].value;

        editDialog.remove();
        createPopup(titleTemp, "telah diedit.");
        app.dispatchEvent(new CustomEvent("render", { detail: bookShelf }));
        saveLocal();
      });

      editForm.addEventListener("reset", () => {
        editDialog.remove();
      });
    }
  });
};
