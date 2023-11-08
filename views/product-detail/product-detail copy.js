const productImg = document.querySelector("img");

const productName = document.querySelector(".product-name");
const productAuthor = document.querySelector(".product-author");
const productCompany = document.querySelector(".product-company");
const productContent = document.querySelector(".product-content");

const productNum = document.querySelector(".product-num");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");

const productPrice = document.querySelector(".product-price");
const resultElement = document.getElementById("result");

const addBtn = document.querySelector(".add-btn");
const buyBtn = document.querySelector(".buy-btn");

let bookData = null; // 도서 정보저장

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
    // data보여주고
    updateBookInfo(data);

    // 가격 업데이트
    updatePrice();
  })
  .catch((error) => {
    console.error("도서 정보를 불러오는 중 오류가 발생했습니다:", error);
  });

function count(type) {
  let number = resultElement.innerText;

  if (type === "plus") {
    number = parseInt(number) + 1;
  } else if (type === "minus") {
    number = parseInt(number) - 1;
  }
  resultElement.innerText = number;
  updatePrice(); // count 함수에서 updatePrice 함수 호출
  return number;
}
minusBtn.addEventListener("click", function () {
  count("minus");
});
plusBtn.addEventListener("click", function () {
  count("plus");
});

// 도서 정보
function updateBookInfo(data) {
  productImg.alt = data.title;
  productName.innerHTML = data.title;
  productAuthor.innerHTML = data.author;
  productCompany.innerHTML = data.publisher;
  productContent.innerHTML = data.content;
  productNum.innerHTML = data.inventoryCount;

  bookData = data; // 도서 정보 저장
}

// 가격 업데이트
function updatePrice() {
  let resultNum = Number(resultElement.innerText);
  if (bookData) {
    let priceToKr = bookData.price;
    productPrice.innerHTML = (priceToKr * resultNum).toLocaleString("ko-KR");
  }
}

// 장바구니
addBtn.addEventListener("click", function () {
  


  if (confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
    location.href = "/cart";
  }
});
// 바로구매
buyBtn.addEventListener("click", function () {});
