/*

@ Dr.WebSax Web Audio Application
@ saxophone  mic input

*/

var saxInput = new DSX.Mic(); // mic input
var saxgain = new DSX.Aux({
    gain: 0.9
});
var tune = new DSX.Tunner("pitch", "note" , function(data){
    //console.log(data);
     socket.emit('pitch',data);
});

var amp_canvas = new DSX.ampDomain('canv', "red",200, 100, function(data){
    let newData = data.toFixed(1);
    socket.emit('pitchGain',newData);
});
amp_canvas.getAnalyser(saxgain);
var saxOnoff = new DSX.functionChange("saxmic_on", sax_on_data); // sax input on/off control

function sax_on_data(e) {
    saxInput.connect(saxgain);
    if (e.target.value == "1") {

        saxgain.gain.value = 0.7;
        tune.getAnalyser(saxgain);
        //sax_canvas_freq.getAnalyser(saxgain);
        //$("#mic_opacity").css('opacity','1');
        //$("#mic_led_onoff_span").text("ON");
        // let checkNew = document.getElementById('pitch')
        // console.log(tune.dataPitch);
        // let dfasfdsf = $("#pitch").html()
        //  socket.emit('pitch',dfasfdsf);
    }else {
        //saxInput.connect(saxgain);
        //saxgain.gain.value =0;
        saxgain.disconnect(0);

        //$("#mic_opacity").css('opacity','0.4');
        //$("#mic_led_onoff_span").text("OFF");
    }

}

let dataTop = 0;
let dataLeft = 0;
let dataRight = 0;

//var sax_Inputgain = new DSX.valueChange("saxmic_gain", saxgain.gain); // sax input gainon control
var sax_321 = new DSX.functionChange("saxmic_gain", (e) => {

    saxgain.gain = e.target.value;
    //console.log(e.target.value);
    let micData = (e.target.value * 100).toFixed(0);
    $(mic_volume).text(micData);

});

// sax input on/off control
