// 'use strict'

// let pricebutton = document.querySelector('#pricefilterbtn');
// pricebutton.addEventListener('click', togglePrice);

// function togglePrice() {
//     let pricefilter = document.querySelector("#pricefilter");
//     if (pricefilter.style.display === "none") {
//         pricefilter.style.display = "inline-block";
//         pricebutton.style.background = "rgb(47, 47, 47)";
//         pricebutton.style.color = "white";
//     } else {
//         pricefilter.style.display = "none";
//         pricebutton.style.background = "white";
//         pricebutton.style.color = "black";
//     }
// }

// let distanceAwaybutton = document.querySelector('#distanceAwayfilterbtn');
// distanceAwaybutton.addEventListener('click', toggleDistanceAway);

// function toggleDistanceAway() {
//     let distanceAwayfilter = document.querySelector("#distanceAwayfilter");
//     if (distanceAwayfilter.style.display === "none") {
//         distanceAwayfilter.style.display = "inline-block";
//         distanceAwaybutton.style.background = "rgb(47, 47, 47)";
//         distanceAwaybutton.style.color = "white";
//     } else {
//         distanceAwayfilter.style.display = "none";
//         distanceAwaybutton.style.background = "white";
//         distanceAwaybutton.style.color = "black";
//     }
// }

// let addListBtn = document.querySelector(".addListBtn");
// addListBtn.addEventListener('click', toggleForm);

// function toggleForm() {
//     let formContainer = document.querySelector(".formContainer");
//     if (formContainer.style.display === "none") {
//         formContainer.style.display = "block";
//     } else {
//         formContainer.style.display = "none";
//     }
// }

// let hamburger = document.querySelector(".hamburger");
// hamburger.addEventListener('click', myFunctionham1);


// function myFunctionham1() {
//     let navMenu = document.querySelector(".nav-menu");

//     if (hamburger.classList.contains("active")) {
//         hamburger.classList.remove("active");
//         navMenu.classList.remove("active");
//     } else {
//         hamburger.classList.toggle("active");
//         navMenu.classList.toggle("active");
//     }
// }


// // keep track of state
// let state = {
//     data: {},
//     addAListing: [],
//     maximumPrice: 1800,
//     maximumDistanceAway: 10
// };

// fetch('./aptData.json') 
//     .then((response) => { 
//         return response.json();
//     })
//     .then((downloadedData) => { 
//         state.data = downloadedData; 
    
//         renderCards();
//     })
//     .catch((error) => {
//         console.error(error);
//     });


// // create a single card using vanilla js

// function createCard(aSinglePlace) {
//     let newCol = document.createElement('div');
//     newCol.classList.add('col-sm-12', 'col-md-6', 'col-xl-6', 'd-flex', 'flex-item');

//     let newCard = document.createElement('div');
//     newCard.classList.add('card', 'mb-4');

//     let newCardBody = document.createElement('div');
//     newCardBody.classList.add('card-body');

//     let newCardRow = document.createElement('div');
//     newCardRow.classList.add('card-row');

//     let newColSm = document.createElement('div');
//     newColSm.classList.add('col-sm');

//     let newCardTitle = document.createElement('h3');
//     newCardTitle.classList.add('mt-3');
//     newCardTitle.textContent = aSinglePlace.placeName;

//     let unorderedList = document.createElement('ul');
//     unorderedList.classList.add('list-group', 'list-group-flush');

//     let newCardText1 = document.createElement('li');
//     newCardText1.classList.add('list-group-item', 'card-text');
//     newCardText1.textContent = "Area: " + aSinglePlace.area;

//     let newCardText2 = document.createElement('li');
//     newCardText2.classList.add('list-group-item', 'card-text');
//     newCardText2.textContent = "Leasing Term (Months Available): " + aSinglePlace.leasingTerm;

//     let newCardText3 = document.createElement('li');
//     newCardText3.classList.add('list-group-item', 'card-text');
//     newCardText3.textContent = "Price: " + aSinglePlace.price;

//     let newCardText4 = document.createElement('li');
//     newCardText4.classList.add('list-group-item', 'card-text');
//     newCardText4.textContent = "Distance Away from Campus: " + aSinglePlace.distanceAway;

//     let newCardText5 = document.createElement('li');
//     newCardText5.classList.add('list-group-item', 'card-text');
//     newCardText5.textContent = "Features: " + aSinglePlace.features;

//     let newCardText6 = document.createElement('li');
//     newCardText6.classList.add('list-group-item', 'card-text');
//     newCardText6.textContent = "Description: " + aSinglePlace.description;

//     let button1 = document.createElement('a');
//     button1.classList.add('view', 'btn', 'btn-dark');
//     button1.textContent = "View Listing";
//     button1.href = "viewlisting.html";

//     let savedbutton = document.createElement('a');
//     savedbutton.classList.add('saved', 'btn', 'btn-dark');

//     let savedlogo = document.createElement('span');
//     savedlogo.classList.add('saved-logo');

//     let newCardImage = document.createElement('img');
//     newCardImage.src = aSinglePlace.image;

