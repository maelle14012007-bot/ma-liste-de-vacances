let data = {
  valise: {
    title: "🧳 Valise",
    items: [
      "👕 T-shirts",
      "🩳 Shorts",
      "🩱 Maillots de bain",
      "🧦 Chaussettes",
      "👗 Robes",
      "🧥 Pull"
    ]
  },
  tente: {
    title: "⛺ Tente",
    items: [
      "🏕️ Tente",
      "🛏️ Matelas",
      "🔦 Lampe",
      "🪵 Sardines",
      "🪢 Cordes"
    ]
  },
  alimentaire: {
    title: "🍓 Alimentaire",
    items: [
      "🥖 Pain",
      "🍝 Pâtes",
      "🥤 Boissons",
      "🍫 Snacks"
    ]
  },
  divers: {
    title: "🐚 Divers",
    items: [
      "📱 Chargeur",
      "🧴 Crème solaire",
      "🕶️ Lunettes de soleil",
      "💊 Trousse santé"
    ]
  }
};

function getStorageKey(cat){
  return "vacances_" + cat;
}

function loadState(cat){
  return JSON.parse(localStorage.getItem(getStorageKey(cat))) || {};
}

function saveState(cat, state){
  localStorage.setItem(getStorageKey(cat), JSON.stringify(state));
}

let currentCat = "";

function openCategory(cat){
  currentCat = cat;

  document.querySelector("main").style.display = "none";
  document.getElementById("page").classList.remove("hidden");

  document.getElementById("title").innerText = data[cat].title;

  let state = loadState(cat);

  let listHTML = "";

  data[cat].items.forEach((item, index) => {
    let checked = state[index] ? "checked" : "";

    listHTML += `
      <div class="item">
        <label>
          <input type="checkbox" onchange="toggleItem(${index})" ${checked}>
          ${item}
        </label>
      </div>
    `;
  });

  document.getElementById("list").innerHTML = listHTML;
}

function toggleItem(index){
  let state = loadState(currentCat);
  state[index] = !state[index];
  saveState(currentCat, state);
}

function closePage(){
  document.querySelector("main").style.display = "block";
  document.getElementById("page").classList.add("hidden");
}
