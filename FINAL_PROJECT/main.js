'use strict'

window.onhashchange = changeURL;

var SPAState = {};

var currentHach = window.location.hash;
var currentHachJSON = decodeURIComponent(currentHach.substring(1));

if(!(currentHachJSON)) {
    SPAState.pageName = 'main';
} else {
    SPAState = JSON.parse(currentHachJSON);
}

function changeURL() {
    // img = document.getElementsByTagName('img');
    console.log(SPAState)
    var pageHTML = '';

    switch (SPAState.pageName) {
        case 'main':
            pageHTML += '<div style="background-image: url(img/background.jpeg);"><div> </div></div>'
            break;
        case 'game': 
            pageHTML += '<canvas id="canvas"></canvas>';
            break;
    }

   document.getElementById('page').innerHTML = pageHTML;
    


}