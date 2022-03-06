'use strict'

async function init(){
    console.log("loaded")
    loadUser()
}

let hamburger = document.querySelector(".hamburger");
hamburger.addEventListener('click', myFunction1);

function myFunction1() {
    let navMenu = document.querySelector(".nav-menu");

    if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    } else {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
}

// Save an apartment for a user
async function saveApt(){
    // load apt name into 'apt' parameter in html
    let apt = document.querySelector("h2.detail-titles").textContent;
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

// Remove an apartment for a user
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


async function loadUser(){
    // const urlParams = new URLSearchParams(window.location.search); // change back later
    // const username = urlParams.get('user');
    const username = "test user"; // temporary user
    try {
        // let response = await fetch(`/users?username=${encodeURIComponent(username)}`); // change back later
        let response = await fetch(`/users?username=${username}`);
        let responseJSON = await response.json();
        let newHTML = responseJSON;
        // console.log(newHTML[0])
        // load newHTML
        // document.getElementById("user_info_div").innerHTML = newHTML;
        document.getElementById("user_info_div").innerHTML = newHTML;
        // document.getElementById("main").innerHTML = newHTML;
    } catch(error) {
      console.log(error);
    }
  }