import apis from "../apis.js";
import {
  initIndexedDB,
  getCartItems,
  editCartItemQuantity,
  deleteCartItem,
  clearCartItems,
  editCartItemCheckStatus,
} from "../indexedDB.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initIndexedDB();

  const clearCartButtonElement = document.querySelector("#clear-cart");
  clearCartButtonElement.addEventListener("click", () => clearCartItems());

  const orderButtonElement = document.querySelector("#order-button");
  orderButtonElement.addEventListener("click", () => {
    location.href = "/order";
  });

  const cartItems = await getCartItems();
  await renderCartItems(cartItems);
});

function appendTdElement(tablebody, text) {
  const tdElement = document.createElement("td");
  tdElement.innerText = text;
  tdElement.colSpan = "7";
  tablebody.appendChild(tdElement);
  return tdElement;
}

async function renderCartItems(cartItems) {
  const cartTableBodyElement = document.querySelector("#cart-body");
  const cartTemplateElement = document.querySelector("#cart-template");
  const loadingElement = appendTdElement(
    cartTableBodyElement,
    "장바구니를 불러오는 중입니다.",
  );

  if (cartItems.length === 0) {
    cartTableBodyElement.removeChild(loadingElement);
    appendTdElement(cartTableBodyElement, "장바구니가 비어있습니다.");
    return;
  }

  let isLoading = true;
  try {
    await Promise.all(
      cartItems.map(async ({ bookId, quantity, isChecked }) => {
        const itemInfo = await renderCartItem(
          cartTableBodyElement,
          cartTemplateElement,
          { bookId, quantity, isChecked },
        );
        const { price } = itemInfo;
        if (isChecked) {
          const currentProductsPrice = getRenderedProductsPrice();
          setRenderedProductsPrice(currentProductsPrice + price * quantity);
        }
      }),
    );
  } catch (err) {
    appendTdElement(cartTableBodyElement, "장바구니 로딩에 실패했습니다.");
    console.error(err);
  } finally {
    if (isLoading) {
      cartTableBodyElement.removeChild(loadingElement);
      isLoading = false;
    }
  }
}

async function renderCartItem(
  cartTableBodyElement,
  cartTemplateElement,
  { bookId, quantity, isChecked },
) {
  const res = await apis.books.get({ bookId });
  const { title, image, price } = await res.json();

  const cartTemplateClone = document.importNode(
    cartTemplateElement.content,
    true,
  );

  const [
    checkboxCell,
    imageCell,
    titleCell,
    priceCell,
    quantityCell,
    totalCell,
    deleteCell,
  ] = cartTemplateClone.querySelectorAll("td");

  const quantitySpanElement = quantityCell.querySelector("span");
  quantitySpanElement.innerText = quantity;

  const checkboxElement = checkboxCell.querySelector("input");
  checkboxElement.checked = isChecked;
  checkboxElement.addEventListener("change", (event) => {
    editCartItemCheckStatus(bookId, event.target.checked);
    const productsPrice = getRenderedProductsPrice();

    const currentQuantity = Number(quantitySpanElement.innerText);
    setRenderedProductsPrice(
      event.target.checked
        ? productsPrice + price * currentQuantity
        : productsPrice - price * currentQuantity,
    );
    renderBill();
  });

  const imageElement = imageCell.querySelector("img");
  imageElement.src = image;
  imageElement.alt = title;

  titleCell.innerText = title;

  priceCell.innerText = price.toLocaleString("ko-KR") + " 원";

  const [minusButton, plusButton] = quantityCell.querySelectorAll("button");
  minusButton.addEventListener("click", () => {
    const currentQuantity = Number(quantitySpanElement.innerText);
    const nextQuantity = currentQuantity - 1;
    editCartItemQuantity(bookId, nextQuantity);
    if (nextQuantity <= 0) {
      location.reload();
      return;
    }
    quantitySpanElement.innerText = nextQuantity;

    if (checkboxElement.checked) {
      const productsPrice = getRenderedProductsPrice();
      setRenderedProductsPrice(productsPrice - price);
    }
    totalCell.innerText =
      (price * nextQuantity).toLocaleString("ko-KR") + " 원";
  });
  plusButton.addEventListener("click", () => {
    const currentQuantity = Number(quantitySpanElement.innerText);
    const nextQuantity = currentQuantity + 1;
    editCartItemQuantity(bookId, nextQuantity);
    quantitySpanElement.innerText = nextQuantity;

    if (checkboxElement.checked) {
      const productsPrice = getRenderedProductsPrice();
      setRenderedProductsPrice(productsPrice + price);
    }
    totalCell.innerText =
      (price * nextQuantity).toLocaleString("ko-KR") + " 원";
  });

  totalCell.innerText = (price * quantity).toLocaleString("ko-KR") + " 원";

  deleteCell.querySelector("button").addEventListener("click", () => {
    deleteCartItem(bookId);
  });
  cartTableBodyElement.appendChild(cartTemplateClone);

  return { title, image, price };
}

function getRenderedProductsPrice() {
  const productsPriceElement = document.querySelector("#products-price");
  return Number(productsPriceElement.innerText.replace(/[^\d]/g, ""));
}

function setRenderedProductsPrice(_productsPrice) {
  const productsPrice = Number(_productsPrice);
  const productsPriceElement = document.querySelector("#products-price");
  productsPriceElement.innerText = productsPrice.toLocaleString("ko-KR");
  renderBill();
}

function renderBill() {
  const deliveryFeeElement = document.querySelector("#delivery-fee");
  const totalPriceElement = document.querySelector("#total-price");

  const DELIVERY_FEE = 3000;

  const productsPrice = getRenderedProductsPrice();

  deliveryFeeElement.innerText =
    productsPrice > 0 ? DELIVERY_FEE.toLocaleString("ko-KR") : 0;

  totalPriceElement.innerText =
    productsPrice > 0
      ? (productsPrice + DELIVERY_FEE).toLocaleString("ko-KR")
      : 0;
}
