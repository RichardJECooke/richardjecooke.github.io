//define namespace if it doesn't exist
if (typeof WellSaid == "undefined" || !WellSaid) {
    var WellSaid = {};
}

WellSaid.ViewAsk = (function(){
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
<span class="grey">Describe these words before the time runs out:</span>\
\
<ul class="ulQuestions">\
</ul>\
\
<br />\
\
<div class="full-width-slider">\
    <input name="slider-fill" id="sliderTimer" class="sliderTimer"  min="0" max="30000" value="0" type="range" data-highlight="true" />\
</div>\
</div>\
';
    }  
                
    me.startTimer = function() {
        me.timerIntervalHandle = setInterval(me.updateTimer, WellSaid.Model.timerIntervalInMilliseconds);
    };
    
    me.afterStop = function(event, ui) {
        me.main.loadContent(me.main.ViewAnswer);
    }
    
    me.stopTimer = function() {
        clearInterval(me.timerIntervalHandle);
        me.main.playSound();
        me.main.notify("Stop!", me.afterStop);   
    }
    
    me.updateTimer = function() {
        WellSaid.Model.timeElapsedInMilliseconds +=  WellSaid.Model.timerIntervalInMilliseconds;        
        $('.sliderTimer')[0].value = WellSaid.Model.timeElapsedInMilliseconds;        
        $('.sliderTimer').slider("refresh");
    
        if (WellSaid.Model.timeElapsedInMilliseconds > WellSaid.Model.roundLengthInMilliseconds()) {
            me.stopTimer();            
        }
    };
                        
    me.displayQuestions = function() {
        var index = Math.floor(Math.random() * WellSaid.Model.allQuestions.length);
        var wordsThisRound = [];
        WellSaid.Model.lastRoundQuestions = [];

        //generate words
        for (var wordCounter = 0; wordCounter < WellSaid.Model.numberOfQuestions(); wordCounter++) {                        
            while ($.inArray(index, WellSaid.Model.usedQuestionIndexes) != -1) //dont include past questions in this round
                index = Math.floor(Math.random() * WellSaid.Model.allQuestions.length);
            wordsThisRound.push(WellSaid.Model.allQuestions[index]);
            WellSaid.Model.usedQuestionIndexes.push(index);
            WellSaid.Model.lastRoundQuestions.push(WellSaid.Model.allQuestions[index]);
        }
        
        //display words on screen
        var ulQuestions = $('.ulQuestions');
        wordsThisRound.forEach(function (word) {
            ulQuestions.append("<li>"+word+"</li>");
        });
        me.startTimer();           
    };
    
    me.clearQuestions = function() {
        $('.ulQuestions').empty();
    }   
    
    me.preRender = function() {
    }
    
    me.postRender = function() {
        me.timerIntervalHandle = null;
        WellSaid.Model.timeElapsedInMilliseconds = 0;     
        WellSaid.Model.timerIntervalInMilliseconds = 100;    
        $('.sliderTimer')[0].max = WellSaid.Model.roundLengthInMilliseconds();          
        me.displayQuestions();        
    }
        
    return me;
}());