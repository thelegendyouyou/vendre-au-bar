const CATEGORIES = [
  { id: "bieres", label: "Bières", accent: "#3E5AE8" },
  { id: "cocktails-simples", label: "Cocktails simples", accent: "#F2801F" },
  { id: "prets-a-boire", label: "Prêts-à-boire", accent: "#F2801F" },
  { id: "cidre", label: "Cidre", accent: "#5C9AA0" },
  { id: "vins", label: "Vins", accent: "#B48CD1" },
  { id: "cocktails-signatures", label: "Cocktails signatures", accent: "#5C9AA0" },
  { id: "boissons", label: "Boissons et jus", accent: "#3E5AE8" },
  { id: "boissons-chaudes", label: "Boissons chaudes", accent: "#F2801F" },
  { id: "grignotines", label: "Grignotines", accent: "#C1554F" }
];

const MENU = [
  // Bières
  { id: "stella", name: "Stella", cat: "bieres", price: 11 },
  { id: "corona", name: "Corona", cat: "bieres", price: 11 },
  { id: "biere-al", name: "Bière AL", cat: "bieres", price: 8 },
  { id: "benelux-neipa", name: "Benelux NEIPA (IPA)", cat: "bieres", price: 9.5 },
  { id: "fanelli", name: "Fanelli", desc: "Rousse, blanche ou blonde", cat: "bieres", price: 8 },
  { id: "biere-sans-alcool", name: "Bière sans alcool", cat: "bieres", price: 6 },

  // Cocktails simples
  { id: "cocktail-simple", name: "Cocktail simple", desc: "Au choix — demandez au comptoir", cat: "cocktails-simples", price: 8 },
  { id: "cafe-alcoolise", name: "Café alcoolisé", cat: "cocktails-simples", price: 7 },
  { id: "digestif", name: "Digestif", desc: "Demandez au comptoir", cat: "cocktails-simples", price: null },

  // Prêts-à-boire
  { id: "amaretto-sour-peach", name: "Amaretto Sour Peach", cat: "prets-a-boire", price: 7.5 },
  { id: "paloma", name: "Paloma", cat: "prets-a-boire", price: 7.5 },
  { id: "clamato", name: "Clamato", cat: "prets-a-boire", price: 7 },

  // Cidre
  { id: "rabaska", name: "Rabaska", cat: "cidre", price: 7.5 },

  // Vins
  { id: "pinot-noir", name: "Pinot Noir", desc: "Vin rouge", cat: "vins", price: 9 },
  { id: "sangre-de-toro", name: "Sangre De Toro", desc: "Vin rouge", cat: "vins", price: 7 },
  { id: "chardonnay", name: "Chardonnay", desc: "Vin blanc", cat: "vins", price: 9 },
  { id: "pinot-grigio", name: "Pinot Grigio", desc: "Vin blanc", cat: "vins", price: 7 },

  // Cocktails signatures
  { id: "passion-grimaldi", name: "Le Passion Grimaldi", desc: "Liqueur passion, gin Cirka, tonic", cat: "cocktails-signatures", price: 10 },
  { id: "margarita-epice", name: "Le Margarita Épicé", desc: "Vodka au chili, jus d'orange, ginger ale, jus de lime", cat: "cocktails-signatures", price: 9 },
  { id: "rouge-savoureux", name: "Le Rouge Savoureux", desc: "Tequila, jus de canneberge, grenadine, lime", cat: "cocktails-signatures", price: 10 },
  { id: "opera", name: "L'Opéra", desc: "Vodka, ginger ale, lime", cat: "cocktails-signatures", price: 9 },
  { id: "royal-menthe", name: "Le Royal Menthe", desc: "Crème de menthe, amaretto, tonic", cat: "cocktails-signatures", price: 10 },
  { id: "cour-et-jardin", name: "Le Cour et Jardin", desc: "Vodka, liqueur menthe, soda, lime", cat: "cocktails-signatures", price: 9 },

  // Boissons et jus
  { id: "coke", name: "Coke", cat: "boissons", price: 3 },
  { id: "coke-diete", name: "Coke Diète", cat: "boissons", price: 3 },
  { id: "7up", name: "7up", cat: "boissons", price: 3 },
  { id: "ginger-ale", name: "Ginger Ale", cat: "boissons", price: 3 },
  { id: "montellier", name: "Montellier", cat: "boissons", price: 3 },
  { id: "jus", name: "Jus", desc: "Orange, pomme ou canneberge", cat: "boissons", price: 3 },
  { id: "eau", name: "Bouteille d'eau réutilisable", cat: "boissons", price: 6 },

  // Boissons chaudes
  { id: "capuccino", name: "Capuccino", cat: "boissons-chaudes", price: 4 },
  { id: "latte", name: "Latte", cat: "boissons-chaudes", price: 4 },
  { id: "americano", name: "Americano", cat: "boissons-chaudes", price: 3 },
  { id: "cafe-filtre", name: "Café filtre", cat: "boissons-chaudes", price: 2.5 },
  { id: "expresso", name: "Expresso simple", cat: "boissons-chaudes", price: 2.5 },
  { id: "the", name: "Thé", cat: "boissons-chaudes", price: 2.5 },
  { id: "chocolat-chaud", name: "Chocolat chaud", cat: "boissons-chaudes", price: 2.5 },

  // Grignotines
  { id: "popcorn", name: "Pop Corn", cat: "grignotines", price: 4 },
  { id: "croustilles", name: "Croustilles", cat: "grignotines", price: 3 },
  { id: "bonbon", name: "Bonbon", cat: "grignotines", price: 3 }
];

