import apis from "../apis.js";
import { checkAuth } from "../auth.js";

checkAuth();

(async () => {
  const res = await apis.users.orderList();
  const orderList = await res.json();

  orderList.forEach((order) => {
    renderOrderRowTemplate(order);
  });
})();

function renderOrderRowTemplate(order) {
  const { _id, createdAt, books, productsPrice, deliveryState, deliveryPrice } =
    order;

  const orderTableBodyElement = document.querySelector("#order-table-body");
  const orderTemplateElement = document.querySelector("#order-template");

  const orderTemplateClone = document.importNode(
    orderTemplateElement.content,
    true,
  );

  const [idCell, dateCell, titleCell, priceCell, deliveryStateCell] =
    orderTemplateClone.querySelectorAll("td");

  const idAnchorElement = idCell.querySelector("a");
  idAnchorElement.href = `/order-detail?id=${_id}`;
  idAnchorElement.innerText = _id;
  dateCell.innerText = formatDate(createdAt);
  titleCell.innerText =
    books[0].book.title + (books.length > 1 ? ` 외 ${books.length - 1}종` : "");
  priceCell.innerText =
    (productsPrice + deliveryPrice).toLocaleString("ko-KR") +
    `원/${books.length}`;
  deliveryStateCell.innerText = deliveryState;

  orderTableBodyElement.appendChild(orderTemplateClone);
}

function formatDate(_date) {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Concatenate the components
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}
