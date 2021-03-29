// ==UserScript==
// @name         my custom shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @grant        GM.xmlHttpRequest
// @include      http://localhost/agent/*
// @include      https://*.dovetailnow.com/agent/*
// @require      http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @grant        GM.setClipboard

// ==/UserScript==

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );
    var mousetrap = window.Mousetrap;

    mousetrap.bind('g b', openBatchActionReportPage);
    mousetrap.bind('g u p', openPreferences);
    mousetrap.bind('g p c', openPortalConfig);
    //mousetrap.bind(['command+i', 'ctrl+i'],findById);
    mousetrap.bind(['command+i', 'ctrl+i'],findByIdJQUI);

    mousetrap.bind(['l i'],copyLoremIpsumToClipboard);

    function copyLoremIpsumToClipboard(){
        var ipsum = "Overcome key issues to meet key milestones. Mumbo jumbo. We need to start advertising on social media can we take this offline. Three-martini lunch. Deliverables flesh that out. \r\n";
        ipsum+= "New economy peel the onion we need to have a Come to Jesus meeting with Phil about his attitude, and the last person we talked to said this would be ready dunder mifflin this vendor is incompetent cloud strategy. \r\n";
        ipsum+="Let's not solutionize this right now parking lot it quick win value-added, nor locked and loaded. Get buy-in price point anti-pattern horsehead offer, cloud native container based. We need distributors to evangelize the new line to local markets time vampire. Curate when does this sunset? and turn the crank but high touch client goalposts if you're not hurting you're not winning yet radical candor. We need to build it so that it scales. Code screw the pooch, and upsell. Not a hill to die on post launch and business impact for baseline yet even dead cats bounce execute . "
        GM.setClipboard (ipsum);
    }

    function openBatchActionReportPage(){
        document.location = 'http://localhost/agent/batch-action-reports/';
    }

    function openPreferences(){
        document.location = 'http://localhost/agent/preferences';
    }

    function openPortalConfig(){
        document.location = 'http://localhost/agent/admin/portal-configs';
    }

    function findByIdJQUI(){

        var content = '';
        content+="<style>";
        content+="label { width:50px; }";
        content+="input, select {width:80%; padding: .4em; }";
        content+="</style>";
        content+="<form><p><label for='entityId'>ID</label><input type='text' id='entityId'></input></p>";
        content+="<p><label for='entityType'>Type</label><select id='entityType'><option>Case</option><option>Solution</option></select></p>";
        content+="<input type='submit' tabindex='-1' style='position:absolute; top:-1000px'>";
        content+="</form>";

        function findbyid(){
            var entityId = jQ( "#entityId" ).val();;
            var entityType = jQ( "#entityType" ).val();
            //alert(jQ( "#entityId" ).val());
            if (!entityId) {return false;}
            if (entityType ==="Solution") entityId = entityType + ' ' + entityId;

            var token = unsafeWindow.dtData.security.antiForgery;
            var formData = "GoToText=" + entityId + "&__RequestVerificationToken=" + encodeURIComponent(token);

            GM.xmlHttpRequest({
                method: "POST",
                url: "http://localhost/agent/go/goto",
                data: formData,
                headers: {"Content-Type": "application/x-www-form-urlencoded","Accept":"application/json"},
                onload: function(response) {
                    if (response.status === 200) {
                        //response looks like:
                        //
                        // <html><body><textarea rows="10" cols="80">{"success":true,"refresh":false,"navigatePage":"/agent/case/7af0476f-10e3-4d7b-8d84-acdb015cbf2e"}</textarea></body></html>
                        // OR
                        // <html><body><textarea rows="10" cols="80">{"success":false,"refresh":false,"errors":[{"category":null,"field":"en-US_GoToText","label":null,"message":"Could not find object matching the criteria"}]}</textarea></body></html>
                        // sheesh

                        var parser = new DOMParser();
                        var htmlDoc = parser.parseFromString(response.responseText, 'text/html');
                        var textareaValue = htmlDoc.getElementsByTagName('textarea')[0].value;
                        var json = JSON.parse(textareaValue);
                        if (json.success)
                        {
                            document.location = json.navigatePage;
                        }else{
                            alert(entityId + ': ' + json.errors[0].message);
                        }
                    }else{
                        alert(response.responseText);
                        console.log(response.responseText);
                    }
                }
            })

        }

        var dialog = jQ("<div id='findById'></div>").html(content).dialog({
            title: 'Find by ID',
            resizable: false,
            modal: true,
            width:400,
            buttons: {
                // 'Cancel': function() {jQ( this ).dialog( 'close' );},
                'Find': findbyid
            }
        }
     );

     var form = dialog.find( "form" ).on( "submit", function( event ) {
         event.preventDefault();
         findbyid();
    });

    }

    /*
    function findById(){
        var caseId = prompt("Enter an ID number\nBy default, it's a Case ID\nFor Solutions, use \"Solution + ID\"", "");
        if (!caseId) {return false;}

        var token = unsafeWindow.dtData.security.antiForgery;
        var formData = "GoToText=" + caseId + "&__RequestVerificationToken=" + encodeURIComponent(token);

        GM.xmlHttpRequest({
            method: "POST",
            url: "http://localhost/agent/go/goto",
            data: formData,
            headers: {"Content-Type": "application/x-www-form-urlencoded","Accept":"application/json"},
            onload: function(response) {
                if (response.status === 200) {
                    //response looks like:
                    //
                    // <html><body><textarea rows="10" cols="80">{"success":true,"refresh":false,"navigatePage":"/agent/case/7af0476f-10e3-4d7b-8d84-acdb015cbf2e"}</textarea></body></html>
                    // OR
                    // <html><body><textarea rows="10" cols="80">{"success":false,"refresh":false,"errors":[{"category":null,"field":"en-US_GoToText","label":null,"message":"Could not find object matching the criteria"}]}</textarea></body></html>
                    // sheesh

                    var parser = new DOMParser();
                    var htmlDoc = parser.parseFromString(response.responseText, 'text/html');
                    var textareaValue = htmlDoc.getElementsByTagName('textarea')[0].value;
                    var json = JSON.parse(textareaValue);
                    if (json.success)
                    {
                        document.location = json.navigatePage;
                    }else{
                        alert(caseId + ': ' + json.errors[0].message);
                    }
                }else{
                    alert(response.responseText);
                    console.log(response.responseText);
                }
            }
        })

        return false;
    }
*/


})();

