// Make requests to the webserver that update a specified user's
// database information. Allow users to save
// and remove listings from their profile.

async function init(){
    console.log("loaded")
    loadUser();
}


// Save an apartment for a user to their
// 'saved' field in the user schema.
async function saveApt(apt){
    // load apt name into 'apt' parameter in html
    try{
        let response = await fetch(`/users/saveApt?apt=${apt}`,
            { method: "POST", body: JSON.stringify({apt: apt}), headers: {'Content-Type': 'application/json'}})
        let responseJSON = await response.json();
        if (responseJSON.status == "error"){
            console.log("error:" + responseJSON.error);
        }else{
            console.log(`${apt}-addbtn`);
            document.getElementById(`${apt}-addbtn`).classList.remove("btn-dark");
            document.getElementById(`${apt}-addbtn`).classList.add("btn-success");
        }
        console.log(responseJSON);
        return responseJSON;
    }catch(error){
        console.log("error:" + error);
    }

}

// Remove an apartment from 'saved' field for a user's schema.
async function unsaveApt(apt){
    // load apt name into 'apt' parameter in html

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

// Load all posts in the user's 'saved' field
// from the user schema.
async function loadUser(){
    const username = "test user"; // temporary user
    try {
        let response = await fetch(`/users?username=${username}`);
        let responseJSON = await response.json();
        let newHTML = responseJSON;
        // load newHTML
        if (newHTML.status === "no savings") {
            document.getElementById("user_info_div").innerHTML = '';
        } else if (newHTML.status === "error") {
            document.getElementById("user_info_div").innerHTML = 'Error Loading Posts';
        } else {
            document.getElementById("user_info_div").innerHTML = newHTML;
        }
    } catch(error) {
      console.log(error);
    }
  }

// Save unique users to the database.
async function saveUser() {
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


