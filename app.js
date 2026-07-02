const SECTIONS = [
  {
    id: "alcools",
    title: "Alcools",
    theme: "blue",
    subgroups: [
      {
        label: "Bières",
        items: [
          { id: "stella", name: "Stella", price: 11 },
          { id: "corona", name: "Corona", price: 11 },
          { id: "biere-al", name: "Bière AL", price: 8 },
          { id: "benelux-neipa", name: "Benelux NEIPA (IPA)", price: 9.5 },
          { id: "fanelli", name: "Fanelli", desc: "Rousse, blanche ou blonde", price: 8 },
          { id: "biere-sans-alcool", name: "Bière sans alcool", price: 6 }
        ]
      },
      {
        label: "Cocktails simples",
        items: [
          { id: "cocktail-simple", name: "Cocktail simple", desc: "Au choix — demandez à votre serveur", price: 8 }
        ]
      },
      {
        label: "Prêts-à-boire",
        items: [
          { id: "amaretto-sour-peach", name: "Amaretto Sour Peach", price: 7.5 },
          { id: "paloma", name: "Paloma", price: 7.5 },
          { id: "clamato", name: "Clamato", price: 7 }
        ]
      },
      {
        label: "Cidre",
        items: [
          { id: "rabaska", name: "Rabaska", price: 7.5 }
        ]
      },
      {
        label: "Vins rouges",
        items: [
          { id: "pinot-noir", name: "Pinot Noir", price: 9 },
          { id: "sangre-de-toro", name: "Sangre De Toro", price: 7 }
        ]
      },
      {
        label: "Vins blancs",
        items: [
          { id: "chardonnay", name: "Chardonnay", price: 9 },
          { id: "pinot-grigio", name: "Pinot Grigio", price: 7 }
        ]
      }
    ]
  },
  {
    id: "boissons",
    title: "Alcools et boissons",
    theme: "teal",
    subgroups: [
      {
        label: "Digestif",
        items: [
          { id: "digestif", name: "Digestif", desc: "Prix variés — demandez au bar", price: null }
        ]
      },
      {
        label: "Cafés alcoolisés",
        items: [
          { id: "cafe-alcoolise", name: "Café alcoolisé", price: 7 }
        ]
      },
      {
        label: "Boissons et jus",
        items: [
          { id: "coke", name: "Coke", price: 3 },
          { id: "coke-diete", name: "Coke Diète", price: 3 },
          { id: "7up", name: "7up", price: 3 },
          { id: "ginger-ale", name: "Ginger Ale", price: 3 },
          { id: "montellier", name: "Montellier", price: 3 },
          { id: "jus", name: "Jus", desc: "Orange, pomme ou canneberge", price: 3 },
          { id: "eau", name: "Bouteille d'eau réutilisable", price: 6 }
        ]
      },
      {
        label: "Boissons chaudes",
        items: [
          { id: "capuccino", name: "Capuccino", price: 4 },
          { id: "latte", name: "Latte", price: 4 },
          { id: "americano", name: "Americano", price: 3 },
          { id: "cafe-filtre", name: "Café filtre", price: 2.5 },
          { id: "expresso", name: "Expresso simple", price: 2.5 },
          { id: "the", name: "Thé", price: 2.5 },
          { id: "chocolat-chaud", name: "Chocolat chaud", price: 2.5 }
        ]
      }
    ]
  },
  {
    id: "cocktails-signatures",
    title: "Cocktails signatures",
    theme: "lavender",
    subgroups: [
      {
        label: null,
        items: [
          { id: "passion-grimaldi", name: "Le Passion Grimaldi", desc: "Liqueur passion, gin Cirka, tonic", price: 10 },
          { id: "margarita-epice", name: "Le Margarita Épicé", desc: "Vodka au chili, jus d'orange, ginger ale, jus de lime", price: 9 },
          { id: "rouge-savoureux", name: "Le Rouge Savoureux", desc: "Tequila, jus de canneberge, grenadine, lime", price: 10 },
          { id: "opera", name: "L'Opéra", desc: "Vodka, ginger ale, lime", price: 9 },
          { id: "royal-menthe", name: "Le Royal Menthe", desc: "Crème de menthe, amaretto, tonic", price: 10 },
          { id: "cour-et-jardin", name: "Le Cour et Jardin", desc: "Vodka, liqueur menthe, soda, lime", price: 9 }
        ]
      }
    ]
  },
  {
    id: "grignotines",
    title: "Grignotines",
    theme: "cream",
    subgroups: [
      {
        label: null,
        items: [
          { id: "popcorn", name: "Pop Corn", price: 4 },
          { id: "croustilles", name: "Croustilles", price: 3 },
          { id: "bonbon", name: "Bonbon", price: 3 }
        ]
      }
    ]
  }
];

