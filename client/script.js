const getAllButton = document.querySelector("#get-all");
const displayAll = document.querySelector("#display-all");
getAllButton.addEventListener("click", async () => {
  const books = await (await fetch("/books")).json();
  let html = "";
  if (books) {
    for (const b of books) {
      html += `<tr><td>${b._id}</td><td>${b.title}</td></tr>`;
    }
  }
  displayAll.innerHTML += html;
});

const getOneButton = document.querySelector("#get-one");
const getIdInput = document.querySelector("#get-id");
const displayOne = document.querySelector("#display-one");
getOneButton.addEventListener("click", async () => {
  const book = await (await fetch(`/books/${getIdInput.value}`)).json();
  const html = `<tr><td>${book._id}</td><td>${book.title}</td><td>${book.author}</td><td>${book.copies}</td></tr>`;

  displayOne.innerHTML += html;
});

const createBookForm = document.querySelector("#create-book");
createBookForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const body = {};
  const fd = new FormData(ev.target);
  for (let [name, val] of fd.entries()) {
    if (name === "copies") val = Number(val);
    body[name] = val;
  }

  const resp = await fetch("/books/new", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  ev.target.reset();
});

const updateBookForm = document.querySelector("#update-book");
updateBookForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const body = {};
  let bookId;
  const fd = new FormData(ev.target);
  for (let [name, val] of fd.entries()) {
    if (name === "id") {
      bookId = val;
      continue;
    }

    if (name === "copies" && val) val = Number(val);
    body[name] = val;
  }

  const resp = await fetch(`/books/update/${bookId}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  ev.target.reset();
});
