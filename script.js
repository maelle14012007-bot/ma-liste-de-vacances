let data = {
  valise: {
    title: "🧳 Valise",
    sections: {
      "👕 Vêtements": ["T-shirts", "Shorts", "Maillots"],
      "🪥 Toilette": ["Brosse à dents", "Dentifrice", "Shampoing"],
      "⛑️ Premiers secours": ["Pansements", "Désinfectant"]
    }
  },

  tente: {
    title: "⛺ Tente",
    items: ["Tente", "Matelas", "Lampe"]
  },

  alimentaire: {
    title: "🍓 Alimentaire",
    items: ["Pain", "Snacks", "Boissons"]
  },

  divers: {
    title: "🐚 Divers",
    items: ["Chargeur", "Crème solaire"]
  }
};

let currentCat = "";

/* STORAGE */
function key(c){return "vac_"+c;}

function load(c){
  return JSON.parse(localStorage.getItem(key(c))) || {};
}

function save(c,d){
  localStorage.setItem(key(c), JSON.stringify(d));
}

/* OPEN */
function openCategory(cat){
  currentCat = cat;

  document.querySelector("main").style.display = "none";
  document.getElementById("page").classList.remove("hidden");

  document.getElementById("title").innerText = data[cat].title;

  render();
  updateProgress();
}

/* RENDER */
function render(){
  let state = load(currentCat);
  let html = "";

  let cat = data[currentCat];

  /* CAS VALISE (avec sous-catégories) */
  if(cat.sections){
    Object.keys(cat.sections).forEach(section=>{
      html += `<h3>${section}</h3>`;

      cat.sections[section].forEach((item,i)=>{
        let id = section+"_"+i;

        html += `
          <div class="item">
            <label>
              <input type="checkbox"
                ${state[id] ? "checked" : ""}
                onchange="toggle('${id}')">
              ${item}
            </label>
          </div>
        `;
      });
    });
  }

  /* CAS NORMAL */
  else{
    cat.items.forEach((item,i)=>{
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
  }

  document.getElementById("list").innerHTML = html;
}

/* TOGGLE */
function toggle(id){
  let state = load(currentCat);

  state[id] = !state[id];

  save(currentCat, state);

  render();
  updateProgress();
}

/* CLOSE */
function closePage(){
  document.querySelector("main").style.display = "block";
  document.getElementById("page").classList.add("hidden");
}

/* PROGRESSION */
function updateProgress(){
  let total=0,done=0;

  Object.keys(data).forEach(cat=>{
    let state = load(cat);

    let c = data[cat];

    if(c.sections){
      Object.keys(c.sections).forEach(sec=>{
        c.sections[sec].forEach((_,i)=>{
          let id = sec+"_"+i;
          total++;
          if(state[id]) done++;
        });
      });
    } else {
      c.items.forEach((_,i)=>{
        total++;
        if(state[i]) done++;
      });
    }
  });

  let p = total ? Math.round((done/total)*100) : 0;

  document.getElementById("bar").style.width = p+"%";
  document.getElementById("progressText").innerText = "Progression : "+p+"%";
}

/* DARK MODE */
function toggleDark(){
  document.body.classList.toggle("dark");
}
