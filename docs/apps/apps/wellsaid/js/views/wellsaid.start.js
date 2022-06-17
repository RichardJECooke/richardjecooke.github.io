//define namespace if it doesn't exist
if (typeof WellSaid == "undefined" || !WellSaid) {
    var WellSaid = {};
}

WellSaid.ViewStart = (function () {

    var me = {};      
    
    me.main = null;
    
    me.content = function() {
        return '<div id="subContent">\
<div class="divPlay">\
    <button data-inline="true" class="btnPlay ui-shadow">\
        <span class="spanPlay spanTeam1ScoreValue" data-bind="css: { spanTeam1ScoreValue: isTurnOfTeam1()==true, spanTeam2ScoreValue: isTurnOfTeam1()==false }" >\
            Team <span data-bind="text: turnOfTeam"></span> start!\
        </span>\
    </button>\
</div>\
</div>\
';        
    }  
    
    me.preRender = function() {    
    }
    
    me.postRender = function() {
        $('.btnPlay').click(me.btnPlayClicked);
    }
        
    me.btnPlayClicked = function() {
        me.main.loadContent(me.main.ViewAsk);
    }
    
    return me;
    
}());