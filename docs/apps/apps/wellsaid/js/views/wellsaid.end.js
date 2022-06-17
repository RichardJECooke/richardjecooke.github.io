//define namespace if it doesn't exist
if (typeof WellSaid == "undefined" || !WellSaid) {
    var WellSaid = {};
}

WellSaid.ViewEnd = (function () {

    var me = {};  
    
    me.main = null;
    
    me.content = function() {
        return '<div id="subContent">\
<div class="divEnd center"></div>\
\
<div class="divPlay">\
    <button data-inline="true" class="btnPlay"><span class="spanPlay ">Play again!</span></button>\
</div>\
</div>\
';
    }
    
    me.setPlayButtonEventHandler = function() {
        $('.btnPlay').click(me.btnPlayClicked);
    }

    me.btnPlayClicked = function() {
        WellSaid.Model.round(1);
        WellSaid.Model.isTurnOfTeam1(true);
        WellSaid.Model.team1Score(0);
        WellSaid.Model.team2Score(0);
        WellSaid.Model.lastRoundQuestions = [];
        WellSaid.Model.usedQuestionIndexes = [];                          
        me.main.loadContent(me.main.ViewStart);
    }
    
    me.congratulate = function() {
        if (WellSaid.Model.team1Score() > WellSaid.Model.team2Score() )
        {
            $('.divEnd')[0].innerHTML = 'Well said, Team 1! &nbsp; You win.';
            $('.divEnd').addClass('spanTeam1ScoreValue');
        }
        else if (WellSaid.Model.team1Score() < WellSaid.Model.team2Score() )
        {
            $('.divEnd')[0].innerHTML = 'Well said, Team 2! &nbsp; You win.';
            $('.divEnd').addClass('spanTeam2ScoreValue');
        }
        else
            $('.divEnd')[0].innerHTML = "Wow, it's a draw! &nbsp; Play again to see who's linguistically superior.";
    }
     
    me.preRender = function() {
    }
    
    me.postRender = function() {
        me.setPlayButtonEventHandler();
        me.congratulate();    
    }
    
    return me;
    
}());