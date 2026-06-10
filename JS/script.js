/* ==========================================
   MODERN IMAGE GALLERY PRO
   COMPLETE SCRIPT - PART 1
========================================== */

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader =
    document.getElementById("loader");

    if(loader){

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        }, 1000);

    }

});

/* ==========================================
   ELEMENTS
========================================== */

const body =
document.body;

const themeToggle =
document.getElementById("themeToggle");

const searchInput =
document.getElementById("searchInput");

const imageCount =
document.getElementById("imageCount");

const favoriteCount =
document.getElementById("favoriteCount");

const filterButtons =
document.querySelectorAll(".filter-btn");

const galleryItems =
document.querySelectorAll(".gallery-item");

const favoriteButtons =
document.querySelectorAll(".favorite-btn");

const viewButtons =
document.querySelectorAll(".view-btn");

/* ==========================================
   IMAGE COUNTER
========================================== */

function updateImageCount(){

    const visibleItems =

    [...galleryItems].filter(

        item =>

        item.style.display !== "none"

    );

    imageCount.textContent =

    visibleItems.length;

}

updateImageCount();

/* ==========================================
   THEME SYSTEM
========================================== */

function loadTheme(){

    const savedTheme =

    localStorage.getItem(
        "theme"
    );

    if(

        savedTheme === "light"

    ){

        body.classList.add(
            "light"
        );

        if(themeToggle){

            themeToggle.innerHTML =

            '<i class="fa-solid fa-sun"></i>';

        }

    }

}

loadTheme();

if(themeToggle){

    themeToggle.addEventListener(

        "click",

        ()=>{

            body.classList.toggle(
                "light"
            );

            if(

                body.classList.contains(
                    "light"
                )

            ){

                localStorage.setItem(

                    "theme",

                    "light"

                );

                themeToggle.innerHTML =

                '<i class="fa-solid fa-sun"></i>';

            }

            else{

                localStorage.setItem(

                    "theme",

                    "dark"

                );

                themeToggle.innerHTML =

                '<i class="fa-solid fa-moon"></i>';

            }

        }

    );

}

/* ==========================================
   FAVORITES SYSTEM
========================================== */

let favorites =

JSON.parse(

localStorage.getItem(
    "favorites"
)

) || [];

function saveFavorites(){

    localStorage.setItem(

        "favorites",

        JSON.stringify(
            favorites
        )

    );

}

function updateFavoriteCount(){

    favoriteCount.textContent =

    favorites.length;

}

favoriteButtons.forEach(

(button,index)=>{

    if(

        favorites.includes(index)

    ){

        button.classList.add(
            "active"
        );

    }

    button.addEventListener(

        "click",

        (e)=>{

            e.preventDefault();

            e.stopPropagation();

            if(

                favorites.includes(index)

            ){

                favorites =

                favorites.filter(

                    item =>
                    item !== index

                );

                button.classList.remove(
                    "active"
                );

            }

            else{

                favorites.push(index);

                button.classList.add(
                    "active"
                );

            }

            saveFavorites();

            updateFavoriteCount();

        }

    );

}

);

updateFavoriteCount();

/* ==========================================
   FILTER SYSTEM
========================================== */

function showAllImages(){

    galleryItems.forEach(

        item=>{

            item.style.display =
            "block";

        }

    );

    updateImageCount();

}

function showFavorites(){

    galleryItems.forEach(

        (item,index)=>{

            if(

                favorites.includes(index)

            ){

                item.style.display =
                "block";

            }

            else{

                item.style.display =
                "none";

            }

        }

    );

    updateImageCount();

}
/* ==========================================
   FILTER BUTTON EVENTS
========================================== */

filterButtons.forEach(

button=>{

    button.addEventListener(

        "click",

        ()=>{

            filterButtons.forEach(

                btn=>{

                    btn.classList.remove(
                        "active"
                    );

                }

            );

            button.classList.add(
                "active"
            );

            const filter =

            button.getAttribute(
                "data-filter"
            );

            if(

                filter === "favorites"

            ){

                showFavorites();

                return;

            }

            galleryItems.forEach(

                item=>{

                    if(

                        filter === "all" ||

                        item.classList.contains(
                            filter
                        )

                    ){

                        item.style.display =
                        "block";

                    }

                    else{

                        item.style.display =
                        "none";

                    }

                }

            );

            updateImageCount();

        }

    );

});

/* ==========================================
   SEARCH SYSTEM
========================================== */

if(searchInput){

    searchInput.addEventListener(

        "keyup",

        ()=>{

            const value =

            searchInput.value
            .toLowerCase()
            .trim();

            galleryItems.forEach(

                item=>{

                    const category =

                    item.className
                    .toLowerCase();

                    if(

                        category.includes(
                            value
                        )

                    ){

                        item.style.display =
                        "block";

                    }

                    else{

                        item.style.display =
                        "none";

                    }

                }

            );

            updateImageCount();

        }

    );

}

/* ==========================================
   LIGHTBOX ELEMENTS
========================================== */

const lightbox =
document.querySelector(
    ".lightbox"
);

