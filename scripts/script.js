document.getElementById("main-action-button").onclick = () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
};

const links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i += 1) {
  links[i].onclick = () => {
    document
      .getElementById(links[i].getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });
  };
}

const buttons = document.getElementsByClassName("product-button");
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].onclick = () => {
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  };
}

const burger = document.getElementById("burger");
const name = document.getElementById("name");
const phone = document.getElementById("phone");

document.getElementById("order-action").onclick = () => {
  let hasError = false;
  [burger, name, phone].forEach((item) => {
    if (!item.value) {
      item.parentElement.style.background = "red";
      hasError = true;
    } else {
      item.parentElement.style.background = "";
      hasError = false;
    }
  });
  if (!hasError) {
    [burger, name, phone].forEach((item) => {
      item.value = "";
    });
    alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
  }
};

const prices = document.getElementsByClassName("products-item-price");
document.getElementById("change-currency").onclick = (e) => {
  const currentCurrency = e.target.innerText;
  let newCurrency = "$";
  let coefficient = 1;
  if (currentCurrency === "$") {
    newCurrency = "₽";
    coefficient = 80;
  } else if (currentCurrency === "₽") {
    newCurrency = "BYN";
    coefficient = 3;
  } else if (currentCurrency === "BYN") {
    newCurrency = "€";
    coefficient = 0.9;
  } else if (currentCurrency === "€") {
    newCurrency = "¥";
    coefficient = 6.9;
  }
  e.target.innerText = newCurrency;
  for (let i = 0; i < prices.length; i++) {
    prices[i].innerText =
      +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) +
      " " +
      newCurrency;
  }
};
