const apiKey = "1f6954b76a2d45418650bf712cb10909"; 
const newsList = document.getElementById("news-list");

async function fetchUSANews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`
    );
    const data = await response.json();
    newsList.innerHTML = ""; 
    data.articles.forEach(article => {
      const li = document.createElement("li");
      li.classList.add("club-card"); 
      li.setAttribute("data-article", article.url); 
      li.innerHTML = `
        <h3>${article.title}</h3>
        <div class="club-info">
          <strong>Date:</strong> ${new Date(article.publishedAt).toLocaleDateString()}<br>
          <strong>Summary:</strong> ${article.description || "No summary available."}<br>
          <strong>Read More:</strong> Click the card
        </div>
      `;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        const url = li.getAttribute("data-article");
        if (url) {
          window.open(url, "_blank"); 
        }
      });

      newsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    newsList.innerHTML = "<li>Failed to load news</li>";
  }
}

document.addEventListener("DOMContentLoaded", fetchUSANews);
