const searchInput = document.querySelectorAll("#search-book");

const handleSearch = (e) => {
  let inputValue = e.target.value;
  inputValue = inputValue.trim();
  inputValue = inputValue.replace(/[!@#$%^&*\\]/g, "");

  if (inputValue !== null || inputValue !== "") {
    const bookShelfTemp = bookShelf.filter((elem) => {
      const key = new RegExp(inputValue, "ig");
      if (elem.title.match(key)) {
        return elem;
      }
    });
    app.dispatchEvent(new CustomEvent("render", { detail: bookShelfTemp }));
  } else {
    app.dispatchEvent(new CustomEvent("render", { detail: bookShelf }));
  }
};

searchInput.forEach((element) => {
  element.addEventListener("input", handleSearch);
});
