let data = {
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

let currentCat = "";

function getKey(cat){
  return "vac_" + cat;
}

function load(cat){
  return JSON.parse(localStorage.getItem(getKey(cat))) || {};
}

function save(cat, val){
  localStorage.setItem(getKey(cat), JSON.stringify(val));
}

function openCategory(cat){
  currentCat = cat;

  document.querySelector("main").style.display = "none";
  document.getElementById("page").classList.remove("hidden");

  document.getElementById("title").innerText = data[cat].title;

  render(cat);
}

function render(cat){
  let state = load(cat);
  let html = "";

  data[cat].items.forEach((item, i) => {
    html += `
      <div class="item">
        <label>
          <input type="checkbox" ${state[i] ? "checked" : ""} onchange="toggle(${i})">
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

function toggle(i){
  let state = load(currentCat);
  state[i] = !state[i];
  save(currentCat, state);
  render(currentCat);
}

function addItem(){
  let name = prompt("Ajouter un objet :");
  if(!name) return;

  data[currentCat].items.push(name);
  render(currentCat);
}

function closePage(){
  document.querySelector("main").style.display = "block";
  document.getElementById("page").classList.add("hidden");
}
