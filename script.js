/* =========================================
   🌺 MA LISTE DE VACANCES
   VERSION 1
========================================= */

let currentCategory = null;
let currentSection = null;

/* =========================================
   DONNÉES
========================================= */

const data = {

    valise: {

        title: "🧳 Valise",

        sections: {

            "👕 Vêtements":[
                "Casquette",
                "T-shirts",
                "Pantalons / shorts",
                "Sous-vêtements / chaussettes",
                "Maillot de bain",
                "Robes / Jupes",
                "Vestes / Manteaux / Pull",
                "Pyjama",
                "Lunettes de soleil",
                "Maillot spécial toboggan",
                "Bonnet de bain"
            ],

            "🪥 Toilette & Santé":[
                "Fibre / Laque / Crème cheveux",
                "Peigne",
                "Brosse",
                "Éponge",
                "Brosse à dents",
                "Dentifrice",
                "Lentilles + produit",
                "Crème solaire",
                "Crème corps",
                "Shampoing",
                "Gel douche",
                "Masque",
                "Déodorant",
                "Parfum",
                "Chouchou",
                "Pince",
                "Maquillage",
                "Skin care",
                "Faux cils",
                "Médicaments",
                "Serviettes hygiéniques",
                "Tampons",
                "Culotte de règles",
                "Rasoir",
                "Épilateur",
                "Tondeuse",
                "Lisseur",
                "Sèche-cheveux",
                "Protecteur chaleur"
            ],

            "🔌 Électronique & Chargeurs":[
                "Téléphone",
                "Chargeur téléphone",
                "Adaptateur prise",
                "Multiprise",
                "Enceinte"
            ]

        }

    },

    tente:{

        title:"⛺ Tente",

        items:[
            "Tente",
            "Matelas pneumatique",
            "Gonfleur",
            "Couverture",
            "Draps",
            "Oreiller",
            "Caisse pliable",
            "Fil à linge",
            "Table",
            "Chaises",
            "Parasol",
            "Lampe",
            "Vaisselle",
            "Lessive",
            "Éponge",
            "Liquide vaisselle",
            "Miroir",
            "Ventilateur",
            "Pain de glace",
            "Chauffe plat",
            "Gaz",
            "Glacière"
        ]

    },

    alimentaire:{

        title:"🍓 Alimentaire",

        items:[
            "Eau",
            "Jus",
            "Sucre",
            "Sel",
            "Poivre",
            "Nutella",
            "Chocolat en poudre",
            "Conserves",
            "Pâtes",
            "Riz",
            "Semoule",
            "Céréales",
            "Brioche",
            "Pain de mie",
            "Chips",
            "Apéro"
        ]

    },

    divers:{

        title:"🎒 Divers",

        items:[
            "Papier d'identité",
            "Carte grise",
            "Réservations camping",
            "Permis de conduire",
            "Carte bancaire",
            "Carte Vitale",
            "Argent",
            "Pelle et balayette",
            "Carnet de notes",
            "Stylo",
            "Jeux de société",
            "Gourdes",
            "Spray anti moustique",
            "Sac de plage",
            "Serviette plage",
            "Serviette douche",
            "Gant",
            "Ordinateur",
            "Tablette",
            "Chargeur ordinateur",
            "Batterie externe",
            "Casque",
            "Écouteurs"
        ]

    }

};

/* =========================================
   SAUVEGARDE
========================================= */

const STORAGE_KEY = "vacances_app_v1";

function loadData(){

    const save = localStorage.getItem(STORAGE_KEY);

    if(save){

        return JSON.parse(save);

    }

    return JSON.parse(JSON.stringify(data));

}

let appData = loadData();

function saveData(){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
    );

}
/* =========================================
   NAVIGATION
========================================= */

function openCategory(category){

    currentCategory = category;
    currentSection = null;

    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("listPage").classList.add("hidden");

    document.getElementById("categoryPage").classList.remove("hidden");

    document.getElementById("categoryTitle").innerText =
        appData[category].title;

    renderCategory();

}

function goHome(){

    currentCategory = null;
    currentSection = null;

    document.getElementById("categoryPage").classList.add("hidden");
    document.getElementById("listPage").classList.add("hidden");

    document.getElementById("homePage").classList.remove("hidden");

}

function backToCategory(){

    document.getElementById("listPage").classList.add("hidden");
    document.getElementById("categoryPage").classList.remove("hidden");

}

/* =========================================
   AFFICHAGE DES CATÉGORIES
========================================= */

