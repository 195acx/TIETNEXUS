// =========================================================
// GET SOCIETY ID FROM URL
// =========================================================

const params = new URLSearchParams(
    window.location.search
);

const societyId = params.get("id");


// =========================================================
// HTML ELEMENTS
// =========================================================

const loading =
    document.getElementById("societyLoading");

const content =
    document.getElementById("societyContent");

const errorMessage =
    document.getElementById("societyError");

const societyCategory =
    document.getElementById("societyCategory");

const societyName =
    document.getElementById("societyName");

const societyDescription =
    document.getElementById("societyDescription");

const societyAbout =
    document.getElementById("societyAbout");

const societyRecruitment =
    document.getElementById("societyRecruitment");

const societyEmail =
    document.getElementById("societyEmail");

const societyInstagram =
    document.getElementById("societyInstagram");

const societyWebsite =
    document.getElementById("societyWebsite");


// =========================================================
// LOAD SOCIETY
// =========================================================

async function loadSociety() {

    // No ID in URL
    if (!societyId) {

        showError(
            "No society was selected."
        );

        return;
    }


    try {

        const response = await fetch(
            `https://tietnexus-api.onrender.com/societies/${societyId}`
        );


        if (!response.ok) {

            throw new Error(
                "Society not found"
            );

        }


        const society =
            await response.json();


        console.log(
            "Society loaded:",
            society
        );


        displaySociety(society);

    }

    catch (error) {

        console.error(
            "Society error:",
            error
        );

        showError(
            "Unable to load this society."
        );

    }

}


// =========================================================
// DISPLAY SOCIETY
// =========================================================

function displaySociety(society) {

    societyCategory.textContent =
        society.category || "SOCIETY";


    societyName.textContent =
        society.name || "Society";


    societyDescription.textContent =
        society.description || "";


    societyAbout.textContent =
        society.about ||
        society.description ||
        "Information about this society will be updated soon.";


    societyRecruitment.textContent =
        society.recruitment_info ||
        "Recruitment information will be updated soon.";


    // =====================================================
    // EMAIL
    // =====================================================

    if (society.contact_email) {

        societyEmail.textContent =
            society.contact_email;

        societyEmail.href =
            `mailto:${society.contact_email}`;

        societyEmail.style.display =
            "inline-block";

    }

    else {

        societyEmail.style.display =
            "none";

    }


    // =====================================================
    // INSTAGRAM
    // =====================================================

    if (society.instagram_url) {

        societyInstagram.href =
            society.instagram_url;

        societyInstagram.style.display =
            "inline-block";

    }

    else {

        societyInstagram.style.display =
            "none";

    }


    // =====================================================
    // WEBSITE
    // =====================================================

    if (society.website_url) {

        societyWebsite.href =
            society.website_url;

        societyWebsite.style.display =
            "inline-block";

    }

    else {

        societyWebsite.style.display =
            "none";

    }


    // =====================================================
    // SHOW CONTENT
    // =====================================================

    loading.style.display =
        "none";

    errorMessage.style.display =
        "none";

    content.style.display =
        "block";

}


// =========================================================
// ERROR HANDLER
// =========================================================

function showError(message) {

    loading.style.display =
        "none";

    content.style.display =
        "block";

    errorMessage.textContent =
        message;

    errorMessage.style.display =
        "block";

}


// =========================================================
// START
// =========================================================

loadSociety();