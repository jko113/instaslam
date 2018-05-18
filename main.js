var navBar = document.querySelector(".gallery");
var navItems = [
    {href: "images/terrence.jpg", likes: 5},
    {href: "images/harlem.jpg", likes: 3},
    {href: "images/jordan.jpg", likes: 2},
    {href: "images/russia.jpg", likes: 7}
];

function getLikes (image) {
    return "Likes: " + image.getAttribute("data-likes");
}

function getFirstLike () {
    var mainFig = document.querySelector("[data-main-fig]");
    var mainImg = document.getElementsByTagName("img")[0];
    mainImg.setAttribute("data-likes", navItems[0]["likes"]);
    var firstLike = getLikes(mainImg);
    firstCaption = document.createElement("caption");
    mainFig.appendChild(firstCaption);
    firstCaption.textContent = firstLike;
}

getFirstLike();

navItems.forEach(function (nav) {
    // grab location from current item in the array of photos
    // and create new <a> and <img> elements to store image
    var newParent = document.createElement("figure");
    var newChild = document.createElement("a");
    var imgChild = document.createElement("img");
    var location = nav.href;
    var likes = nav.likes;
    
    // wrap the image tag in an anchor tag and set
    // appropriate attributes
    newParent.appendChild(newChild);
    newChild.appendChild(imgChild);
    newChild.setAttribute("href", location);

    imgChild.setAttribute("data-likes", likes);
    newParent.setAttribute("data-fig-item", "");

    imgChild.classList.add("thumb");
    imgChild.setAttribute("src", location);
    imgChild.setAttribute("href", location);

    // append the complete child to the navBar
    navBar.appendChild(newParent);
});

var IMG_SEL = "[data-target]";
var FIG_SEL = "[data-fig-item]";
var MAIN_FIG_SEL = "[data-main-fig]";

var figItems = document.querySelectorAll(FIG_SEL);
var imgTarget = document.querySelector(IMG_SEL);
var figTarget = document.querySelector(MAIN_FIG_SEL);
var imageCounter = 0;

figItems.forEach(function (fig) {
    
    var nav = fig.querySelector("img");

    nav.addEventListener('click', function (event) {
        event.preventDefault();
        var newHref = nav.getAttribute('href');
        imgTarget.setAttribute('src', newHref);

        for (var i = 0; i < navItems.length; i++) {
            if (navItems[i].href === newHref) {
                imageCounter = navItems.indexOf(navItems[i]);
                break;
            }
        }

        var removal = figTarget.getElementsByTagName("caption")[0];
        if (removal !== undefined) {
            figTarget.removeChild(removal);
        }

        var caption = document.createElement("caption");
        var likes = getLikes(nav);

        figTarget.appendChild(caption);
        caption.textContent = likes;
    });
});

var arrows = document.querySelectorAll("[data-arrow]");

arrows.forEach(function (arrow) {

    arrow.setAttribute("href", "");
    // console.log(arrows);
    // console.log(arrow.getAttribute("href"));
    var i = arrow.querySelector("i");
    var className = i.className;
    //console.log(className);

    arrow.addEventListener("click", function (event) {
        event.preventDefault();
        
        newUrl = ""

        if (className === "fa fa-arrow-circle-left") {
            imageCounter--;
            if (imageCounter < 0) {
                imageCounter += navItems.length;
            }
            newUrl = navItems[imageCounter]["href"]

        } else {
            imageCounter++;
            if (imageCounter > navItems.length - 1) {
                imageCounter -= navItems.length;
            }
            newUrl = navItems[imageCounter]["href"]
        }

        currentImage = navItems[imageCounter];
        //console.log(currentImage);
        newLikes = currentImage["likes"];
        //console.log(newLikes);
        imgTarget["src"] = newUrl;
        imgTarget["data-likes"] = newLikes;

        var mainFig = document.querySelector("[data-main-fig]");
        var caption = document.querySelector("caption");
        //console.log(mainFig);

        var removal = mainFig.querySelector("caption");
        if (removal !== undefined) {
            mainFig.removeChild(removal);
        }

        newCaption = document.createElement("caption");
        newCaption.textContent = "Likes: " + newLikes;
        mainFig.appendChild(newCaption);

    });
});

var x = document.querySelector(".fa-times");
//console.log(x);

x.addEventListener('click', function (event) {
    event.preventDefault();

    var overlay = document.querySelector(".overlay");
    
    var removeOpacity = document.querySelector(".opacity");
    if (removeOpacity !== undefined) {
        overlay.classList.remove("opacity");
    }
    overlay.classList.add("hidden");

    var overlayTarget = document.querySelector("[data-overlay-target]");

});

imgTarget.addEventListener("click", function (event) {
    var overlay = document.querySelector(".overlay");
    console.log(overlay);
    overlay.classList.remove("hidden");

    var source = overlay.querySelector("img");
    //console.log(source);

    source.setAttribute("src", imgTarget.src);

    var overlayTarget = document.querySelector("[data-overlay-target]");
});