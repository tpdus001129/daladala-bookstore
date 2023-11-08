const bookImg = document.querySelector("img");
const bookTitle = document.querySelector(".title");
const bookPrice = document.querySelector(".price");
const bookQuantity = document.querySelector(".quantity");
const bookAuthor = document.querySelector(".author");
const bookPublisher = document.querySelector(".publisher");

const bookId = "654a254ab48028e071e58cf8";

fetch(`/api/v1/books/${bookId}`)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error("Book not found");
    } else {
      throw new Error("Internal Server Error");
    }
  })
  .then((data) => {
    console.log(data);
    bookImg.alt = data.title;
    bookTitle.innerHTML = data.title;
    bookPrice.innerHTML = (data.price).toLocaleString("ko-KR") + "원";
    bookQuantity.innerHTML = `현재 재고: ${data.inventoryCount}권`
    bookAuthor.innerHTML = data.author;
    bookPublisher.innerHTML = `/ ${data.publisher}`;
  })
  .catch((error) => {
    console.error("도서 정보를 불러오는 중 오류가 발생했습니다:", error);
  });
