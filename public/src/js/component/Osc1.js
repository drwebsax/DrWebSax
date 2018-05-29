

var oscFirst = new DSX.Osc({type:"sawtooth",freq: 700});
var gainOscFirst = new DSX.Amp({ gain: 0.0});


oscFirst.connect(gainOscFirst);
//var oscFirstVoulum = new DSX.valueChange("knob_on_off_Osc_1", oscFirst.frequency);
var compTogle = new DSX.functionChange('on_off_Osc_1', connectOscFirst);
function connectOscFirst(e) {

    if ( OSC_ONOFF === true ) {

        let synTypeData = $("#syn_type").text();
        if(e.target.value == "1") {
          // var OSC1FLAG_ONOFF=false;
          // var OSC2FLAG_ONOFF=false;
            OSC1FLAG_ONOFF = true;
            saxgain.disconnect(0);

            //console.log("on");
            switch (synTypeData) {
              case "OSC":
              //console.log("osc");
              oscFirst.start();
              gainOscFirst.connect(oscGain);
              sax_canvas_freq.getAnalyser(gainOscFirst); // connect frequency domain
              oscGain.gain.value=0.7;


              break;
              case "FM":
              //console.log("fm");



              break;
              case "AM":
              //console.log("am");

              break;
              case "Sub":
              //console.log("sub");

              break;

              default:
                //console.log("osc");

                oscFirst.start();
                gainOscFirst.connect(oscGain);
                sax_canvas_freq.getAnalyser(oscGain); // connect frequency domain
                oscGain.gain.value=0.7;


            }


            $("#osc1_opacity").css('opacity','1'); //OSC1 on/off
            $("#osc1_led_onoff_span").text("ON");


        }else if ( e.target.value == "0") {
            OSC1FLAG_ONOFF = false;
            gainOscFirst.disconnect();
            // saxgain.disconnect(0);
            // oscGain.disconnect(0); // osc disconnect
            // sax_canvas_freq.getAnalyser(nullGain);
            //
            // fm.stop();//fm stop

            //console.log("off");

            $("#osc1_opacity").css('opacity','0.4'); //OSC1 on/off
            $("#osc1_led_onoff_span").text("OFF");

        }
    }else{


      saxgain.disconnect(0);
      oscGain.disconnect(0)
      $("#osc1_opacity").css('opacity','0.4'); //OSC1 on/off
      $("#osc1_led_onoff_span").text("OFF");
    }
}

new DSX.functionChange('knob_on_off_Osc_1', (e)=>{

    let synTypeData = $("#syn_type").text();
    if ( OSC_ONOFF === true ) {

        if ( OSC1FLAG_ONOFF === true ) {

            console.log(synTypeData);
            switch (synTypeData) {
              case "OSC":
              //console.log("osc");
              oscFirst.frequency.value=e.target.value;

              break;
              case "FM":
              //console.log("fm");
              fm.carrier.value=e.target.value;

              break;
              case "AM":
              //console.log("am");
              oscFirst.frequency.value=e.target.value;

              break;
              case "Sub":
              //console.log("sub");
              oscFirst.frequency.value=e.target.value;


              break;

              default:
              oscFirst.frequency.value=e.target.value;
            }

            $("#osc1_freq").text((e.target.value).toFixed(0));
            $("#mod1_val").text((e.target.value).toFixed(0));

        }

    }



});



    $("#knob_on_off_Osc_1").mousedown(function(){

      if ( OSC1FLAG_ONOFF === true ) {
          let synTypeData = $("#syn_type").text();
          switch (synTypeData) {
            case "OSC":
            //console.log("osc");
            gainOscFirst.gain.value=0.7;

            break;
            case "FM":
            //console.log("fm");
            //oscGain.gain.value=0.7;
            fm.gain.value=0.7;

            break;
            case "AM":
            //console.log("am");
            amGain.gain.value=0.7;

            break;
            case "Sub":
            sub_syn.gain.value=0.7;

            break;

            default:
            gainOscFirst.gain.value=0.7;

          }
      }

    });

    $("#knob_on_off_Osc_1").mouseup(function(){

        if ( OSC1FLAG_ONOFF === true ) {

            let synTypeData = $("#syn_type").text();
            switch (synTypeData) {
              case "OSC":
              //console.log("osc");
              gainOscFirst.gain.value=0;

              break;
              case "FM":
              //console.log("fm");
              //oscGain.gain.value=0.7;
              fm.gain.value=0;

              break;
              case "AM":
              //console.log("am");
              amGain.gain.value=0;

              break;
              case "Sub":
              //console.log("sub");
              sub_syn.gain.value=0.0;

              break;

              default:
              gainOscFirst.gain.value=0;

            }
        }
    });

    // socket.on('mainOsc1', function(data) {
    //   console.log(data);
    //     oscFirst.frequency.value =data.frequency;
    //     gainOscFirst.gain.value=0.7;

    //  });