const CATS_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
const ITEMS_BY_ID = Object.fromEntries(MENU.map((m) => [m.id, m]));

const money = (n) => n.toFixed(2).replace(".", ",") + " $";

const cart = {}; // id -> qty
let activeFilter = "all";

const chipsEl = document.getElementById("chips");
const menuEl = document.getElementById("menu");
const cartBar = document.getElementById("cartBar");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const sheetBackdrop = document.getElementById("sheetBackdrop");
const cartSheet = document.getElementById("cartSheet");
const cartList = document.getElementById("cartList");
const cartEmpty = document.getElementById("cartEmpty");
const sheetTotal = document.getElementById("sheetTotal");
const nameInput = document.getElementById("customerName");
const confirmBtn = document.getElementById("confirmOrder");
const closeCartBtn = document.getElementById("closeCart");
const confirmScreen = document.getElementById("confirmScreen");
const newOrderBtn = document.getElementById("newOrder");

function controlsHtml(item) {
  if (item.price == null) {
    return `<span class="item__note">Prix variés</span>`;
  }
  const qty = cart[item.id] || 0;
  if (qty === 0) {
    return `<button class="add-btn" data-add="${item.id}">Ajouter</button>`;
  }
  return `
    <div class="stepper">
      <button data-dec="${item.id}" aria-label="Retirer un ${item.name}">–</button>
      <span>${qty}</span>
      <button data-inc="${item.id}" aria-label="Ajouter un ${item.name}">+</button>
    </div>`;
}

function renderChips() {
  chipsEl.innerHTML = [
    `<button class="chip is-active" data-filter="all" aria-pressed="true">Tout</button>`,
    ...CATEGORIES.map((c) => `
      <button class="chip" data-filter="${c.id}" aria-pressed="false">${c.label}</button>
    `)
  ].join("");
}

function renderMenu() {
  menuEl.innerHTML = MENU.map((item) => {
    const cat = CATS_BY_ID[item.cat];
    return `
    <li class="item" style="--accent:${cat.accent}" data-category="${item.cat}">
      <div class="item__body">
        <span class="item__category">${cat.label}</span>
        <p class="item__name">${item.name}</p>
        ${item.desc ? `<p class="item__desc">${item.desc}</p>` : ""}
        ${item.price != null ? `<p class="item__price">${money(item.price)}</p>` : ""}
      </div>
      <div class="item__controls" data-controls="${item.id}">${controlsHtml(item)}</div>
    </li>`;
  }).join("");
  applyFilter();
}

