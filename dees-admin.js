// ==UserScript==
// @name         Admin Menu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add an Admin menu to DEES Agent
// @author       Gary Sherman
// @grant        none
// @include      http://localhost/agent/*
// @include      https://*.dovetailnow.com/agent/*
// @require      http://code.jquery.com/jquery-1.11.2.min.js

// ==/UserScript==

// TODO
// * Only add these menus if user is a root admin

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    var separator ='';
    for (var index=0;index<20;index++){
        separator+="&ndash;";
    }

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
        {"name": "🗃 Kibana Logs (Demo tenants)", href: "https://demo-logs.dovetailnow.com/", "target": "_blank"}
    ];

    // SPA:
    var menu = '';
    menu+='<li class="nav-item dropdown">';
    menu+='<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Admin</a>';
    menu+= '<div class="dropdown-menu">';
    for(var i in menus) {
        menu+='<a class="dropdown-item" href="' + menus[i].href + '" target="' + menus[i].target + '">' + menus[i].name + '</a>';
    }
    menu+='</div></li>';
    jQ(".navbar-nav").first().append(menu);


    //Legacy:
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
