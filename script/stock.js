// 음성안내 설정 모달
const modal = document.getElementById("bottomModal");
const main = document.getElementById("mainCont");
function openModal() {
    modal.classList.add("active");
    main.setAttribute("inert", "");
}
function closeModal() {
    modal.classList.remove("active");
    main.removeAttribute("inert");
}

// 구매 모달
const priceButtons = document.querySelectorAll(".change_price button");
const modalBackground = document.getElementById("bottomModal_1");
const modalPrice = modalBackground.querySelector(".modal_price span");
const modalCloseButtons = modalBackground.querySelectorAll(".modal_sell button, .modal_buy button, .modal_cancel button");
const nowPriceButton = document.querySelector("section.now_price .price_item");

priceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const amount = button.childNodes[0].textContent.trim();
        modalPrice.textContent = amount;
        modalBackground.style.display = "block";
        main.setAttribute("inert", "");
    });
});

// section3. 현재가 구매모달
nowPriceButton.addEventListener("click", () => {
    const amount = nowPriceButton.querySelector("span.price").textContent.trim();
    modalPrice.textContent = amount;
    modalBackground.style.display = "block";
    main.setAttribute("inert", "");
});

modalCloseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        modalBackground.style.display = "none";
        main.removeAttribute("inert");
    });
});

// 현재가 변경
function updatePrices() {
    // 10000 ~ 100000 사이 랜덤 숫자
    const randomPrice = Math.floor(Math.random() * (100000 - 10000 + 1)) + 100;

    // 숫자를 천 단위로 변환
    const formattedPrice = randomPrice.toLocaleString();

    // Navigation, section3 현재값 동일하게 적용
    const elements = document.querySelectorAll("section.now_price .price_item .price, .update_cont .amount .amount_text");
    elements.forEach((el) => (el.innerText = formattedPrice));

    // selling change_price 들 +1000, +900, ... 적용
    const changeSellingElements = document.querySelectorAll("section.table .selling td.change_price button");
    changeSellingElements.forEach((el, index) => {
        const plusPrice = randomPrice + 1000 - 100 * index; // 0번째: +1000, 1번째: +900, ...
        const percent = ((plusPrice - 69600) / 69600) * 100;
        el.innerHTML = `${plusPrice.toLocaleString()} <span>${percent.toFixed(2)}%</span>`;
    });

    // buying change_price 들 -100, -200, ... 적용
    const changeBuyingElements = document.querySelectorAll("section.table .buying td.change_price button");
    changeBuyingElements.forEach((el, index) => {
        const minusPrice = Math.max(randomPrice - 100 * (index + 1), 0);
        const percent = ((minusPrice - 69600) / 69600) * 100;
        el.innerHTML = `${minusPrice.toLocaleString()} <span>${percent.toFixed(2)}%</span>`;
    });

    // navigation 변동가(71400 - randomPrice)
    const nowComparisonElement = document.getElementById("nowComparison");
    const comparisonText = document.querySelector(".update_cont .comparison_text");

    const variablePrice = 71400 - randomPrice;
    nowComparisonElement.innerText = Math.abs(variablePrice).toLocaleString(); // 절댓값만 표시

    if (randomPrice <= 71400) {
        nowComparisonElement.style.color = "#1779FA";
        comparisonText.classList.add("down");
    } else {
        nowComparisonElement.style.color = "";
        comparisonText.classList.remove("down");
    }

    // navigation 현재가 색상 변경
    const amountTextElement = document.querySelector(".update_cont .amount .amount_text");
    if (randomPrice <= 71400) {
        amountTextElement.style.color = "#1779FA";
    } else {
        amountTextElement.style.color = "";
    }

    // navigation 변동확률(randomPrice - 69600)/69600 * 100, 소수점 2자리
    const nowPercentElement = document.getElementById("nowPercent");
    const percent = ((randomPrice - 69600) / 69600) * 100;
    nowPercentElement.innerText = percent.toFixed(2) + "%";
    if (randomPrice <= 71400) {
        nowPercentElement.style.color = "#1779FA";
    } else {
        nowPercentElement.style.color = "";
    }

    // 500ms ~ 5000ms 사이 랜덤 시간
    const randomDelay = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
    setTimeout(updatePrices, randomDelay);
}
updatePrices();

