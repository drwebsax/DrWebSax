

var oscSecond = new DSX.Osc({type:"square",freq: 700});
var gainOscSecond = new DSX.Amp({ gain: 0.0});


oscSecond.connect(gainOscSecond);


//var oscSecondVoulum = new DSX.valueChange("knob_on_off_Osc_2", oscSecond.frequency);
var compTogle = new DSX.functionChange('on_off_Osc_2', connectoscSecond);


function connectoscSecond(e) {
    let synTypeData = $("#syn_type").text();
    if(OSC_ONOFF===true){


        if (e.target.value == "1") {

            OSC2FLAG_ONOFF=true;
            saxgain.disconnect(0);

            console.log(synTypeData);
            switch (synTypeData) {
              case "OSC":
              console.log("osc2");
              gainOscSecond.connect(oscGain);
              oscSecond.start();
              sax_canvas_freq.getAnalyser(gainOscSecond); // connect frequency domain

              break;
              case "FM":
              console.log("fm");
              fm.connect(oscGain)


              break;
              case "AM":
              console.log("am");
              

              break;
              case "Sub":
              console.log("sub");

              break;

              default:
                console.log("osc2_default");
                gainOscSecond.connect(oscGain);
                oscSecond.start();
                sax_canvas_freq.getAnalyser(gainOscSecond); // connect frequency domain
                gainOscSecond.gain.value=0;


            }

            $("#osc2_opacity").css('opacity','1'); //OSC1 on/off
            $("#osc2_led_onoff_span").text("ON");
        }
        if (e.target.value == "0") {
            OSC2FLAG_ONOFF=false;
            saxgain.disconnect(0);
            gainOscSecond.disconnect(0)


            $("#osc2_opacity").css('opacity','0.4'); //OSC1 on/off
            $("#osc2_led_onoff_span").text("OFF");

        }
    }
}

new DSX.functionChange('knob_on_off_Osc_2', (e)=>{

      let synTypeData = $("#syn_type").text();
      if(OSC2FLAG_ONOFF===true){

          console.log(synTypeData);
          switch (synTypeData) {
            case "OSC":
            console.log("osc_freq");
            oscSecond.frequency.value  = e.target.value;

            break;
            case "FM":
            console.log("fm");
            //fm.connect(oscGain)
            fm.modfreq.value	=e.target.value;

            break;
            case "AM":
            console.log("am");
            am_syn.modfreq.value	=e.target.value;

            break;
            case "Sub":
            console.log("sub");

            break;

            default:
            oscSecond.frequency.value  = e.target.value;
          }

        $("#osc2_freq").text((e.target.value).toFixed(0));
        $("#mod2_val").text((e.target.value).toFixed(0));

    }







});

$("#knob_on_off_Osc_2").mousedown(function(){

  if(OSC2FLAG_ONOFF===true){

      let synTypeData = $("#syn_type").text();
      switch (synTypeData) {
        case "OSC":
        console.log("osc");
        gainOscSecond.gain.value=0.7;

        break;
        case "FM":
        console.log("fm");
        //oscGain.gain.value=0.7;
        fm.gain.value=0.7;

        break;
        case "AM":
        console.log("am");
        amGain.gain.value=0.7;

        break;
        case "Sub":
        console.log("sub");

        break;

        default:
        gainOscSecond.gain.value=0.7;

      }

  }

});

$("#knob_on_off_Osc_2").mouseup(function(){

  if(OSC2FLAG_ONOFF===true){

      let synTypeData = $("#syn_type").text();
      switch (synTypeData) {
        case "OSC":
        console.log("osc");
        gainOscSecond.gain.value=0;

        break;
        case "FM":
        console.log("fm");
        //oscGain.gain.value=0.7;
        fm.gain.value=0;

        break;
        case "AM":
        console.log("am");
        amGain.gain.value=0;

        break;
        case "Sub":
        console.log("sub");

        break;

        default:
        gainOscSecond.gain.value=0;

      }

  }
});


//
// socket.on('mainOsc1', function(data) {
//   console.log(data.frequency);
//     oscSecond.frequency.value =data.frequency;
//
//     });
