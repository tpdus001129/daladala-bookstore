import { storage, storageKey } from "../storage.js";

async function fetchData() {
  try {
    const sellerId = storage.getItem(storageKey.userId);
    const res = await fetch(`/api/v1/users/${sellerId}/books`);
    if (res.status === 200) {
      const data = await res.json();
      const template = document.querySelector("#template-product");
      const container = document.getElementById("main-container");

      data.forEach((book) => {
        console.log(book);
        console.log(book["category"]);
        // console.log(book.category.parent);
        const clone = document.importNode(template.content, true);

        if (book.category === null) {
          clone.querySelector(".parent-category").textContent = "";
          clone.querySelector(".sub-category").textContent = "";
        } else {
          clone.querySelector(".parent-category").textContent =
            book.category.parent.name;
          clone.querySelector(
            ".sub-category",
          ).textContent = `> ${book.category.name}`;
        }

        clone.querySelector("img").src = book.image.path;
        clone.querySelector(".title").textContent = book.title;
        clone.querySelector(".price").textContent =
          book.price.toLocaleString("ko-KR") + "원";
        clone.querySelector(
          ".quantity",
        ).textContent = `${book.inventoryCount} 권`;
        clone.querySelector(".author").textContent = book.author;
        clone.querySelector(".publisher").textContent = ` / ${book.publisher}`;

        const editBtn = clone.querySelector(".modifyBtn");
        editBtn.addEventListener("click", function () {
          location.href = `/bookmodify-seller?id=${book._id}`;
        });

        const deleteBtn = clone.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", function () {
          if (confirm("삭제하시겠습니까?")) {
            deleteBook(book._id);
          }
        });

        async function deleteBook(bookId) {
          try {
            const res = await fetch(`/api/v1/books/${bookId}`, {
              method: "DELETE",
            });
            if (res.status === 200) {
              console.log("책이 삭제되었습니다.");
              alert("삭제되었습니다.");
              location.reload();
              // 책이 성공적으로 삭제되었을 때 실행할 코드 추가
            } else if (res.status === 404) {
              console.log("책을 찾을 수 없습니다.");
            } else if (res.status === 500) {
              console.log("서버 오류로 책을 삭제할 수 없습니다.");
            } else {
              console.log("알 수 없는 오류가 발생했습니다.");
            }
          } catch (error) {
            console.error("책을 삭제하는 중 오류가 발생했습니다:", error);
          }
        }

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
fetchData();