function renderCategory(){

    const container = document.getElementById("categoryContent");

    container.innerHTML = "";

    const cat = appData[currentCategory];

    if(cat.sections){

        Object.keys(cat.sections).forEach(section=>{

            const card = document.createElement("div");

            card.className = "categoryButton";

            card.innerHTML = `<h3>${section}</h3>`;

            card.onclick = ()=>{

                currentSection = section;

                openList();

            };

            container.appendChild(card);

        });

    }else{

        currentSection = null;

        openList();

    }

}

/* =========================================
   OUVERTURE D'UNE CHECKLIST
========================================= */

function openList(){

    document.getElementById("categoryPage").classList.add("hidden");
    document.getElementById("listPage").classList.remove("hidden");

    if(currentSection){

        document.getElementById("listTitle").innerText=currentSection;

    }else{

        document.getElementById("listTitle").innerText=
            appData[currentCategory].title;

    }

    renderChecklist();

}
/* =========================================
   AFFICHAGE DE LA CHECKLIST
========================================= */

function getCurrentItems(){

    if(currentSection){

        return appData[currentCategory].sections[currentSection];

    }

    return appData[currentCategory].items;

}

function renderChecklist(){

    const checklist = document.getElementById("checklist");

    checklist.innerHTML = "";

    const items = getCurrentItems();

    items.forEach((item,index)=>{

        const row = document.createElement("div");
        row.className = "item";

        const checked = item.checked ? "checked" : "";

        row.innerHTML = `

        <label>

            <input
                type="checkbox"
                ${checked}
                onchange="toggleItem(${index})">

            <span>${item.text}</span>

        </label>

        <div>

            <button onclick="editItem(${index})">
                ✏️
            </button>

            <button onclick="deleteItem(${index})">
                🗑️
            </button>

        </div>

        `;

        checklist.appendChild(row);

    });

}

/* =========================================
   COCHER / DÉCOCHER
========================================= */

function toggleItem(index){

    const items = getCurrentItems();

    items[index].checked = !items[index].checked;

    saveData();

    renderChecklist();

}

/* =========================================
   AJOUT D'UN OBJET
========================================= */

function addItem(){

    const input = document.getElementById("newItem");

    const value = input.value.trim();

    if(value==="") return;

    const items = getCurrentItems();

    items.push({

        text:value,

        checked:false

    });

    input.value="";

    saveData();

    renderChecklist();

}
/* =========================================
   MODIFIER UN OBJET
========================================= */

function editItem(index){

    const items = getCurrentItems();

    const nouveau = prompt(
        "Modifier l'objet :",
        items[index].text
    );

    if(nouveau === null) return;

    if(nouveau.trim() === "") return;

    items[index].text = nouveau.trim();

    saveData();

    renderChecklist();

}

/* =========================================
   SUPPRIMER UN OBJET
========================================= */

function deleteItem(index){

    const items = getCurrentItems();

    if(confirm("Supprimer cet objet ?")){

        items.splice(index,1);

        saveData();

        renderChecklist();

    }

}

/* =========================================
   CONVERSION DES LISTES
========================================= */

function convertData(){

    Object.keys(appData).forEach(category=>{

        const cat = appData[category];

        if(cat.sections){

            Object.keys(cat.sections).forEach(section=>{

                cat.sections[section] =
                cat.sections[section].map(item=>{

                    if(typeof item === "string"){

                        return{

                            text:item,
                            checked:false

                        };

                    }

                    return item;

                });

            });

        }

        else{

            cat.items =
            cat.items.map(item=>{

                if(typeof item === "string"){

                    return{

                        text:item,
                        checked:false

                    };

                }

                return item;

            });

        }

    });

    saveData();

}

/* =========================================
   INITIALISATION
========================================= */

window.onload = ()=>{

    convertData();

    goHome();

};
/* =========================================
   PROGRESSION
========================================= */

function updateProgress(){

    let total = 0;
    let checked = 0;

    Object.values(appData).forEach(cat=>{

        if(cat.sections){

            Object.values(cat.sections).forEach(section=>{

                section.forEach(item=>{

                    total++;

                    if(item.checked){
                        checked++;
                    }

                });

            });

        }else{

            cat.items.forEach(item=>{

                total++;

                if(item.checked){
                    checked++;
                }

            });

        }

    });

    const percent = total === 0 ? 0 : Math.round((checked/total)*100);

    const bar = document.getElementById("progressBar");
    const text = document.getElementById("progressText");

    if(bar){
        bar.style.width = percent + "%";
    }

    if(text){
        text.innerText = percent + "% terminé";
    }

}

/* =========================================
   SAUVEGARDE
========================================= */

const oldSave = saveData;

saveData = function(){

    oldSave();

    updateProgress();

};

/* =========================================
   INITIALISATION
========================================= */

window.onload = ()=>{

    convertData();

    updateProgress();

    goHome();

};