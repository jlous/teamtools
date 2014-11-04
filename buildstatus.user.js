// ==UserScript==
// @name         buildstatus
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://code.barentswatch.net/tc/externalStatus.html*
// @grant        none
// @require 	 http://code.jquery.com/jquery-2.1.1.min.js
// ==/UserScript==

function mapUrls(html){
	return html.replace(/http:\/\/153.44.6.115:8111\//g, "https://code.barentswatch.net/");
}

function fixCss(){
    $("<link/>", {
       rel: "stylesheet",
       type: "text/css",
       href: "https://code.barentswatch.net/tc/css/status/externalStatus.css"
    }).appendTo("head");
    $("<style type='text/css'>" +
      "  .tcTable{background: rgba(255, 255, 255, 0.7)} " +
      "  table.tcTable a{color:white;}" +
      "  div.teamCityBuildNumber{display: inline;}" +
      "  div.teamCityDateTime{display: inline;}" +
      "  table.tcTable {border: 0px}"+
      "  table.tcTable td.buildNumberDate div.teamCityDateTime{color:black;}" +
      "</style>"
     ).appendTo("head");
    
    $("body").css("font-family", "'helvetica neue', arial, sans-serif");
}

function highlightStatus(){
    var errorIcons = $("img[src*='error']");
    if (errorIcons.length > 0){
		$("body").css("background-color", "red").css("background-image", "url('https://raw.githubusercontent.com/jlous/teamtools/master/background-red.jpg')");
    } else {
		$("body").css("background-color", "gray").css("background-image", "url('https://raw.githubusercontent.com/jlous/teamtools/master/background-green.jpg')");
    }
}
 
function render(data){
    $("body").html(mapUrls(data.toString()));
    addTimeStamp();
    highlightStatus();
}

function refresh(){
    $.get("/tc/externalStatus.html", render);
}

function scheduleRefresh(){
    setInterval(refresh, 10000);
}

function addTimeStamp(){
	$("table").append("<tr><td><small>Sist oppdatert " + new Date().toLocaleString() + "</small></td></tr>");
}

fixCss();
refresh();
scheduleRefresh();
