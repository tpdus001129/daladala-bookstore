import { addCart, initIndexedDB } from "../indexedDB.js";

/** 현재 브라우저의 template 태그 지원 여부 확인 */
if ("content" in document.createElement("template")) {
  (async () => {
    await initIndexedDB();

    /** TODO: #35 API 변경 완료 시 아래 주석 코드로 대체할 것 */
    const books = await (await fetch("/api/v1/books")).json();

    // const { books, category } = await (await fetch("/api/v1/books")).json();
    // if (category) {
    //   const categoryContainerElement =
    //     document.querySelector("category-container");
    //   const templateCategoryElement =
    //     document.querySelector("#template-category");
    //   const categoryClone = document.importNode(
    //     templateCategoryElement.content,
    //     true,
    //   );
    //   const categoryElement = categoryClone.querySelector(".category");
    //   categoryElement.innerText = " > " + category.name;

    //   let categoryLoop = { ...category };
    //   while (categoryLoop) {
    //     const dividerElement = document.createElement("span");
    //     dividerElement.innerText = " > ";
    //     dividerElement.className = "category";

    //     const subCategoryElement = document.createElement("a");
    //     subCategoryElement.innerText = categoryLoop.subCategory.name;
    //     subCategoryElement.className = "category";
    //     subCategoryElement.href = `/product-list?category=${categoryLoop._id}`;

    //     categoryContainerElement.appendChild(dividerElement);
    //     categoryContainerElement.appendChild(subCategoryElement);

    //     categoryLoop = { ...category.subCategory };
    //   }
    // }

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
      imageElement.src = image;
      imageElement.alt = title;

      const nameElement = productClone.querySelector(".product-name");
      nameElement.innerText = title;

      const authorElement = productClone.querySelector(".product-author");
      authorElement.innerText = author;

      const priceElement = productClone.querySelector(".product-price");
      priceElement.innerText = price.toLocaleString("ko-KR") + "원";

      const cartButtonElement = productClone.querySelector(".add-cart-button");

      cartButtonElement.addEventListener("click", () => {
        addCart(_id);
      });

      listElement.appendChild(productClone);
    });
  })();
} else {
  alert(
    "template을 지원하지 않는 브라우저입니다. 다른 브라우저로 접속해주세요.",
  );
  location.href("/");
}
