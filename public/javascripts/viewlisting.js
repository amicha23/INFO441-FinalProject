// Request apartment data from the database
// based on user filtering and display this
// information in separate cards.

'use strict'

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


// Display slider values
function reLoadListings() {
    let slidervalue1 = document.getElementById("formControlRange1").value;
    document.getElementById("formControlRange1").value
    let ptag = document.getElementById("slider-value1");
    ptag.innerText = slidervalue1;

    let slidervalue2 = document.getElementById("formControlRange2").value;
    document.getElementById("formControlRange2").value
    ptag = document.getElementById("slider-value2");
    ptag.innerText = slidervalue2;

    let slidervalue3 = document.getElementById("formControlRange3").value;
    document.getElementById("formControlRange3").value
    ptag = document.getElementById("slider-value3");
    ptag.innerText = slidervalue3;

}

// fetching api for apartment data
async function fetchListings() {
    let listingsHTML = document.getElementById('feed');
    listingsHTML.innerHTML = '';
    let outerDiv = document.createElement('div');
    let maxPrice = document.getElementById("slider-value1").innerHTML;
    let distanceAway = document.getElementById("slider-value2").innerHTML;
    let maxSize = document.getElementById("slider-value3").innerHTML;
    let minPrice = 0;
    let minSize = 0;

    try {
        let response = await fetch(`/api/post?distanceAway=${distanceAway}&minPrice=${minPrice}&maxPrice=${maxPrice}&minSize=${minSize}&maxSize=${maxSize}`)
        let res = await response.json();
        console.log('Res is: ', res.data)
        let listings = res.data;
        listings.map((item) => {
            let wrapper = document.createElement('div');
            let listingName = document.createElement('h1');
            let area = document.createElement('p')
            listingName.innerHTML = `${item.placeName}`;
            area.innerHTML = `${item.area}`;

            wrapper.innerHTML = `<div>
                                    <h2 id=${item["placeName"]} class="detail-titles">${item["placeName"]}</h2>
                                    <flex class="center">
                                        <img class="viewImg" src=${item["image"]} alt="photo of ${item["placeName"]}" loading="lazy">
                                    </flex>
                                </div>

                                <div class="row">
                                    <div class="card-row">
                                        <div class="column mb-4">
                                            <p class="card-text text-center">
                                                Description: ${item["description"]}
                                            </p>
                                        </div>

                                        <div class="column">
                                            <div class="card mb-4">
                                                <div class="description card-body">
                                                    <div>
                                                        <p class="card-text">Area: ${item["area"]}</p>
                                                        <p class="card-text">Location: Savanna located on 45th</p>
                                                        <p class="card-text">Distance Away: ${item["distanceAway"]} mi</p>
                                                        <p class="card-text">Features: ${item["features"]} </p>
                                                        <p class="card-text">Size: ${item["size"]} SqFt</p>
                                                        <p class="card-text">Price: $${item["price"]} per month</p>
                                                        <a id='${item.placeName}-addbtn' onclick="saveApt('${item.placeName}')" class="btn btn-dark addListBtn" role="button">Add Listing</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`

            outerDiv.appendChild(wrapper)


        })
        listingsHTML && listingsHTML.appendChild(outerDiv)
    } catch(error) {
        listingsHTML.innerHTML = 'could not load posts';
    }
}




// Filter apartment listings code
function filterListings (event) {
    event.preventDefault();
    const priceFilter = document.getElementById('priceFilter').value;
    const distanceAwayfilter = document.getElementById('distanceAwayfilter').value;
    const sizefilter = document.getElementById('sizefilter').value;

    console.log('PriceFilter is: ', priceFilter)
    console.log('DistanceAwayfilter is: ', distanceAwayfilter)
    console.log('Sizefilter is: ', sizefilter)

}