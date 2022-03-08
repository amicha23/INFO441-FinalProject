let myIdentity = undefined;

const escapeHTML = str => str.replace(/[&<>'"]/g,
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));

// Change from login to logout button in landing
async function loadIdentity(){
  let identityInfo
  try{
      let response = await fetch(`users/getIdentity`);
      identityInfo = await response.json();
  }catch(error){
      identityInfo =  {
          status: "error",
          error: "There was an error: " + error
      };
  }

  let identity_div = document.getElementById("identity_div");
  if(identityInfo.status == "error"){
      myIdentity = undefined;
      identity_div.innerHTML = `<div>
      <button onclick="loadIdentity()">retry</button>
      Error loading identity: <span id="identity_error_span"></span>
      </div>`;
  } else if(identityInfo.status == "loggedin"){
      myIdentity = identityInfo.userInfo.username;
      identity_div.innerHTML = `
      <p>${identityInfo.userInfo.name} (${identityInfo.userInfo.username})</p>
      <a href="signout" class="btn btn-danger" role="button">Log out</a>`;
      saveUser(identityInfo.userInfo.username);
  } else { //loggedout
      myIdentity = undefined;
      identity_div.innerHTML = `
      <a href="signin" class="btn btn-primary" role="button">Log in</a>`;
  }
}

// Save unique users to the database
async function saveUser(identity) {
  // const urlParams = new URLSearchParams(window.location.search); //switch back later for sessions
  // const username = urlParams.get('user');
  // let username = "test another user"
  let username = identity;
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

// Hide saved listings button when not logged in
async function loadListings(){
  let identityInfo
  try{
      let response = await fetch(`users/getIdentity`);
      identityInfo = await response.json();
  }catch(error){
      identityInfo =  {
          status: "error",
          error: "There was an error: " + error
      };

  }
  if (identityInfo.status === "loggedout") {
    document.getElementById("listings").classList.add("d-none");
  } else {
    document.getElementById("listings").classList.remove("d-none");
  }
}
