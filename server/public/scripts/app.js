(function(){
    
$(document).ready(function(){    
    
// variables    
var array = ["Tom", "Dick", "Harry"];
var personArray = [];
var indexTracker = 0;
var carouselRunning = false;
var carouselTimer = 3000;

//functions

function nextIndex () {
    indexTracker++;
        if (indexTracker > personArray.length-1) {
            indexTracker = 0;
        }
  
     return indexTracker;   
}

function prevIndex () {
    indexTracker--;
        if (indexTracker < 0) {
            indexTracker = personArray.length - 1;
        }
     return indexTracker;   
}

function domInit(){
     var el = '<img src="'+personArray[indexTracker].imageURL+'">' +
              '<h1>'+personArray[indexTracker].name +'</h1>' +
              '<p><a href=" '+personArray[indexTracker].github+' ">'+personArray[indexTracker].github+'</a></p>'+
              '<p>'+personArray[indexTracker].shoutout+'</p>';
    
    $('.out').append(el)
             .hide()
             .fadeIn();
             return;
}

function domUpdate(){
   var el = '<img src="'+personArray[indexTracker].imageURL+'">' +
              '<h1>'+personArray[indexTracker].name +'</h1>' +
              '<p><a href=" '+personArray[indexTracker].github+' ">'+personArray[indexTracker].github+'</a></p>'+
              '<p>'+personArray[indexTracker].shoutout+'</p>';
    
    $('.out').fadeOut()
             .empty()
             .append(el)
             .hide()
             .fadeIn();
             return;
}

function dataCall (){
    
    $.ajax({
       type: 'GET',
       url: '/data',
       success: function(data){
           personArray = data.zeta;
           domInit();
           return;
       } 
    });
    
}  

function autoCarousel () {
    setInterval(function(){
            if (carouselRunning === true) {
                nextIndex();
                domUpdate();
            
            }
    }, carouselTimer)
    
} 
    

//jquery program
dataCall();
autoCarousel();

//listeners
$('section').on('click', '.prev', function(){
   prevIndex();
   domUpdate();
});

$('section').on('click', '.next', function(){
   nextIndex(); 
   domUpdate();
});

$('.jumbotron').on('click', '.auto', function(){
    if (carouselRunning === false) {
        carouselRunning = true;
    } else {
        carouselRunning = false;
    }
    console.log(carouselRunning);
});


//end jquery 
});
 //end iife   
})();