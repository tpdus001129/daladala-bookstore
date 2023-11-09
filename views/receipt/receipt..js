import { storageKey } from './storage';

document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem(storageKey.userId);

  const tbody = document.querySelector('tbody');
  const messageDiv = document.getElementById('order-list-message');

  async function getUserData() {
    try {
      const res = await fetch(`/api/v1/users/${userId}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonData = await res.json();

      if (jsonData.length === 0) {
        messageDiv.style.display = 'block';
      } else {
        messageDiv.style.display = 'none';

        jsonData.forEach(order => {
          const template = document.querySelector('#order-complete');
          const clone = document.importNode(template.content, true);

          clone.querySelector('#createdAt').textContent = order.createdAt;
          clone.querySelector('#books').textContent = order.books;
          clone.querySelector('#aproductsPrice').textContent = order.aproductsPrice;
          clone.querySelector('#deliveryState').textContent = order.deliveryState;

          tbody.appendChild(clone);
        });
      }

      console.log(jsonData);
    } catch (error) {
      console.error('API 호출 중 오류 발생', error);
    }
  }

  getUserData();
});
