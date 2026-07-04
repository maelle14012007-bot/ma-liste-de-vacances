/* =========================================
   🌺 MA LISTE DE VACANCES — PRO MAX
   ARCHITECTURE PROPRE (STATE CENTRAL)
========================================= */

let currentCategory = null;

/* -----------------------------
   DONNÉES FIXES (TA LISTE)
------------------------------ */

const data = {

  valise: {
    title: "🧳 Valise",
    sections: {
      "📄 Documents": [
        "Carte d'identité","Carte vitale","Permis","Carte bancaire","Espèces","Réservation camping","Assurance","Clés"
      ],
      "👕 Vêtements": [
        "Sous-vêtements","Chaussettes","Pyjamas","T-shirts","Shorts","Robes","Maillots de bain","Chaussures"
      ],
      "🪥 Toilette & Santé": [
        "Brosse à dents","Dentifrice","Shampoing","Gel douche","Déodorant","Crème solaire","Médicaments"
      ],
      "🔌 Électronique": [
        "Téléphone","Chargeur","Écouteurs","Batterie externe"
      ],
      "🎒 Divers": [
        "Livre","Jeux","Sac","Gourde"
      ]
    }
  },

  tente: {
    title: "⛺ Tente",
    items: [
      "Tente","Matelas","Sacs de couchage","Lampe","Piquets","Corde"
    ]
  },

  alimentaire: {
    title: "🍓 Alimentaire",
    items: [
      "Nourriture","Snacks","Eau","Pâtes","Riz","Saucisson"
    ]
  },

  divers: {
    title: "🎒 Divers",
    items: [
      "Crème solaire","Lunettes","Casquette"
    ]
  }

};
/* =========================================
   RENDER PRINCIPAL
========================================= */

function openCategory(cat){
    currentCategory = cat;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("categoryPage").classList.remove("hidden");

    document.getElementById("categoryTitle").innerText = data[cat].title;

    render();
}

function goHome(){
    document.getElementById("categoryPage").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");

    updateProgress();
}

/* =========================================
   SAUVEGARDE
========================================= */

function loadState(){
    return JSON.parse(localStorage.getItem("vacances_state")) || {};
}

function saveState(state){
    localStorage.setItem("vacances_state", JSON.stringify(state));
}

/* état global unique (IMPORTANT = plus de bugs) */
let state = loadState();

/* =========================================
   TOGGLE CHECKBOX
========================================= */

function toggle(key){

    state[key] = !state[key];
    saveState(state);

    updateProgress();
}

/* =========================================
   RENDER
========================================= */

function render(){

    const container = document.getElementById("categoryContent");
    container.innerHTML = "";

    const cat = data[currentCategory];

    /* --------- SECTIONS (VALISE) --------- */

    if(cat.sections){

        Object.keys(cat.sections).forEach(section=>{

            const folder = document.createElement("div");
            folder.className = "folder";

            const title = document.createElement("div");
            title.className = "folderTitle";
            title.innerText = section;

            const content = document.createElement("div");
            content.className = "folderContent";

            cat.sections[section].forEach((item,index)=>{

                const key = currentCategory+"_"+section+"_"+index;

                const row = document.createElement("div");
                row.className = "item";

                row.innerHTML = `
                    <label>
                        <input type="checkbox"
                        ${state[key] ? "checked" : ""}
                        onchange="toggle('${key}')">
                        ${item}
                    </label>
                `;

                content.appendChild(row);

            });

            folder.appendChild(title);
            folder.appendChild(content);

            title.onclick = () => folder.classList.toggle("open");

            container.appendChild(folder);

        });

    }

    /* --------- SIMPLE LIST --------- */

    else{

        cat.items.forEach((item,index)=>{

            const key = currentCategory+"_"+index;

            const row = document.createElement("div");
            row.className = "item";

            row.innerHTML = `
                <label>
                    <input type="checkbox"
                    ${state[key] ? "checked" : ""}
                    onchange="toggle('${key}')">
                    ${item}
                </label>
            `;

            container.appendChild(row);

        });

    }
}

/* =========================================
   PROGRESSION
========================================= */

function updateProgress(){

    let total = 0;
    let done = 0;

    Object.keys(data).forEach(cat=>{

        const c = data[cat];

        if(c.sections){

            Object.keys(c.sections).forEach(section=>{

                c.sections[section].forEach((_,i)=>{

                    const key = cat+"_"+section+"_"+i;

                    total++;
                    if(state[key]) done++;

                });

            });

        } else {

            c.items.forEach((_,i)=>{

                const key = cat+"_"+i;

                total++;
                if(state[key]) done++;

            });

        }

    });

    let percent = total ? Math.round((done/total)*100) : 0;

    document.getElementById("progressBar").style.width = percent+"%";
    document.getElementById("progressText").innerText = percent+" % terminé";

    if(percent === 100){
        document.getElementById("confetti").classList.remove("hidden");
    }

}

/* =========================================
   INIT
========================================= */

window.onload = () => {
    updateProgress();
};
