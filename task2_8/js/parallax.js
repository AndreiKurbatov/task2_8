"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const parallaxPhoto = document.getElementById("parallax-photo");
    const parallaxHeader = document.getElementById("parallax-header");
    const parallaxParagraph = document.getElementById("parallax-paragraph");
    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        parallaxPhoto.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        parallaxHeader.style.transform = `translateY(${scrollPosition * -0.2}px)`;
        parallaxParagraph.style.transform = `translateY(${scrollPosition * -0.1}px)`;
    });
});
