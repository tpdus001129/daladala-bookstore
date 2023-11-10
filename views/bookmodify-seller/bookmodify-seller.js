import path from "../path.js";

// 카테고리 선택
const mainCategory = document.querySelector(".mainCategory");
mainCategory.addEventListener("change", (e) => {
  const mainValue = e.target.value;
  const allSubCategory = document.querySelectorAll(".subCategory");

  allSubCategory.forEach((sub) => {
    sub.classList.add("hidden-category");
  });

  const subCategoryCreate = document.querySelector("." + mainValue);
  if (mainValue) {
    subCategoryCreate.classList.remove("hidden-category");

    subCategoryCreate.addEventListener("change", (e) => {
      const subValue = e.target.value;
      localStorage.setItem("subCategory", subValue);
    });
  }
});
// 서브카테고리에서 선택한 value값 => 로컬스토리지 value값 => 도서 POST/PUT 에서 사용
const subKey = localStorage.getItem("subCategory");

// 이미지 업로드
const imgUpload = document.getElementById("imgUpload");
const bookImg = document.querySelector(".bookImg");

imgUpload.addEventListener("change", function () {
  const imgFile = new FileReader();
  imgFile.addEventListener("load", () => {
    const imgSrc = document.createElement("img");
    imgSrc.classList = "imgSrc";
    imgSrc.src = imgFile.result;
    bookImg.innerHTML = "";
    bookImg.appendChild(imgSrc);
  });
  imgFile.readAsDataURL(this.files[0]);
});

//재고 버튼
const minusBtn = document.querySelector(".minusBtn");
const plusBtn = document.querySelector(".plusBtn");
minusBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inventoryCount.value > 0) {
    inventoryCount.value = parseInt(inventoryCount.value) - 1;
  }
});
plusBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inventoryCount.value = parseInt(inventoryCount.value) + 1;
});

const subCategory = document.querySelector(".subCategory");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const publisher = document.querySelector(".publisher");
const price = document.querySelector(".price");
const pages = document.querySelector(".pages");
const inventoryCount = document.querySelector(".quantity");
const content = document.querySelector(".bookExplain");

const searchParams = new URLSearchParams(window.location.search);
const queryParameter = searchParams.get("id");

// 도서 api - GET
async function getBooksData() {
  if (queryParameter) {
    try {
      const res = await fetch(`/api/v1/books/${queryParameter}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      console.log("GET 요청", jsonData);

      const mainValue = jsonData.category.parent.name;
      const subValue = jsonData.category._id;

      const allSubCategory = document.querySelectorAll(".subCategory");
      for (let i = 0; i < allSubCategory.length; i++) {
        if (allSubCategory[i].classList.contains(mainValue)) {
          allSubCategory[i].classList.remove("hidden-category");
        }
      }

      for (let i = 0; i < mainCategory.options.length; i++) {
        if (mainCategory.options[i].value == mainValue) {
          mainCategory.options[i].selected = true;
        }
      }

      for (let i = 0; i < subCategory.options.length; i++) {
        if (subCategory.options[i].value == subValue) {
          subCategory.options[i].selected = true;
        }
      }
      const imgSrc = document.createElement("img");
      imgSrc.classList = "imgSrc";
      imgSrc.src = jsonData.image.path;
      bookImg.innerHTML = "";
      bookImg.appendChild(imgSrc);

      title.value = jsonData.title;
      author.value = jsonData.author;
      publisher.value = jsonData.publisher;
      price.value = jsonData.price;
      pages.value = jsonData.pages;
      inventoryCount.value = jsonData.inventoryCount;
      content.value = jsonData.content;
    } catch (error) {
      console.error(error);
    }
  }
}
getBooksData();

// 도서 등록/수정 api - POST/PUT
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const saveBtn = document.querySelector(".saveBtn");
saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = new FormData();

  if (queryParameter) {
    formData.set("category", subKey);
    formData.set("image", imgUpload.files[0]);
    formData.set("title", title.value);
    formData.set("author", author.value);
    formData.set("publisher", publisher.value);
    formData.set("price", price.value);
    formData.set("inventoryCount", inventoryCount.value);
    formData.set("content", content.value);
    formData.set("pages", pages.value);
    formData.set("publicationDate", "2023-10-30");
    formData.set("releaseDate", `${year}-${month}-${date}`);

    try {
      await fetch(`/api/v1/books/${queryParameter}`, {
        method: "PUT",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    formData.append("category", subKey);
    formData.append("image", imgUpload.files[0]);
    formData.append("title", title.value);
    formData.append("author", author.value);
    formData.append("publisher", publisher.value);
    formData.append("price", price.value);
    formData.append("inventoryCount", inventoryCount.value);
    formData.append("content", content.value);
    formData.append("pages", pages.value);
    formData.append("publicationDate", "2023-10-30");
    formData.append("releaseDate", `${year}-${month}-${date}`);
    try {
      const res = await fetch(`/api/v1/books`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(res);
      alert("등록이 완료되었습니다.");
      location.href = path.ADMIN_BOOK_LIST;
    } catch (error) {
      console.error(error);
    }
  }
});
