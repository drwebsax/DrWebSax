
        //// delay SYSTEM    /////

        var saxDelay = new DSX.Delay({
            delayTime: 0.2,
            feedback: 0.45,
        });

        var sax_delay = new DSX.valueChange("delay_time", saxDelay.delayTime);
        var sax_feedback = new DSX.valueChange("feed_back", saxDelay.feedback);

        new DSX.functionChange("delay_time", function(e){
            var Data1= (e.target.value * 1).toFixed(2);
            saxDelay.delayTime=Data1;
            $("#delay_time_text").text(Data1);
            socket.emit('delay', {
                time : Data1,
                feedback: (saxDelay.feedback.value * 1).toFixed(2),
                reverb:(saxReverb.gain.value * 1).toFixed(2),
            });
        });
        new DSX.functionChange("feed_back", function(e){
            var Data2= (e.target.value * 1).toFixed(2);
            saxDelay.feedback=Data2;
            $("#feed_back_text").text(Data2);

            socket.emit('delay', {
                time : (saxDelay.delayTime.value* 1).toFixed(2),
                feedback: Data2,
                reverb:(saxReverb.gain.value* 1).toFixed(2),
            });
        });

        // reverb
        var saxReverb = new DSX.Reverb({
            gain: 0,
        });
        var sax_reverbtime = new DSX.valueChange("reverbtime", saxReverb.gain);

        new DSX.functionChange("reverbtime", function(e){
            var Data3= (e.target.value * 1).toFixed(2);
            saxReverb.gain=Data3;
            $("#reverbtime_text").text(Data3);
            socket.emit('delay', {
                time : (saxDelay.delayTime.value* 1).toFixed(2),
                feedback: (saxDelay.feedback.value* 1).toFixed(2),
                reverb:Data3,
            });
        });

        socket.on('delay', function(data) {

            saxDelay.delayTime = data.time;
            saxDelay.feedback = data.feedback;
            saxReverb.gain = data.reverb;



            $("#delay_time").val(data.time);
            $("#feed_back").val(data.feedback);
            $("#reverbtime").val(data.reverb);


            $("#delay_time_text").text(data.time);
            $("#feed_back_text").text(data.feedback);
            $("#reverbtime_text").text(data.reverb);

        });




        var bypassDelay = new DSX.functionChange('delaybypass', delaydata);
        function delaydata(e) {

            if (e.target.value == "1") {
                gain6.disconnect(0);
                gain7.disconnect(0);
                gain6.connect(saxDelay);
                saxDelay.connect(gain7);

                saxReverb.getfrom(gain7);
                saxReverb.connect(gain8);
            }
            if (e.target.value == "0") {
                gain6.disconnect(0);
                gain7.disconnect();
                gain6.connect(gain7); //delay reconnect


                saxReverb.disconnect(); //reverb reconnect
                gain7.connect(gain8);
            }
        }

        // preset select selectBox

        $("#delay_preset").change(function(){

            //console.log($(this).val());
            var dataSelect = $(this).val();
            switch (dataSelect) {
                case "1":
                    socket.emit('delay', {
                        time : 0,
                        feedback: 0,
                        reverb:0,
                    });
                break;
                case "2":
                    socket.emit('delay', {
                        time : 0.9,
                        feedback: 0.2,
                        reverb:0.3,
                    });

                break;
                case "3":
                    socket.emit('delay', {
                        time : 0.5,
                        feedback: 0.9,
                        reverb:0.3,
                    });

                break;
                case "4":
                    socket.emit('delay', {
                        time : 0.2,
                        feedback: 0,
                        reverb:0.7,
                    });

                break;
                default:
            }
        });
