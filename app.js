import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import msIdExpress from 'microsoft-identity-express'

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from './db.js';

const appSettings = {
  appCredentials: {
    clientId: "5107f523-c932-4735-8c36-be9d23f87f3f",
    tenantId: "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
    clientSecret: "V5-7Q~tW~4_trwW6kmH9HSPx0lkIxi~4JSQc9"
  },
  authRoutes: {
    redirect: "/redirect",
    error: "/error",
    unauthorized: "/unauthorized"
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "vewkhivw44einvwvripouew",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))


const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next){
    req.db = db;
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/signin',
    msid.signIn({postLoginRedirect: '/'})
)

app.get('/signout',
    msid.signOut({postLogoutRedirect: '/'})
)

app.get('/error', (req, res) => res.status(500).send('Server Error'))

app.get('/unauthorized', (req, res) => res.status(401).send('Permission Denied'))

export default app;


let pricebutton = document.querySelector('#pricefilterbtn');
pricebutton.addEventListener('click', togglePrice);

function togglePrice() {
    let pricefilter = document.querySelector("#pricefilter");
    if (pricefilter.style.display === "inline-block") {
        pricefilter.style.display = "none";
        pricebutton.style.background = "rgb(47, 47, 47)";
        pricebutton.style.color = "white";
    } else {
        pricefilter.style.display = "inline-block";
        pricebutton.style.background = "white";
        pricebutton.style.color = "black";
    }
}

let roommatebutton = document.querySelector('#roommatefilterbtn');
roommatebutton.addEventListener('click', toggleRoommates);

function toggleRoommates() {
    let roommatefilter = document.querySelector("#roommatefilter");
    if (roommatefilter.style.display === "inline-block") {
        roommatefilter.style.display = "none";
        roommatebutton.style.background = "rgb(47, 47, 47)";
        roommatebutton.style.color = "white";
    } else {
        roommatefilter.style.display = "inline-block";
        roommatebutton.style.background = "white";
        roommatebutton.style.color = "black";
    }
}

let addListBtn = document.querySelector(".addListBtn");
addListBtn.addEventListener('click', toggleForm);

function toggleForm() {
    let formContainer = document.querySelector(".formContainer");
    if (formContainer.style.display === "inline-block") {
        formContainer.style.display = "none";
    } else {
        formContainer.style.display = "block";
    }
}

let hamburger = document.querySelector(".hamburger");
hamburger.addEventListener('click', myFunction1);

