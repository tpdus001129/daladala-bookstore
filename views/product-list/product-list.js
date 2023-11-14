import apis from "../apis.js";
import { addCartItem, initIndexedDB } from "../indexedDB.js";
import path from "../path.js";

/** 현재 브라우저의 template 태그 지원 여부 확인 */
if ("content" in document.createElement("template")) {
  (async () => {
    await initIndexedDB();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const currentCategory = urlParams.get("category");

    const { books, category } = currentCategory
      ? await (await apis.books.category({ category: currentCategory })).json()
      : await (await apis.books.list()).json();

    if (category) {
      const categoryContainerElement = document.querySelector(
        ".category-container",
      );
      const templateCategoryElement =
        document.querySelector("#template-category");

      let categoryLoop = { ...category };
      while (categoryLoop) {
        const categoryClone = document.importNode(
          templateCategoryElement.content,
          true,
        );

        const categoryElement = categoryClone.querySelector("a");
        categoryElement.innerText = categoryLoop.name;
        categoryElement.className = "category";
        categoryElement.href = `${path.BOOKS}?category=${categoryLoop._id}`;

        categoryContainerElement.appendChild(categoryClone);

        categoryLoop = categoryLoop.subCategory
          ? { ...category.subCategory }
          : null;
      }
    }

    const templateProductElement = document.querySelector("#template-product");
    const listElement = document.querySelector("#product-list");

    books.forEach(({ _id, title, author, image, price }) => {
      const productClone = document.importNode(
        templateProductElement.content,
        true,
      );

      const linkElement = productClone.querySelector(".product-link");
      linkElement.href = `/product-detail?id=${_id}`;

      const imageElement = productClone.querySelector(".product-image");
      imageElement.src = image.path;
      imageElement.alt = title;

      const nameElement = productClone.querySelector(".product-name");
      nameElement.innerText = title;

      const authorElement = productClone.querySelector(".product-author");
      authorElement.innerText = author;

      const priceElement = productClone.querySelector(".product-price");
      priceElement.innerText = price.toLocaleString("ko-KR") + "원";

      const cartButtonElement = productClone.querySelector("#add-cart-button");
      const buyButtonElement = productClone.querySelector("#direct-buy-button");

      cartButtonElement.addEventListener("click", () => {
        addCartItem(_id);
      });

      buyButtonElement.addEventListener("click", () => {
        location.href = `${path.ORDER_PAYMENT}?id=${_id}&quantity=1`;
      });

      listElement.appendChild(productClone);
    });

    console.log("before");
    window.dispatchEvent(new Event("resize"));
    console.log("done");
  })();
} else {
  alert(
    "template을 지원하지 않는 브라우저입니다. 다른 브라우저로 접속해주세요.",
  );
  location.href("/");
}
