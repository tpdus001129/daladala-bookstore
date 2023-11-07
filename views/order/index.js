document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.getElementById("payButton");
  const bankPayRadioButton = document.getElementById("bankPay");
  const cardRadioButton = document.getElementById("card")
  const bankPayDetails = document.querySelector(".bank-pay-details");

  payButton.addEventListener("click", function () {
    const confirmation = confirm("결제 하겠습니까?");

    if (confirmation) {
      alert("감사합니다.");
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
});
