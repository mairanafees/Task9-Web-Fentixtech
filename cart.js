// Cart module — localStorage persisted
const CART_KEY = "furni_cart_v1";
const Cart = {
  items: JSON.parse(localStorage.getItem(CART_KEY) || "[]"),
  save() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    this.render();
  },
  add(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = this.items.find(i => i.id === productId);
    if (existing) existing.qty += 1;
    else this.items.push({ ...product, qty: 1 });
    this.save();
    showToast(`${product.name} added to cart`);
  },
  changeQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.remove(id);
    else this.save();
  },
  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },
  count() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  },
  total() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  },
  render() {
    // Nav counter
    const countEl = document.getElementById("cartCount");
    if (countEl) countEl.textContent = this.count();
    // Drawer items
    const list = document.getElementById("cartItems");
    if (!list) return;
    if (this.items.length === 0) {
      list.innerHTML = `<div class="cart-empty">
        <i class="bi bi-bag" style="font-size:40px;display:block;margin-bottom:10px"></i>
        Your cart is empty.
      </div>`;
    } else {
      list.innerHTML = this.items.map(i => `
        <div class="cart-item">
          <img src="${i.image}" alt="${i.name}" />
          <div class="cart-item-info">
            <p class="cart-item-name">${i.name}</p>
            <span class="cart-item-price">$${i.price}</span>
            <div class="qty">
              <button data-act="dec" data-id="${i.id}" aria-label="Decrease">−</button>
              <span>${i.qty}</span>
              <button data-act="inc" data-id="${i.id}" aria-label="Increase">+</button>
            </div>
          </div>
          <button class="cart-remove" data-act="rm" data-id="${i.id}" aria-label="Remove">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `).join("");
    }
    document.getElementById("cartTotal").textContent = `$${this.total().toFixed(2)}`;
  },
};
