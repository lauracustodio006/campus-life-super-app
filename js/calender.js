document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById('add-event');
    const removeButton = document.getElementById('remove-event');
    const categories = {
        "homework": "category-homework",
        "school event": "category-school-event",
        "quiz/test": "category-quiz-test",
        "sport event": "category-sport-event"
    };

    addButton.addEventListener('click', () => {
        let day = parseInt(prompt("Enter the day:"));
        if (!day || day < 1 || day > 30) return alert("Invalid day!");

        let time = prompt("Enter the time (military time):");
        if (!time) return alert("Time is required!");

        let category = prompt("Enter category (homework, school event, quiz/test, sport event):").toLowerCase();
        if (!categories[category]) {
            alert("Invalid category! Defaulting to 'homework'.");
            category = "homework";
        }

        let name = prompt("Enter the event/class name:");
        if (!name || !name.trim()) return alert("Event/class name is required!");

        const dayEl = document.getElementById(`day-${day}`);
        if (!dayEl) return alert("Day element not found!");

        const eventBox = document.createElement('div');
        eventBox.className = `event ${categories[category]}`;
        eventBox.textContent = `${time} - ${name.trim()}`;
        dayEl.appendChild(eventBox);
    });

    let eventsData = JSON.parse(localStorage.getItem("events") || "{}");
    if (!eventsData[day]) eventsData[day] = [];
    eventsData[day].push({ time, name: name.trim(), category });
    localStorage.setItem("events", JSON.stringify(eventsData));
    
    removeButton.addEventListener('click', () => {
        let day = parseInt(prompt("Enter the day (1-30) to remove an event from:"));
        if (!day || day < 1 || day > 30) return alert("Invalid day!");

        const dayEl = document.getElementById(`day-${day}`);
        if (!dayEl) return alert("Day element not found!");

        const events = dayEl.querySelectorAll('.event');
        if (events.length === 0) return alert("No events found on this day!");

        let eventList = "Select the event number to remove:\n";
        events.forEach((ev, index) => {
            eventList += `${index + 1}: ${ev.textContent}\n`;
        });

        let removeIndex = parseInt(prompt(eventList));
        if (!removeIndex || removeIndex < 1 || removeIndex > events.length) return alert("Invalid selection!");

        events[removeIndex - 1].remove();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const days = document.querySelectorAll(".day");

    days.forEach(dayEl => {
        dayEl.addEventListener("click", () => {
            const day = dayEl.id.split('-')[1]; 
            window.location.href = `day.html?day=${day}`;
        });
    });
});
