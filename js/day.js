document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const day = params.get("day");

    if (!day) {
        document.getElementById("events-list").innerHTML = "<li>No day selected.</li>";
        return;
    }

    document.getElementById("day-title").textContent = `Schedule for Day ${day}`;

    const eventsList = document.getElementById("events-list");
    const eventsData = JSON.parse(localStorage.getItem("events") || "{}");
    const dayEvents = eventsData[day] || [];

    if (dayEvents.length === 0) {
        eventsList.innerHTML = "<li>No events for this day.</li>";
    } else {
        dayEvents.forEach(ev => {
            const li = document.createElement("li");
            li.textContent = `${ev.time} - ${ev.name}`;
            li.className = `category-${ev.category.replace(/\s+/g, '-').toLowerCase()}`;
            eventsList.appendChild(li);
        });
    }
});
