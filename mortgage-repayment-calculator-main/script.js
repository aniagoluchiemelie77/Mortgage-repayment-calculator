'use strict';
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const resultBox = document.querySelector(".container-right_active");
    const defaultBox = document.querySelector(".container-right_notactive");
    const monthlyEl = resultBox.querySelector("#monthly");
    const totalEl = resultBox.querySelector("#total");
    const clearLink = document.querySelector(".container-left_header a");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputs = form.querySelectorAll("input[type='number']");
        const mortgageAmount = form.querySelector('.amount');
        const mortgageTerm = form.querySelector('.term');
        const mortgagePercent = form.querySelector('.percent');
        const radios = form.querySelectorAll("input[type='radio']");
        const errorMessages = form.querySelectorAll(".error-message");
        const errorDivsSmall = form.querySelectorAll(".input2");
        const errorSpan = form.querySelectorAll(".input2 span");
        const errorDivBig = form.querySelector('.input1');
        const errorSpanOne = form.querySelector(".input1 span");
        let valid = true;
        errorMessages.forEach(e => (e.style.display = "none"));
        const amount = parseFloat(mortgageAmount.value.trim());
        const years = parseFloat(mortgageTerm.value.trim());
        const rate = parseFloat(mortgagePercent.value.trim());
        const type = radios[0].checked ? "repayment" : radios[1].checked ? "interestOnly" : null;
        if (!amount) { 
            errorMessages[0].style.display = "block"; 
            errorDivBig.style.backgroundColor = "hsl(4, 69%, 50%)";
            errorSpanOne.style.color = "white";    
            valid = false; 
        }
        if (!years) { 
            errorMessages[1].style.display = "block";
            errorDivsSmall[0].style.backgroundColor = "hsl(4, 69%, 50%)";
            errorSpan[0].style.color = "white";    
            valid = false; 
        }
        if (!rate) { 
            errorMessages[2].style.display = "block"; 
            errorDivsSmall[1].style.backgroundColor = "hsl(4, 69%, 50%)"; 
            errorSpan[1].style.color = "white";   
            valid = false;
        }
        if (!type) { valid = false; }
        if (!valid) return;
    // Calculation
    const monthly = calculateMortgage(amount, years, rate, type);
    const total = type === "repayment" ? monthly * years * 12 : (amount * rate / 100 * years);

    // Update UI
    defaultBox.style.display = "none";
    resultBox.style.display = "flex";
    monthlyEl.textContent = `£${monthly.toFixed(2)}`;
    totalEl.textContent = `£${total.toFixed(2)}`;
  });

  clearLink.addEventListener("click", () => {
    form.reset();
    document.querySelectorAll(".error-message").forEach(e => (e.style.display = "none"));
    resultBox.style.display = "none";
    defaultBox.style.display = "flex";
  });

  function calculateMortgage(amount, years, annualRate, type) {
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;
    if (type === "repayment") {
      return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    } else {
      return (amount * annualRate / 100) / 12;
    }
  }
  document.querySelectorAll(".custom-radio input[type='radio']").forEach((radio) => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".custom-radio").forEach((div) => div.classList.remove("selected"));
      if (radio.checked) {
        radio.closest(".custom-radio").classList.add("selected");
      }
    });
  });
});