function applyFilter() {
  menuEl.querySelectorAll(".item").forEach((li) => {
    const show = activeFilter === "all" || li.dataset.category === activeFilter;
    li.hidden = !show;
  });
}

function updateControls(id) {
  const target = menuEl.querySelector(`[data-controls="${id}"]`);
  if (target) target.innerHTML = controlsHtml(ITEMS_BY_ID[id]);
}

chipsEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  activeFilter = chip.dataset.filter;
  chipsEl.querySelectorAll(".chip").forEach((c) => {
    const active = c === chip;
    c.classList.toggle("is-active", active);
    c.setAttribute("aria-pressed", String(active));
  });
  applyFilter();
});

menuEl.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if (add) setQty(add.dataset.add, 1);
  if (inc) setQty(inc.dataset.inc, (cart[inc.dataset.inc] || 0) + 1);
  if (dec) setQty(dec.dataset.dec, (cart[dec.dataset.dec] || 0) - 1);
});

function setQty(id, qty) {
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  updateControls(id);
  renderCart();
}

function cartEntries() {
  return Object.entries(cart).map(([id, qty]) => ({ ...ITEMS_BY_ID[id], qty }));
}

function cartTotalValue() {
  return cartEntries().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((s, i) => s + i.qty, 0);
  const total = cartTotalValue();

  cartBar.hidden = count === 0;
  cartCount.textContent = count;
  cartTotal.textContent = money(total);
  sheetTotal.textContent = money(total);

  cartEmpty.hidden = entries.length > 0;
  cartList.innerHTML = entries.map((i) => `
    <li class="cart-row">
      <div>
        <div class="cart-row__name">${i.name}</div>
        <div class="cart-row__price">${money(i.price)} chacune</div>
      </div>
      <div class="stepper">
        <button data-dec="${i.id}" aria-label="Retirer un ${i.name}">–</button>
        <span>${i.qty}</span>
        <button data-inc="${i.id}" aria-label="Ajouter un ${i.name}">+</button>
      </div>
    </li>
  `).join("");

  validateForm();
}

cartList.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if (inc) setQty(inc.dataset.inc, (cart[inc.dataset.inc] || 0) + 1);
  if (dec) setQty(dec.dataset.dec, (cart[dec.dataset.dec] || 0) - 1);
});

function openSheet() {
  sheetBackdrop.hidden = false;
  cartSheet.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeSheet() {
  sheetBackdrop.hidden = true;
  cartSheet.hidden = true;
  document.body.style.overflow = "";
}

cartBar.addEventListener("click", openSheet);
closeCartBtn.addEventListener("click", closeSheet);
sheetBackdrop.addEventListener("click", closeSheet);

function validateForm() {
  const hasItems = Object.keys(cart).length > 0;
  const hasName = nameInput.value.trim().length > 0;
  confirmBtn.disabled = !(hasItems && hasName);
}

nameInput.addEventListener("input", validateForm);

confirmBtn.addEventListener("click", () => {
  const entries = cartEntries();
  const total = cartTotalValue();
  const name = nameInput.value.trim();
  const orderId = String(Math.floor(100 + Math.random() * 900));

  document.getElementById("confirmName").textContent = name;
  document.getElementById("orderId").textContent = orderId;
  document.getElementById("confirmTotal").textContent = money(total);
  document.getElementById("confirmList").innerHTML = entries.map((i) => `
    <li><span>${i.qty}× ${i.name}</span><span>${money(i.price * i.qty)}</span></li>
  `).join("");

  closeSheet();
  confirmScreen.hidden = false;
});

newOrderBtn.addEventListener("click", () => {
  Object.keys(cart).forEach((id) => delete cart[id]);
  nameInput.value = "";
  MENU.forEach((item) => updateControls(item.id));
  renderCart();
  confirmScreen.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ----- Parallaxe des formes décoratives (desktop) -----

const decor = document.querySelector(".side-decor");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (decor && !reducedMotion.matches) {
  let ticking = false;
  const updateParallax = () => {
    decor.style.setProperty("--scrollY", window.scrollY);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }, { passive: true });
  updateParallax();
}

renderChips();
renderMenu();
renderCart();
