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

// 현재가 변경
function updatePrices() {
    // 100 ~ 10000 사이 랜덤 숫자
    const randomPrice = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

    // 숫자를 천 단위 ','로 변환
    const formattedPrice = randomPrice.toLocaleString();

    // 두 개 클래스에 동일 값 적용
    const elements = document.querySelectorAll("section.now_price .price_item .price, .update_cont .amount .amount_text");
    elements.forEach((el) => (el.innerText = formattedPrice));

    // selling change_price 셀들에 +1000, +900, ... 순서대로 적용
    const changeSellingElements = document.querySelectorAll("section.table .selling td.change_price");
    changeSellingElements.forEach((el, index) => {
        const plusPrice = randomPrice + 1000 - 100 * index; // 0번째: +1000, 1번째: +900, ...
        el.innerText = plusPrice.toLocaleString();
    });

    // buying change_price 셀들에 -100, -200, ... 순서대로 적용
    const changeBuyingElements = document.querySelectorAll("section.table .buying td.change_price");
    changeBuyingElements.forEach((el, index) => {
        const minusPrice = Math.max(randomPrice - 100 * (index + 1), 0);
        el.innerText = minusPrice.toLocaleString();
    });

    // navigation 변동가 : 71400 - randomPrice
    const nowComparisonElement = document.getElementById("nowComparison");
    nowComparisonElement.innerText = (71400 - randomPrice).toLocaleString();

    // navigation 변동확률: (randomPrice - 69600)/69600 * 100, 소수점 2자리
    const nowPercentElement = document.getElementById("nowPercent");
    const percent = ((randomPrice - 69600) / 69600) * 100;
    nowPercentElement.innerText = percent.toFixed(2) + "%";

    const quantityCells = document.querySelectorAll("section.table .selling td.change_quantity span");
    const numberCells = document.querySelectorAll("section.table .selling td.change_number span");
    const buyQuantityCells = document.querySelectorAll("section.table .buying td.change_quantity span");
    const buyNumberCells = document.querySelectorAll("section.table .buying td.change_number span");

    const colors = ["#FA2D42", "#1779FA"];
    // 매수량 update
    quantityCells.forEach((cell) => {
        const value = Math.floor(Math.random() * (100000 - 10000 + 1)) + 100000;
        cell.innerText = value.toLocaleString();
    });

    numberCells.forEach((cell) => {
        const value = Math.floor(Math.random() * 301); // 0~300
        cell.innerText = value;
        cell.style.color = colors[Math.floor(Math.random() * colors.length)];
    });

    // 매도량 update
    buyQuantityCells.forEach((cell) => {
        const value = Math.floor(Math.random() * (1200000 - 100000 + 1)) + 100000;
        cell.innerText = value.toLocaleString();
    });

    buyNumberCells.forEach((cell) => {
        const value = Math.floor(Math.random() * 301);
        cell.innerText = value;
        cell.style.color = colors[Math.floor(Math.random() * colors.length)];
    });

    // 500ms ~ 5000ms 사이 랜덤 시간
    const randomDelay = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
    setTimeout(updatePrices, randomDelay);
}
updatePrices();

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

    // 체결강도 랜덤 시간 (예: 500~3000ms)
    const randomDelay = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    setTimeout(updateConclusion, randomDelay);
}
updateConclusion();
