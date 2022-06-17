'use strict';

//define namespace if it doesn't exist
if (typeof WellSaid == "undefined" || !WellSaid) {
    var WellSaid = {};
}

WellSaid.Main = (function(){

    var me = {};
        
    me.notify = function(message, callback) {                
        var id = "popupid";
        try {$("#"+id).remove();} catch(e) {}
        var popup = document.createElement('div');
        popup.setAttribute("data-role", "popup");
        popup.setAttribute("data-transition", "pop");
        popup.setAttribute("data-theme", "a");
        popup.setAttribute("data-overlay-theme", "b");
        popup.setAttribute("id", id);
        popup.innerHTML = "<p style='margin:1em 2em 1em 2em'>" + message + "</p>";        
        $(".divContent").append(popup);        
        $("#"+id).popup(); //initialise the popup
        $("#"+id).bind({ popupafterclose: callback });
        $("#"+id).popup("open");     
    };
    
    me.loadSound = function() {
        me.sound = document.createElement('audio');
        
        var source = document.createElement('source');
        source.type = 'audio/mp3';
        source.src = 'sound/end.mp3';
        me.sound.appendChild(source);
        
        source = document.createElement('source');
        source.type = 'audio/ogg';
        source.src = 'sound/end.ogg';
        me.sound.appendChild(source);
        
        me.sound.addEventListener("load", function(){ audioElement.play(); }, true);            
    };
            
    me.playSound = function() {
        if (!WellSaid.Model.soundOn) {
            return;            
        }
        me.sound.play();
    };
    
    me.refreshQuestions = function() {
        WellSaid.Model.allQuestions = [];
        if ($('.inputEnglish')[0].checked) {
            WellSaid.Model.allQuestions = WellSaid.Model.allQuestions.concat(WellSaid.DataEnglish);
        }
        if ($('.inputAfrikaans')[0].checked) {
            WellSaid.Model.allQuestions = WellSaid.Model.allQuestions.concat(WellSaid.DataAfrikaans);
        }
        if (WellSaid.Model.allQuestions.length == 0) {
            WellSaid.Model.allQuestions = WellSaid.Model.allQuestions.concat(WellSaid.DataEnglish);             
        }
    }
    
    me.toggleSound = function() {
        WellSaid.Model.soundOn = $('.inputSound')[0].checked;    
    }
    
    me.loadContent = function(view) {
        view.preRender();
        $('.divContent').hide();
        $('.divContent')[0].innerHTML = view.content();
        $('.divContent').trigger('create');
        $('.divContent').show();
        view.postRender();
        $('.divContent').trigger('create');
        ko.applyBindings(WellSaid.Model, $('#subContent')[0]);        
    }
    
    me.startApp = function() {
        WellSaid.ViewAnswer.main = me;
        WellSaid.ViewAsk.main = me;
        WellSaid.ViewStart.main = me;
        WellSaid.ViewEnd.main = me;
                                     
        $('.loading').hide();
        $('[data-role="page"]').fadeIn(1500);
        me.loadContent(me.ViewStart);        
        
        ko.applyBindings(WellSaid.Model, $('.divScore')[0]);
        ko.applyBindings(WellSaid.Model, $('#pnlHelpContainer')[0]);
        
        $('.inputEnglish').click(me.refreshQuestions);
        $('.inputAfrikaans').click(me.refreshQuestions);
        $('.inputSound').click(me.toggleSound); 
    }
    
    me.ViewAnswer = WellSaid.ViewAnswer;
    me.ViewAsk = WellSaid.ViewAsk;
    me.ViewStart = WellSaid.ViewStart;
    me.ViewEnd = WellSaid.ViewEnd;
    
    me.loadSound();          
    me.startApp();
    return me;
    
}());