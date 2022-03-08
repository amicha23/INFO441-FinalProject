'use strict'

//import { response } from "express";

async function init(){
    console.log("loaded")
    loadUser();
}

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

// Save an apartment for a user to saved field
async function saveApt(apt){
    // load apt name into 'apt' parameter in html
    // let apt = document.querySelector("h2.detail-titles").textContent;
    try{
        let response = await fetch(`/users/saveApt?apt=${apt}`,
            { method: "POST", body: JSON.stringify({apt: apt}), headers: {'Content-Type': 'application/json'}})
        let responseJSON = await response.json();
        if(responseJSON.status == "error"){
            console.log("error:" + responseJSON.error);
        }else{
            // loadUser();
        }
        console.log(responseJSON);
        return responseJSON;
    }catch(error){
        console.log("error:" + error);
    }
  
}
// Remove an apartment from saved field for a user
async function unsaveApt(apt){
    // load apt name into 'apt' parameter in html
    // console.log(this.id);
    // let apt = this.id;
    // console.log(this)
    console.log("apt", apt)

    try{
        let response = await fetch(`/users/unsaveApt?apt=${apt}`,
            { method: "POST", body: JSON.stringify({apt: apt}), headers: {'Content-Type': 'application/json'}})
        let responesJSON = await response.json();
        if(responesJSON.status == "error"){
            console.log("error:" + responesJSON.error);
        }else{
            loadUser();
        }
        return responesJSON;
    }catch(error){
        console.log("error:" + error);
    }
  }

// Load all posts in the user saved field
async function loadUser(){
    // const urlParams = new URLSearchParams(window.location.search); // change back later
    // const username = urlParams.get('user');
    const username = "test user"; // temporary user
    try {
        // let response = await fetch(`/users?username=${encodeURIComponent(username)}`); // change back later
        let response = await fetch(`/users?username=${username}`);
        let responseJSON = await response.json();
        let newHTML = responseJSON;
        // console.log(newHTML)
        // load newHTML
        // document.getElementById("user_info_div").innerHTML = newHTML;
        if (newHTML.status === "no savings") {
            document.getElementById("user_info_div").innerHTML = '';
        } else if (newHTML.status === "error") {
            document.getElementById("user_info_div").innerHTML = 'Error Loading Posts';
        } else {
            document.getElementById("user_info_div").innerHTML = newHTML;
        }   
        // document.getElementById("main").innerHTML = newHTML;
    } catch(error) {
      console.log(error);
    }
  }


async function saveUser() {
    // const urlParams = new URLSearchParams(window.location.search); //switch back later for sessions
    // const username = urlParams.get('user');
    let username = "test another user"
    try {
        let response = await fetch(`/users`, {
            method: "POST",
            body: JSON.stringify({username: username}),
            headers: {'Content-Type': 'application/json'}
        })
        let responseJSON = await response.json();
        if (responseJSON.status == "error"){
            console.log("error:" + responseJSON.error);
        }
        return responseJSON;
    } catch(error){
        console.log("error:" + error);
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