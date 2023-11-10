import { addCartItem, initIndexedDB } from "../indexedDB.js";
import path from "../path.js";

const productImg = document.querySelector("img");
const productName = document.querySelector(".product-name");
const productAuthor = document.querySelector(".product-author");
const productCompany = document.querySelector(".product-company");
const productPrice = document.querySelector(".product-price");
const productContent = document.querySelector(".product-content");
const productNum = document.querySelector(".product-num");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const productTotalPrice = document.querySelector(".product-total-price");
const resultElement = document.getElementById("result");
const addBtn = document.querySelector(".add-btn");
const buyBtn = document.querySelector(".buy-btn");

const url = new URL(window.location.href);
const bookId = url.searchParams.get("id");

let bookData = null; // 도서 정보 저장

function updateBookInfo(data) {
  productImg.alt = data.title;
  productImg.src = data.image.path;
  productName.innerHTML = data.title;
  productAuthor.innerHTML = data.author;
  productCompany.innerHTML = data.publisher;
  productPrice.innerHTML = data.price.toLocaleString("ko-KR") + "원";
  productContent.innerHTML = data.content;
  productNum.innerHTML = `${data.inventoryCount}권`;

  bookData = data;
}

function updatePrice() {
  let resultNum = Number(resultElement.innerText);
  if (bookData) {
    let priceToKr = bookData.price;
    productTotalPrice.innerHTML =
      (priceToKr * resultNum).toLocaleString("ko-KR") + "원";
  }
}

function count(type) {
  let number = resultElement.innerText;

  if (type === "plus") {
    number = parseInt(number) + 1;
  } else if (type === "minus") {
    if (number < 2) {
      alert("구매가능한 수량이 없습니다.");
      location.reload();
    }
    number = parseInt(number) - 1;
  }
  resultElement.innerText = number;
  updatePrice();
  return number;
}

async function fetchData(bookId) {
  try {
    await initIndexedDB();
    const res = await fetch(`/api/v1/books/${bookId}`);
    if (res.status === 200) {
      const data = await res.json();
      updateBookInfo(data);
      updatePrice();
    } else if (res.status === 400) {
      throw new Error("Book not found");
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (error) {
    console.error("도서 정보를 불러오는 중 오류가 발생했습니다:", error);
  }
}

if (bookId) {
  fetchData(bookId);

  minusBtn.addEventListener("click", function () {
    count("minus");
  });
  plusBtn.addEventListener("click", function () {
    count("plus");
  });

  addBtn.addEventListener("click", function () {
    const newQuantity = Number(resultElement.innerText);
    addCartItem(bookId, newQuantity);
  });

  buyBtn.addEventListener("click", function () {
    const newQuantity = Number(resultElement.innerText);
    location.href = `${path.ORDER_PAYMENT}?id=${bookId}&quantity=${newQuantity}`;
  });
} else {
  console.error("URL에서 bookId를 찾을 수 없습니다.");
}
