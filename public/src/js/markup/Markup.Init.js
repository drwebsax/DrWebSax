
/**
 * DR UiINT JS
 */
;(function (window, Constructor, undefined) {

	// Constructor
	var DrWebsax = function(){
	    that = this;
	};

	DrWebsax.prototype = {
		init : function() {

            var MicInputMarkup = new Dr.MicInputMarkup();
			$(document).ready(function() {
				$("#mic_opacity").css('opacity','0.4'); //MIC on/off
				$("#osc1_opacity").css('opacity','0.4'); //OSC1 on/off
				$("#osc2_opacity").css('opacity','0.4'); //OSC2 on/off

				$("#opacity_mic").css('opacity','1'); //osc_main_opacity
				$("#osc_main_opacity").css('opacity','0.4'); //osc_main_opacity
				$("#osc2_main_opacity").css('opacity','0.4'); //osc2_main_opacity
			});
	     }

	    ,textSave: function() {
			Dr.Framework.textSave();
	     }
		,preset :{
			// load_json :function(){
			// 	var jsondata = DrAJAX.LoadJsonData('./ajax/init.json'); //'./ajax/osc.xml'
			// 	console.log(jsondata.editor);
			// }
		}
		,ajaxSet :{
    	    // callXmldata : function(url){   //
    		// 			var xml =	DrAJAX.ParseXml(url); //'./ajax/osc.xml'
    		// 			var $xmldata = $(xml).find("audio").find("title").text();
    		// 			console.log($xmldata);
            //
    		//  }
		}//manager mmode 끝
	}; // DrEdit.prototype 끝

    Constructor.data = DrWebsax;
    DrWebsax();

})(window, DrWebsaxSet);

var newWebsax= new DrWebsaxSet.data(); // 객체필요
newWebsax.__proto__.init(); //초기 로드해야함
