//define namespace if it doesn't exist
if (typeof WellSaid == "undefined" || !WellSaid) {
    var WellSaid = {};
}

WellSaid.ViewAnswer = (function(){
    var me = {}; 
    
    me.main = null;
    
    me.content = function() {
        return '<div id="subContent">\
<div class="divDescribeTitle">\
    Round <span class="round" data-bind="text: round"></span> of <span data-bind="text: numberOfRounds"></span> - \
    <span class="describeTeam"  data-bind="css: { spanTeam1ScoreValue: isTurnOfTeam1()==true, spanTeam2ScoreValue: isTurnOfTeam1()==false }" >\
        Team <span data-bind="text: turnOfTeam"></span>\
    </span>\
</div>\
\
<br />\
\
<span >Which words did your team guess?</span>\
\
<fieldset id="questions" data-role="controlgroup">\
</fieldset>\
\
<br /><br />\
\
<span >Pass the game to the other team</span>\
\
<div class="center" >\
<button data-inline="true" class="btnPlay"><span class="spanPlay ">Done</span></button>\
</div>\
</div>'
;
    }  
    
    me.displayLastRoundQuestions = function() {
        var questions = $('#questions');
        for (var wordCounter = 0; wordCounter < WellSaid.Model.numberOfQuestions(); wordCounter++) {
            var label = document.createElement('label');
            label.innerHTML = '<input type="checkbox" name="checkbox'+wordCounter+'" data-mini="true"  />' + WellSaid.Model.lastRoundQuestions[wordCounter];
            questions.append(label);
        }
    }
        
    me.bindCheckboxClickToScoreChange = function() {
        $("#questions input[type='checkbox']").bind( "change", function(event, ui) {
            if (event.target.checked)    
            {
                if (WellSaid.Model.isTurnOfTeam1())
                    WellSaid.Model.team1Score(  WellSaid.Model.team1Score() + 1  );
                else
                    WellSaid.Model.team2Score(  WellSaid.Model.team2Score() + 1  );
            }                
            else
            {
                if (WellSaid.Model.isTurnOfTeam1())
                    WellSaid.Model.team1Score(  WellSaid.Model.team1Score() - 1  );
                else
                    WellSaid.Model.team2Score(  WellSaid.Model.team2Score() - 1  );
            }            
        }); 
    }
    
    me.setPlayButtonEventHandler = function() {      
        $('.btnPlay').click(me.btnPlayClicked);
    }
    
    me.btnPlayClicked = function() {
        if (WellSaid.Model.round() == WellSaid.Model.numberOfRounds() && !WellSaid.Model.isTurnOfTeam1())
        {            
            me.main.loadContent(me.main.ViewEnd);
            return;
        }
        if (!WellSaid.Model.isTurnOfTeam1())
            WellSaid.Model.round(   WellSaid.Model.round() + 1  );
        WellSaid.Model.isTurnOfTeam1( !WellSaid.Model.isTurnOfTeam1() );

        me.main.loadContent(me.main.ViewStart);
    }
            
    me.preRender = function () {
    }
    
    me.postRender = function () {                
        me.displayLastRoundQuestions();   
        me.bindCheckboxClickToScoreChange();
        me.setPlayButtonEventHandler();   
    }
        
    return me;
}());