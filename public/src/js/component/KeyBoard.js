

var switch9 = document.getElementById("switch5");
switch9.addEventListener("change", da1, false);

function da1(e) {
    if (e.target.value == "1") {
        openNav();

    }
    if (e.target.value == "0") {
      closeNav();
    }
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

var st = new DSX.functionChange("key1", key);

var oscKeyboardFlag=1;


function key(data) {
    var str = 0;
    let synTypeData = $("#syn_type").text();
    str = 880 * 4 * Math.pow(2, (data.note[1] - 69) / 12);

    if (data.note[0] == "1") {

        if(oscKeyboardFlag===1){

            if(OSC1FLAG_ONOFF===true){

                //console.log(synTypeData);
                switch (synTypeData) {
                  case "OSC":
                  //console.log("osc1");
                  gainOscFirst.gain.value = 0.7;
                  oscFirst.frequency.value= str;

                  break;
                  case "FM":
                  //console.log("fm");
                  fm.gain.value=0.7;
                  fm.carrier.value=str;

                  break;
                  case "AM":
                  //console.log("am");

                  oscFirst.frequency.value= str;
                  amGain.gain.value=0.7;

                  break;
                  case "Sub":
                  //console.log("sub");
                  oscFirst.frequency.value= str;
                  sub_syn.gain.value=0.7;

                  break;

                  default:
                  gainOscFirst.gain.value = 0.7;
                  oscFirst.frequency.value= str;

                }
                $("#osc1_freq").text(str.toFixed(0));
                $("#mod1_val").text(str.toFixed(0));
            }

        }
        else{

            if(OSC2FLAG_ONOFF===true){

                //console.log(synTypeData);
                switch (synTypeData) {
                  case "OSC":
                  //console.log("osc");
                  gainOscSecond.gain.value = 0.7;
                  oscSecond.frequency.value= str;

                  break;
                  case "FM":
                  //console.log("fm");
                  fm.gain.value=0.7;
                  fm.carrier.value=str;

                  break;
                  case "AM":
                  //console.log("am");
                  am_syn.modfreq.value= str;
                  amGain.gain.value=0.7;

                  break;
                  case "Sub":
                  console.log("sub");

                  break;

                  default:
                  gainOscSecond.gain.value = 0.7;
                  oscSecond.frequency.value= str;

                }


                $("#osc2_freq").text(str.toFixed(0));
                $("#mod2_val").text(str.toFixed(0));

            }

        }
    }
    if (data.note[0] == "0") {
        if(oscKeyboardFlag===1){
            gainOscFirst.gain.value = 0;
            fm.gain.value=0;
            amGain.gain.value=0;
            sub_syn.gain.value=0;
        }
        else{
            fm.gain.value=0;
            gainOscSecond.gain.value = 0;
            amGain.gain.value=0;
        }

    }
}
$("#osc1_keyboard").click(()=>{
    oscKeyboardFlag=1;
    $("#osc1_keyboard").attr("disabled", true);
    $("#osc2_keyboard").attr("disabled", false);

})

$("#osc2_keyboard").click(()=>{
    oscKeyboardFlag=2;
    $("#osc1_keyboard").attr("disabled", false);
    $("#osc2_keyboard").attr("disabled", true);

})
