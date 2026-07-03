let defaultData = {
  valise: {
    title: "🧳 Valise",
    items: ["👕 T-shirts","🩳 Shorts","🩱 Maillots de bain","🧦 Chaussettes"]
  },
  tente: {
    title: "⛺ Tente",
    items: ["🏕️ Tente","🛏️ Matelas","🔦 Lampe"]
  },
  alimentaire: {
    title: "🍓 Alimentaire",
    items: ["🥖 Pain","🍫 Snacks","🥤 Boissons"]
  },
  divers: {
    title: "🐚 Divers",
    items: ["📱 Chargeur","🧴 Crème solaire"]
  }
};

/* 🔑 charger / sauvegarder TOUT */
function getData(){
  let saved = localStorage.getItem("vac_data");
  return saved ? JSON.parse(saved) : structuredClone(defaultData);
}

function saveData(data){
  localStorage.setItem("vac_data", JSON.stringify(data));
}

/* 📦 données globales */
let data = getData();
let currentCat = "";

/* 📂 ouvrir catégorie */
function openCategory(cat){
  currentCat = cat;

  document.querySelector("main").style.display = "none";
  document.getElementById("page").classList.remove("hidden");

  document.getElementById("title").innerText = data[cat].title;

  render(cat);
}

/* 📋 afficher liste */
function render(cat){
  let state = loadState(cat);
  let html = "";

  data[cat].items.forEach((item, i) => {
    html += `
      <div class="item">
        <label>
          <input type="checkbox"
            ${state[i] ? "checked" : ""}
            onchange="toggle(${i})">
          ${item}
        </label>
      </div>
    `;
  });

  html += `
    <button onclick="addItem()" style="margin-top:15px;">
      ➕ Ajouter un objet
    </button>
  `;

  document.getElementById("list").innerHTML = html;
}

/* ✅ état des cases */
function loadState(cat){
  return data[cat].state || {};
}

/* 🔁 toggle case */
function toggle(i){
  let state = loadState(currentCat);

  state[i] = !state[i];

  data[currentCat].state = state;

  saveData(data);
  render(currentCat);
}

/* ➕ ajouter objet */
function addItem(){
  let name = prompt("Ajouter un objet :");
  if(!name) return;

  data[currentCat].items.push(name);

  saveData(data);
  render(currentCat);
}

/* 🔙 retour */
function closePage(){
  document.querySelector("main").style.display = "block";
  document.getElementById("page").classList.add("hidden");
}
