const products = [
  {
    id: "s24",
    name: "Samsung Galaxy S24",
    averagerating: 4.5,
  },
  {
    id: "mac",
    name: "Mac Air Laptop",
    averagerating: 4.7,
  },
  {
    id: "nike",
    name: "Nike Shoes",
    averagerating: 3.5,
  },
  {
    id: "controller",
    name: "Xbox Elite Controller",
    averagerating: 3.9,
  },
  {
    id: "tree",
    name: "Christmas Tree",
    averagerating: 5.0,
  },
];

const pageId = document.body.id;
const today = new Date();

if (pageId === "form-body") {
  let productsEl = document.querySelector("#products");
  const currentYear = document.querySelector("#currentyear");
  const lastModified = document.querySelector("#lastModified");
  const submitButton = document.querySelector("#submit-button");

  currentYear.textContent = `© ${today.getFullYear()}`;
  lastModified.textContent = document.lastModified;
  lastModified.style.color = "#fff";
  lastModified.style.fontWeight = "normal";
  submitButton.addEventListener("submit", (e) =>
    localStorageCounter(e, "form-body")
  );

  function renderOptions() {
    products.forEach(
      (product) =>
        (productsEl.innerHTML += `<option value='${product.id}'>${product.name}</option>`)
    );
  }
  renderOptions();
}

if (pageId === "counter-body") {
  localStorageCounter(null, "counter-body");
}

function localStorageCounter(e, context) {
  if (e) e.preventDefault();

  let counter = parseInt(localStorage.getItem("counter") || 0);
  counter += 1;

  localStorage.setItem("counter", counter);

  let body;
  if (context === "form-body") {
    body = document.querySelector("#form-body");
  } else if (context === "counter-body") {
    body = document.querySelector("#counter-body");
  }

  let existingMessage = document.querySelector("#counter-message");
  if (existingMessage) {
    existingMessage.textContent = `You have completed ${counter} reviews.`;
  } else if (body) {
    let p = document.createElement("p");
    p.id = "counter-message";
    p.textContent = `You have completed ${counter} reviews.`;
    body.append(p);
  }
}