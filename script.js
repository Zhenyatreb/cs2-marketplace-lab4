// JavaScript для сайту CS2 Market
// Код запускається після завантаження HTML-сторінки.

document.addEventListener("DOMContentLoaded", function () {

    // 1. Мобільне меню: кнопка показує або ховає навігацію.
    const menuButton = document.querySelector(".menu-toggle");
    const mainNavigation = document.querySelector(".site-header .nav");

    if (menuButton && mainNavigation) {
        menuButton.addEventListener("click", function () {
            mainNavigation.classList.toggle("nav-open");

            const menuIsOpen = mainNavigation.classList.contains("nav-open");
            menuButton.setAttribute("aria-expanded", menuIsOpen);
            menuButton.textContent = menuIsOpen ? "✕ Закрити" : "☰ Меню";
        });
    }

    // 2. Пошук і фільтри каталогу.
    const filterForm = document.querySelector("#catalog-filter");

    if (filterForm) {
        const productCards = document.querySelectorAll("#catalog-products .card");
        const searchInput = document.querySelector("#search");
        const weaponSelect = document.querySelector("#weapon");
        const minPriceInput = document.querySelector("#min-price");
        const maxPriceInput = document.querySelector("#max-price");
        const qualitySelect = document.querySelector("#quality");
        const productsCount = document.querySelector("#products-count");

        function filterProducts() {
            const searchText = searchInput.value.toLowerCase().trim();
            const selectedWeapon = weaponSelect.value;
            const selectedQuality = qualitySelect.value;
            const minPrice = minPriceInput.value === "" ? 0 : Number(minPriceInput.value);
            const maxPrice = maxPriceInput.value === "" ? Infinity : Number(maxPriceInput.value);
            let visibleProducts = 0;

            productCards.forEach(function (card) {
                const name = card.dataset.name.toLowerCase();
                const weapon = card.dataset.weapon;
                const price = Number(card.dataset.price);
                const quality = card.dataset.quality;

                const matchesSearch = name.includes(searchText);
                const matchesWeapon = selectedWeapon === "all" || weapon === selectedWeapon;
                const matchesQuality = selectedQuality === "all" || quality === selectedQuality;
                const matchesPrice = price >= minPrice && price <= maxPrice;

                if (matchesSearch && matchesWeapon && matchesQuality && matchesPrice) {
                    card.hidden = false;
                    visibleProducts++;
                } else {
                    card.hidden = true;
                }
            });

            productsCount.textContent = "Знайдено: " + visibleProducts;
        }

        // Фільтрація після натискання кнопки.
        filterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            filterProducts();
        });

        // Також оновлюємо результат під час зміни полів.
        filterForm.addEventListener("input", filterProducts);
        filterForm.addEventListener("change", filterProducts);

        // Кнопка очищення повертає всі товари.
        filterForm.addEventListener("reset", function () {
            setTimeout(filterProducts, 0);
        });

        // Показуємо початкову кількість товарів.
        filterProducts();
    }

    // 3. Перевірка форми поповнення балансу.
    const depositForm = document.querySelector("#deposit-form");

    if (depositForm) {
        const depositInput = document.querySelector("#deposit");
        const depositMessage = document.querySelector("#deposit-message");

        depositForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const amount = Number(depositInput.value);

            // Перевіряємо, чи поле не порожнє.
            if (depositInput.value.trim() === "") {
                depositMessage.textContent = "Помилка: введіть суму поповнення.";
                depositMessage.className = "form-message error";
                return;
            }

            // Сума повинна бути більшою за нуль.
            if (amount <= 0 || Number.isNaN(amount)) {
                depositMessage.textContent = "Помилка: сума повинна бути більшою за 0.";
                depositMessage.className = "form-message error";
                return;
            }

            // Для демонстрації встановлено максимальну суму 1000 доларів.
            if (amount > 1000) {
                depositMessage.textContent = "Помилка: максимальна сума — 1000 $.";
                depositMessage.className = "form-message error";
                return;
            }

            // Якщо перевірки пройдено, показуємо повідомлення.
            depositMessage.textContent = "Заявку на поповнення $" + amount.toFixed(2) + " створено.";
            depositMessage.className = "form-message success";
            depositForm.reset();
        });
    }

});
