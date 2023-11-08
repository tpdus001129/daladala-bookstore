const bookImg = document.querySelector("img");
const bookTitle = document.querySelector(".title");
const bookPrice = document.querySelector(".price");
const bookQuantity = document.querySelector(".quantity");
const bookAuthor = document.querySelector(".author");
const bookPublisher = document.querySelector(".publisher");

// const deleteAll = document.querySelector(".deleteAllBtn");
// const deleteItem = document.querySelector(".deleteBtn");

const bookId = "654a254ab48028e071e58cf8";

async function fetchData() {
  try {
    // await initIndexedDB();
    const res = await fetch(`/api/v1/books/${bookId}`);
    if (res.status === 200) {
      const data = await res.json();
      bookImg.alt = data.title;
      bookTitle.innerHTML = data.title;
      bookPrice.innerHTML = data.price.toLocaleString("ko-KR") + "원";
      bookQuantity.innerHTML = `현재 재고: ${data.inventoryCount}권`;
      bookAuthor.innerHTML = data.author;
      bookPublisher.innerHTML = `/ ${data.publisher}`;
    } else if (res.status === 400) {
      throw new Error("Book not found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (error) {
    console.error("도서 정보를 불러오는 중 오류가 발생했습니다:", error);
  }
}
// 호출
fetchData();

// deleteAll.addEventListener("click", function () {
//   fetch("http://백엔드 주소/cart", {
//     method: "DELETE",
//     headers: {
//       Authorization: localStorage.getItem("access_token"),
//     },
//     body: JSON.stringify({
//       //삭제하고싶은 데이터의 물건 id
//       cart_id: data.cart_id,
//     }),
//   });
// });

// deleteItem.addEventListener("click", function () {});
