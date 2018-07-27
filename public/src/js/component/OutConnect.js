
oscGain.connect(gain);
saxgain.connect(gain);
gain.connect(gain2); //eq
gain2.connect(gain3); //comp

gain3.connect(gain4); //shift effect
gain4.connect(gain5);

gain5.connect(gain6);
gain6.connect(gain7); //delay
gain7.connect(gain8); //reverb
gain8.connect(gain9);
gain9.connect(gain10);
gain10.connect(mixgain);
gain.connect(saxsub);
saxsub.connect(mixgain);
mixgain.connect(saxPan); //saxpan
saxPan.connect(mainout);
mainout.connect(DAC); //connet main out


//var sax_main_out = new DSX.valueChange("mainout_dail", mainout.gain);

// main out set
new DSX.functionChange("mainout_dail", function(e) {

    mainout.gain =e.target.value;
    let volumeData= (e.target.value * 100).toFixed(0);
    $("#volume_value").text(volumeData);
    $("#volume_value_1").text(volumeData);

    socket.emit('micOut', {
        saxmic_gain : saxgain.gain.value,
        mainout_gain: e.target.value,
    });

 });

 socket.on('micOut', function(data) {

     var newData= (data.mainout_gain * 100).toFixed(0);
     mainout.gain = data.mainout_gain;
     $("#mainout_dail").val(data.mainout_gain);
     $("#volume_value").text(newData);
     $("#volume_value_1").text(newData);

 });

 // component check set

$("#file-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_file").show();
        // network main
        socket.emit('control', {
            fileCheked : true,
        });
        socket.on('control', function(data) {
            //console.log(data.fileCheked);
            $("#file-check").prop('checked', true) ;
        });
        // network main
    } else {
        $("#check_file").hide();
    }
});
$("#file-check-1").change(function(e){

    if ( e.target.value){
        $("#check_file").show();
        // network main
        socket.emit('control', {
            fileCheked : true,
        });
        socket.on('control', function(data) {
            //console.log(data.fileCheked);
            $("#file-check").prop('checked', true) ;
        });
        // network main
    } else {
        $("#check_file").hide();
    }
});
$("#tunner-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_tunner").show();
    } else {
        $("#check_tunner").hide();
    }
});
$("#tunner-check-1").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.value ){
        $("#check_tunner").show();
    } else {
        $("#check_tunner").hide();
    }
});
$("#eq-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_eq").show();
    } else {
        $("#check_eq").hide();
    }
});
$("#comp-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_comp").show();
    } else {
        $("#check_comp").hide();
    }
});
$("#pitch-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_pitch").show();
    } else {
        $("#check_pitch").hide();
    }
});
$("#time-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_time").show();
    } else {
        $("#check_time").hide();
    }
});
$("#delay-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_delay").show();
    } else {
        $("#check_delay").hide();
    }
});
$("#pan-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_pan").show();
    } else {
        $("#check_pan").hide();
    }
});
$("#record-check").change(function(e){
    //console.log(e.target.checked);
    if ( e.target.checked ){
        $("#check_record").show();
    } else {
        $("#check_record").hide();
    }
});
$("#record-check-1").change(function(e){

    if ( e.target.value ){
        $("#check_record").show();
    } else {
        $("#check_record").hide();
    }
});
$(document).ready(function() {

    $("#check_file").hide();
    $("#check_tunner").hide();
    $("#check_eq").hide();
    $("#check_comp").hide();
    $("#check_pitch").hide();
    $("#check_time").hide();
    $("#check_delay").hide();
    $("#check_pan").hide();
    $("#check_record").hide();
  });

// file-check
// tunner-check
// eq-check
// comp-check
// pitch-check
// time-check
// delay-check
// pan-check
