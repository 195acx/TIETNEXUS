const events = [

    {
        title:
            "Robotics Workshop",

        society:
            "Robotics Club",

        day:
            "14",

        month:
            "SEP",

        time:
            "5:00 PM",

        location:
            "LT-201"
    },


    {
        title:
            "Cultural Night",

        society:
            "Dramatics Society",

        day:
            "17",

        month:
            "SEP",

        time:
            "7:00 PM",

        location:
            "Auditorium"
    },


    {
        title:
            "Campus Hackathon",

        society:
            "Coding Club",

        day:
            "21",

        month:
            "SEP",

        time:
            "10:00 AM",

        location:
            "C Block"
    }

];


const eventList =
    document.getElementById(
        "eventList"
    );


events.forEach(event => {

    const row =
        document.createElement(
            "article"
        );


    row.className =
        "event-row";


    row.innerHTML = `

        <div class="event-date">

            ${event.day}

            <span class="event-month">

                ${event.month}

            </span>

        </div>


        <div>

            <h2 class="event-name">

                ${event.title}

            </h2>

            <p class="event-society">

                ${event.society}

            </p>

        </div>


        <div class="event-location">

            ${event.time}
            <br>
            ${event.location}

        </div>


        <div>

            →

        </div>

    `;


    eventList.appendChild(row);

});