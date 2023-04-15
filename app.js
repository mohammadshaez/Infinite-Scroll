let photosArray = [];
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
// unsplash API
const count = 5;
const apiKey = "LM2dqATfwM7jBvzvSiRFFZ0oPjojnkqUgEKlMMKNEqU";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// check if all images are loaded
function imageOnLoad() {
    console.log("image loaded");
    imageLoaded++;
    if (imageLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("ready", ready);
    }
}

// create elements for links and images & add to dom
function displayPhotos() {
    // run a function for each object in photosArray
    photosArray.forEach((photo) => {
        totalImages = photosArray.length;
        imageLoaded = 0;
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: "_blank"
        });

        // create <img> for photos
        const image = document.createElement('img');
        setAttribute(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        image.addEventListener('load', imageOnLoad);

        // append image to <a>
        item.appendChild(image);
        // append <a> to image container
        imageContainer.appendChild(item);
    });
}

async function apiData() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray)
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

window.addEventListener('scroll', () => {
    // console.log("reached");
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        apiData();
    }
});

// onload
apiData();