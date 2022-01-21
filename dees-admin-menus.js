// ==UserScript==
// @name         Admin Menu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add an Admin menu to DEES Agent
// @author       Gary Sherman
// @include      http://localhost/agent/*
// @include      https://localhost/agent/*
// @include      https://*.dovetailnow.com/agent/*
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @grant        none

/*
KNOWN problems
 * jqueryUI conflicts with legacy pages; the jqueryui dialogs (find-case-by-id, custom shortcurts) don't render exactly correct; sometimes mess up baseline overlays

*/

// ==/UserScript==

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    var separator ='';
    var i;
    for (var index=0;index<20;index++){
        separator+="&ndash;";
    }

    function findcasebyid(){
            var caseId = jQ( "#caseId" ).val();
            window.location = "/agent/cases/id/" + caseId;
        }


    var shortcuts = '';
    shortcuts+='<table>';
    shortcuts+= '<tr><td width=100px>g+o</td><td>Open Old (Legacy) Page</td></tr>';
    shortcuts+= '<tr><td>g+n</td><td>Open New (SPA) Page</td></tr>';
    shortcuts+= '<tr><td>g+u+p</td><td>Open Preferences</td></tr>';
    shortcuts+= '<tr><td>g+p+c</td><td>Open Portal Config</td></tr>';
    shortcuts+= '<tr><td>ctrl+i</td><td>Find Case By Id</td></tr>';
    shortcuts+= '<tr><td>l+i</td><td>copy Lorem Ipsum To Clipboard</td></tr>';
    shortcuts+='</table>';

    var menus = [
        {"name": "✴ Support", href: "/agent/support", "target": "_self"},
        {"name": "💪FA Manager", href: "/agent/famanager/edit", "target": "_self"},
        {"name": "⚙ Settings", href: "/agent/config/settings", "target": "_self"},
        {"name": "🎬 Batch Action Reports", href: "/agent/batch-action-reports", "target": "_self"},
        {"name": separator, href: "javascript: void(0)", "target": "_self"},
        {"name": "📑 API docs", href: "/api/doc", "target": "_blank"},
        {"name": "💬 Chat Admin", href: "https://chat.dovetailnow.com/app/settings", "target": "_blank"},
        {"name": "📊 Grafana Dashboards", href: "https://dovetail.grafana.net/dashboards", "target": "_blank"},
        {"name": "🗃 Kibana Logs", href: "https://logs.dovetailnow.com/", "target": "_blank"},
        {"name": "🗃 Kibana (Demo tenants)", href: "https://demo-logs.dovetailnow.com/", "target": "_blank"},
        {"name": separator, href: "javascript: void(0)", "target": "_self"},
        {"name": "❓ Custom Shortcuts", href: "javascript: window.custom_alert('" + shortcuts + "','Custom Keyboard Shortcuts')", "target": "_self"}
    ];

    var setupMenus = [
        {"name": "📤Import/ Export", href: "/agent/admin/import-export", "target": "_self"},
        {"name": "📃 Lists", href: "/agent/listadmin/configure", "target": "_self"},
        {"name": "💢 Portal Configs", href: "/agent/admin/portal-configs", "target": "_self"},
        {"name": "⚙ View Settings", href: "/agent/settings", "target": "_self"},
        {"name": "🔃 Routing Rules", href: "/agent/rules/routing", "target": "_self"},
        {"name": "📧 Incoming Email Rules", href: "/agent/rules/email", "target": "_self"},
        {"name": separator, href: "javascript: void(0)", "target": "_self"},
        {"name": "💫 Everything else", href: "/agent/setup", "target": "_self"}
    ];

    var anonymousEmployeeGUID = 'e54c5c78-8f83-43df-b417-ae21016e40a7';
    var caseMenus = [
        {"name": "Password Reset"},
        {"name": "Paycheck Problem"},
        {"name": "Appointment"},
        {"name": "Something else"}
    ];

    function custom_alert( message, title){
        if ( !title ){ title = 'Alert';}
        if ( !message ){message = 'No Message to Display.';}
        jQ('<div></div>').html( message ).dialog({
            title: title,
            resizable: false,
            modal: true,
            width:400,
            buttons: {
                'Ok': function() {jQ( this ).dialog( 'close' );}
            }
        });
    }

    window.custom_alert=custom_alert;

    /*--- For this to work well, we must also add-in the jQuery-UI CSS.
    We add the CSS this way so that the embedded, relatively linked images load correctly.
    (Use //ajax... so that https or http is selected as appropriate to avoid "mixed content".)*/
    jQ("head").append (
        '<link '
        + 'href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/smoothness/jquery-ui.min.css" '
        + 'rel="stylesheet" type="text/css">'
    );

    // SPA:
    var setupMenu = '';
    setupMenu+='<li class="nav-item dropdown">';
    setupMenu+='<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" >Setup</a>'; //style="color:#3fe5ff;"
    setupMenu+= '<div class="dropdown-menu">';
    for(i in setupMenus) {
        setupMenu+='<a class="dropdown-item" href="' + setupMenus[i].href + '" target="' + setupMenus[i].target + '">' + setupMenus[i].name + '</a>';
    }
    setupMenu+='</div></li>';
    jQ(".navbar-nav").first().append(setupMenu);

    var menu = '';
    menu+='<li class="nav-item dropdown">';
    menu+='<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Admin</a>';
    menu+= '<div class="dropdown-menu">';
    for(i in menus) {
        menu+='<a class="dropdown-item" href="' + menus[i].href + '" target="' + menus[i].target + '">' + menus[i].name + '</a>';
    }
    menu+='</div></li>';

    // this needs to be a form/submit
    //menu+='<form onSubmit="findcasebyid();return false;"><input type="text" id=caseId" placeholder="caseByID" class="form-control xsearchField" ;" /></form?';

    jQ(".navbar-nav").first().append(menu);

    var caseMenu = '';
    caseMenu+='<li class="nav-item dropdown">';
    caseMenu+='<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" >Create Case...</a>';
    caseMenu+= '<div class="dropdown-menu">';
    for(i in caseMenus) {
        caseMenu+='<a class="dropdown-item" target=_self href="/agent/cases/create/employee/' + anonymousEmployeeGUID + '?template=' + caseMenus[i].name + '">' + caseMenus[i].name + '</a>';
    }
    caseMenu+='</div></li>';
    jQ(".navbar-nav").first().append(caseMenu);


    //Legacy:
    var legacySetupMenu = '';
    legacySetupMenu+='<li class="dropdown " data-dropdown="dropdown">';
    legacySetupMenu+='<a href="#" class="dropdown-toggle">Setup</a>';
    legacySetupMenu+='<ul class="dropdown-menu">';
    for(i in setupMenus) {
        legacySetupMenu+='<li><a id="' + setupMenus[i].name + '" class="js-create-new dropdown-icon full-screen"  href="' +setupMenus[i].href + '">' + setupMenus[i].name + '</a</li>';
    }
    legacySetupMenu+='</ul>';
    jQ("div.menubar ul.nav").first().append(legacySetupMenu);

    var legacyMenu = '';
    legacyMenu+='<li class="dropdown " data-dropdown="dropdown">';
    legacyMenu+='<a href="#" class="dropdown-toggle">Admin</a>';
    legacyMenu+='<ul class="dropdown-menu">';
    for(i in menus) {
        legacyMenu+='<li><a id="' + menus[i].name + '" class="js-create-new dropdown-icon full-screen"  href="' +menus[i].href + '">' + menus[i].name + '</a</li>';
    }
    legacyMenu+='</ul>';
    jQ("div.menubar ul.nav").first().append(legacyMenu);

})();
