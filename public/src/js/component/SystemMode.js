var system1 = document.getElementById("system1");
system1.addEventListener("change", system_mode, false);

function system_mode(e) {
    if (e.target.value == "0") {
        document.getElementById("system_mode").innerHTML = "Controller";
        $("#on_off_Osc_1").attr('disabled',true);

         MICINPUT_ONOFF=true;
         OSC_ONOFF=false;
         $("#opacity_mic").css('opacity','1'); //mic_main_opacity
         $("#osc_main_opacity").css('opacity','0.4'); //osc_main_opacity
         $("#osc2_main_opacity").css('opacity','0.4'); //osc2_main_opacity


         // osc off
         saxgain.disconnect(0);
         oscGain.disconnect(0); // osc disconnect
         $("#osc1_opacity").css('opacity','0.4'); //OSC1 on/off
         $("#osc1_led_onoff_span").text("OFF");


         $("#osc2_opacity").css('opacity','0.4'); //OSC1 on/off
         $("#osc2_led_onoff_span").text("OFF");


    }
    if (e.target.value == "1") {
        document.getElementById("system_mode").innerHTML = "Synthesizer";

        MICINPUT_ONOFF=false;
        OSC_ONOFF=true;
        $("#opacity_mic").css('opacity','0.4'); //mic_main_opacity
        $("#osc_main_opacity").css('opacity','1'); //osc_main_opacity
        $("#osc2_main_opacity").css('opacity','1'); //osc2_main_opacity

        $("#mod3_val").hide();
        $("#mod4_val").hide();

        // mic off
        saxgain.disconnect(0);
        oscGain.connect(gain);
        $("#mic_opacity").css('opacity','0.4');
        $("#mic_led_onoff_span").text("OFF");

    }
}
