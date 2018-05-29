var socket = io();

//send





















//recevie




var SELECT_DATA ="";
socket.on('selecter', function(data) {
    SELECT_DATA = data.selectdata;
});

socket.on('mainOsc1', function(data) {


    let dataTop = 0;
    let dataLeft = 0;
    let dataRight = 0;

    if ( SELECT_DATA !== "off" ){

        dataTop = data.top;
        dataLeft = data.left;
        dataRight = data.right;

        $("#top_val").html(dataTop);
        $("#left_val").html(dataLeft);
        $("#right_val").html(dataRight);

    }

    switch (SELECT_DATA) {

        case 'pitch':

        $("#drwebx_onoff").html("Effect : pitch");


        am.modfreq.value  = dataLeft * 200;
        am.depth = dataTop * 0.1;
        am.gain = dataRight  * 0.01;

            break;
        case 'time':

        shiftdelay_one.delayTime = dataTop * 0.1 ;
        shiftdelay_two.delayTime =  dataLeft * 0.2 ;
        shiftdelay_tree.delayTime = dataRight * 0.3 ;
        shiftdelay_four.delayTime =  dataRight * 0.4 ;


        $("#drwebx_onoff").html("Effect : time");
            break;
        case 'delay':


            let delayTime = data.top * 3;
            if ( delayTime < 0.1 ) {
               delayTime = 0.1;
            }
            saxDelay.delayTime = delayTime;


            let newdata = data.right / 67
            newdata = newdata.toFixed(1);

            if ( newdata < 0.1 ) {
                newdata = 0.1;
            }
            if ( newdata > 0.9 ) {

                newdata = 0.9;
            }
            saxDelay.feedback = newdata;


            $("#drwebx_onoff").html("Effect : delay");

            break;

        default:

    }

 });
