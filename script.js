/* =========================================
   🌺 MA LISTE DE VACANCES
   PARTIE 1
========================================= */

let currentCategory = "";
let currentSection = "";

/* -----------------------------
   DONNÉES
------------------------------ */

const data = {

    valise:{

        title:"🧳 Valise",

        sections:{

            "📄 Documents":[
                "Carte d'identité",
                "Carte vitale",
                "Permis",
                "Carte bancaire",
                "Espèces",
                "Réservation camping",
                "Assurance",
                "Clés"
            ],

            "👕 Vêtements":[
                "Sous-vêtements",
                "Chaussettes",
                "Pyjamas",
                "T-shirts",
                "Débardeurs",
                "Shorts",
                "Jupes",
                "Robes",
                "Pantalons",
                "Pull",
                "Sweat",
                "Veste",
                "Maillots de bain",
                "Serviette plage",
                "Casquette",
                "Lunettes de soleil",
                "Claquettes",
                "Chaussures"
            ],

            "🪥 Toilette & Santé":[
                "Brosse à dents",
                "Dentifrice",
                "Brosse à cheveux",
                "Déodorant",
                "Gel douche",
                "Shampoing",
                "Après-shampoing",
                "Rasoir",
                "Cotons",
                "Mouchoirs",
                "Crème solaire",
                "Après-soleil",
                "Doliprane",
                "Pansements",
                "Désinfectant"
            ],

            "🔌 Électronique & Chargeurs":[
                "Téléphone",
                "Chargeur téléphone",
                "Montre",
                "Chargeur montre",
                "Batterie externe",
                "Écouteurs"
            ],

            "🎒 Divers":[
                "Livre",
                "Jeux",
                "Sac",
                "Gourde"
            ]

        }

    },

    tente:{
        title:"⛺ Tente",
        items:[]
    },

    alimentaire:{
        title:"🍓 Alimentaire",
        items:[]
    },

    divers:{
        title:"🎒 Divers",
        items:[]
    }

};

/* -----------------------------
   SAUVEGARDE
------------------------------ */

function load(category){

    return JSON.parse(
        localStorage.getItem("vacances_"+category)
    ) || {};

}

function save(category,state){

    localStorage.setItem(
        "vacances_"+category,
        JSON.stringify(state)
    );

}
/* =========================================
   PARTIE 2
========================================= */

/* -----------------------------
   OUVRIR UNE CATÉGORIE
------------------------------ */

function openCategory(category){

    currentCategory = category;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("categoryPage").classList.remove("hidden");

    document.getElementById("categoryTitle").innerText =
        data[category].title;

    renderCategory();

}

/* -----------------------------
   RETOUR ACCUEIL
------------------------------ */

function goHome(){

    document.getElementById("categoryPage").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");

}

/* -----------------------------
   AFFICHAGE
------------------------------ */

function renderCategory(){

    const container =
        document.getElementById("categoryContent");

    container.innerHTML = "";

    const cat = data[currentCategory];

    /* ---------- VALISE ---------- */

    if(cat.sections){

        Object.keys(cat.sections).forEach(section=>{

            const folder=document.createElement("div");
            folder.className="folder";

            folder.innerHTML=`

                <div class="folderTitle">

                    ${section}

                </div>

                <div class="folderContent">

                </div>

            `;

            folder.querySelector(".folderTitle")
            .onclick=function(){

                folder.classList.toggle("open");

            };

            const content=
            folder.querySelector(".folderContent");

            cat.sections[section].forEach(item=>{

                content.innerHTML+=`

                <div class="item">

                    <label>

                    <input
                    type="checkbox">

                    ${item}

                    </label>

                </div>

                `;

            });

            container.appendChild(folder);

        });

    }

    /* ---------- AUTRES ---------- */

    else{

        cat.items.forEach(item=>{

            container.innerHTML+=`

            <div class="item">

                <label>

                <input type="checkbox">

                ${item}

                </label>

            </div>

            `;

        });

    }

}
/* =========================================
   PARTIE 3
   SAUVEGARDE + CHECKBOX + PROGRESSION
========================================= */

/* -----------------------------
   ETAT (SAUVEGARDE)
------------------------------ */

function getState(category){
    return JSON.parse(localStorage.getItem("state_"+category)) || {};
}

function setState(category,state){
    localStorage.setItem("state_"+category, JSON.stringify(state));
}

/* -----------------------------
   TOGGLE CHECKBOX
------------------------------ */

