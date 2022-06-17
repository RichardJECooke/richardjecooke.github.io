//define namespace if it doesn't exist
if (typeof WellSaid == "undefined" || !WellSaid) {
    var WellSaid = {};
}

WellSaid.Model = (function () {

    var me = {};

    me.soundOn = true;
    me.round = ko.observable(1);
    me.isTurnOfTeam1 = ko.observable(true);
    me.team1Score = ko.observable(0);
    me.team2Score = ko.observable(0);
    me.numberOfQuestions = ko.observable(8);
    me.numberOfRounds = ko.observable(10);
    me.roundLengthInMilliseconds = ko.observable(30000);
    me.allQuestions = WellSaid.DataEnglish;
    me.lastRoundQuestions = [];
    me.usedQuestionIndexes = [];                        
    me.timeElapsedInMilliseconds = 0;
    me.timerIntervalInMilliseconds = 100;
    
    me.turnOfTeam = ko.computed(
        function() {
            return me.isTurnOfTeam1() == 1 ? 1 : 2;  
        }
        , this
    );
    
    return me;    
}());