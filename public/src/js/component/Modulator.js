
new DSX.functionChange('knob_modulator', (e)=>{
    $("#mod3_val").text((e.target.value).toFixed(0));
    let synTypeData = $("#syn_type").text();

    if(OSC_ONOFF===true){

        console.log(synTypeData);
        switch (synTypeData) {
            case "OSC":
            //console.log("osc");
            break;
            case "FM":
            //console.log("fm");
                fm.depth.value=e.target.value;
            break;
            case "AM":
            //console.log("am");
                $("#mod3_val").text((e.target.value).toFixed(1));
                am.depth.value=e.target.value;
          break;
          case "Sub":
              //console.log("sub");
              sub_syn.cutoff.value=e.target.value;
          break;
          default:
        }

    }
});
