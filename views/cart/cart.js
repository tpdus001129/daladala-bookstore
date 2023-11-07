import {
  initIndexedDB,
  getCart,
  editCart,
  deleteCart,
  clearCart,
} from "../indexedDB.js";

document.addEventListener("DOMContentLoaded", async () => {
  document
    .querySelector("#clear-cart")
    .addEventListener("click", () => clearCart());
  await initIndexedDB();

  const cartTableBody = document.querySelector("#cart-body");

  const items = await getCart();

  if (items.length === 0) {
    const empty = document.createElement("td");
    empty.innerText = "장바구니가 비어있습니다.";
    empty.colSpan = "6";
    cartTableBody.appendChild(empty);
    return;
  }

  const loadingElement = document.createElement("td");
  loadingElement.innerText = "장바구니를 불러오는 중입니다.";
  loadingElement.colSpan = "6";
  cartTableBody.appendChild(loadingElement);

  const templateCartElement = document.querySelector("#template-cart");

  let bookPrice = 0;
  let isLoading = true;
  await Promise.all(
    items.map(async ({ bookId, quantity }) => {
      const { title, image, price } = await (
        await fetch(`/api/v1/books/${bookId}`)
      ).json();
      bookPrice += price * quantity;

      const clone = document.importNode(templateCartElement.content, true);

      const [
        imageCell,
        titleCell,
        priceCell,
        quantityCell,
        totalCell,
        deleteCell,
      ] = clone.querySelectorAll("td");

      const imageElement = imageCell.querySelector("img");
      imageElement.src = image;
      imageElement.alt = title;

      titleCell.innerText = title;

      priceCell.innerText = price.toLocaleString("ko-KR") + " 원";

      quantityCell.querySelector("span").innerText = quantity;

      const [plusButton, minusButton] = quantityCell.querySelectorAll("button");
      plusButton.addEventListener("click", () => {
        editCart(bookId, quantity - 1);
      });
      minusButton.addEventListener("click", () => {
        editCart(bookId, quantity + 1);
      });

      totalCell.innerText = (price * quantity).toLocaleString("ko-KR") + " 원";

      deleteCell.querySelector("button").addEventListener("click", () => {
        deleteCart(bookId);
      });
      cartTableBody.appendChild(clone);

      if (isLoading) {
        cartTableBody.removeChild(loadingElement);
        isLoading = false;
      }
    }),
  );

  const DELIVERY_FEE = 3000;

  const bookPriceElement = document.querySelector("#book-price");
  bookPriceElement.innerText = bookPrice.toLocaleString("ko-KR");

  const deliveryFeeElement = document.querySelector("#delivery-fee");
  deliveryFeeElement.innerText =
    bookPrice > 0 ? DELIVERY_FEE.toLocaleString("ko-KR") : 0;

  const totalPriceElement = document.querySelector("#total-price");
  totalPriceElement.innerText =
    bookPrice > 0 ? (bookPrice + DELIVERY_FEE).toLocaleString("ko-KR") : 0;
});
