
new DSX.functionChange('knob_modulator_second', (e)=>{
    $("#mod4_val").text((e.target.value).toFixed(0));
    let synTypeData = $("#syn_type").text();

    if(OSC_ONOFF===true){

            //console.log(synTypeData);
            switch (synTypeData) {
              case "OSC":



              break;
              case "FM":
              console.log("fm");


              break;
              case "AM":
              console.log("am");


              break;
              case "Sub":
              //console.log("sub");
              sub_syn.resonance.value=e.target.value;

              break;

              default:
            }
    }
});
