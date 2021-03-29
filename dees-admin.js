// ==UserScript==
// @name         Admin Menu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add an Admin menu to DEES Agent
// @author       Gary Sherman
// @include      http://localhost/agent/*
// @include      https://*.dovetailnow.com/agent/*
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @grant        none

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

    var shortcuts = '<h2>Shortcuts</h2>';
    shortcuts+='<table>';
    shortcuts+= '<tr><td>g+o</td><td>Open Old (Legacy) Page</td></tr>';
    shortcuts+= '<tr><td>g+n</td><td>Open New (SPA) Pag</td></tr>';
    shortcuts+= '<tr><td>g+u+p</td><td>Open Preferences</td></tr>';
    shortcuts+= '<tr><td>g+p+c</td><td>Open Portal Config</td></tr>';
    shortcuts+= '<tr><td>ctrl+i</td><td>Find By Id</td></tr>';
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
        {"name": "❓ Custom Shortcuts", href: "javascript: window.custom_alert('" + shortcuts + "')", "target": "_self"},


    ];

    var setupMenus = [
        {"name": "Lists", href: "/agent/listadmin/configure", "target": "_self"},
        {"name": "Portal Configs", href: "/agent/admin/portal-configs", "target": "_self"},
        {"name": "View Settings", href: "/agent/settings", "target": "_self"},
        {"name": "Routing Rules", href: "/agent/rules/routing", "target": "_self"},
        {"name": "Incoming Email Rules", href: "/agent/rules/email", "target": "_self"},
        {"name": separator, href: "javascript: void(0)", "target": "_self"},

        {"name": "Everything else", href: "/agent/setup", "target": "_self"}
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
    setupMenu+='<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Setup</a>';
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
    jQ(".navbar-nav").first().append(menu);

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
