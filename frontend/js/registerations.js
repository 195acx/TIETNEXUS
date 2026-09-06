const registrationList =
    document.getElementById(
        "registrationList"
    );


async function loadRegistrations() {

    const token =
        localStorage.getItem(
            "tiet_nexus_token"
        );


    if (!token) {

        window.location.href =
            "login.html?next=registrations.html";

        return;
    }


    try {

        const response =
            await fetch(
                "http://127.0.0.1:8000/registrations/me",
                {
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
                "Unable to load registrations"
            );

        }


        displayRegistrations(data);

    }

    catch (error) {

        console.error(error);

        registrationList.innerHTML = `
            <div class="error-message">
                ${error.message}
            </div>
        `;

    }

}


function displayRegistrations(registrations) {

    registrationList.innerHTML = "";


    if (registrations.length === 0) {

        registrationList.innerHTML = `
            <div class="no-results">

                You haven't registered
                for any events yet.

                <br><br>

                <a href="events.html">
                    Browse Events →
                </a>

            </div>
        `;

        return;
    }


    registrations.forEach(
        (registration, index) => {

            const row =
                document.createElement("div");

            row.className =
                "event-row";


            row.innerHTML = `

                <div class="event-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>


                <div class="event-main">

                    <div class="event-title">
                        ${registration.title}
                    </div>

                    <div class="event-society">
                        ${registration.society_name}
                    </div>

                </div>


                <div class="event-info">

                    <div>
                        ${registration.date}
                    </div>

                    <div>
                        ${registration.time}
                    </div>

                    <div>
                        ${registration.venue}
                    </div>

                </div>

            `;


            registrationList.appendChild(row);

        }
    );

}


loadRegistrations();