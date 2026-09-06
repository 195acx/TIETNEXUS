<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Societies | Campus Companion
    </title>

    <link
        rel="stylesheet"
        href="css/style.css"
    >

    <link
        rel="stylesheet"
        href="css/animations.css"
    >

</head>


<body>

<div class="page">

    <nav class="navbar">

        <a
            href="index.html"
            class="brand"
        >

            CAMPUS
            <span>COMPANION</span>

        </a>


        <div class="nav-links">

            <a href="societies.html">
                Societies
            </a>

            <a href="events.html">
                Events
            </a>

            <a href="guide.html">
                AI Guide
            </a>

            <a
                href="#"
                class="login-link"
            >
                Login
            </a>

        </div>

    </nav>



    <header class="page-header">

        <p class="page-label">
            DISCOVER
        </p>

        <h1 class="page-title">
            SOCIETIES.
        </h1>

        <p class="page-subtitle">
            Find your people.
            Discover communities built around
            technology, culture, creativity,
            entrepreneurship and more.
        </p>

    </header>



    <main>

        <div class="search-container">

            <input
                id="societySearch"
                type="text"
                placeholder="Search societies..."
            >

        </div>


        <div class="filters">

            <button
                class="filter active"
                data-category="All"
            >
                ALL
            </button>

            <button
                class="filter"
                data-category="Technology"
            >
                TECH
            </button>

            <button
                class="filter"
                data-category="Cultural"
            >
                CULTURAL
            </button>

            <button
                class="filter"
                data-category="Entrepreneurship"
            >
                ENTREPRENEURSHIP
            </button>

            <button
                class="filter"
                data-category="Sports"
            >
                SPORTS
            </button>

        </div>


        <section
            id="societyList"
            class="society-list"
        >
        </section>

    </main>

</div>


<script src="js/main.js"></script>
<script src="js/societies.js"></script>

</body>

</html>

const societies = [

    {
        id: 1,
        name: "Robotics Club",
        category: "Technology",
        description:
            "Build. Compete. Innovate."
    },

    {
        id: 2,
        name: "Coding Club",
        category: "Technology",
        description:
            "Create. Solve. Ship."
    },

    {
        id: 3,
        name: "Dramatics Society",
        category: "Cultural",
        description:
            "Stories worth telling."
    },

    {
        id: 4,
        name: "Entrepreneurship Cell",
        category: "Entrepreneurship",
        description:
            "Ideas into ventures."
    },

    {
        id: 5,
        name: "Sports Society",
        category: "Sports",
        description:
            "Compete. Improve. Belong."
    }

];


const societyList =
    document.getElementById(
        "societyList"
    );


const searchInput =
    document.getElementById(
        "societySearch"
    );


const filterButtons =
    document.querySelectorAll(
        ".filter"
    );


let selectedCategory =
    "All";


function displaySocieties(list) {

    societyList.innerHTML = "";


    list.forEach(
        (society, index) => {

            const row =
                document.createElement(
                    "article"
                );


            row.className =
                "society-row";


            row.innerHTML = `

                <div class="society-number">

                    ${String(index + 1)
                        .padStart(2, "0")}

                </div>


                <div>

                    <h2 class="society-name">

                        ${society.name}

                    </h2>

                    <p class="society-description">

                        ${society.description}

                    </p>

                </div>


                <div class="society-category">

                    ${society.category.toUpperCase()}

                </div>


                <div class="society-arrow">

                    →

                </div>

            `;


            societyList.appendChild(row);

        }
    );

}


function filterSocieties() {

    const search =
        searchInput.value
        .toLowerCase();


    const filtered =
        societies.filter(
            society => {

                const matchesSearch =
                    society.name
                    .toLowerCase()
                    .includes(search);


                const matchesCategory =

                    selectedCategory === "All"

                    ||

                    society.category ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    displaySocieties(filtered);

}


searchInput.addEventListener(
    "input",
    filterSocieties
);


filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons
                    .forEach(
                        btn =>
                            btn.classList
                            .remove("active")
                    );


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category;


                filterSocieties();

            }
        );

    }
);


displaySocieties(societies);