import apis from "../apis.js";
import path from "../path.js";
import { deleteCartItem, getCartItems, initIndexedDB } from "../indexedDB.js";
import { storage, storageKey } from "../storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  handleOrderList();
  handlePaymentMethod();
  handleAddress();
});

async function handleOrderList() {
  await initIndexedDB();
  const cartItems = await getCartItems();

  const searchParams = new URLSearchParams(location.search);
  const bookIdQuery = searchParams.get("id");
  const quantityQuery = searchParams.get("quantity");

  let totalPrice = 0;
  /** 바로 구매 시 query param으로 물품 아이디와 수량 전달 됨 */
  const isDirectBuy = bookIdQuery && quantityQuery;
  if (isDirectBuy) {
    totalPrice +=
      (await renderTemplate({
        bookId: bookIdQuery,
        quantity: quantityQuery,
      })) * quantityQuery;
  } else {
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

  const paymentButtonElement = document.querySelector("#payment-button");

  /** 결제 알림창 */
  paymentButtonElement.addEventListener("click", async () => {
    if (confirm("확인을 눌러 주문을 완료해주세요.")) {
      try {
        const phoneNumber = document.querySelector("#phone-number").value;
        const name = document.querySelector("#name").value;
        const zipCode = document.querySelector("#zip-code").value;
        const detail1 = document.querySelector("#detail1").value;
        const detail2 = document.querySelector("#detail2").value;
        if (!phoneNumber || !name || !zipCode || !detail1 || !detail2) {
          alert("배송 정보를 모두 입력해주세요.");
          return;
        }
        await apis.users.orderPost({
          recipient: {
            phoneNumber,
            name,
            address: {
              zipCode,
              detail1,
              detail2,
            },
          },
          books: isDirectBuy
            ? [{ book: bookIdQuery, count: quantityQuery }]
            : cartItems
                .filter(({ isChecked }) => isChecked)
                .map((item) => ({
                  book: item.bookId,
                  count: item.quantity,
                })),
          deliveryPrice: DELIVERY_FEE,
          productsPrice: totalPrice,
        });

        alert("주문이 완료되었습니다.");

        cartItems.forEach(({ bookId, isChecked }) => {
          if (isChecked) deleteCartItem(bookId);
        });

        location.href = path.ORDER_LIST;
      } catch (err) {
        alert("주문에 실패했습니다.");
        console.error(err);
      }
    }
  });
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

  if (!userId) return;

  const { name, phoneNumber, address } = await (
    await apis.users.profile(userId)
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

  /** daum api */
  const openAddressButtonElement = document.querySelector(
    "#address-popup-button",
  );
  const zipCodeElement = document.querySelector("#zip-code");
  const detail1Element = document.querySelector("#detail1");

  openAddressButtonElement.addEventListener("click", openAddressPopup);
  zipCodeElement.addEventListener("click", openAddressPopup);
  detail1Element.addEventListener("click", openAddressPopup);

  function openAddressPopup() {
    // eslint-disable-next-line no-undef
    new daum.Postcode({
      oncomplete: function (data) {
        var address = "";
        var extraAddress = "";

        if (data.userSelectedType === "R") {
          address = data.roadAddress;
        } else {
          address = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddress +=
              extraAddress !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          if (extraAddress !== "") {
            extraAddress = " (" + extraAddress + ")";
          }
          zipCodeElement.value = data.zonecode;
          detail1Element.value = address;
          document.getElementById("detail2").focus();
        } else {
          zipCodeElement.value = "";
          detail1Element.value = "";
        }
      },
    }).open();
  }
}
