let societies = [];

const societyList = document.getElementById("societyList");
const searchInput = document.getElementById("societySearch");
const filterButtons = document.querySelectorAll(".filter");

let selectedCategory = "All";


async function loadSocieties() {

    societyList.innerHTML = `
        <div class="loading-message">
            Loading societies...
        </div>
    `;

    try {

        const response = await fetch(
            "https://tietnexus-api.onrender.com/societies"
        );

        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }

        societies = await response.json();

        console.log("Societies loaded:", societies);

        displaySocieties(societies);

    }

    catch (error) {

        console.error(
            "Society loading error:",
            error
        );

        societyList.innerHTML = `
            <div
                class="error-message"
                style="
                    padding: 30px 0;
                    color: #810100;
                    font-size: 18px;
                "
            >

                <strong>
                    Unable to load societies.
                </strong>

                <br><br>

                Backend connection failed.

                <br><br>

                Make sure FastAPI is running:

                <br>

                <code>
                    uvicorn backend.main:app --reload
                </code>

                <br><br>

                Error:
                ${error.message}

            </div>
        `;

    }
}



function displaySocieties(data) {

    societyList.innerHTML = "";

    if (data.length === 0) {

        societyList.innerHTML = `
            <div class="no-results">
                No societies found.
            </div>
        `;

        return;
    }


    data.forEach((society, index) => {

        const row =
            document.createElement("div");

        row.className = "society-row";


        row.innerHTML = `

            <div class="society-number">
                ${String(index + 1).padStart(2, "0")}
            </div>


            <div>

                <div class="society-name">
                    ${society.name}
                </div>

                <div class="society-description">
                    ${society.description}
                </div>

            </div>


            <div class="society-category">
                ${society.category}
            </div>


            <div class="society-arrow">
                →
            </div>

        `;


        row.addEventListener(
            "click",
            () => {

                window.location.href =
                    `society.html?id=${society.id}`;

            }
        );


        societyList.appendChild(row);

    });

}



function applyFilters() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        societies.filter(society => {

            const matchesSearch =

                society.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                society.description
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =

                selectedCategory === "All"

                ||

                society.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displaySocieties(filtered);

}



searchInput.addEventListener(
    "input",
    applyFilters
);



filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            selectedCategory =
                button.dataset.category;


            applyFilters();

        }
    );

});



loadSocieties();