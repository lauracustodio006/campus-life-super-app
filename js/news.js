document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".club-card");

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        const article = card.getAttribute("data-article");
        if (article) {
            window.location.href = article;
        }
    });
});
