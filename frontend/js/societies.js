const societies = [
    {
        id: 1,
        name: "Robotics Club",
        category: "Technology",
        description: "Build. Compete. Innovate."
    },
    {
        id: 2,
        name: "Coding Club",
        category: "Technology",
        description: "Create. Solve. Ship."
    },
    {
        id: 3,
        name: "Dramatics Society",
        category: "Cultural",
        description: "Stories worth telling."
    },
    {
        id: 4,
        name: "Entrepreneurship Cell",
        category: "Entrepreneurship",
        description: "Ideas into ventures."
    },
    {
        id: 5,
        name: "Sports Society",
        category: "Sports",
        description: "Compete. Improve. Belong."
    }
];

const societyList = document.getElementById("societyList");
const searchInput = document.getElementById("societySearch");
const filterButtons = document.querySelectorAll(".filter");

let selectedCategory = "All";

function displaySocieties(list) {

    societyList.innerHTML = "";

    list.forEach((society, index) => {

        const row = document.createElement("article");

        row.className = "society-row";

        row.innerHTML = `
            <div class="society-number">
                ${String(index + 1).padStart(2, "0")}
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
    });
}

function filterSocieties() {

    const search = searchInput.value.toLowerCase();

    const filtered = societies.filter((society) => {

        const matchesSearch =
            society.name.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            society.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displaySocieties(filtered);
}

searchInput.addEventListener("input", filterSocieties);

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterSocieties();
    });
});

displaySocieties(societies);