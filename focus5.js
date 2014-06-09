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
//hide the image if its under a certain size (but still make it accessible), i.e. for social media icons in email signatures

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
addGlobalStyle('.hangout { position:absolute;top:2px;right:272px;height:35px; }');

//Make jQuery :contains Case-Insensitive
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

var done=false;

function AddGoogleHangoutButton(){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://apis.google.com/js/platform.js";
    $("head").append(s);

    var email = $("dd.contactEmail").text();
    
    var btn ='<g:hangout render="createhangout" invites="[{ id : \'' + email + '\', invite_type : \'EMAIL\' }]"></g:hangout>';
    var wrapper = '<div class="hangout">' + btn + '</div>';    
    $("div.page-header div.menu.pull-right").append(wrapper);                       
}

function ShowImages(){
    if (done){return;}    
    $("a:contains('.png'), a:contains('.jpg'), a:contains('.gif')").each(
      function(){
      $(this).after('<br/><img class="history-inline-image" src="' + $(this).attr('href') + '" />');    
    })        
	done=true;
}

function EnhanceCasePage(){
    ShowImages();
    AddGoogleHangoutButton();
}

// once the created history item is available, then enhance the case page
waitForKeyElements ("span.action-taken:contains('Created')",EnhanceCasePage); 


