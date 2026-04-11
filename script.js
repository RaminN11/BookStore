
const books = [
    { id: 1, img: "img/books/1984.webp", title: "1984 - Джордж Оруэлл", price: 620 },
    { id: 2, img: "img/books/Отверженные.webp", title: "Отверженные - Виктор Гюго", price: 270 },
    { id: 3, img: "img/books/Мастер и Маргарита.webp", title: "Мастер и Маргарита - Михаил Булгаков", price: 525 },
    { id: 4, img: "img/books/Тихий Дон.webp", title: "Тихий Дон - Михаил Шолохов", price: 500 },
    { id: 5, img: "img/books/Над пропастью во ржи.webp", title: "Над пропастью во ржи - Дж. Д. Сэлинджер", price: 375 },
    { id: 6, img: "img/books/Собачье сердце.jpg", title: "Собачье сердце - Михаил Булгаков", price: 430 },
    { id: 7, img: "img/books/Гарри Поттер.jpg", title: "Гарри Поттер - Дж. К. Роулинг", price: 1120 },
    { id: 8, img: "img/books/Маленький принц.webp", title: "Маленький принц - Антуан де Сент-Экзюпери", price: 490 },
    { id: 9, img: "img/books/Мертвые души.webp", title: "Мертвые души - Николай Гоголь", price: 350 },
    { id: 10, img: "img/books/Дворянское гнездо.webp", title: "Дворянское гнездо - Иван Тургенев", price: 310 },
    { id: 11, img: "img/books/Ревизор.webp", title: "Ревизор - Николай Гоголь", price: 410 },
    { id: 12, img: "img/books/Евгений Онегин.webp", title: "Евгений Онегин - Александр Пушкин", price: 780 },
    { id: 13, img: "img/books/Чайка.webp", title: "Чайка - Антон Чехов", price: 560 },
    { id: 14, img: "img/books/Двенадцать.webp", title: "Двенадцать - Александр Блок", price: 420 },
    { id: 15, img: "img/books/О генри.webp", title: "О. Генри. Рассказы - О. Генри", price: 260 },
    { id: 16, img: "img/books/Преступление и наказание.webp", title: "Преступление и наказание - Федор Достоевский", price: 630 },
    { id: 17, img: "img/books/Приключения Оливера Твиста.webp", title: "Приключения Оливера Твиста - Чарльз Диккенс", price: 690 },
    { id: 18, img: "img/books/Шинель.webp", title: "Шинель - Николай Гоголь", price: 325 },
    { id: 19, img: "img/books/Граф Монте-Кристо.webp", title: "Граф Монте-Кристо - Александр Дюма", price: 210 },
    { id: 20, img: "img/books/Господа Головлевы.webp", title: "Господа Головлевы - Михаил Салтыков-Щедрин", price: 290 },
    { id: 21, img: "img/books/История Дэвида Копперфилда.webp", title: "История Дэвида Копперфилда - Чарльз Диккенс", price: 870 },
    { id: 22, img: "img/books/Гамлет, принц датский.webp", title: "Гамлет, принц датский - Уильям Шекспир", price: 550 },
    { id: 23, img: "img/books/Золотой теленок.webp", title: "Золотой теленок - Илья Ильф и др.", price: 610 },
    { id: 24, img: "img/books/Богатый папа, бедный папа.webp", title: "Богатый папа, бедный папа - Роберт Кийосаки", price: 1200 },
    { id: 25, img: "img/books/Капитал.webp", title: "Капитал - Карл Генрих Маркс", price: 660 },
    { id: 26, img: "img/books/48 законов власти.webp", title: "48 законов власти - Роберт Грин", price: 1230 },
    { id: 27, img: "img/books/Думай медленно Решай быстро.webp", title: "Думай медленно… Решай быстро - Даниэль Канеман", price: 980 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("fav")) || [];
let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
let currentBookId = null;
let slideIndex = 0;
let currentList = [...books];
let currentPage = 1;
const booksPerPage = 9;

function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (el) el.textContent = cart.length;
}

function showPopup(text) {
    const p = document.getElementById("popup");
    if (!p) return;
    p.textContent = text;
    p.style.display = "block";
    setTimeout(() => {
        p.style.display = "none";
    }, 2000);
}

function addToCart(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showPopup("Добавлено в корзину");
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
    updateCartCount();
}

