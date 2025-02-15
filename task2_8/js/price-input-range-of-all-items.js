"use strict";
const rangeSlider = document.getElementById("rs-range-line");
const rangeBullet = document.getElementById("rs-bullet");
const boxMinmax = document.getElementById("box-minmax");
const rangeSliderContainer = document.getElementById("range-slider");
const rsBulletSize = 22;
let rangeSliderContainerWidth = rangeSliderContainer.offsetWidth;
boxMinmax.style.width = rangeSliderContainerWidth + 'px';
const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        rangeSliderContainerWidth = entry.contentRect.width;
        boxMinmax.style.width = rangeSliderContainerWidth + 'px';
        showSliderValue();
    }
});
resizeObserver.observe(rangeSliderContainer);
rangeSlider.addEventListener("input", showSliderValue, false);
function showSliderValue() {
    rangeBullet.innerHTML = rangeSlider.value;
    var bulletPosition = (Number(rangeSlider.value) / Number(rangeSlider.max));
    rangeBullet.style.left = (bulletPosition * (rangeSliderContainerWidth - rsBulletSize)) + "px";
}
