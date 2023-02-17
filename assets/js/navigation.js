const navigateBtn = [
  {
    button: document.getElementById("add-book-btn"),
    component: form,
  },
  {
    button: document.getElementById("home-btn"),
    component: home,
  },
  {
    button: document.getElementById("uncompleted-list-btn"),
    component: uncompletedListSection,
  },
  {
    button: document.getElementById("completed-list-btn"),
    component: completedListSection,
  },
];

navigateBtn.forEach((element) => {
  element.button.addEventListener("click", () => {
    main.children[0].remove();
    main.append(element.component);
    app.dispatchEvent(new CustomEvent("render", { detail: bookShelf }));
  });
});
