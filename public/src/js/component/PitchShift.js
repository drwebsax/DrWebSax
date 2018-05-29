//////////////pitchShift//////////////

var shift_one = new DSX.pitchShift(0.7, 1.1);
var shift_two = new DSX.pitchShift(0.6, 0.8);
var am2 = new DSX.AM({
    mod_type: "sine",
    modfreq: 500,
    depth: 0.7,
    gain: 0.5
});
var am3 = new DSX.AM({
    mod_type: "sine",
    modfreq: 300,
    depth: 0.9,
    gain: 0.5
});


var shiftdelay_one = new DSX.DelayPipe({
    delayTime: 1.5
});
var shiftdelay_two = new DSX.DelayPipe({
    delayTime: 2.7
});
var shiftdelay_three = new DSX.DelayPipe({
    delayTime: 3.9
});
var shiftdelay_four = new DSX.DelayPipe({
    delayTime: 5
});

var bypassShift = new DSX.functionChange('shiftbypass', shiftdata);

function shiftdata(e) {

    if (e.target.value == "1") {
        gain4.disconnect(0);

        shift_one.get(gain4);
        shift_one.connect(shiftdelay_one);
        shiftdelay_one.connect(gain5);

        shift_two.get(gain4);
        shift_two.connect(shiftdelay_two);
        shiftdelay_two.connect(gain5);


        am2.get(gain4);
        am2.connect(shiftdelay_three);
        shiftdelay_three.connect(gain5);


        am3.get(gain4);
        am3.connect(shiftdelay_four);
        shiftdelay_four.connect(gain5);

    }
    if (e.target.value == "0") {
        gain4.disconnect(0);
        gain4.connect(gain5); //delay reconnect

    }

}
var shift_one_data_ = new DSX.valueChange("shift1", shiftdelay_one.delayTime);
var shift_two_data_ = new DSX.valueChange("shift2", shiftdelay_two.delayTime);
var shift_tree_data_ = new DSX.valueChange("shift3", shiftdelay_three.delayTime);
var shift_four_data_ = new DSX.valueChange("shift4", shiftdelay_four.delayTime);

new DSX.functionChange("shift1", function(e){
  $("#shift1_text").text(e.target.value);
  socket.emit('time', {
      one: e.target.value,
      two: shiftdelay_two.delayTime.value,
      three:shiftdelay_three.delayTime.value,
      four:shiftdelay_four.delayTime.value,
  });
});
new DSX.functionChange("shift2", function(e){
  $("#shift2_text").text(e.target.value);
  socket.emit('time', {
      one: shiftdelay_one.delayTime.value,
      two: e.target.value,
      three:shiftdelay_three.delayTime.value,
      four:shiftdelay_four.delayTime.value,
  });
});
new DSX.functionChange("shift3", function(e){
  $("#shift3_text").text(e.target.value);
  socket.emit('time', {
      one: shiftdelay_one.delayTime.value,
      two: shiftdelay_two.delayTime.value,
      three:e.target.value,
      four:shiftdelay_four.delayTime.value,
  });
});
new DSX.functionChange("shift4", function(e){
  $("#shift4_text").text(e.target.value);
  socket.emit('time', {
      one: shiftdelay_one.delayTime.value,
      two: shiftdelay_two.delayTime.value,
      three:shiftdelay_three.delayTime.value,
      four:e.target.value,
  });
});


socket.on('time', function(data) {

    shiftdelay_one.delayTime = data.one;
    shiftdelay_two.delayTime = data.two;
    shiftdelay_three.delayTime = data.three;
    shiftdelay_four.delayTime = data.four;


    $("#shift1").val(data.one);
    $("#shift2").val(data.two);
    $("#shift3").val(data.three);
    $("#shift4").val(data.four);

    $("#shift1_text").text(data.one);
    $("#shift2_text").text(data.two);
    $("#shift3_text").text(data.three);
    $("#shift4_text").text(data.four);
});


// preset select selectBox

$("#time_preset").change(function(){

    //console.log($(this).val());
    var timeSelect = $(this).val();
    switch (timeSelect) {
        case "1":
          socket.emit('time', {
              one: 1,
              two: 1,
              three:1,
              four:4,
          });
        break;
        case "2":
          socket.emit('time', {
              one: 0.3,
              two: 1.8,
              three:1,
              four:3.2,
          });

        break;
        case "3":
          socket.emit('time', {
              one: 0.8,
              two: 1,
              three:2.4,
              four:2,
          });

        break;
        case "4":
          socket.emit('time', {
              one: 0.2,
              two: 1,
              three:0.2,
              four:1,
          });
        break;
        default:
    }
});


////////////pitch shift ///////////////////////////////////////////////////////

var am = new DSX.AM({
    mod_type: "sine",
    modfreq: 200,
    depth: 0.5,
    gain: 0.7
});

var sax_am2 = new DSX.valueChange("am2", am.modfreq);
var sax_am3 = new DSX.valueChange("am3", am.depth);
var sax_am4 = new DSX.valueChange("am4", am.gain);

var bypassAm = new DSX.functionChange('shiftAm', shiftAmdata);
function shiftAmdata(e) {

    if (e.target.value == "1") {
        gain8.disconnect();
        am.get(gain8);
        am.connect(gain9);

    }
    if (e.target.value == "0") {
        gain8.connect(gain9);
        am.stop();
    }
}
new DSX.functionChange("am2", function(e){

  $("#am2_text").text(e.target.value);

  socket.emit('pitch', {
      modfreq : e.target.value,
      depth: am.depth.value,
      gain:am.gain.value,
  });
});
new DSX.functionChange("am3", function(e){

  $("#am3_text").text(e.target.value);
  socket.emit('pitch', {
      modfreq : am.modfreq.value,
      depth: e.target.value,
      gain:am.gain.value,
  });
});
new DSX.functionChange("am4", function(e){

  $("#am4_text").text(e.target.value);
  socket.emit('pitch', {
      modfreq : am.modfreq.value,
      depth: am.depth.value,
      gain:e.target.value,
  });
});
socket.on('pitch', function(data) {

    am.modfreq = data.modfreq;
    am.depth = data.depth;
    am.gain = data.gain;

    $("#am2").val(data.modfreq);
    $("#am3").val(data.depth);
    $("#am4").val(data.gain);

    $("#am2_text").text(data.modfreq);
    $("#am3_text").text(data.depth);
    $("#am4_text").text(data.gain);


});

// preset select selectBox

$("#pitch_preset").change(function(){

    //console.log($(this).val());
    var pitchSelect = $(this).val();
    switch (pitchSelect) {
        case "1":
          socket.emit('pitch', {
              modfreq : 600,
              depth: 0.8,
              gain:0.5,
          });
        break;
        case "2":
          socket.emit('pitch', {
              modfreq : 3000,
              depth:0.9,
              gain:0.5,
          });

        break;
        case "3":
          socket.emit('pitch', {
              modfreq :4000,
              depth: 0.3,
              gain:0.5,
          });

        break;
        case "4":
          socket.emit('pitch', {
              modfreq : 7000,
              depth: 0.9,
              gain:0.5,
          });

        break;
        default:
    }
});
