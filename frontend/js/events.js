const eventList =
    document.getElementById("eventList");


async function loadEvents() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/events"
        );


        if (!response.ok) {
            throw new Error("Failed to load events");
        }


        const events =
            await response.json();


        displayEvents(events);

    }

    catch (error) {

        console.error(error);

        eventList.innerHTML = `
            <div class="error-message">
                Unable to load events.
            </div>
        `;

    }

}


function displayEvents(events) {

    eventList.innerHTML = "";


    if (events.length === 0) {

        eventList.innerHTML = `
            <div class="no-results">
                No events available.
            </div>
        `;

        return;
    }


    events.forEach((event, index) => {

        const row =
            document.createElement("div");

        row.className = "event-row";


        row.innerHTML = `

            <div class="event-number">
                ${String(index + 1).padStart(2, "0")}
            </div>


            <div class="event-main">

                <div class="event-title">
                    ${event.title}
                </div>

                <div class="event-description">
                    ${event.description}
                </div>

                <div class="event-society">
                    ${event.society_name}
                </div>

            </div>


            <div class="event-info">

                <div>
                    ${event.date}
                </div>

                <div>
                    ${event.time}
                </div>

                <div>
                    ${event.venue}
                </div>

            </div>


            <div class="event-action">

                <button
                    class="register-button"
                    data-event-id="${event.id}"
                >
                    REGISTER
                </button>

            </div>

        `;


        const button =
            row.querySelector(".register-button");


        button.addEventListener(
            "click",
            () => registerForEvent(event.id)
        );


        eventList.appendChild(row);

    });

}


async function registerForEvent(eventId) {

    const token =
        localStorage.getItem(
            "tiet_nexus_token"
        );


    if (!token) {

        window.location.href =
            "login.html?next=events.html";

        return;
    }


    try {

        const response = await fetch(

            `http://127.0.0.1:8000/events/${eventId}/register`,

            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }

        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail ||
                "Registration failed"
            );

        }


        alert(data.message);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}


loadEvents();
