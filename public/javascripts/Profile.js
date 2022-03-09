async function init(){
    console.log("loaded")
    loadUser();
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


// async function saveUser(){
//   const urlParams = new URLSearchParams(window.location.search);
//   const username = urlParams.get('user');
//   try {
//       let response = await fetch(`/users`, {
//           method: "POST",
//           body: JSON.stringify({username: username}),
//           headers: {'Content-Type': 'application/json'}
//       })
//       let responseJSON = await response.json();
//       if (responseJSON.status == "error"){
//           console.log("error:" + responseJSON.error);
//       }
//       return responseJSON;
//   } catch(error){
//       console.log("error:" + error);
//   }
// }

// async function loadUser(){
//   const urlParams = new URLSearchParams(window.location.search);
//   const username = urlParams.get('user');
//   try {
//   let response = await fetch(`/users?username=${encodeURIComponent(username)}`);
//   let responseJSON = await response.json();
//   let newHTML = `<a href=${responseJSON}>${responseJSON}</a>`
//   // load newHTML
//   // document.getElementById("user_info_div").innerHTML = newHTML;
//   } catch(error) {
//     console.log(error);
//   }
// }

// // Save an apartment for a user
// async function saveApt(apt){
//   // load apt name into 'apt' parameter in html
//   try{
//       let response = await fetch(`/users/saveApt`,
//           { method: "POST", body: JSON.stringify({apt: apt}), headers: {'Content-Type': 'application/json'}})
//       let responesJSON = await response.json();
//       if(responesJSON.status == "error"){
//           console.log("error:" + responesJSON.error);
//       }else{
//           loadUser();
//       }
//       return responesJSON;
//   }catch(error){
//       console.log("error:" + error);
//   }
// }

// // Remove an apartment for a user
// async function unsaveApt(apt){
//   // load apt name into 'apt' parameter in html
//   try{
//       let response = await fetch(`/users/unsaveApt`,
//           { method: "POST", body: JSON.stringify({apt: apt}), headers: {'Content-Type': 'application/json'}})
//       let responesJSON = await response.json();
//       if(responesJSON.status == "error"){
//           console.log("error:" + responesJSON.error);
//       }else{
//           loadPosts();
//       }
//       return responesJSON;
//   }catch(error){
//       console.log("error:" + error);
//   }
// }


