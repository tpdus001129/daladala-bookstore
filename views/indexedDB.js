const dbName = "CartDB";

let db;

export function initIndexedDB() {
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
        cartStore.createIndex("isChecked", "isChecked", { unique: false });
      }
    };
  });
}

export function addCartItem(bookId, quantity = 1) {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  // 항목이 이미 카트에 있는지 확인
  const request = cartStore.get(bookId);

  request.onsuccess = (event) => {
    const existingItem = event.target.result;
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.isChecked = true;
      cartStore.put(existingItem);
    } else {
      cartStore.add({ bookId, quantity, isChecked: true });
    }
  };

  transaction.oncomplete = () => {
    if (confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
      location.href = "/cart";
    }
  };
}

export function getCartItems() {
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

export function editCartItemQuantity(bookId, quantity) {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  const request = cartStore.get(bookId);

  request.onsuccess = (event) => {
    const cartItem = event.target.result;
    /** TODO: 에러핸들링 */
    if (!cartItem) {
      console.error("no cartItem");
      return;
    }
    if (quantity <= 0) {
      cartStore.delete(bookId);
    } else {
      cartItem.quantity = quantity;
      cartStore.put(cartItem);
    }
  };
}

export function editCartItemCheckStatus(bookId, isChecked) {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  const request = cartStore.get(bookId);

  request.onsuccess = (event) => {
    const cartItem = event.target.result;
    /** TODO: 에러핸들링 */
    if (!cartItem) {
      console.error("no cartItem");
      return;
    }
    cartItem.isChecked = isChecked;
    cartStore.put(cartItem);
  };
}

export function clearCartItems() {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  const request = cartStore.clear();

  request.onerror = (event) => {
    console.error(
      "카트를 비우는 중에 오류가 발생했습니다:",
      event.target.error,
    );
  };
}

export function deleteCartItem(bookId) {
  const transaction = db.transaction(["cart"], "readwrite");
  const cartStore = transaction.objectStore("cart");

  const request = cartStore.delete(bookId);

  request.onerror = (event) => {
    console.error(
      `bookId ${bookId}를 카트에서 제거하는 중에 오류가 발생했습니다:`,
      event.target.error,
    );
  };
}
