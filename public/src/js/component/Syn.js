/*
last gain is oscGain!!
*/
var osc33 = new DSX.Osc({type:"sine",freq:1700});
var fm = new  DSX.FM({carrier_type:"sine",carrier:500,mod_type :"sine",modfreq:700,depth:1800,gain:0.0});
var am_syn = new  DSX.AM({mod_type :"sine",modfreq:1200,depth:0.5,gain:0.8});
var sub_syn = new DSX.Subtract({cutoff:1230, resonance:0, gain:0});

// OSC
$("#osc_syn").click(()=>{
    $("#syn_type").text("OSC");
    $("#osc2_main_opacity").css('opacity','1'); //osc2_main_opacity
    $("#mod3_val").hide();
    $("#mod4_val").hide();


    //off

    saxgain.disconnect(0);
    fm.stop();//fm stop

    //on
    console.log("osc");

    gainOscFirst.connect(oscGain);
    gainOscSecond.connect(oscGain);

    oscGain.gain.value=0.7;
    oscFirst.start();
    oscSecond.start();


});

// FM Synthesis
$("#fm_syn").click(()=>{
    $("#syn_type").text("FM");
    $("#osc2_main_opacity").css('opacity','1'); //osc2_main_opacity

    $("#mod3_val").show();
    $("#mod4_val").hide();


    // off

    saxgain.disconnect(0);
    gainOscFirst.disconnect(0); // osc disconnect
    gainOscSecond.disconnect(0)
    am_syn.stop();



    fm.connect(oscGain);
    sax_canvas_freq.getAnalyser(oscGain); // connect frequency domain

    console.log(oscGain.gain.value);


})

//AM Synthesis
$("#am_syn").click(()=>{

    $("#syn_type").text("AM");
    $("#osc2_main_opacity").css('opacity','1'); //osc2_main_opacity

    $("#knob_modulator").attr({
        "max":"1",
    })
    $("#mod3_val").show();
    $("#mod4_val").hide();

    // off

    saxgain.disconnect(0);
    gainOscFirst.disconnect(0); // osc disconnect
    gainOscSecond.disconnect(0)
    fm.stop();


    //on
    //oscGain.gain.value=0;

    am_syn.get(oscFirst)
    am_syn.connect(amGain);
    amGain.connect(oscGain);
    sax_canvas_freq.getAnalyser(oscGain); // connect frequency domain
    oscFirst.start();
    oscGain.gain.value=0.7;
    amGain.gain.value=0;

})

// Subtractive Synthesis
$("#sub_syn").click(()=>{
    $("#syn_type").text("Sub");
    if(OSC_ONOFF===true){
        $("#osc2_main_opacity").css('opacity','0.4'); //osc2_main_opacity
    }

    $("#mod3_val").show();
    $("#mod4_val").show();

    // off

    saxgain.disconnect(0);
    gainOscFirst.disconnect(0); // osc disconnect
    gainOscSecond.disconnect(0)
    fm.stop();
    am_syn.stop();


    //on
    //oscGain.gain.value=0;

    $("#knob_modulator").attr({"max":"15000"});
    $("#knob_modulator_second").attr({"max":"20"});

    oscFirst.connect(sub_syn);
    sub_syn.connect(oscGain);
    sax_canvas_freq.getAnalyser(oscGain); // connect frequency domain
    oscFirst.start();
    sub_syn.gain.value=0;
    oscGain.gain.value=0.7;

})
