//// EQ SYSTEM    /////

var newEQ = new DSX.EQ({
    hiGain: -10,
    mhiGain: -10,
    miGain: -10,
    milowGain: -10,
    lowGain: -10
});
var sax_EQ1 = new DSX.valueChange("EQ5", newEQ.hiGain);
var sax_EQ2 = new DSX.valueChange("EQ4", newEQ.mhiGain);
var sax_EQ3 = new DSX.valueChange("EQ3", newEQ.miGain);
var sax_EQ4 = new DSX.valueChange("EQ2", newEQ.milowGain);
var sax_EQ5 = new DSX.valueChange("EQ1", newEQ.lowGain);
var eqTogle = new DSX.functionChange('eqbypass', eq);

function eq(e) {
    if (e.target.value == "1") {
        gain.disconnect(0);
        gain.connect(newEQ);
        newEQ.connect(gain2);
    }
    if (e.target.value == "0") {
        gain.disconnect(0);
        gain.connect(gain2);
    }

}

//EQ1

new DSX.functionChange("EQ1", function(e){

  var eqData_1 = (e.target.value *1).toFixed(0);
  $("#EQ1_1").text(eqData_1);

  socket.emit('eq', {
      eq_1 : eqData_1,
      eq_2 : newEQ.milowGain.value,
      eq_3 : newEQ.miGain.value,
      eq_4 : newEQ.mhiGain.value,
      eq_5 : newEQ.hiGain.value,
  });
});
socket.on('eq', function(data) {
    newEQ.lowGain = data.eq_1;
    $("#EQ1").val(data.eq_1);
    $("#EQ1_1").text(data.eq_1);
});

//EQ2

new DSX.functionChange("EQ2", function(e){

  var eqData_2 = (e.target.value *1).toFixed(0);
  $("#EQ2_2").text(eqData_2);
  socket.emit('eq', {
      eq_1 : newEQ.lowGain.value,
      eq_2 : eqData_2,
      eq_3 : newEQ.miGain.value,
      eq_4 : newEQ.mhiGain.value,
      eq_5 : newEQ.hiGain.value,
  });
});
socket.on('eq', function(data) {
    newEQ.milowGain = data.eq_2;
    $("#EQ2").val(data.eq_2);
    $("#EQ2_2").text(data.eq_2);
});






new DSX.functionChange("EQ3", function(e){

  var eqData_3 = (e.target.value *1).toFixed(0);
  $("#EQ3_3").text(eqData_3);
  socket.emit('eq', {
      eq_1 : newEQ.lowGain.value,
      eq_2 : newEQ.milowGain.value,
      eq_3 : eqData_3,
      eq_4 : newEQ.mhiGain.value,
      eq_5 : newEQ.hiGain.value,
  });
});
socket.on('eq', function(data) {
    newEQ.miGain = data.eq_3;
    $("#EQ3").val(data.eq_3);
    $("#EQ3_3").text(data.eq_3);
});






new DSX.functionChange("EQ4", function(e){

  var eqData_4 = (e.target.value *1).toFixed(0);
  $("#EQ4_4").text(eqData_4);
  socket.emit('eq', {
      eq_1 : newEQ.lowGain.value,
      eq_2 : newEQ.milowGain.value,
      eq_3 : newEQ.miGain.value,
      eq_4 : eqData_4,
      eq_5 : newEQ.hiGain.value,
  });
});
socket.on('eq', function(data) {
    newEQ.mhiGain = data.eq_4;
    $("#EQ4").val(data.eq_4);
    $("#EQ4_4").text(data.eq_4);
});

new DSX.functionChange("EQ5", function(e){

  var eqData_5 = (e.target.value *1).toFixed(0);
  $("#EQ5_5").text(eqData_5);
  socket.emit('eq', {
      eq_1 : newEQ.lowGain.value,
      eq_2 : newEQ.milowGain.value,
      eq_3 : newEQ.miGain.value,
      eq_4 : newEQ.mhiGain.value,
      eq_5 : eqData_5,
  });
});
socket.on('eq', function(data) {
    newEQ.hiGain = data.eq_5;
    $("#EQ5").val(data.eq_5);
    $("#EQ5_5").text(data.eq_5);
});

// preset select selectBox

$("#eq_preset").change(function(){

    console.log($(this).val());
    var dataSelect = $(this).val();
    switch (dataSelect) {
        case "1": //normal
        socket.emit('eq', {
            eq_1 : 0,
            eq_2 : 0,
            eq_3 : 0,
            eq_4 : 0,
            eq_5 : 0,
        });
        break;
        case "2": //voice
            socket.emit('eq', {
                eq_1 : -8,
                eq_2 : 0,
                eq_3 : 5,
                eq_4 : -2,
                eq_5 : -4,
            });
        break;
        case "3": //pop
            socket.emit('eq', {
                eq_1 : -5,
                eq_2 : 6,
                eq_3 : 10,
                eq_4 : 4,
                eq_5 : -6,
            });
        break;
        case "4": //dance
            socket.emit('eq', {
                eq_1 : 13,
                eq_2 : 0,
                eq_3 : 6,
                eq_4 : 8,
                eq_5 : 5,
            });

        break;
        case "5": // rock
            socket.emit('eq', {
                eq_1 : 12,
                eq_2 : 9,
                eq_3 : -5,
                eq_4 : 9,
                eq_5 : 11,
            });

        break;
        case "6": // memtal
            socket.emit('eq', {
                eq_1 : 9,
                eq_2 : 4,
                eq_3 : 15,
                eq_4 : 6,
                eq_5 : 2,
            });

        break;
        case "7": // classic
            socket.emit('eq', {
                eq_1 : 9,
                eq_2 : 7,
                eq_3 : -7,
                eq_4 : 8,
                eq_5 : 8,
            });

        break;
        default:
    }
});




//// EQ SYSTEM    /////
