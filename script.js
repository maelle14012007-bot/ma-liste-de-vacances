let data = {
  valise:{title:"🧳 Valise",items:["👕 T-shirts","🩳 Shorts","🧦 Chaussettes"]},
  tente:{title:"⛺ Tente",items:["🏕️ Tente","🔦 Lampe"]},
  alimentaire:{title:"🍓 Alimentaire",items:["🥖 Pain","🍫 Snacks"]},
  divers:{title:"🐚 Divers",items:["📱 Chargeur","🧴 Crème solaire"]}
};

let currentCat="";

/* LOAD */
function getKey(cat){return "vac_"+cat;}
function load(cat){return JSON.parse(localStorage.getItem(getKey(cat)))||{};}
function save(cat,s){localStorage.setItem(getKey(cat),JSON.stringify(s));}

/* OPEN */
function openCategory(cat){
  currentCat=cat;
  document.querySelector("main").style.display="none";
  document.getElementById("page").classList.remove("hidden");
  document.getElementById("title").innerText=data[cat].title;
  render();
  updateGlobalProgress();
}

/* RENDER */
function render(){
  let state=load(currentCat);
  let html="";

  data[currentCat].items.forEach((item,i)=>{
    html+=`
    <div class="item">
      <label>
        <input type="checkbox" ${state[i]?"checked":""}
        onchange="toggle(${i})">
        ${item}
      </label>
    </div>`;
  });

  html+=`<button onclick="addItem()">➕ Ajouter</button>`;
  document.getElementById("list").innerHTML=html;
}

/* TOGGLE */
function toggle(i){
  let state=load(currentCat);
  state[i]=!state[i];
  save(currentCat,state);
  render();
  updateGlobalProgress();
  checkWin();
}

/* ADD */
function addItem(){
  let n=prompt("Ajouter :");
  if(!n)return;
  data[currentCat].items.push(n);
  render();
  updateGlobalProgress();
}

/* CLOSE */
function closePage(){
  document.querySelector("main").style.display="block";
  document.getElementById("page").classList.add("hidden");
}

/* PROGRESSION */
function updateGlobalProgress(){
  let total=0,done=0;

  Object.keys(data).forEach(cat=>{
    let state=load(cat);
    data[cat].items.forEach((_,i)=>{
      total++;
      if(state[i])done++;
    });
  });

  let p=total?Math.round((done/total)*100):0;

  document.getElementById("bar").style.width=p+"%";
  document.getElementById("progressText").innerText="Progression : "+p+"%";
}

/* DARK MODE */
function toggleDark(){
  document.body.classList.toggle("dark");
  localStorage.setItem("dark",document.body.classList.contains("dark"));
}
if(localStorage.getItem("dark")==="true"){
  document.body.classList.add("dark");
}

/* WIN */
function checkWin(){
  let total=0,done=0;

  Object.keys(data).forEach(cat=>{
    let state=load(cat);
    data[cat].items.forEach((_,i)=>{
      total++;
      if(state[i])done++;
    });
  });

  if(total && done===total){
    for(let i=0;i<25;i++){
      let d=document.createElement("div");
      d.className="confetti";
      d.innerText="🎉";
      d.style.left=Math.random()*100+"%";
      document.body.appendChild(d);
      setTimeout(()=>d.remove(),2000);
    }
  }
}
