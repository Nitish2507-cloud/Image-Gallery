/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }, 1000);

});

/* ==========================================
   ELEMENTS
========================================== */

const filterButtons =
document.querySelectorAll(".filter-btn");

const galleryItems =
document.querySelectorAll(".gallery-item");

const searchInput =
document.getElementById("searchInput");

const imageCount =
document.getElementById("imageCount");

const favoriteCount =
document.getElementById("favoriteCount");

const themeToggle =
document.getElementById("themeToggle");

const body =
document.body;

/* ==========================================
   IMAGE COUNTER
========================================== */

function updateImageCount() {

    const visibleItems =
    [...galleryItems].filter(item =>
        item.style.display !== "none"
    );

    imageCount.textContent =
    visibleItems.length;
}

updateImageCount();

/* ==========================================
   FILTERS
========================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.getAttribute("data-filter");

        if (filter === "favorites") {

            showFavorites();

            return;
        }

        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.classList.contains(filter)
            ) {

                item.style.display = "block";

            }

            else {

                item.style.display = "none";

            }

        });

        updateImageCount();

    });

});

/* ==========================================
   SEARCH
========================================== */

searchInput.addEventListener("keyup", () => {

    const searchValue =
    searchInput.value.toLowerCase();

    galleryItems.forEach(item => {

        const category =
        item.className.toLowerCase();

        if (
            category.includes(searchValue)
        ) {

            item.style.display = "block";

        }

        else {

            item.style.display = "none";

        }

    });

    updateImageCount();

});

/* ==========================================
   LIGHTBOX
========================================== */

/* ==========================================
   PREMIUM LIGHTBOX SYSTEM
========================================== */

const lightbox =
document.querySelector(".lightbox");

const lightboxImg =
document.querySelector(".lightbox-img");

const closeBtn =
document.querySelector(".close-btn");

const nextBtn =
document.querySelector(".next-btn");

const prevBtn =
document.querySelector(".prev-btn");

const downloadBtn =
document.querySelector(".download-btn");

const fullscreenBtn =
document.getElementById("fullscreenBtn");

const galleryItemsArray =
document.querySelectorAll(".gallery-item");

console.log("Gallery Items:", galleryItemsArray.length);

document.querySelectorAll(".view-btn").forEach((btn,index)=>{

    console.log("Button Found", index);

});

let currentIndex = 0;

/* ==========================================
   OPEN LIGHTBOX FUNCTION
========================================== */

function openLightbox(index){

    currentIndex = index;

    const currentImage =
    galleryItemsArray[index]
    .querySelector("img");

    lightboxImg.src =
    currentImage.src;

    downloadBtn.href =
    currentImage.src;

    lightbox.style.display =
    "flex";
}

/* ==========================================
   IMAGE CLICK
========================================== */

galleryItemsArray.forEach((item,index)=>{

    const img =
    item.querySelector("img");

    img.addEventListener("click",()=>{

        openLightbox(index);

    });

});

/* ==========================================
   VIEW BUTTON CLICK
========================================== */

document.querySelectorAll(".view-btn")
.forEach((button,index)=>{

    button.onclick = function(){

        console.log("View clicked", index);

        currentIndex = index;

        const currentImage =
        galleryItemsArray[index]
        .querySelector("img");

        lightboxImg.src =
        currentImage.src;

        downloadBtn.href =
        currentImage.src;

        lightbox.style.display =
        "flex";
    };

});
/* ==========================================
   UPDATE IMAGE
========================================== */

function showImage(){

    const currentImage =
    galleryItemsArray[currentIndex]
    .querySelector("img");

    lightboxImg.src =
    currentImage.src;

    downloadBtn.href =
    currentImage.src;
}

/* ==========================================
   NEXT
========================================== */

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(
        currentIndex >=
        galleryItemsArray.length
    ){
        currentIndex = 0;
    }

    showImage();

});

/* ==========================================
   PREVIOUS
========================================== */

prevBtn.addEventListener("click",()=>{

    currentIndex--;

    if(
        currentIndex < 0
    ){
        currentIndex =
        galleryItemsArray.length - 1;
    }

    showImage();

});

/* ==========================================
   CLOSE
========================================== */

closeBtn.addEventListener("click",()=>{

    lightbox.style.display =
    "none";

});

/* ==========================================
   CLICK OUTSIDE CLOSE
========================================== */

lightbox.addEventListener("click",(e)=>{

    if(
        e.target === lightbox
    ){

        lightbox.style.display =
        "none";
    }

});

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener("keydown",(e)=>{

    if(
        lightbox.style.display === "flex"
    ){

        if(
            e.key === "ArrowRight"
        ){

            nextBtn.click();
        }

        if(
            e.key === "ArrowLeft"
        ){

            prevBtn.click();
        }

        if(
            e.key === "Escape"
        ){

            lightbox.style.display =
            "none";
        }

    }

});

/* ==========================================
   FULLSCREEN
========================================== */

fullscreenBtn.addEventListener("click",()=>{

    if(
        !document.fullscreenElement
    ){

        lightboxImg.requestFullscreen();

    }
    else{

        document.exitFullscreen();

    }

});

/* ==========================================
   THEME TOGGLE
========================================== */

function loadTheme() {

    const savedTheme =
    localStorage.getItem("theme");

    if (
        savedTheme === "light"
    ) {

        body.classList.add("light");

        themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }

}

loadTheme();

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light");

    if (
        body.classList.contains("light")
    ) {

        localStorage.setItem(
            "theme",
            "light"
        );

        themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }

    else {

        localStorage.setItem(
            "theme",
            "dark"
        );

        themeToggle.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});

/* ==========================================
   FAVORITES
========================================== */

const favoriteButtons =
document.querySelectorAll(".favorite-btn");

let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

favoriteButtons.forEach((button, index) => {

    if (
        favorites.includes(index)
    ) {

        button.classList.add("active");

    }

    button.addEventListener("click", e => {

        e.stopPropagation();

        button.classList.toggle("active");

        if (
            favorites.includes(index)
        ) {

            favorites =
            favorites.filter(
                fav => fav !== index
            );

        }

        else {

            favorites.push(index);

        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        updateFavoriteCount();

    });

});

/* ==========================================
   FAVORITE COUNTER
========================================== */

function updateFavoriteCount() {

    favoriteCount.textContent =
    favorites.length;

}

updateFavoriteCount();

/* ==========================================
   SHOW FAVORITES
========================================== */

function showFavorites() {

    galleryItems.forEach(
        (item, index) => {

            if (
                favorites.includes(index)
            ) {

                item.style.display =
                "block";

            }

            else {

                item.style.display =
                "none";

            }

        }
    );

    updateImageCount();

}

/* ==========================================
   SCROLL REVEAL
========================================== */

const observer =
new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (
            entry.isIntersecting
        ) {

            entry.target.classList.add(
                "show"
            );

        }

    });

},

{
    threshold: 0.2
}

);

galleryItems.forEach(item => {

    observer.observe(item);

});

/* ==========================================
   CLICK OUTSIDE LIGHTBOX
========================================== */

lightbox.addEventListener("click", e => {

    if (
        e.target === lightbox
    ) {

        lightbox.style.display =
        "none";

    }

});

/* ==========================================
   SMOOTH HERO BUTTONS
========================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            const target =
            document.querySelector(
                this.getAttribute("href")
            );

            target.scrollIntoView({

                behavior: "smooth"

            });

        }
    );

});

/* ==========================================
   END OF FILE
========================================== */

console.log(
"Modern Image Gallery Pro Loaded Successfully 🚀"
);
