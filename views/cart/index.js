import {
  initIndexedDB,
  getCart,
  editCart,
  deleteCart,
  clearCart,
} from "../indexedDB.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cartTableBody = document.querySelector("#cart-body");

  await initIndexedDB();

  cartTableBody.innerHTML = "";

  document
    .querySelector("#clear-cart")
    .addEventListener("click", () => clearCart());

  const items = await getCart();
  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.innerHTML = "장바구니가 비어있습니다.";

    cartTableBody.appendChild(empty);
  }

  let bookPrice = 0;

  await Promise.all(
    items.map(async ({ bookId, quantity }) => {
      const book = await (await fetch(`/api/v1/books/${bookId}`)).json();
      const { title, image, price } = book;
      bookPrice += price * quantity;

      const cartTableRow = document.createElement("tr");

      const imageCell = document.createElement("td");
      const imageElement = document.createElement("img");
      imageElement.src = image;
      imageElement.alt = title;
      imageCell.appendChild(imageElement);

      const titleCell = document.createElement("td");
      titleCell.textContent = title;

      const priceCell = document.createElement("td");
      priceCell.textContent = price.toLocaleString("ko-KR") + " 원";

      const quantityCell = document.createElement("td");
      const quantityElement = document.createElement("span");
      quantityElement.innerText = quantity;
      const plusButton = document.createElement("button");
      plusButton.innerText = "+";
      plusButton.addEventListener("click", () => {
        editCart(bookId, quantity + 1);
      });
      const minusButton = document.createElement("button");
      minusButton.innerText = "-";
      minusButton.addEventListener("click", () => {
        editCart(bookId, quantity - 1);
      });
      quantityCell.appendChild(plusButton);
      quantityCell.appendChild(quantityElement);
      quantityCell.appendChild(minusButton);

      const totalCell = document.createElement("td");
      totalCell.textContent =
        (price * quantity).toLocaleString("ko-KR") + " 원";

      const deleteCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "삭제";
      deleteButton.addEventListener("click", () => {
        deleteCart(bookId);
      });
      deleteCell.appendChild(deleteButton);

      cartTableRow.appendChild(imageCell);
      cartTableRow.appendChild(titleCell);
      cartTableRow.appendChild(priceCell);
      cartTableRow.appendChild(quantityCell);
      cartTableRow.appendChild(totalCell);
      cartTableRow.appendChild(deleteCell);

      cartTableBody.appendChild(cartTableRow);
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
