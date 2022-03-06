async function init(){
    loadUser()
}

async function saveUser(){
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');
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

async function loadUser(){
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');
  try {
  let response = await fetch(`/users?username=${encodeURIComponent(username)}`);
  let responseJSON = await response.json();
  let newHTML = `<a href=${responseJSON}>${responseJSON}</a>`
  // load newHTML
  // document.getElementById("user_info_div").innerHTML = newHTML;
  } catch(error) {
    console.log(error);
  }
}

// Save an apartment for a user
async function saveApt(apt){
  // load apt name into 'apt' parameter in html
  try{
      let response = await fetch(`/users/saveApt`,
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

// Remove an apartment for a user
async function unsaveApt(apt){
  // load apt name into 'apt' parameter in html
  try{
      let response = await fetch(`/users/unsaveApt`,
          { method: "POST", body: JSON.stringify({apt: apt}), headers: {'Content-Type': 'application/json'}})
      let responesJSON = await response.json();
      if(responesJSON.status == "error"){
          console.log("error:" + responesJSON.error);
      }else{
          loadPosts();
      }
      return responesJSON;
  }catch(error){
      console.log("error:" + error);
  }
}