/*

@ Dr.WebSax Web Audio Application
@ saxophone  mic input

*/

var saxInput = new DSX.Mic(); // mic input
var saxOnoff = new DSX.functionChange("saxmic_on", sax_on_data); // sax input on/off control

function sax_on_data(e) {
    //console.log(e.target.value);
    if(MICINPUT_ONOFF===true){

        saxInput.connect(saxgain);
        if (e.target.value == "1") {
            saxgain.connect(gain);
            saxgain.gain.value = 0.7;
            tune.getAnalyser(saxgain);
            sax_canvas_freq.getAnalyser(saxgain);

            $("#mic_opacity").css('opacity','1');
            $("#mic_led_onoff_span").text("ON");
        }
        if (e.target.value == "0") {
            //saxInput.connect(saxgain);
            //saxgain.gain.value =0;
            saxgain.disconnect(0);
            $("#mic_opacity").css('opacity','0.4');
            $("#mic_led_onoff_span").text("OFF");
        }
    }
}

//var sax_Inputgain = new DSX.valueChange("saxmic_gain", saxgain.gain); // sax input gainon control
new DSX.functionChange("saxmic_gain", function(e){
    saxgain.gain=e.target.value;
    var micData= (e.target.value * 100).toFixed(0);
    //console.log(micData);
    $("#mic-volume").text(micData);
    $("#mic-volume_2").text(micData);

    // network main

    socket.emit('micOut', {
        saxmic_gain : e.target.value,
        mainout_gain: mainout.gain.value,
    });


}); // sax input on/off control
new DSX.functionChange("saxmic_gain1", function(e){
    saxgain.gain=e.target.value;
    var micData= (e.target.value * 100).toFixed(0);
    //console.log(micData);
    $("#mic-volume").text(micData);
    $("#mic-volume_2").text(micData);

    // network main

    socket.emit('micOut', {
        saxmic_gain : e.target.value,
        mainout_gain: mainout.gain.value,
    });


}); // sax input on/off control
socket.on('micOut', function(data) {

    var newData= (data.saxmic_gain * 100).toFixed(0);
    saxgain.gain = data.saxmic_gain;
    $("#saxmic_gain").val(data.saxmic_gain);
    $("#mic-volume").text(newData);
    $("#mic-volume_2").text(newData);

});
