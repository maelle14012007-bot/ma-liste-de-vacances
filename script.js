let current = null;
let currentSub = null;

const data = {

  valise: {
    title: "🧳 Valise",
    sections: {
      "Documents": ["Carte identité","Carte vitale","Permis","CB","Réservations"],
      "Vêtements": ["T-shirts","Shorts","Sous-vêtements","Chaussures","Maillot"],
      "Toilette": ["Brosse à dents","Dentifrice","Shampoing","Gel douche","Crème solaire"]
    }
  },

  tente: {
    title: "⛺ Tente",
    items: ["Tente","Sardines","Sac de couchage","Lampe","Matelas"]
  },

  alimentaire: {
    title: "🍓 Alimentaire",
    items: ["Eau","Pâtes","Snacks","Riz","Fruits"]
  },

  divers: {
    title: "🎒 Divers",
    items: ["Téléphone","Chargeur","Livre"]
  }

};

// ---------- STORAGE ----------
function getState(){
  return JSON.parse(localStorage.getItem("state")) || {};
}

function setState(s){
  localStorage.setItem("state", JSON.stringify(s));
}

// ---------- NAV ----------
function openCategory(cat){
  current = cat;
  document.getElementById("home").classList.add("hidden");
  document.getElementById("category").classList.remove("hidden");

  document.getElementById("title").innerText = data[cat].title;

  render();
}

function goHome(){
  document.getElementById("home").classList.remove("hidden");
  document.getElementById("category").classList.add("hidden");
}

// ---------- RENDER ----------
function render(){

  const list = document.getElementById("list");
  const subcats = document.getElementById("subcats");
  list.innerHTML = "";
  subcats.innerHTML = "";

  const state = getState();
  const cat = data[current];

  // sous catégories
  if(cat.sections){
    Object.keys(cat.sections).forEach(sec=>{
      const b = document.createElement("button");
      b.innerText = sec;
      b.onclick = ()=>openSub(sec);
      subcats.appendChild(b);
    });
  } else {
    renderItems(cat.items, state);
  }

  if(currentSub){
    renderItems(cat.sections[currentSub], state);
  }
}

// ---------- SUB ----------
function openSub(s){
  currentSub = s;
  render();
}

// ---------- ITEMS ----------
function renderItems(items, state){

  const list = document.getElementById("list");
  list.innerHTML = "";

  items.forEach((it,i)=>{

    const key = current+"_"+currentSub+"_"+i;

    const div = document.createElement("div");
    div.className="item";

    div.innerHTML = `
      <span>
        <input type="checkbox" onchange="toggle('${key}')"
        ${state[key] ? "checked" : ""}>
        ${it}
      </span>
      <button onclick="delItem(${i})">🗑</button>
    `;

    list.appendChild(div);
  });

}

// ---------- TOGGLE ----------
function toggle(key){
  const state = getState();
  state[key] = !state[key];
  setState(state);
}

// ---------- ADD ----------
function addItem(){
  const input = document.getElementById("newItem");
  if(!input.value) return;

  data[current].items = data[current].items || [];
  data[current].items.push(input.value);

  input.value="";
  render();
}

// ---------- DELETE ----------
function delItem(i){
  data[current].items.splice(i,1);
  render();
}
