const sellerId = "6545dc26e7a26c5e20c8cdea";

async function fetchData(sellerId) {
  try {
    const res = await fetch(`/api/v1/users/${sellerId}/books`);
    if (res.status === 200) {
      const data = await res.json();
      const template = document.querySelector("#template-product");
      const container = document.getElementById("main-container");

      data.forEach((book) => {
        const clone = document.importNode(template.content, true);
        clone.querySelector(".title").textContent = book.title;
        clone.querySelector(".price").textContent =
          book.price.toLocaleString("ko-KR") + "원";
        clone.querySelector(
          ".quantity",
        ).textContent = `${book.inventoryCount} 권`;
        clone.querySelector(".author").textContent = book.author;
        clone.querySelector(".publisher").textContent = ` / ${book.publisher}`;

        const deleteBtn = clone.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", function () {});

        container.appendChild(clone);
      });
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
fetchData(sellerId);

const deleteAllBtn = document.querySelector(".deleteAllBtn");
deleteAllBtn.addEventListener("click", function () {});