document.addEventListener("DOMContentLoaded", function() {
    const article = document.querySelector("article");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    function updateArticlePosition() {
        const mainRect = main.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate the middle of the viewport
        const middleOfViewport = windowHeight / 2;

        // Calculate the top position of the article
        const articleTop = mainRect.top + window.scrollY;

        // Check if the article should be fixed
        if (window.scrollY + middleOfViewport >= articleTop && window.scrollY + middleOfViewport + articleHeight <= footerRect.top + window.scrollY) {
            article.style.position = "fixed";
            article.style.top = `${middleOfViewport - articleHeight / 2}px`;
        } else {
            article.style.position = "relative";
            article.style.top = "0";
        }
    }

    window.addEventListener("scroll", updateArticlePosition);
    window.addEventListener("resize", updateArticlePosition);
    updateArticlePosition(); // Initial call to set the position
});