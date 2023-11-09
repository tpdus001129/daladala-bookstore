import apis from "../apis.js";
import { getCartItems, initIndexedDB } from "../indexedDB.js";
import path from "../path.js";
import { storage, storageKey } from "../storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  handleOrderList();
  handlePaymentMethod();
  handleAddress();
});

async function handleOrderList() {
  const searchParams = new URLSearchParams(location.search);
  const bookIdQuery = searchParams.get("id");
  const quantityQuery = searchParams.get("quantity");

  let totalPrice = 0;
  /** 바로 구매 시 query param으로 물품 아이디와 수량 전달 됨 */
  if (bookIdQuery && quantityQuery) {
    totalPrice +=
      (await renderTemplate({
        bookId: bookIdQuery,
        quantity: quantityQuery,
      })) * quantityQuery;
  } else {
    await initIndexedDB();
    const cartItems = await getCartItems();

    totalPrice += (
      await Promise.all(
        cartItems.map(async ({ bookId, quantity, isChecked }) => {
          if (!isChecked) return 0;
          const price = await renderTemplate({ bookId, quantity });
          return price * quantity;
        }),
      )
    ).reduce((acc, cur) => acc + cur, 0);
  }

  const DELIVERY_FEE = 3000;
  document.querySelector("#products-price").innerText =
    totalPrice.toLocaleString("ko-KR");
  document.querySelector("#delivery-fee").innerText =
    DELIVERY_FEE.toLocaleString("ko-KR");
  document.querySelector("#total-price").innerText = (
    totalPrice + DELIVERY_FEE
  ).toLocaleString("ko-KR");
}

async function renderTemplate({ bookId, quantity }) {
  const orderTableBodyElement = document.querySelector("#order-table-body");
  const orderTemplateElement = document.querySelector("#order-template");

  const res = await apis.books.detail({ bookId });
  const { title, image, price } = await res.json();

  const orderTemplateClone = document.importNode(
    orderTemplateElement.content,
    true,
  );

  const [imageCell, titleCell, priceCell, quantityCell, totalCell] =
    orderTemplateClone.querySelectorAll("td");

  const imageElement = imageCell.querySelector("img");
  imageElement.src = image.path;
  imageElement.alt = title;
  titleCell.innerText = title;
  priceCell.innerText = price.toLocaleString("ko-KR") + " 원";
  quantityCell.innerText = quantity;
  totalCell.innerText = (price * quantity).toLocaleString("ko-KR") + " 원";

  orderTableBodyElement.appendChild(orderTemplateClone);
  return price;
}

function handlePaymentMethod() {
  const bankPayRadioButton = document.getElementById("bankPay");
  const cardRadioButton = document.getElementById("card");
  const kakaopayRadioButton = document.getElementById("kakaopay");
  const naverpayRadioButton = document.getElementById("naverpay");
  const bankPayDetails = document.querySelector(".bank-pay-details");
  const paymentButtonElement = document.querySelector("#payment-button");

  /** 결제 알림창 */
  paymentButtonElement.addEventListener("click", () => {
    if (confirm("확인을 눌러 주문을 완료해주세요.")) {
      alert("주문이 완료되었습니다.");
      location.href = path.ORDER_LIST;
    }
  });

  bankPayRadioButton.addEventListener("change", function () {
    if (bankPayRadioButton.checked) {
      bankPayDetails.style.display = "block";
    } else {
      bankPayDetails.style.display = "none";
    }
  });

  cardRadioButton.addEventListener("change", function () {
    if (cardRadioButton.checked) {
      bankPayDetails.style.display = "none";
    }
  });

  kakaopayRadioButton.addEventListener("change", function () {
    if (kakaopayRadioButton.checked) {
      bankPayDetails.style.display = "none";
    }
  });

  naverpayRadioButton.addEventListener("change", function () {
    if (naverpayRadioButton.checked) {
      bankPayDetails.style.display = "none";
    }
  });
}

async function handleAddress() {
  const deliverySelect = document.getElementById("deliverySelect");
  const custom = document.getElementById("custom");
  const customInput = document.getElementById("customInput");

  deliverySelect.addEventListener("change", function () {
    if (deliverySelect.value === "custom") {
      custom.style.display = `block`;
    } else {
      custom.style.display = "none";
      customInput.value = "";
    }
  });

  /** 주소 값 미리 가져오기 */
  const userId = storage.getItem(storageKey.userId);

  const { name, phoneNumber, address } = await (
    await apis.users.get({ userId })
  ).json();

  if (name) {
    document.querySelector("#name").value = name;
  }
  document.querySelector("#phone-number").value = phoneNumber;
  if (address) {
    document.querySelector("#zip-code").value = address.zipCode;
    document.querySelector("#detail1").value = address.detail1;
    document.querySelector("#detail2").value = address.detail2;
  }
}
