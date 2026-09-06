console.log("Campus Companion loaded");


document.addEventListener("DOMContentLoaded", () => {

    const links =
        document.querySelectorAll("a[href]");


    links.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http")
        ) {
            return;
        }


        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                document.body.classList.add(
                    "page-leaving"
                );


                setTimeout(() => {

                    window.location.href =
                        href;

                }, 250);

            }
        );

    });

});