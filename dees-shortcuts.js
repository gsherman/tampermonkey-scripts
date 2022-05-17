// ==UserScript==
// @name         my custom shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @grant        GM.xmlHttpRequest
// @match        http://localhost/agent/*
// @match        https://localhost/agent/*
// @match        https://default.lclhst.io/agent/*
// @match        https://*.dovetailnow.com/agent/*
// @require      http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @grant        GM.setClipboard
// @grant        GM.cookie

// ==/UserScript==

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );
    var mousetrap = window.Mousetrap;

    mousetrap.bind('g b', openBatchActionReportPage);
    mousetrap.bind('g u p', openPreferences);
    mousetrap.bind('g p c', openPortalConfig);
    mousetrap.bind(['command+i', 'ctrl+i'],findCaseById_JQUI);
    mousetrap.bind(['l i'],copyLoremIpsumToClipboard);

    var urlPieces = window.location.pathname.split('/');
    var slug = urlPieces[urlPieces.length - 1];
    var entityType = urlPieces[urlPieces.length - 2];

     if (entityType == 'cases'){
         mousetrap.bind(['r'],refreshCaseTimeline);
     }

    function refreshCaseTimeline(){
        jQ('div.timeline-groups').effect('highlight',{"easing":"easeInOutElastic",color: '#dde4f1'},700)
        document.getElementsByClassName("switch-details")[0].click();
    }

    function copyLoremIpsumToClipboard(){
        var ipsum = "Overcome key issues to meet key milestones. Mumbo jumbo. We need to start advertising on social media can we take this offline. Three-martini lunch. Deliverables flesh that out. \r\n";
        ipsum+= "New economy peel the onion we need to have a Come to Jesus meeting with Phil about his attitude, and the last person we talked to said this would be ready dunder mifflin this vendor is incompetent cloud strategy. \r\n";
        ipsum+="Let's not solutionize this right now parking lot it quick win value-added, nor locked and loaded. Get buy-in price point anti-pattern horsehead offer, cloud native container based. We need distributors to evangelize the new line to local markets time vampire. Curate when does this sunset? and turn the crank but high touch client goalposts if you're not hurting you're not winning yet radical candor. We need to build it so that it scales. Code screw the pooch, and upsell. Not a hill to die on post launch and business impact for baseline yet even dead cats bounce execute . "
        GM.setClipboard (ipsum);
    }

    function openBatchActionReportPage(){
        document.location = '/agent/batch-action-reports/';
    }

    function openPreferences(){
        document.location = '/agent/preferences';
    }

    function openPortalConfig(){
        document.location = '/agent/admin/portal-configs';
    }

    function findCaseById_JQUI(){

        var content = '';
        content+="<style>";
        content+="label { width:50px; }";
        content+="input, select {width:80%; padding: .4em; }";
        content+="</style>";
        content+="<form><p><label for='entityId'>ID</label><input type='text' id='caseId'></input></p>";
        content+="<input type='submit' tabindex='-1' style='position:absolute; top:-1000px'>";
        content+="</form>";

        function findcasebyid(){
            var caseId = jQ( "#caseId" ).val();;
            window.location = "/agent/cases/id/" + caseId;
        }

        var dialog = jQ("<div id='findById'></div>").html(content).dialog({
            title: 'Find Case by ID',
            resizable: false,
            modal: true,
            width:400,
            position: { my: "center top-200", at: "center", of: window },
            buttons: {
                'Find': findcasebyid
            }
        }
     );

     var form = dialog.find( "form" ).on( "submit", function( event ) {
         event.preventDefault();
         findcasebyid();
    });

    }


})();