function renderCart() {
    const list = document.getElementById("cart-items");
    const total = document.getElementById("total");
    if (!list || !total) return;

    list.innerHTML = "";
    let sum = 0;

    if (cart.length === 0) {
        list.innerHTML = "<li>Корзина пуста</li>";
        total.textContent = "0";
        return;
    }

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.title} - ${item.price} ₽`;
        list.appendChild(li);
        sum += item.price;
    });

    total.textContent = String(sum);
}

function sortBooks(type) {
    const sorted = [...currentList.length ? currentList : books];

    if (type === "price") sorted.sort((a, b) => a.price - b.price);
    if (type === "priceDesc") sorted.sort((a, b) => b.price - a.price);
    if (type === "alpha") sorted.sort((a, b) => a.title.localeCompare(b.title, "ru"));

    currentPage = 1;
    currentList = sorted;
    renderBooks(currentList);
}

function searchBooks() {
    const input = document.getElementById("search");
    const query = input ? input.value.trim().toLowerCase() : "";
    currentPage = 1;
    currentList = books.filter(b => b.title.toLowerCase().includes(query));
    renderBooks(currentList);
}

function applyFilters() {
    const min = Number(document.getElementById("minPrice")?.value) || 0;
    const max = Number(document.getElementById("maxPrice")?.value) || Infinity;
    currentPage = 1;
    currentList = books.filter(b => b.price >= min && b.price <= max);
    renderBooks(currentList);
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Корзина пустая");
        return;
    }
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
}

function submitOrder() {
    const phoneInput = document.getElementById("phone");
    if (!phoneInput) return;
    const phone = phoneInput.value.replace(/\s+/g, "").trim();
    const phoneRegex = /^(\+7|7|8)\d{10}$/;

    if (!phoneRegex.test(phone)) {
        alert("Введите корректный номер: +7XXXXXXXXXX, 7XXXXXXXXXX или 8XXXXXXXXXX");
        return;
    }

    showPopup("Менеджер свяжется с вами");
    phoneInput.value = "";
    closeModal();
    clearCart();
}

function sendForm(event) {
    event.preventDefault();
    event.target.reset();
    showPopup("Сообщение отправлено");
}


function addToFav(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;

    if (favorites.some(item => item.id === id)) {
        showPopup("Уже в избранном");
        return;
    }

    favorites.push(book);
    localStorage.setItem("fav", JSON.stringify(favorites));
    showPopup("Добавлено в избранное");
    renderFavorites();
}

function removeFromFav(id) {
    favorites = favorites.filter(b => b.id !== id);
    localStorage.setItem("fav", JSON.stringify(favorites));
    renderFavorites();
}

function renderBooks(list = books) {
    const el = document.getElementById("book-list");
    if (!el) return;

    el.innerHTML = "";
    const start = (currentPage - 1) * booksPerPage;
    const paginated = list.slice(start, start + booksPerPage);

    paginated.forEach(b => {
        const d = document.createElement("div");
        d.className = "book";
        d.innerHTML = `
            <img src="${b.img}" alt="${b.title}" loading="lazy">
            <h3>${b.title}</h3>
            <p>${b.price} ₽</p>
            <button onclick="addToCart(${b.id})">В корзину</button>
            <button onclick="addToFav(${b.id})">❤ В избранное</button>
            <button onclick="openReviews(${b.id})">Отзывы</button>
        `;
        el.appendChild(d);
    });

    renderPagination(list.length);
}

function renderPagination(total) {
    const pages = Math.ceil(total / booksPerPage);
    const container = document.getElementById("pagination");
    if (!container) return;

    container.innerHTML = "";
    for (let i = 1; i <= pages; i += 1) {
        const btn = document.createElement("button");
        btn.textContent = String(i);
        if (i === currentPage) btn.style.background = "#31296f";
        btn.onclick = () => {
            currentPage = i;
            renderBooks(currentList);

            const catalog = document.getElementById("book-list");
            if (catalog) {
                catalog.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        };
        container.appendChild(btn);
    }
}

function renderFavorites() {
    const el = document.getElementById("fav-list");
    if (!el) return;

    el.innerHTML = "";
    if (favorites.length === 0) {
        el.innerHTML = "<p>Нет избранных товаров</p>";
        return;
    }

    favorites.forEach(b => {
        const d = document.createElement("div");
        d.className = "book";
        d.innerHTML = `
            <img src="${b.img}" alt="${b.title}" loading="lazy">
            <h3>${b.title}</h3>
            <p>${b.price} ₽</p>
            <button onclick="addToCart(${b.id})">Купить</button>
            <button onclick="removeFromFav(${b.id})">Убрать</button>
        `;
        el.appendChild(d);
    });
}

function openReviews(id) {
    currentBookId = id;
    const modal = document.getElementById("reviewModal");
    if (modal) modal.style.display = "flex";
    renderReviews();
}

function closeReview() {
    const modal = document.getElementById("reviewModal");
    if (modal) modal.style.display = "none";
}

function addReview() {
    const name = document.getElementById("reviewName")?.value.trim();
    const text = document.getElementById("reviewText")?.value.trim();

    if (!name || !text) {
        alert("Заполните поля");
        return;
    }

    if (!reviews[currentBookId]) {
        reviews[currentBookId] = [];
    }

    reviews[currentBookId].push({ name, text });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";
    renderReviews();
}

function renderReviews() {
    const el = document.getElementById("reviewList");
    if (!el) return;

    el.innerHTML = "";
    const bookReviews = reviews[currentBookId] || [];

    if (bookReviews.length === 0) {
        el.innerHTML = "<p>Пока нет отзывов</p>";
        return;
    }

    bookReviews.forEach(r => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${r.name}</strong><p>${r.text}</p><hr>`;
        el.appendChild(div);
    });
}

renderFavorites();
renderBooks(currentList);
renderCart();
updateCartCount();
showSlides();
