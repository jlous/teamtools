// ==UserScript==
// @name       Joachim's Jira Tweaks
// @namespace  http://www.lous.org/
// @version    0.1
// @description  Make in-place editing a bit less trigger-happy: Require clicking the actual edit icon to edit descriptions, not just anywhere in the description area.
// @match      https://jira.sits.no/browse/*
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==



function createBranchesInNewTab(){
    $("a.devstatus-cta-link").attr("target","_blank");
    $("a.devstatus-cta-link").click(function(event){event.stopPropagation()});
}

function sendBitbucketLinksToNewTab(node){
    node.find('a[href^="https://git.aurora.skead.no/"]').attr("target","_blank");
}

function requireExplicitEdit(node){
    node.click(function(event){event.stopPropagation()});
}

function customize(insertedNode){
    sendBitbucketLinksToNewTab(insertedNode);
    if (insertedNode.hasClass(".user-content-block")){
        requireExplicitEdit(insertedNode)
    };
}

function init(){
    createBranchesInNewTab();
    $("body").on("DOMNodeInserted", function (e) {
        customize($(e.target));
    });
}

init();