function myFunction1() {
    let navMenu = document.querySelector(".nav-menu");

    if(hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    } else {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
}

let state = {
    data: {},
    addListing: [],
    maximumPrice: 1800,
    maximumRoommmate: 5
};

fetch('aptData.json')
    .then((response) => {
        return response.json();
    })
    .then((downloadedData) => {
        state.data = downloadedData;
        renderCards();
    })
    .catch((error) => {
        console.error(error);
    });

function createCard(Listing) {
    let newCol = document.createElement('div');
    newCol.classList.add('col-sm-12', 'col-md-6', 'col-xl-6', 'd-flex', 'flex-item');

    let newCard = document.createElement('div');
    newCard.classList.add('card', 'mb-4');

    let newCardBody = document.createElement('div');
    newCardBody.classList.add('card-body');

    let newCardRow = document.createElement('div');
    newCardRow.classList.add('card-row');

    let newColSm = document.createElement('div');
    newColSm.classList.add('col-sm');

    let newCardTitle = document.createElement('h3');
    newCardTitle.classList.add('mt-3');
    newCardTitle.textContent = Listing.listingName;

    let unorderedList = document.createElement('ul');
    unorderedList.classList.add('list-group', 'list-group-flush');

    let newCardText1 = document.createElement('li');
    newCardText1.classList.add('list-group-item', 'card-text');
    newCardText1.textContent = "Location: " + Listing.location;

    let newCardText2 = document.createElement('li');
    newCardText2.classList.add('list-group-item', 'card-text');
    newCardText2.textContent = "Months Available: " + Listing.duration;

    let newCardText3 = document.createElement('li');
    newCardText3.classList.add('list-group-item', 'card-text');
    newCardText3.textContent = "Price: " + Listing.price;

    let newCardText4 = document.createElement('li');
    newCardText4.classList.add('list-group-item', 'card-text');
    newCardText4.textContent = "Number of Roommates: " + Listing.roommates;

    let newCardText5 = document.createElement('li');
    newCardText5.classList.add('list-group-item', 'card-text');
    newCardText5.textContent = "Features: " + Listing.features;

    let button1 = document.createElement('a');
    button1.classList.add('view', 'btn', 'btn-dark');
    button1.textContent = "View Listing";
    button1.href = "viewlisting.html";

    let savedButton = document. createElement('a');
    savedButton.classList.add('saved', 'btn', 'btn-dark');

    let savedLogo = document.createElement('span');
    savedLogo.classList.add('saved-logo');

    let newCarImage = document.createElement('img');
    newCardImage.src = Listing.image;

    newCardRow.appendChild(newCardImage);
    newColSm.appendChild(newCardTitle);
    unorderedList.appendChild(newCardText1);
    unorderedList.appendChild(newCardText2);
    unorderedList.appendChild(newCardText3);
    unorderedList.appendChild(newCardText4);
    unorderedList.appendChild(newCardText5);
    newColSm.appendChild(unorderedList);
    newColSm.appendChild(button1);
    newColSm.appendChild(savedButton);
    savedButton.appendChild(savedLogo);
    newCardRow.appendChild(newColSm);
    newCardBody.appendChild(newCardRow);
    newCard.appendChild(newCardBody);
    newCol.appendChild(newCard);

    return newCol;
}

function renderCards() {
    let linkToRow = document.querySelector('#feed')
    linkToRow.innerHTML = "";

    state.data.listings.forEach(function(listing) {
        if (listing.price <= state.maximumPrice && listing.roommates <= state.maximumRoommmate) {
            linkToRow.appendChild(createCard(listing));
        }
    });

    const searchBox = document.getElementById('searchBox').querySelector('input');
    searchBox.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        linkToRow.innerHTML = "";
        state.data.listings.forEach(function(listing) {
            if (listing.listingName.toLowerCase().includes(searchString) ||
                listing.location.toLowerCase().includes(searchString) ||
                listing.duration.toLowerCase().includes(searchString) ||
                listing.price.toLowerCase().includes(searchString) ||
                listing.roommates.toLowerCase().includes(searchString) ||
                listing.features.toLowerCase().includes(searchString)) {
                    linkToRow.appendChild(createCard(listing));
                }
        });
    });

    state.addListing.forEach(function(listing) {
        linkToRow.appendChild(createCard(listing));
    });
}

let linkToSlider1 = document.querySelector('#formControlRange1');
linkToSlider1.addEventListener('change', function() {
    state.maximumPrice = linkToSlider1.value;
    renderCards();
})

const range1 = document.getElementById('formControlRange1'),
      rangeV1 = document.getElementById('rangeV1'),
      setValue1 = () => {
          const newValue1 = Number((range1.value - range1.min) * 100 / (range1.max - range1.min)),
                newPosition1 = 10 - (newValue1 * 0.2);
                rangeV1.innerHTML = '<span>${range1.value}</span>';
                range1.style.left = 'calc(${newValue1}% + (${newPosition1}px))';
      };
document.addEventListener("DOMContentLoaded", setValue1);
range1.addEventListener('input', setValue1);

let linkToSlider2 = document.querySelector('#formControlRange2');
linkToSlider2.addEventListener('change', function() {
    state.maximumRoommmate = linkToSlider2.value;
    renderCards();
})

const range2 = document.getElementById('formControlRange2'),
      rangeV2 = document.getElementById('rangeV2'),
      setValue2 = () => {
          const newValue2 = Number((range2.value - range2.min) * 100 / (range2.max - range2.min)),
          newPosition2 = 10 - (newValue2 * 0.2);
          rangeV2.innerHTML = '<span>${range2.value}</span>';
          rangeV2.style.left = 'calc(${newValue2}% + (${newPosition2}px))';
      };
document.addEventListener("DOMContentLoaded", setValue2);
range2.addEventListener('input', setValue2);

let form = document.querySelector('#addListing');
form.addEventListener('submit', handleForm);

function addNewListing(listingName, location, duration, price, roommates, features, image) {
    state.addListing.push({"id": state.data.listings.length + 1, "listingName": listingName, "location": location, "duration": duration, "price": price, "roommates": roommates, "features": features, "image": image});
    console.log(state.addListing);
    renderCards();
    toggleForm();
}

function handleForm(event) {
    event.preventDefault();
    let listingName = document.querySelector('#listingName');
    let location = document.querySelector('#location');
    let duration = document.querySelector('#duration');
    let price = document.querySelector('#price');
    let roommates = document.querySelector('#roommates');
    let features = document.querySelector('#features');
    let image = document.querySelector('#image');

    addNewListing(listingName, location, duration, price, roommates, features, image);
}