function toggleItem(key){

    let state = getState(currentCategory);

    state[key] = !state[key];

    setState(currentCategory,state);

    updateProgress();

}

/* -----------------------------
   PROGRESSION
------------------------------ */

function updateProgress(){

    let total = 0;
    let done = 0;

    Object.keys(data).forEach(cat=>{

        const c = data[cat];
        const state = getState(cat);

        if(c.sections){

            Object.keys(c.sections).forEach(section=>{

                c.sections[section].forEach((item,index)=>{

                    const key = section+"_"+index;

                    total++;

                    if(state[key]) done++;

                });

            });

        } else if(c.items){

            c.items.forEach((item,index)=>{

                total++;

                if(state[index]) done++;

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
   PARTIE 4
   RENDER CORRIGÉ + CHECKBOX CONNECTÉES
========================================= */

/* -----------------------------
   CLE UNIQUE POUR CHAQUE OBJET
------------------------------ */

function getKey(section,index){
    return section + "_" + index;
}

/* -----------------------------
   AFFICHAGE CATÉGORIE (FIX)
------------------------------ */

function renderCategory(){

    const container = document.getElementById("categoryContent");
    container.innerHTML = "";

    const cat = data[currentCategory];
    const state = getState(currentCategory);

    /* =========================
       VALISE (sections)
    ========================= */

    if(cat.sections){

        Object.keys(cat.sections).forEach(section=>{

            const folder = document.createElement("div");
            folder.className = "folder";

            const content = document.createElement("div");
            content.className = "folderContent";

            cat.sections[section].forEach((item,index)=>{

                const key = getKey(section,index);

                const row = document.createElement("div");
                row.className = "item";

                row.innerHTML = `
                    <label>
                        <input type="checkbox"
                        ${state[key] ? "checked" : ""}
                        onchange="toggleItem('${key}')">
                        ${item}
                    </label>
                `;

                content.appendChild(row);

            });

            folder.innerHTML = `
                <div class="folderTitle">${section}</div>
            `;

            folder.appendChild(content);

            folder.querySelector(".folderTitle").onclick = () => {
                folder.classList.toggle("open");
            };

            container.appendChild(folder);

        });

    }

    /* =========================
       AUTRES CATÉGORIES
    ========================= */

    else{

        cat.items.forEach((item,index)=>{

            const row = document.createElement("div");
            row.className = "item";

            row.innerHTML = `
                <label>
                    <input type="checkbox"
                    ${state[index] ? "checked" : ""}
                    onchange="toggleItem('${index}')">
                    ${item}
                </label>
            `;

            container.appendChild(row);

        });

    }

}
/* =========================================
   PARTIE 5
   INIT + PROGRESSION + FINALISATION
========================================= */

/* -----------------------------
   UPDATE PROGRESS (COMPTE GLOBAL)
------------------------------ */

function updateProgress(){

    let total = 0;
    let done = 0;

    Object.keys(data).forEach(cat=>{

        const c = data[cat];
        const state = getState(cat);

        if(c.sections){

            Object.keys(c.sections).forEach(section=>{

                c.sections[section].forEach((item,index)=>{

                    const key = section + "_" + index;

                    total++;

                    if(state[key]) done++;

                });

            });

        } else {

            c.items.forEach((item,index)=>{

                total++;

                if(state[index]) done++;

            });

        }

    });

    let percent = total ? Math.round((done/total)*100) : 0;

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").innerText = percent + " % terminé";

    if(percent === 100){

        document.getElementById("confetti").classList.remove("hidden");

    }

}

/* -----------------------------
   INIT APP
------------------------------ */

function initApp(){

    updateProgress();

}

/* -----------------------------
   RETOUR HOME
------------------------------ */

function goHome(){

    document.getElementById("categoryPage").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");

    updateProgress();

}

/* -----------------------------
   OPEN CATEGORY (SAFE)
------------------------------ */

function openCategory(category){

    currentCategory = category;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("categoryPage").classList.remove("hidden");

    document.getElementById("categoryTitle").innerText = data[category].title;

    renderCategory();

}

/* -----------------------------
   TOGGLE CHECKBOX (SAFE)
------------------------------ */

function toggleItem(key){

    const state = getState(currentCategory);

    state[key] = !state[key];

    setState(currentCategory,state);

    updateProgress();

}

/* -----------------------------
   AUTO START
------------------------------ */

window.onload = function(){

    initApp();

};
