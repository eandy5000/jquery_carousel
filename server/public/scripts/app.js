var peopleArray;
var indexTracker = 0;

$(document).ready(function(){
    //Get data from server
    getData();

});

function getData() {
    $.ajax({
        type : "GET",
        url : "/data",
        success : onSuccess
    });
}

//This function is called when get data is successfully completed
function onSuccess(data) {
    //console.log(data);

    //call all functions here
    peopleArray = data.zeta;
    createCarousel(data.zeta);

    updateIndexPoints();

    $("#next").on('click', nextSlide);
    $("#prev").on('click', prevSlide);

}

function createCarousel(array) {
    //console.log("This works!");
    $("#carousel").append("<div class='main'></div>");
    var $el = $("#carousel").children().last();

    createIndexPoints(array, $el);
    createNavButtons($el);
}

//This function creates the "dots"
function createIndexPoints(array, $el) {
    for (var i = 0; i < array.length; i++) {
        $el.append("<div class='index-point' id='index" + i + "'></div>");
    }
}

//This function creates the navigation buttons
function createNavButtons($el){
    $el.prepend("<div id='prev' class='nav-button'>< Prev</div>");
    $el.append("<div id='next' class='nav-button'>Next ></div>");
}

//This function updates the indexTracker variable when the "Next" button is clicked
function nextSlide() {
   indexTracker++;
    if(indexTracker >= peopleArray.length){
        indexTracker = 0;
    }

    updateIndexPoints();
}

//This function updates the indexTracker variable when the "Prev" button is clicked
function prevSlide() {
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = peopleArray.length - 1;
    }

    updateIndexPoints();
}

//This function lets user know which index point (or dot) he or she is on
function updateIndexPoints() {
    for (var i = 0; i < peopleArray.length; i++) {
        $("#index"+i).removeClass("index-point-active");
        if (i == indexTracker) {
            $("#index"+i).addClass("index-point-active");
        }
    }

    updateDom();
}

function updateDom(){
    $("#mainContent").empty();
    $("#mainContent").append("<h1 class='name page-header'>" + peopleArray[indexTracker].name + "</h1>");
    $("#mainContent").append("<p class='github'>" + peopleArray[indexTracker].github + "</p>");
    $("#mainContent").append("<p class='shoutout'>" + peopleArray[indexTracker].shoutout + "</p>");

}