// 매수매도 update
function updateVolume() {
    const quantityCells = document.querySelectorAll("section.table .selling td.change_quantity span");
    const numberCells = document.querySelectorAll("section.table .selling td.change_number span");
    const buyQuantityCells = document.querySelectorAll("section.table .buying td.change_quantity span");
    const buyNumberCells = document.querySelectorAll("section.table .buying td.change_number span");

    const colors = ["#FA2D42", "#1779FA"];

    // 매수량
    quantityCells.forEach((cell) => {
        const value = Math.floor(Math.random() * (100000 - 10000 + 1)) + 100000;
        cell.innerText = value.toLocaleString();
    });

    numberCells.forEach((cell) => {
        const value = Math.floor(Math.random() * 301); // 0~300
        cell.innerText = value;
        cell.style.color = colors[Math.floor(Math.random() * colors.length)];
    });

    // 매도량
    buyQuantityCells.forEach((cell) => {
        const value = Math.floor(Math.random() * (1200000 - 100000 + 1)) + 100000;
        cell.innerText = value.toLocaleString();
    });

    buyNumberCells.forEach((cell) => {
        const value = Math.floor(Math.random() * 301);
        cell.innerText = value;
        cell.style.color = colors[Math.floor(Math.random() * colors.length)];
    });

    // 500ms ~ 1000ms 사이 랜덤 시간으로 재실행
    const randomDelay = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    setTimeout(updateVolume, randomDelay);
}
updateVolume();

// 체결강도 update
function updateConclusion() {
    const scrollBox = document.querySelector(".conclusion_scroll");
    if (scrollBox) {
        const container = document.createElement("div");
        container.className = "description_conclusion";

        const priceSpan = document.createElement("span");
        // 최신 randomPrice 가져오기
        const nowPrice = document.querySelector("section.now_price .price_item .price").innerText.replace(/,/g, "");
        priceSpan.textContent = parseInt(nowPrice).toLocaleString();

        const amountSpan = document.createElement("span");
        amountSpan.className = "conclusion_amount";
        const colors = ["#FA2D42", "#1779FA"];
        amountSpan.textContent = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
        amountSpan.style.color = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(priceSpan);
        container.appendChild(amountSpan);
        scrollBox.appendChild(container);

        // 스크롤 자동 맨 아래로
        scrollBox.scrollTop = scrollBox.scrollHeight;
    }

    const randomDelay = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    setTimeout(updateConclusion, randomDelay);
}
updateConclusion();

// 체크박스 script
document.addEventListener("DOMContentLoaded", function () {
    const nowCheckbox = document.getElementById("now");
    const highestCheckbox = document.getElementById("highest");
    const lowestCheckbox = document.getElementById("lowest");

    const nowPolite = document.querySelector(".update_cont .amount_text");
    const highPolite = document.querySelector(".update_sub .sub_fix .high");
    const lowPolite = document.querySelector(".update_sub .sub_fix .low");

    const closeBtn = document.getElementById("closeModal");

    function applyAria() {
        // now 체크박스 상태 확인
        if (nowCheckbox.checked) {
            nowPolite?.setAttribute("aria-live", "polite");
        } else {
            nowPolite?.removeAttribute("aria-live", "polite");
        }

        // highest 체크박스 상태 확인
        if (highestCheckbox.checked) {
            highPolite?.setAttribute("aria-live", "polite");
        } else {
            highPolite?.removeAttribute("aria-live", "polite");
        }

        // lowest 체크박스 상태 확인
        if (lowestCheckbox.checked) {
            lowPolite?.setAttribute("aria-live", "polite");
        } else {
            lowPolite?.removeAttribute("aria-live", "polite");
        }
    }

    // 닫기 버튼 클릭 시에만 실행
    closeBtn.addEventListener("click", applyAria);
});

// 고가 변경(20초 후)
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const highText = document.querySelector(".high_text");
        if (highText) {
            highText.textContent = "80,500";
        }
    }, 20000);
});

// 저가 변경(35초 후)
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const lowText = document.querySelector(".low_text");
        if (lowText) {
            lowText.textContent = "69,400";
        }
    }, 35000);
});
