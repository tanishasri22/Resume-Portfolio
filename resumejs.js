// var scrollInterval = setInterval(function(){
//     window.scrollBy(0,50);
// },50);

// clearInterval(scrollInterval);


// 1st  way--------------------------------------------------------------

// var nav = document.querySelectorAll('.nav-menu a');

// for(var i=0;i<nav.length;i++){
//     nav[i].addEventListener('click', function(event){
//         event.preventDefault();
//         var targetSectionId = this.textContent.trim().toLowerCase();
//         console.log(targetSectionId);
//         var targetSection = document.getElementById(targetSectionId);
//         if(targetSection == null) 
//             return;
//             var prevCoordinates =  targetSection.getBoundingClientRect();
//         var check = false;
//         var interval = setInterval(function(){
            
//             var coordinates = targetSection.getBoundingClientRect();
            
//             console.log(coordinates.top+" "+prevCoordinates.top);
//                 if(check && (coordinates.top <= 0 ||  coordinates.top == prevCoordinates.top)){
                    
//                     clearInterval(interval);
//                     return;
//                 }
//                 prevCoordinates = coordinates;
//                 check = true;
//                 window.scrollBy(0,50);
                
//         }, 20);

//     });
// }



// 2nd way-------------------------------------------------------------------------------------

var nav = document.querySelectorAll('.nav-menu a');
var interval;
// var check = false;
for(var i=0;i<nav.length;i++){
    nav[i].addEventListener('click', function(event){
        event.preventDefault();
        var targetSectionId = this.textContent.trim().toLowerCase();
        console.log(targetSectionId);
        var targetSection = document.getElementById(targetSectionId);
        if(targetSection == null) 
            return;
        var prevCoordinates =  targetSection.getBoundingClientRect();
        var check = false;
        interval = setInterval(function(){
            var coordinates = targetSection.getBoundingClientRect();
            scrollVertically(coordinates,prevCoordinates,check);
            prevCoordinates = coordinates;
            check = true;
        }, 10);

    });
}


function scrollVertically(coordinates, prevCoordinates,check){   
            //console.log(coordinates.top+" "+prevCoordinates.top+ " "+check);
                if(check && (coordinates.top <= 0 ||  coordinates.top == prevCoordinates.top)){
                    clearInterval(interval);
                    check = false;
                    return;
                }
               
                window.scrollBy(0,50);
}


// 3rd way------------------
    // var interval = setInterval(scrollVertically(coordinates),50);  // this is INCORRECT syntax
    // var interval = setInterval(scrollVertically(), 50,coordinates); // this is correct syntax...but idk how to pass multiple arguments.

//---------------------- NAVIGATION SCROLL EVENTS OVER------------------------






//------------------SKILL SMOOTH FILL------------------------------

var targetSection = document.querySelectorAll('.skills-progress > div');
var skillscontainer = document.getElementById('skills-container');
// var skillscontainer2 = document.querySelectorAll('#skills-container');
var workExperience = document.getElementById('experience');
window.addEventListener('scroll',checkScroll);
var animationDone = false;
//---------------array for skills fill---------------------
var arr = new Array(targetSection.length);
for(let i=0;i<targetSection.length;i++)
    arr[i]= false;

    //-----------------------------------------------1st way skills bars fill--------------------------------------
function barsInitialise(){
    for(let bar of targetSection){
        bar.style.width = 0 + '%';
    }
}
//-----------uncomment the next line fun call for 1st way of skills fill-----------------------
//barsInitialise();

function fillBars(){
    
        //var i=0;i<data.length;i++
            for(let i=0;i<targetSection.length;i++){
                let data = targetSection[i].getAttribute('data-percentage');
                //console.log(data);
                let currWidth = 0;
                let interval = setInterval(function(){

                   // console.log(targetSection[i].style.width+" "+currWidth+" "+data);
                    if(currWidth > data){
                        clearInterval(interval);
                        return;
                    }
                    currWidth++;
                    targetSection[i].style.width = currWidth + '%';
                },5);


            }

                //------------------------------OR-----------------------------------

            // for(let bar of targetSection){
            //     let data = bar.getAttribute('data-percentage');
            //     console.log(data);
            //     let currWidth = 0;
            //     let interval = setInterval(function(){

            //         // console.log(targetSection[i].style.width);
            //         if(currWidth > data){
            //             clearInterval(interval);
            //             return;
            //         }
            //         currWidth++;
            //         bar.style.width = currWidth + '%';
            //     },3);

            // }

}



//-----------------------------------------------2nd way skills bars fill--------------------------------------

function initialiseBar(bar){
    //console.log(this);
    bar.style.width = 0 +'%';
}

function fillBar(bar){
    let count = 0;
    
    let maxWidth = bar.getAttribute('data-percentage');
    console.log(bar + " "+ maxWidth);
    let interval = setInterval(function(){
            if(count > maxWidth){
                clearInterval(interval);
                return;
            }
            count++;
            bar.style.width = count + '%';
    },3);
}


//-------------------------------------fun calls for both type of skills bar fill--------------------------

function checkScroll(){

    //--------------------------------------1st way of skills bar-----------------------------------------

// var coordinates = skillscontainer.getBoundingClientRect();
// var coordinates2 = workExperience.getBoundingClientRect();
//     if(!animationDone && coordinates.top <= window.innerHeight && coordinates2.top >= 0){
//         animationDone = true;
//         console.log('visible');
//         fillBars();
//     }else if(coordinates.top > window.innerHeight){
//         animationDone = false;
//         barsInitialise();
//     }else if(coordinates2.top < 0)
//     {
//         console.log('workexperience');
//         animationDone = false;
//         barsInitialise();
//     }


    //----------------------------------------------------2nd way of skills bar------------------------------------------

    for(let i=0;i<targetSection.length;i++){
        var coordinates = targetSection[i].getBoundingClientRect();
        var coordinates2 = workExperience.getBoundingClientRect();
        if(!arr[i] && coordinates.top <= window.innerHeight && coordinates2.top >= 0){
            console.log(arr[i]);
            arr[i] = true;
             fillBar(targetSection[i]);
            
        }else if(coordinates.top > window.innerHeight){
            initialiseBar(targetSection[i]);
            arr[i] = false;
        }else if(coordinates2.top < 0){
            initialiseBar(targetSection[i]);
            arr[i] = false;
        }
    }



}

//-------------------------PERCENTAGE BAR-----------------------------------------------------------------------------

var scrolledBar = document.getElementById("scrolled");



// This function will return the maximum of the following 
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.body.offsetHeight, D.body.clientHeight
    );
}



var docHeight = getDocHeight();
var windowHeight = window.innerHeight;

window.onresize = function (e) {
    docHeight = getDocHeight();
    windowHeight = window.innerHeight;
};



// This function uses a for loop for individual progress bars. You can modify it so that it applies to the whole skill section at once
function setScrolled() {
    
    var scrolled = Math.floor((window.scrollY/(docHeight-windowHeight))*100);
    
    scrolledBar.innerText = scrolled;
    
}

window.addEventListener("scroll", setScrolled);

