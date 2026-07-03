let data = {
  valise: {
    title: "🧳 Valise",
    sections: {
      "Vêtements": ["T-shirts","Shorts","Maillots"],
      "Toilette": ["Brosse à dents","Dentifrice","Shampoing"],
      "Premiers secours": ["Pansements","Désinfectant"]
    }
  },

  tente: {
    title: "⛺ Tente",
    items: ["Tente","Matelas","Lampe"]
  },

  alimentaire: {
    title: "🍓 Alimentaire",
    items: ["Pain","Snacks","Boissons"]
  },

  divers: {
    title: "🐚 Divers",
    items: ["Chargeur","Crème solaire"]
  }
};

let current = "";

/* storage */
function load(k){
  return JSON.parse(localStorage.getItem(k)) || {};
}

function save(k,v){
  localStorage.setItem(k, JSON.stringify(v));
}

/* open */
function openCategory(cat){
  current = cat;

  document.querySelector("main").style.display = "none";
  document.getElementById("page").classList.remove("hidden");

  document.getElementById("title").innerText = data[cat].title;

  render();
  updateProgress();
}

/* render */
function render(){
  let state = load(current);
  let html = "";
  let cat = data[current];

  if(cat.sections){
    Object.keys(cat.sections).forEach(sec=>{
      html += `<h3>${sec}</h3>`;

      cat.sections[sec].forEach((item,i)=>{
        let id = sec+i;

        html += `
        <div class="item">
          <label>
            <input type="checkbox"
            ${state[id] ? "checked":""}
            onchange="toggle('${id}')">
            ${item}
          </label>
        </div>`;
      });
    });
  }

  else{
    cat.items.forEach((item,i)=>{
      html += `
      <div class="item">
        <label>
          <input type="checkbox"
          ${state[i] ? "checked":""}
          onchange="toggle(${i})">
          ${item}
        </label>
      </div>`;
    });
  }

  document.getElementById("list").innerHTML = html;
}

/* toggle */
function toggle(id){
  let state = load(current);
  state[id] = !state[id];
  save(current,state);

  render();
  updateProgress();
}

/* close */
function closePage(){
  document.querySelector("main").style.display = "block";
  document.getElementById("page").classList.add("hidden");
}

/* progress */
function updateProgress(){
  let total=0,done=0;

  Object.keys(data).forEach(cat=>{
    let state = load(cat);

    let c = data[cat];

    if(c.sections){
      Object.keys(c.sections).forEach(sec=>{
        c.sections[sec].forEach((_,i)=>{
          let id = sec+i;
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
  document.getElementById("progressText").innerText = p+"%";
}

/* dark */
function toggleDark(){
  document.body.classList.toggle("dark");
}
