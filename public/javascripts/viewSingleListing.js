'use strict'

//import { response } from "express";

let hamburger = document.querySelector(".hamburger");
hamburger.addEventListener('click', myFunctionham1);

// for the hamburger menu to toggle when clicked on
function myFunctionham1() {
    let navMenu = document.querySelector(".nav-menu");

    if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    } else {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
}