const ITEMS_BY_ID = {};
SECTIONS.forEach((section) => {
  section.subgroups.forEach((group) => {
    group.items.forEach((item) => {
      ITEMS_BY_ID[item.id] = item;
    });
  });
});

const money = (n) => n.toFixed(2).replace(".", ",") + " $";

const cart = {}; // id -> qty

const jumpnavEl = document.getElementById("jumpnav");
const menuRootEl = document.getElementById("menuRoot");
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
    return `<span class="row__note">Prix variés</span>`;
  }
  const qty = cart[item.id] || 0;
  if (qty === 0) {
    return `<button class="add-btn-sm" data-add="${item.id}" aria-label="Ajouter ${item.name}">+</button>`;
  }
  return `
    <div class="stepper stepper--sm">
      <button data-dec="${item.id}" aria-label="Retirer un ${item.name}">–</button>
      <span>${qty}</span>
      <button data-inc="${item.id}" aria-label="Ajouter un ${item.name}">+</button>
    </div>`;
}

function renderMenu() {
  jumpnavEl.innerHTML = SECTIONS.map((s, i) => `
    <button class="chip${i === 0 ? " is-active" : ""}" data-jump="${s.id}">${s.title}</button>
  `).join("");

  menuRootEl.innerHTML = SECTIONS.map((section) => `
    <section class="menu-section menu-section--${section.theme}" id="${section.id}">
      <div class="menu-section__inner">
        <h2 class="menu-section__title">${section.title}</h2>
        ${section.subgroups.map((group) => `
          <div class="subgroup">
            ${group.label ? `<span class="pill-label">${group.label}</span>` : ""}
            <ul class="rows">
              ${group.items.map((item) => `
                <li class="row">
                  <div class="row__text">
                    <p class="row__name">${item.name}</p>
                    ${item.desc ? `<p class="row__desc">${item.desc}</p>` : ""}
                  </div>
                  <div class="row__right">
                    ${item.price != null ? `<span class="row__price">${money(item.price)}</span>` : ""}
                    <span data-controls="${item.id}">${controlsHtml(item)}</span>
                  </div>
                </li>
              `).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function updateControls(id) {
  const target = menuRootEl.querySelector(`[data-controls="${id}"]`);
  if (target) target.innerHTML = controlsHtml(ITEMS_BY_ID[id]);
}

menuRootEl.addEventListener("click", (e) => {
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

// ----- Jump nav + scroll-spy -----

jumpnavEl.addEventListener("click", (e) => {
  const chip = e.target.closest("[data-jump]");
  if (!chip) return;
  document.getElementById(chip.dataset.jump).scrollIntoView({ behavior: "smooth", block: "start" });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    jumpnavEl.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("is-active", c.dataset.jump === entry.target.id);
    });
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

// ----- Confirm order -----

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
  SECTIONS.forEach((section) =>
    section.subgroups.forEach((group) =>
      group.items.forEach((item) => updateControls(item.id))
    )
  );
  renderCart();
  confirmScreen.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderMenu();
document.querySelectorAll(".menu-section").forEach((s) => sectionObserver.observe(s));
renderCart();