//     newCardRow.appendChild(newCardImage);
//     newColSm.appendChild(newCardTitle);
//     unorderedList.appendChild(newCardText1);
//     unorderedList.appendChild(newCardText2);
//     unorderedList.appendChild(newCardText3);
//     unorderedList.appendChild(newCardText4);
//     unorderedList.appendChild(newCardText5);
//     unorderedList.appendChild(newCardText6);
//     newColSm.appendChild(unorderedList);
//     newColSm.appendChild(button1);
//     newColSm.appendChild(savedbutton);
//     savedbutton.appendChild(savedlogo);
//     newCardRow.appendChild(newColSm);
//     newCardBody.appendChild(newCardRow);
//     newCard.appendChild(newCardBody);
//     newCol.appendChild(newCard);

//     return newCol;
// }

// // loop over the data and create a card for each object
// function renderCards() {
//     let linkToRow = document.querySelector('#feed')
//     linkToRow.innerHTML = "";

//     state.data.listings.forEach(function(listing) {
//         // filtering the cards
//         if (listing.price <= state.maximumPrice && listing.distanceAway <= state.maximumDistanceAway) {
//             linkToRow.appendChild(createCard(listing));
//         }
//     });

//     // SearchBox searches anything
//     const searchBox = document.getElementById('searchBox').querySelector('input');
//     searchBox.addEventListener('keyup', (e) => {
//         const searchString = e.target.value.toLowerCase();
//         linkToRow.innerHTML = "";
//         state.data.listings.forEach(function(listing) {
//             if (listing.placeName.toLowerCase().includes(searchString) ||
//                 listing.area.toLowerCase().includes(searchString) ||
//                 listing.leasingTerm.toLowerCase().includes(searchString) ||
//                 listing.price.toLowerCase().includes(searchString) ||
//                 listing.distanceAway.toLowerCase().includes(searchString) ||
//                 listing.description.toLowerCase().includes(searchString) ||
//                 listing.features.toLowerCase().includes(searchString)) {
//                 linkToRow.appendChild(createCard(listing));
//             }
//         });
//     });

//     state.addAListing.forEach(function(listing) {
//         console.log(listing);
//         linkToRow.appendChild(createCard(listing));
//     });
// }

// // add eventlistener to slider to update state

// let LinkToSlider1 = document.querySelector('#formControlRange1');
// LinkToSlider1.addEventListener('change', function() {
//     state.maximumPrice = LinkToSlider1.value;
//     renderCards();
// })

// // Add display number on slider
// const
//     range1 = document.getElementById('formControlRange1'),
//     rangeV1 = document.getElementById('rangeV1'),
//     setValue1 = () => {
//         const
//             newValue1 = Number((range1.value - range1.min) * 100 / (range1.max - range1.min)),
//             newPosition1 = 10 - (newValue1 * 0.2);
//         rangeV1.innerHTML = `<span>${range1.value}</span>`;
//         rangeV1.style.left = `calc(${newValue1}% + (${newPosition1}px))`;
//     };
// document.addEventListener("DOMContentLoaded", setValue1);
// range1.addEventListener('input', setValue1);

// // maximum distance away slider
// let LinkToSlider2 = document.querySelector('#formControlRange2');
// LinkToSlider2.addEventListener('change', function() {
//     state.maximumDistanceAway = LinkToSlider2.value;
//     renderCards();
// })

// // Add display number on the second slider
// const
//     range2 = document.getElementById('formControlRange2'),
//     rangeV2 = document.getElementById('rangeV2'),
//     setValue2 = () => {
//         const
//             newValue2 = Number((range2.value - range2.min) * 100 / (range2.max - range2.min)),
//             newPosition2 = 10 - (newValue2 * 0.2);
//         rangeV2.innerHTML = `<span>${range2.value}</span>`;
//         rangeV2.style.left = `calc(${newValue2}% + (${newPosition2}px))`;
//     };
// document.addEventListener("DOMContentLoaded", setValue2);
// range2.addEventListener('input', setValue2);


// /// ADD A NEW LISTING BY FORM SUBMISSION

// let form = document.querySelector('#addListing');
// form.addEventListener('submit', handleForm);

// function handleForm(event) {
//     event.preventDefault();
//     let placeName = document.querySelector('#placeName');
//     let area = document.querySelector('#area');
//     let leasingTerm = document.querySelector('#leasingTerm');
//     let price = document.querySelector('#price');
//     let size = document.querySelector('#size');
//     let distanceAway = document.querySelector('#distanceAway');
//     let features = document.querySelector('#features');
//     let description = document.querySelector('#description');
//     let image = document.querySelector('#image');

//     addnewListing(placeName.value, area.value, leasingTerm.value, price.value, size.value, distanceAway.value, features.value, description.value, image);
// }

// function addnewListing(listingName, location, duration, price, roommates, features, description, image) {
//     state.addAListing.push({ "id": state.data.listings.length + 1, "placeName": placeName, "area": area, "leasingTerm": leasingTerm, "price": price, "size": size, "distanceAway": distanceAway, "features": features, "description": description, "image": image });
//     console.log(state.addAListing);
//     renderCards();
//     toggleForm();
// }