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

let listingsHTML = document.getElementById('feed');

  //fetching api for apartment POST
const fetchListings = (distanceAway = 10, minPrice = 0, maxPrice = 100000, minSize = 0, maxSize = 100000) => {
    let listingsHTML = document.getElementById('feed');

    let outerDiv = document.createElement('div');

    fetch(`/api/post?distanceAway=${distanceAway}&minPrice=${minPrice}&maxPrice=${maxPrice}&minSize=${minSize}&maxSize=${maxSize}`).then((response) => {
        return response.json();
    }).then((res) => {
        console.log('Res is: ', res.data)
        let listings = res.data;
        listings.map((item) => {
            let wrapper = document.createElement('div');
            let listingName = document.createElement('h1');
            let area = document.createElement('p')

            listingName.innerHTML = `${item.placeName}`;
            area.innerHTML = `${item.area}`;

            wrapper.appendChild(listingName)
            wrapper.appendChild(area)

            outerDiv.appendChild(wrapper)
        })
    }).catch((err) => console.log('Something went wrong: ',err))

   listingsHTML && listingsHTML.appendChild(outerDiv)
}

fetchListings();


const filterListings = (event) => {
    event.preventDefault();
    const priceFilter = document.getElementById('priceFilter').value;

    console.log('PriceFilter is: ', priceFilter)
}