const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const authMessage =
    document.getElementById("authMessage");


function showMessage(message) {

    authMessage.textContent =
        message;

}


function saveUser(data) {

    localStorage.setItem(
        "tiet_nexus_token",
        data.access_token
    );


    localStorage.setItem(
        "tiet_nexus_user",
        JSON.stringify(data.user)
    );

}


function getNextPage() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("next")
        || "index.html"
    );

}


loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value;


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        try {

            const response =
                await fetch(
                    "http://127.0.0.1:8000/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Login failed"
                );

            }


            saveUser(data);

            showMessage(
                "Login successful!"
            );


            setTimeout(() => {

                window.location.href =
                    getNextPage();

            }, 500);

        }

        catch (error) {

            showMessage(
                error.message
            );

        }

    }
);


signupForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const name =
            document.getElementById(
                "signupName"
            ).value;


        const email =
            document.getElementById(
                "signupEmail"
            ).value;


        const password =
            document.getElementById(
                "signupPassword"
            ).value;


        try {

            const response =
                await fetch(
                    "http://127.0.0.1:8000/auth/signup",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Signup failed"
                );

            }


            saveUser(data);


            showMessage(
                "Account created!"
            );


            setTimeout(() => {

                window.location.href =
                    getNextPage();

            }, 500);

        }

        catch (error) {

            showMessage(
                error.message
            );

        }

    }
);