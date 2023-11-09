import { storageKey } from './storage';

const userId = localStorage.getItem(storageKey.order_Id);

async function getUserData() {
  try {
    const res = await fetch(`/api/v1/users/${userId}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData = await res.json(); 
    const tbody = document.querySelector('tbody');
    const messageDiv = document.getElementById('order-list-message'); // "주문 내역이 없습니다." 메시지를 가리킬 요소

    if (jsonData.length === 0) {
      // 주문 내역이 없을 때
      messageDiv.style.display = 'block'; // 메시지를 보이게 설정
    } else {
      // 주문 내역이 있을 때
      messageDiv.style.display = 'none'; // 메시지를 숨기게 설정

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
