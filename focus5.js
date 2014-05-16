// ==UserScript==
// @name       focus5
// @namespace  https://support.dovetailsoftware.com/agent5/
// @version    0.1
// @description  replace links to images with actual images in the case history
// @match      https://support.dovetailsoftware.com/agent5/support/cases/*
// @copyright  2012+, You
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle


//TODO [under consideration]:
//Remove the "added attachment abc.png" line from the history
//hide the image if its under a certain size (but still make it accessible)

// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.history-inline-image { max-width: 900px !important; margin:10px;box-shadow: 5px 5px 5px #888; }');

//Make jQuery :contains Case-Insensitive
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

var done=false;

function ShowImages(){
    if (done){return;}
    
	//console.log("inside ShowImages function");
	//console.log($("a:contains('.png')").length );

    $("a:contains('.png'), a:contains('.jpg'), a:contains('.gif')").each(
      function(){
      $(this).after('<br/><img class="history-inline-image" src="' + $(this).attr('href') + '" />');    
    })        
	done=true;
}

// once the created history item is available, then show the images
waitForKeyElements ("span.action-taken:contains('Created')",ShowImages); 

