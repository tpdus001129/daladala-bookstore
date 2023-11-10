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

const mainCategory = document.querySelector(".mainCategory");
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
      console.log(imgSrc.src);

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
    formData.set("category", subCategory.value);
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
      const res = await fetch(`/api/v1/books/${queryParameter}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        console.log("PUT 요청");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("등록");
    formData.append("category", subCategory.value);
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

      if (res.ok) {
        console.log("저장 완료");
      }
    } catch (error) {
      console.error(error);
    }
  }
});
