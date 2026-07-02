const MENU = [
  {
    id: "stella",
    name: "Stella",
    category: "Bières",
    desc: "",
    price: 11,
    accent: "#3E5AE8"
  },
  {
    id: "chardonnay",
    name: "Chardonnay",
    category: "Vins",
    desc: "Vin blanc",
    price: 9,
    accent: "#C7AFD9"
  },
  {
    id: "paloma",
    name: "Paloma",
    category: "Prêts-à-boire",
    desc: "Cocktail prêt-à-boire",
    price: 7.5,
    accent: "#F2801F"
  },
  {
    id: "rabaska",
    name: "Rabaska",
    category: "Cidres",
    desc: "Cidre",
    price: 7.5,
    accent: "#5C9AA0"
  },
  {
    id: "passion-grimaldi",
    name: "Le Passion Grimaldi",
    category: "Cocktails signatures",
    desc: "Liqueur passion, gin Cirka, tonic",
    price: 10,
    accent: "#5C9AA0"
  },
  {
    id: "coke",
    name: "Coke",
    category: "Boissons",
    desc: "",
    price: 3,
    accent: "#3E5AE8"
  }
];

const money = (n) => n.toFixed(2).replace(".", ",") + " $";

const cart = {}; // id -> qty

const menuEl = document.getElementById("menu");
const chipsEl = document.getElementById("chips");
const cartBar = document.getElementById("cartBar");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const sheetBackdrop = document.getElementById("sheetBackdrop");
const cartSheet = document.getElementById("cartSheet");
const cartList = document.getElementById("cartList");
const cartEmpty = document.getElementById("cartEmpty");
const sheetTotal = document.getElementById("sheetTotal");
const tableInput = document.getElementById("tableNumber");
const confirmBtn = document.getElementById("confirmOrder");
const closeCartBtn = document.getElementById("closeCart");
const confirmScreen = document.getElementById("confirmScreen");
const newOrderBtn = document.getElementById("newOrder");

function renderMenu() {
  menuEl.innerHTML = MENU.map((item) => `
    <li class="item" style="--accent:${item.accent}" data-category="${item.category}">
      <div class="item__body">
        <span class="item__category">${item.category}</span>
        <p class="item__name">${item.name}</p>
        ${item.desc ? `<p class="item__desc">${item.desc}</p>` : ""}
        <p class="item__price">${money(item.price)}</p>
      </div>
      <div class="item__controls" data-controls="${item.id}"></div>
    </li>
  `).join("");
  MENU.forEach((item) => renderControls(item.id));
}

function renderControls(id) {
  const target = menuEl.querySelector(`[data-controls="${id}"]`);
  const qty = cart[id] || 0;
  if (qty === 0) {
    target.innerHTML = `<button class="add-btn" data-add="${id}">Ajouter</button>`;
  } else {
    target.innerHTML = `
      <div class="stepper">
        <button data-dec="${id}" aria-label="Retirer un ${id}">–</button>
        <span>${qty}</span>
        <button data-inc="${id}" aria-label="Ajouter un ${id}">+</button>
      </div>`;
  }
}

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
  renderControls(id);
  renderCart();
}

function cartEntries() {
  return Object.entries(cart).map(([id, qty]) => ({
    ...MENU.find((m) => m.id === id),
    qty
  }));
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
  const hasTable = tableInput.value.trim().length > 0;
  confirmBtn.disabled = !(hasItems && hasTable);
}

tableInput.addEventListener("input", validateForm);

// ----- Chips filter -----

chipsEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  chipsEl.querySelectorAll(".chip").forEach((c) => {
    c.classList.remove("is-active");
    c.setAttribute("aria-selected", "false");
  });
  chip.classList.add("is-active");
  chip.setAttribute("aria-selected", "true");

  const filter = chip.dataset.filter;
  menuEl.querySelectorAll(".item").forEach((li) => {
    const show = filter === "all" || li.dataset.category === filter;
    li.dataset.hidden = show ? "false" : "true";
  });
});

// ----- Confirm order -----

confirmBtn.addEventListener("click", () => {
  const entries = cartEntries();
  const total = cartTotalValue();
  const table = tableInput.value.trim();
  const orderId = "TD-" + Math.floor(1000 + Math.random() * 9000);

  document.getElementById("orderId").textContent = "Commande " + orderId;
  document.getElementById("confirmTable").textContent = table;
  document.getElementById("confirmTotal").textContent = money(total);
  document.getElementById("confirmList").innerHTML = entries.map((i) => `
    <li><span>${i.qty}× ${i.name}</span><span>${money(i.price * i.qty)}</span></li>
  `).join("");

  closeSheet();
  confirmScreen.hidden = false;
});

newOrderBtn.addEventListener("click", () => {
  Object.keys(cart).forEach((id) => delete cart[id]);
  tableInput.value = "";
  MENU.forEach((item) => renderControls(item.id));
  renderCart();
  confirmScreen.hidden = true;
});

renderMenu();
renderCart();
