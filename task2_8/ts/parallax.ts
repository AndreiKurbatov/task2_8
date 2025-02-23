document.addEventListener("DOMContentLoaded", function () {
    const parallaxPhoto = document.getElementById("parallax-photo") as HTMLElement;
    const parallaxHeader = document.getElementById("parallax-header") as HTMLElement;
    const parallaxParagraph = document.getElementById("parallax-paragraph") as HTMLElement;

    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;

        parallaxPhoto.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        parallaxHeader.style.transform = `translateY(${scrollPosition * -0.2}px)`;
        parallaxParagraph.style.transform = `translateY(${scrollPosition * -0.1}px)`;
    });
});
