const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Ghana Accra",
    dedicated: "2004, January, 11",
    area: 1625,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  },
  {
    templeName: "Vancouver British Columbia",
    location: "British Columbia, Canada",
    dedicated: "2010, May, 2",
    area: 28165,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/vancouver-british-columbia-temple/vancouver-british-columbia-temple-13064-main.jpg"
  },
{
    templeName: "Abidjan Ivory Coast Temple",
    location: "Abidjan",
    dedicated: "2025, May, 25",
    area: 1613,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/abidjan-ivory-coast-temple/abidjan-ivory-coast-temple-58993-main.jpg"
  },

];

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const headerMenu = document.querySelector(".header__menu");
const navEl = document.querySelector(".header__nav");

const today = new Date();
const templesLarge = window.matchMedia("(min-width: 425px)");
const container = document.querySelector(".div__main");
currentYear.textContent += `© ${today.getFullYear()}`;
lastModified.textContent += document.lastModified;
lastModified.style.color =  " #000";
lastModified.style.fontWeight = "normal";

function createTemplateCard(temples) {
  container.innerHTML = "";
  temples.forEach((temple) => {
    let card = document.createElement("section");
    card.classList.add("section");
    let name = document.createElement("h3");
    name.classList.add("card__title");
    let location = document.createElement("p");
    let dedication = document.createElement("p");
    let area = document.createElement("p");
    let img = document.createElement("img");

    name.textContent = temple.templeName;
    location.innerHTML = `<span class='label'>Location: </span> ${temple.location}`;
    dedication.innerHTML = `<span class='label'>Dedicated: </span> ${temple.dedicated}`;
    area.innerHTML = `<span class='label'>Size: </span> ${temple.area} sq ft`;
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", 400);
    img.setAttribute("height", 300);

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedication);
    card.appendChild(area);
    card.appendChild(img);

    container.appendChild(card);
  });
}

function hideHambBtn(event) {
  if (event.matches) {
    headerMenu.classList.add("js-hide-content");
  } else {
    headerMenu.classList.remove("js-hide-content");
  }
}

function showNavBarOnBiggerScreen(event) {
  if (event.matches) {
    navEl.classList.add("js-show-header-nav");
  } else {
    navEl.classList.remove("js-show-header-nav");
  }
}

function handleClickOnMenu() {
  headerMenu.classList.toggle("show");
  navEl.classList.toggle("js-show-header-nav");
}

document.querySelector(".js-old-link").addEventListener("click", () => {
  createTemplateCard(
    temples.filter((temple) => {
      const year = parseInt(temple.dedicated.split(",")[0], 10);
      return year < 1900;
    })
  );
});

document.querySelector(".js-new-link").addEventListener("click", () => {
  createTemplateCard(
    temples.filter((temple) => {
      const year = parseInt(temple.dedicated.split(",")[0], 10);
      return year > 2000;
    })
  );
});

document.querySelector(".js-large-link").addEventListener("click", () => {
  createTemplateCard(temples.filter((temple) => temple.area > 90000));
});

document.querySelector(".js-small-link").addEventListener("click", () => {
  createTemplateCard(temples.filter((temple) => temple.area < 10000));
});

headerMenu.addEventListener("click", handleClickOnMenu);
templesLarge.addEventListener("change", showNavBarOnBiggerScreen);
templesLarge.addEventListener("change", hideHambBtn);

showNavBarOnBiggerScreen(templesLarge);
hideHambBtn(templesLarge);
createTemplateCard(temples);