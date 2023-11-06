document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.getElementById("payButton");

  payButton.addEventListener("click", function(){
    const confirmation = confirm("결제 하겠습니까?")

    if(confirmation) {
      alert("감사합니다.");
    } else {
      alert("취소되었습니다.");
    }
  })
})