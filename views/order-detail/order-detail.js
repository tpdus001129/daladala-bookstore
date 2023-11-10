import apis from "../apis.js";
import path from "../path.js";

document.addEventListener("DOMContentLoaded", async () => {
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("id");

  const res = await apis.users.orderDetail({ orderId });
  const order = await res.json();
  const { books, deliveryPrice, productsPrice, recipient, deliveryState } =
    order;

  books.forEach(({ book, count }) => {
    renderTemplate({ bookId: book._id, quantity: count });
  });

  document.querySelector("#products-price").innerText =
    productsPrice.toLocaleString("ko-KR");
  document.querySelector("#delivery-fee").innerText =
    deliveryPrice.toLocaleString("ko-KR");
  document.querySelector("#total-price").innerText = (
    productsPrice + deliveryPrice
  ).toLocaleString("ko-KR");

  const isEditable = deliveryState === "배송준비중";
  if (!isEditable) handleUneditable();

  handleRecipient(recipient);
  document
    .querySelector("#edit-recipient-button")
    .addEventListener("click", async () => {
      try {
        if (confirm("수령자 정보를 변경하시겠습니까?")) {
          const phoneNumber = document.querySelector("#phone-number").value;
          const name = document.querySelector("#name").value;
          const zipCode = document.querySelector("#zip-code").value;
          const detail1 = document.querySelector("#detail1").value;
          const detail2 = document.querySelector("#detail2").value;
          if (!phoneNumber || !name || !zipCode || !detail1 || !detail2) {
            alert("배송 정보를 모두 입력해주세요.");
            return;
          }
          await apis.users.orderEdit({
            orderId,
            recipient: {
              phoneNumber,
              name,
              address: {
                zipCode,
                detail1,
                detail2,
              },
            },
          });
          alert("수정에 성공했습니다.");
        }
      } catch (err) {
        alert("수정에 실패했습니다.");
        console.error(err);
      }
    });

  document
    .querySelector("#cancel-order-button")
    .addEventListener("click", async () => {
      try {
        const res = await apis.users.orderCancel({ orderId });
        if (!res.ok) throw new Error(res);
        alert("주문 취소에 성공했습니다.");
        location.href = path.ORDER_LIST;
      } catch (err) {
        alert("주문 취소에 실패횄습니다.");
        console.error(err);
      }
    });
});

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

async function handleRecipient(recipient) {
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

  const { address, name, phoneNumber } = recipient;

  document.querySelector("#name").value = name;
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

async function handleUneditable() {
  const recipientSectionElement = document.querySelector("#recipient-section");
  const infoElement = document.createElement("p");
  infoElement.innerText =
    "배송중, 배송 완료 시에는 배송정보를 수정이 불가합니다.";

  recipientSectionElement.appendChild(infoElement);
  recipientSectionElement
    .querySelectorAll("input")
    .forEach((e) => (e.disabled = true));
  recipientSectionElement
    .querySelectorAll("button")
    .forEach((e) => (e.disabled = true));
  recipientSectionElement
    .querySelectorAll("select")
    .forEach((e) => (e.disabled = true));

  document.querySelector("#cancel-order-button").disabled = true;
}