const lightboxImg =
document.querySelector(
    ".lightbox-img"
);

const closeBtn =
document.querySelector(
    ".close-btn"
);

const nextBtn =
document.querySelector(
    ".next-btn"
);

const prevBtn =
document.querySelector(
    ".prev-btn"
);

const downloadBtn =
document.querySelector(
    ".download-btn"
);

const fullscreenBtn =
document.getElementById(
    "fullscreenBtn"
);

let currentIndex = 0;

/* ==========================================
   OPEN LIGHTBOX
========================================== */

function openLightbox(index){

    currentIndex = index;

    const image =

    galleryItems[index]
    .querySelector("img");

    lightboxImg.src =
    image.src;

    downloadBtn.href =
    image.src;

    lightbox.style.display =
    "flex";

}

/* ==========================================
   IMAGE CLICK
========================================== */

galleryItems.forEach(

(item,index)=>{

    const image =

    item.querySelector("img");

    image.addEventListener(

        "click",

        ()=>{

            openLightbox(
                index
            );

        }

    );

}

);

/* ==========================================
   VIEW BUTTON
========================================== */

viewButtons.forEach(

(button,index)=>{

    button.addEventListener(

        "click",

        (e)=>{

            e.preventDefault();

            e.stopPropagation();

            openLightbox(
                index
            );

        }

    );

}
);

/* ==========================================
   UPDATE IMAGE
========================================== */

function showImage(){

    const image =

    galleryItems[currentIndex]
    .querySelector("img");

    lightboxImg.src =
    image.src;

    downloadBtn.href =
    image.src;

}
/* ==========================================
   NEXT IMAGE
========================================== */

nextBtn.addEventListener(

    "click",

    ()=>{

        currentIndex++;

        if(

            currentIndex >=
            galleryItems.length

        ){

            currentIndex = 0;

        }

        showImage();

    }

);

/* ==========================================
   PREVIOUS IMAGE
========================================== */

prevBtn.addEventListener(

    "click",

    ()=>{

        currentIndex--;

        if(

            currentIndex < 0

        ){

            currentIndex =

            galleryItems.length - 1;

        }

        showImage();

    }

);

/* ==========================================
   CLOSE LIGHTBOX
========================================== */

closeBtn.addEventListener(

    "click",

    ()=>{

        lightbox.style.display =
        "none";

    }

);

/* ==========================================
   CLICK OUTSIDE TO CLOSE
========================================== */

lightbox.addEventListener(

    "click",

    (e)=>{

        if(

            e.target === lightbox

        ){

            lightbox.style.display =
            "none";

        }

    }

);

/* ==========================================
   FULLSCREEN
========================================== */

fullscreenBtn.addEventListener(

    "click",

    ()=>{

        if(

            !document.fullscreenElement

        ){

            lightboxImg
            .requestFullscreen();

        }

        else{

            document
            .exitFullscreen();

        }

    }

);

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener(

    "keydown",

    (e)=>{

        if(

            lightbox.style.display
            !== "flex"

        ){

            return;

        }

        if(

            e.key ===
            "ArrowRight"

        ){

            nextBtn.click();

        }

        if(

            e.key ===
            "ArrowLeft"

        ){

            prevBtn.click();

        }

        if(

            e.key ===
            "Escape"

        ){

            lightbox.style.display =
            "none";

        }

    }

);

/* ==========================================
   SCROLL REVEAL
========================================== */

const observer =

new IntersectionObserver(

(entries)=>{

    entries.forEach(

        entry=>{

            if(

                entry.isIntersecting

            ){

                entry.target
                .classList.add(
                    "show"
                );

            }

        }

    );

},

{
    threshold:0.15
}

);

galleryItems.forEach(

item=>{

    observer.observe(
        item
    );

}

);

/* ==========================================
   SMOOTH SCROLL
========================================== */

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(

anchor=>{

    anchor.addEventListener(

        "click",

        function(e){

            e.preventDefault();

            const target =

            document.querySelector(

                this.getAttribute(
                    "href"
                )

            );

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        }

    );

}

);

/* ==========================================
   SOCIAL LINKS
========================================== */

const githubIcon =
document.querySelector(
".fa-github"
);

const linkedinIcon =
document.querySelector(
".fa-linkedin"
);

const instagramIcon =
document.querySelector(
".fa-instagram"
);

if(githubIcon){

    githubIcon.addEventListener(

        "click",

        ()=>{

            window.open(

                "https://github.com/Nitish2507-cloud",

                "_blank"

            );

        }

    );

}

if(linkedinIcon){

    linkedinIcon.addEventListener(

        "click",

        ()=>{

            window.open(

                "https://www.linkedin.com/",

                "_blank"

            );

        }

    );

}

if(instagramIcon){

    instagramIcon.addEventListener(

        "click",

        ()=>{

            window.open(

                "https://www.instagram.com/",

                "_blank"

            );

        }

    );

}

/* ==========================================
   INITIALIZE
========================================== */

updateImageCount();

updateFavoriteCount();

console.log(

"Modern Image Gallery Pro Loaded Successfully 🚀"

);