/* ===== GET HTML ELEMENTS ===== */

/* ===== VARIABLES ===== */

/* ===== FUNCTIONS ===== */

/* ===== LISTENERS ===== */
let nextUrl = "";
let prevUrl = "";
let appContainer = document.querySelector(".app__container");
let app = document.querySelector(".app");
let searchbar = document.querySelector(".app__search");
const url = "https://pokeapi.co/api/v2/pokemon";
// function getData(url) {
//   fetch(url)
//     .then((res) => res.json())
//     .then(data=>{
//       console.log(data.results)

//     });
// }
async function getData(url) {
  const res = await fetch(url);
  const { next, previous, results } = await res.json();
  nextUrl = next;
  prevUrl = previous;
  printData(results);
}

getData(url);
async function printData(data) {
  let html = "";
  for (const { url } of data) {
    // console.log(url);
    const res = await fetch(url);
    const { name, sprites } = await res.json();
    html += `
    <div class="app__item">
      <img class="app__item--img" src="${sprites.other["official-artwork"].front_default}" alt="${name}">
      <h2 class="app__item--name">${name}</h2>
    </div>     
    `;
  }
  appContainer.innerHTML = html;
}

const btnNext = () => {
  nextUrl ? getData(nextUrl) : alert("nada que mostrar");
};
const btnPrev = () => {
  prevUrl ? getData(prevUrl) : alert("nada que mostrar");
};

app.addEventListener("click", ({ target }) => {
  if (target.classList.contains("button--prev")) {
    btnPrev();
  }
  if (target.classList.contains("button--next")) {
    btnNext();
  }
  if (target.classList.contains("button--initial")) {
    getData(url);
  }
});

searchbar.addEventListener("change", async ({ target }) => {
  if (target.value) {
    appContainer.innerHTML = await printPokemon(target);

  } else {
    console.log("envia algo ctmr");
  }
});

async function printPokemon({ value }) {
  const results = await fetch(url + `/${value}`);
  const { name, sprites } = await results.json();
  let html=""
  html += `
    <div class="app__item">
      <img class="app__item--img" src="${sprites.other["official-artwork"].front_default}" alt="${name}">
      <h2 class="app__item--name">${name}</h2>
    </div>     
    `;
   return (html); 

}
