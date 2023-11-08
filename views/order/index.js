document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.getElementById("payButton");
  const bankPayRadioButton = document.getElementById("bankPay");
  const cardRadioButton = document.getElementById("card")
  const kakaopayRadioButton = document.getElementById("kakaopay");
  const naverpayRadioButton = document.getElementById("naverpay");
  const bankPayDetails = document.querySelector(".bank-pay-details");




  /** 결제 알림창 */
  payButton.addEventListener("click", function () {
    const confirmation = confirm("결제 하겠습니까?");

    if (confirmation) {
      alert("감사합니다.");
      window.location.href = "../index.html";
    } else {
      alert("취소되었습니다.");
    }
  });

  /** 라디오 버튼 */
  bankPayRadioButton.addEventListener("change", function () {
      if (bankPayRadioButton.checked) {
        bankPayDetails.style.display = "block";
        } else { 
          bankPayDetails.style.display = "none";
      }
    });

    cardRadioButton.addEventListener("change", function () {
        if (cardRadioButton.checked) {
          bankPayDetails.style.display = "none";
        }
      });

      kakaopayRadioButton.addEventListener("change", function () {
        if (kakaopayRadioButton.checked) {
          bankPayDetails.style.display = "none";
        }
      });

      naverpayRadioButton.addEventListener("change", function () {
        if (naverpayRadioButton.checked) {
          bankPayDetails.style.display = "none";
        }
      });

      /** 주소 직적입력창 */
      const deliverySelect = document.getElementById("deliverySelect");
      const custom = document.getElementById("custom");
      const customInput = document.getElementById("customInput");

      deliverySelect.addEventListener('change', function(){

        if (deliverySelect.value === 'custom'){
          custom.style.display = `block`;
        } else {
          custom.style.display = 'none';
          customInput.value ='';
        }
      });

   

      /** 주소 값 미리 가져오기 */
      const userId = localStorage.getItem("USER_ID");

      async function getUserData() {
        try {
          const res = await fetch(`/api/v1/users/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const jsonData = await res.json();
      
          document.querySelector('#name').value = jsonData.name; 
          document.querySelector('#phoneNumber').value = jsonData.phoneNumber; 
      
          console.log(jsonData);
        } catch (error) {
          console.error('API 호출 중 오류 발생', error);
        }
      }
      
      getUserData();
      

});
