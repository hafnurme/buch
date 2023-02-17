const popup = document.createElement("div");
popup.setAttribute("id", "popup");

const createPopup = (obj, message) => {
  popup.innerHTML = ` <span class="popup__obj">${obj}</span>
                      <span>${message}</span>`;

  app.append(popup);

  setTimeout(() => {
    popup.remove();
  }, 2000);
};

const makeEditDialog = (book) => {
  const editDialog = document.createElement("div");

  editDialog.setAttribute("class", "edit-dialog");
  editDialog.innerHTML = `<form class="container form" id="edit-book-form">
                          <div class="form__group">
                            <label class="form__label" for="title">
                              <span>Judul</span>
                            </label>
                            <input class="form__input" type="text" id="title" name="title" value="${book.title}" />
                          </div>

                          <div class="form__group">
                            <label class="form__label" for="author">
                              <span>Penulis</span>
                            </label>
                            <input class="form__input" type="text" id="author" name="author" value="${book.author}" />
                          </div>

                          <div class="form__group">
                            <label class="form__label" for="year">
                              <span>Tahun</span>
                            </label>
                            <input class="form__input" type="number" id="year" name="year" value="${book.year}" />
                          </div>

                          <div class="form__group">
                            <label class="form__label" for="page_read">
                              <span>Halaman Dibaca</span>
                            </label>
                            <input
                              class="form__input"
                              type="number"
                              id="page_read"
                              name="page_read"
                              value="${book.pageRead}"
                            />
                          </div>

                          <div class="form__group">
                            <label class="form__label" for="page_total">
                              <span>Jumlah Halaman</span>
                            </label>
                            <input
                              class="form__input"
                              type="number"
                              id="page_total"
                              name="page_total"
                              value="${book.pageTotal}"
                            />
                          </div>

                          <div class="dialog-confirmation">
                            <button type="submit">Edit</button>
                            <button type="reset">Batal</button>
                          </div>
                        </form>`;
  return editDialog;
};

const makeDeleteDialog = (book, index) => {
  const deleteDialog = document.createElement("div");
  deleteDialog.setAttribute("class", "delete-dialog");

  deleteDialog.innerHTML = `<p class="">Yakin Hapus <span class="popup__obj">${book.title}</span> ?</p>
                            <div class="dialog__confirmation">
                              <span class="dialog__button" id="confirm-delete">Ya</span>
                              <span class="dialog__button" id="delete-cancel">Batal</span>
                            </div>`;
  return deleteDialog;
};
