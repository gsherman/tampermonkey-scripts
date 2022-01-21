// ==UserScript==
// @name         Create Case Templates from querystring
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       Gary Sherman
// @include      http://localhost/agent/cases/create/employee*
// @include      https://localhost/agent/cases/create/employee/*
// @include      https://*.dovetailnow.com/agent/cases/create/employee/*
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    var caseMenus = [
        {"name": "Paycheck Problem", "caseType":"Payroll", "title":"Paycheck Problem","priority":"Low","severity":"Low","notes":"Paycheck Date:<br/>Problem:<br/>Details:<br/>"},
        {"name": "Password Reset", "caseType":"HRIS", "title":"Password Reset","priority":"Medium","severity":"Medium","notes":"Password has been reset"},
       {"name": "Appointment", "caseType":"General HR", "title":"Appointment Scheduled","priority":"Low","severity":"Low","notes":"Name:<br/>Phone:<br/>Time Called:<br/>Appt. Scheduled<br/>"}
    ];


    var timer;
    var duration = 500;
    var hasPassword=false;
    var hasUsername=false;
    var $ = window.$;
    observe();

    function observe(){
        var observer = new MutationObserver(resetTimer);
        timer = setTimeout(action, duration, observer); // wait for the page to stay still for some time
        observer.observe(document, {childList: true, subtree: true});
    }

    function resetTimer(changes, observer) {
        clearTimeout(timer);
        timer = setTimeout(action, duration, observer);
    }

    function action(o) {
        o.disconnect();

        var urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has('template')){
            var template = urlParams.get('template');

            let caseMenu = caseMenus.find(o => o.name === template);
            if (caseMenu){
                //console.log(caseMenu);
                jQ("#priority").val(caseMenu.priority);
                jQ("#issueSeverity").val(caseMenu.severity);
                jQ('div.fr-view').html(caseMenu.notes).trigger( "click" ).focus();
                document.querySelector('select#caseType').selectize.setValue(caseMenu.caseType);
                jQ("#title").val(caseMenu.title).trigger( "click" ).focus();
            }

        }

    }



})();
