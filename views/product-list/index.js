import { initIndexedDB, addCart } from "../indexedDB.js";

(async () => {
  const books = await (await fetch("/api/v1/books")).json();
  await initIndexedDB();

  const productList = document.querySelector("#product-list");

  books.forEach(({ _id, title, author, image, price }) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const productImage = document.createElement("div");
    productImage.classList.add("product-image");
    const imageLink = document.createElement("a");
    imageLink.href = "";
    const img = document.createElement("img");
    img.alt = title;
    img.src = image;
    imageLink.appendChild(img);
    productImage.appendChild(imageLink);

    const productItemInfo = document.createElement("div");
    productItemInfo.classList.add("product-item-info");

    const productName = document.createElement("div");
    productName.classList.add("product-name");
    const nameLink = document.createElement("a");
    nameLink.href = "";
    nameLink.textContent = title;
    productName.appendChild(nameLink);

    const productAuthor = document.createElement("div");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = `저자: ${author}`;

    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.textContent = `가격: ${price}`;

    const productBuyBox = document.createElement("div");
    productBuyBox.classList.add("product-buy-box");
    const cartButton = document.createElement("button");
    cartButton.innerHTML = "<span>장바구니</span>";
    const purchaseButton = document.createElement("button");
    purchaseButton.innerHTML = "<span>바로구매</span>";

    cartButton.addEventListener("click", () => {
      addCart(_id);
    });

    productItem.appendChild(productImage);
    productItem.appendChild(productItemInfo);
    productItemInfo.appendChild(productName);
    productItemInfo.appendChild(productAuthor);
    productItemInfo.appendChild(productPrice);
    productItemInfo.appendChild(productBuyBox);
    productBuyBox.appendChild(cartButton);
    productBuyBox.appendChild(purchaseButton);

    productList.appendChild(productItem);
  });
})();
