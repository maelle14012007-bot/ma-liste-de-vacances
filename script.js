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

function openCategory(cat){
  document.querySelector("main").style.display = "none";
  document.getElementById("page").classList.remove("hidden");

  document.getElementById("title").innerText = data[cat].title;

  let listHTML = "";

  data[cat].items.forEach((item, index) => {
    listHTML += `
      <div class="item">
        <label>
          <input type="checkbox">
          ${item}
        </label>
      </div>
    `;
  });

  document.getElementById("list").innerHTML = listHTML;
}

function closePage(){
  document.querySelector("main").style.display = "block";
  document.getElementById("page").classList.add("hidden");
}
