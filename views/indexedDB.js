const dbName = "CartDB";

let db;

function initIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 객체 스토어 생성
      if (!db.objectStoreNames.contains("cart")) {
        const cartStore = db.createObjectStore("cart", { keyPath: "bookId" });
        cartStore.createIndex("quantity", "quantity", { unique: false });
      }
    };
  });
}

function addCart(bookId) {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  // 항목이 이미 카트에 있는지 확인
  const request = cartStore.get(bookId);

  request.onsuccess = (event) => {
    const existingItem = event.target.result;
    if (existingItem) {
      existingItem.quantity++;
      cartStore.put(existingItem);
    } else {
      cartStore.add({ bookId, quantity: 1 });
    }
  };

  transaction.oncomplete = () => {
    if (confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
      location.href = "/cart";
    }
  };
}

function getCart() {
  return new Promise((resolve) => {
    const transaction = db.transaction(["cart"], "readonly");
    const cartStore = transaction.objectStore("cart");

    const items = [];
    const request = cartStore.openCursor();

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        resolve(items);
      }
    };
  });
}

function editCart(bookId, newQuantity) {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  const request = cartStore.get(bookId);

  request.onsuccess = (event) => {
    const cartItem = event.target.result;
    if (cartItem) {
      cartItem.quantity = newQuantity;
      if (newQuantity <= 0) {
        cartStore.delete(bookId);
      } else {
        cartStore.put(cartItem);
      }
      location.reload();
    }
  };
}

function clearCart() {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  const request = cartStore.clear();

  request.onsuccess = () => {
    location.reload();
  };

  request.onerror = (event) => {
    console.error(
      "카트를 비우는 중에 오류가 발생했습니다:",
      event.target.error,
    );
  };
}

function deleteCart(bookId) {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  const request = cartStore.delete(bookId);

  request.onsuccess = () => {
    location.reload();
  };

  request.onerror = (event) => {
    console.error(
      `bookId ${bookId}를 카트에서 제거하는 중에 오류가 발생했습니다:`,
      event.target.error,
    );
  };
}

export { initIndexedDB, addCart, getCart, editCart, clearCart, deleteCart };
