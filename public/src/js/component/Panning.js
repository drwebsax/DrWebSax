
    //// panning system   /////
    PanFunc ={};
    var saxPan = new DSX.stereoPan({pan: 0,});
    //var sax_pan_ = new DSX.valueChange("pan_dial", saxPan.pan);

    new DSX.functionChange('pan_dial', (e) => {
        saxPan.pan.value=e.target.value;
        socket.emit('pan', {
            pan : e.target.value,
        });

        console.log(saxPan.pan.value);
        if(e.target.value === 0){

            $("#pan_left").text(000);
            $("#pan_right").text(0);
            $("#pan_left_layer").text(000);
            $("#pan_right_layer").text(0);

        }else if(e.target.value < 0){

            let left_data = (e.target.value)*-100;
            $("#pan_left").text(left_data.toFixed(0));
            $("#pan_right").text(000);
            $("#pan_left_layer").text(left_data.toFixed(0));
            $("#pan_right_layer").text(000);

        }else if(e.target.value > 0){

          let right_data = (e.target.value)*100;
          $("#pan_left").text(0);
          $("#pan_right").text(right_data.toFixed(0));
          $("#pan_left_layer").text(0);
          $("#pan_right_layer").text(right_data.toFixed(0));

        }

    });
    socket.on('pan', function(data) {

        saxPan.pan = data.pan;
        $("#pan_dial").val(data.pan);
        if(data.pan === 0){

            $("#pan_left").text(000);
            $("#pan_right").text(0);
            $("#pan_left_layer").text(000);
            $("#pan_right_layer").text(0);

        }else if(data.pan < 0){

            let left_data = (data.pan)*-100;
            $("#pan_left").text(left_data.toFixed(0));
            $("#pan_right").text(000);
            $("#pan_left_layer").text(left_data.toFixed(0));
            $("#pan_right_layer").text(000);

        }else if(data.pan > 0){

          let right_data = (data.pan)*100;
          $("#pan_left").text(0);
          $("#pan_right").text(right_data.toFixed(0));
          $("#pan_left_layer").text(0);
          $("#pan_right_layer").text(right_data.toFixed(0));

        }

    });

    PanFunc.center = function(){
        socket.emit('pan', {
            pan : 0,
        });
        document.getElementById('pan_dial').value=0;
        $("#pan_left").text(0);
        $("#pan_right").text(0);
        $("#pan_left_layer").text(0);
        $("#pan_right_layer").text(0);

    }



    //// panning system   /////
