import apis from "../apis.js";
import { checkAuth } from "../auth.js";

checkAuth();

(async () => {
  const res = await apis.admin.orderList();
  const orderList = await res.json();

  console.log(orderList);
  orderList.forEach((order) => {
    renderOrderRowTemplate(order);
  });
})();

function renderOrderRowTemplate(order) {
  const { user, _id, createdAt, books, productsPrice, deliveryState } = order;

  const orderTableBodyElement = document.querySelector("#order-table-body");
  const orderTemplateElement = document.querySelector("#order-template");

  const orderTemplateClone = document.importNode(
    orderTemplateElement.content,
    true,
  );

  const [
    idCell,
    dateCell,
    titleCell,
    priceCell,
    deliveryStateCell,
    deleteButtonCell,
  ] = orderTemplateClone.querySelectorAll("td");

  const idAnchorElement = idCell.querySelector("a");
  idAnchorElement.href = `/order-detail?id=${_id}`;
  idAnchorElement.innerText = _id;

  dateCell.innerText = formatDate(createdAt);

  titleCell.innerText =
    books[0].book.title + (books.length > 1 ? ` 외 ${books.length - 1}종` : "");

  priceCell.innerText =
    productsPrice.toLocaleString("ko-KR") + `원 / ${books.length}`;

  const deliveryStateSelectElement = deliveryStateCell.querySelector("select");
  deliveryStateSelectElement.value = deliveryState;
  const CANCEL_ORDER = "주문취소";
  if (deliveryState === CANCEL_ORDER) {
    deliveryStateSelectElement.disabled = true;
    deliveryStateCell.innerText = CANCEL_ORDER;
  } else {
    deliveryStateSelectElement.addEventListener("change", async (event) => {
      try {
        const newDeliveryState = event.target.value;
        const res = await apis.admin.orderStateEdit({
          userId: user._id,
          orderId: _id,
          deliveryState: newDeliveryState,
        });
        if (!res.ok) throw new Error(res);
      } catch (err) {
        alert("변경 실패!");
        deliveryStateSelectElement.value = deliveryState;
        console.error(err);
      }
    });
  }

  const orderDeleteButtonElement = deleteButtonCell.querySelector("button");
  orderDeleteButtonElement.addEventListener("click", async () => {
    if (confirm("주문 내역을 삭제하시겠습니까?")) {
      try {
        const res = await apis.users.orderDelete({ orderId: _id });
        if (res.status < 400) location.reload();
      } catch (err) {
        alert("삭제에 실패했습니다.");
        console.error(err);
      }
    }
  });

  orderTableBodyElement.appendChild(orderTemplateClone);
}

function formatDate(_date) {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Concatenate the components
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
}
