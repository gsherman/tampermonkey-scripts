// ==UserScript==
// @name         DEES - find case by id
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Find Case by ID dialog; triggered by Ctrl+i
// @author       Gary Sherman
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @match        http://localhost/agent/*
// @match        https://localhost/agent/*
// @match        https://default.lclhst.io/agent/*
// @match        https://*.dovetailnow.com/agent/*
// @require      http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js

// ==/UserScript==

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );
    var mousetrap = window.Mousetrap;
    mousetrap.bind(['command+i', 'ctrl+i'],findCaseById_JQUI);

        /*--- For this to work well, we must also add-in the jQuery-UI CSS.
    We add the CSS this way so that the embedded, relatively linked images load correctly.
    (Use //ajax... so that https or http is selected as appropriate to avoid "mixed content".)*/
    jQ("head").append (
        '<link '
        + 'href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/smoothness/jquery-ui.min.css" '
        + 'rel="stylesheet" type="text/css">'
    );

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

