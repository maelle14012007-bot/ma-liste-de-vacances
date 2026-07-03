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

let currentCat = "";

function getKey(cat){
  return "vac_" + cat;
}

function load(cat){
  return JSON.parse(localStorage.getItem(getKey(cat))) || {};
}

function save(cat, data){
  localStorage.setItem(getKey(cat), JSON.stringify(data));
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
  let total = data[cat].items.length;
  let done = 0;

  data[cat].items.forEach((item, i) => {
    if(state[i]) done++;

    html += `
      <div class="item">
        <label>
          <input type="checkbox" ${state[i] ? "checked" : ""}
          onchange="toggle(${i})">
          ${item}
        </label>
      </div>
    `;
  });

  let percent = Math.round((done / total) * 100);

  html += `
    <div style="margin-top:20px;">
      <strong>Progression : ${percent}%</strong>
      <div style="background:#eee; height:10px; border-radius:10px;">
        <div style="width:${percent}%; height:10px; background:#8E6CCF; border-radius:10px;"></div>
      </div>
    </div>
  `;

  document.getElementById("list").innerHTML = html;
}

function toggle(index){
  let state = load(currentCat);
  state[index] = !state[index];
  save(currentCat, state);

  render(currentCat);
}

function closePage(){
  document.querySelector("main").style.display = "block";
  document.getElementById("page").classList.add("hidden");
}
