// App state
let activeCategory = "All";
let searchTerm = "";

// ---- Toast ----
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

// ---- Render helpers ----
function starRow(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++)
    out += `<i class="bi ${i <= rating ? "bi-star-fill" : "bi-star"}"></i>`;
  return out;
}

function renderCategories() {
  const bar = document.getElementById("categoryBar");
  bar.innerHTML = categories.map(c => `
    <button class="cat-btn ${c.name === activeCategory ? "active" : ""}" data-cat="${c.name}">
      <i class="bi ${c.icon}"></i>${c.name}
    </button>
  `).join("");
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const results = document.getElementById("resultsCount");

  const filtered = products.filter(p => {
    const catOk = activeCategory === "All" || p.category === activeCategory;
    const searchOk = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return catOk && searchOk;
  });

  results.textContent = `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-media">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <button class="wishlist" aria-label="Add ${p.name} to wishlist"><i class="bi bi-heart"></i></button>
      </div>
      <div class="product-body">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating" aria-label="Rated ${p.rating} of 5">${starRow(p.rating)}</div>
        <div class="product-foot">
          <span class="price">$${p.price}</span>
          <button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to cart">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// ---- Event wiring ----
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  Cart.render();

  // Category click
  document.getElementById("categoryBar").addEventListener("click", e => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    renderCategories();
    renderProducts();
  });

  // Search
  document.getElementById("searchInput").addEventListener("input", e => {
    searchTerm = e.target.value.trim();
    renderProducts();
  });

  // Add to cart (delegated)
  document.getElementById("productGrid").addEventListener("click", e => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    Cart.add(Number(btn.dataset.add));
  });

  // Cart drawer
  const drawer   = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  const openCart  = () => { drawer.classList.add("open"); backdrop.classList.add("show"); drawer.setAttribute("aria-hidden","false"); };
  const closeCart = () => { drawer.classList.remove("open"); backdrop.classList.remove("show"); drawer.setAttribute("aria-hidden","true"); };
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);

  // Cart item qty / remove
  document.getElementById("cartItems").addEventListener("click", e => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const act = btn.dataset.act;
    if (act === "inc") Cart.changeQty(id, +1);
    else if (act === "dec") Cart.changeQty(id, -1);
    else if (act === "rm") Cart.remove(id);
  });

  // Mobile menu toggle
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("open");
  });
  document.querySelectorAll("#navLinks a").forEach(a =>
    a.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open"))
  );

  // Active section highlight on scroll
  const links = document.querySelectorAll("#navLinks a");
  const sections = [...links].map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  window.addEventListener("scroll", () => {
    const y = window.scrollY + 120;
    let idx = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= y) idx = i; });
    links.forEach(l => l.classList.remove("active"));
    links[idx]?.classList.add("active");
  });
});
