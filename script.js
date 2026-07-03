let data = {
  valise: {
    title: "🧳 Valise",
    items: ["👕 T-shirts","🩳 Shorts","🩱 Maillots","🧦 Chaussettes"]
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

/* LOAD/SAVE */
function getKey(cat){ return "vac_" + cat; }

function load(cat){
  return JSON.parse(localStorage.getItem(getKey(cat))) || {};
}

function save(cat, state){
  localStorage.setItem(getKey(cat), JSON.stringify(state));
}

/* OPEN */
function openCategory(cat){
  currentCat = cat;
  document.querySelector("main").style.display = "none";
  document.getElementById("page").classList.remove("hidden");

  document.getElementById("title").innerText = data[cat].title;

  render(cat);
  updateGlobalProgress();
}

/* RENDER */
function render(cat){
  let state = load(cat);
  let html = "";

  data[cat].items.forEach((item,i)=>{
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

  html += `<button onclick="addItem()">➕ Ajouter un objet</button>`;

  document.getElementById("list").innerHTML = html;
}

/* TOGGLE */
function toggle(i){
  let state = load(currentCat);
  state[i] = !state[i];
  save(currentCat, state);

  render(currentCat);
  updateGlobalProgress();
}

/* ADD */
function addItem(){
  let name = prompt("Ajouter un objet :");
  if(!name) return;

  data[currentCat].items.push(name);

  render(currentCat);
  updateGlobalProgress();
}

/* CLOSE */
function closePage(){
  document.querySelector("main").style.display = "block";
  document.getElementById("page").classList.add("hidden");
}

/* PROGRESSION GLOBALE */
function updateGlobalProgress(){
  let total = 0;
  let done = 0;

  Object.keys(data).forEach(cat=>{
    let state = load(cat);

    data[cat].items.forEach((_,i)=>{
      total++;
      if(state[i]) done++;
    });
  });

  let percent = total ? Math.round((done/total)*100) : 0;

  document.getElementById("bar").style.width = percent + "%";
  document.getElementById("progressText").innerText =
    "Progression globale : " + percent + "%";
}
