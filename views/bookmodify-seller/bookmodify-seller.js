import path from "../path.js";

window.addEventListener("beforeunload", function () {
  localStorage.removeItem("subCategory");
});

// 카테고리 api - GET
const selectCreate = document.querySelector(".selectCreate");
const mainCategory = document.createElement("select");

async function getCategory() {
  try {
    const res = await fetch(`/api/v1/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await res.json();

    jsonData.forEach((category) => {
      // 메인 카테고리 생성
      const hiddenOption = new Option("", "");
      hiddenOption.hidden = true;
      const option = new Option(category.name, category._id);
      mainCategory.add(hiddenOption);
      mainCategory.add(option);

      // 서브 카테고리 생성
      if (category.subCategories && category.subCategories.length > 0) {
        const subMenu = document.createElement("select");

        const hiddenOption = new Option("", "");
        hiddenOption.hidden = true;
        subMenu.add(hiddenOption);

        category.subCategories.forEach((subCategory) => {
          const subOption = new Option(subCategory.name, subCategory._id);
          subMenu.add(subOption);
          subMenu.classList.add("subCategory");
          subMenu.classList.add("hidden-category");
          subMenu.classList.add(category._id);
        });
        selectCreate.appendChild(subMenu);
      }
      selectCreate.appendChild(mainCategory);
    });
  } catch (error) {
    console.error(error);
  }
}
(async function () {
  await getCategory();
  await getBooksData();
})();

// 카테고리 선택
mainCategory.addEventListener("change", () => {
  const mainValue = mainCategory.value;
  const subMenus = document.querySelectorAll(".subCategory");

  subMenus.forEach((subMenu) => {
    if (subMenu.classList.contains(mainValue)) {
      subMenu.classList.remove("hidden-category");
    } else {
      subMenu.classList.add("hidden-category");
    }
  });
});

document.addEventListener("change", (e) => {
  const subMenu = e.target;
  if (subMenu.classList.contains("subCategory")) {
    const subValue = subMenu.value;
    localStorage.setItem("subCategory", subValue);
  }
});

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
  if (inventoryCount.value == "") {
    inventoryCount.value = 0;
  }
  inventoryCount.value = parseInt(inventoryCount.value) + 1;
});

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

      const mainValue = jsonData.category.parent._id;
      const subValue = jsonData.category._id;
      const allSubCategory = document.querySelectorAll(".subCategory");

      // 메인 카테고리
      for (let i = 0; i < mainCategory.options.length; i++) {
        if (mainCategory.options[i].value == mainValue) {
          mainCategory.options[i].selected = true;
        }
      }

      // 서브 카테고리
      for (let i = 0; i < allSubCategory.length; i++) {
        if (allSubCategory[i].classList.contains(mainValue)) {
          allSubCategory[i].classList.remove("hidden-category");

          const subSelect = allSubCategory[i];
          for (let j = 0; j < subSelect.options.length; j++) {
            if (subSelect.options[j].value == subValue) {
              subSelect.options[j].selected = true;
            }
          }
        } else {
          allSubCategory[i].classList.add("hidden-category");
        }
      }

      const imgSrc = document.createElement("img");
      imgSrc.classList = "imgSrc";
      imgSrc.src = jsonData.image.path;
      bookImg.innerHTML = "";
      bookImg.appendChild(imgSrc);

      // 수정되는 데이터
      localStorage.setItem("subCategory", jsonData.category._id);

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

// 도서 등록/수정 api - POST/PUT
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const saveBtn = document.querySelector(".saveBtn");
saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const subKey = localStorage.getItem("subCategory");

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
      const res = await fetch(`/api/v1/books/${queryParameter}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error(res);
      alert("수정이 완료되었습니다.");
      location.href = path.ADMIN_BOOK_LIST;
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
