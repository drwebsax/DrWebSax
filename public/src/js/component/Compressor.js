//// Compressor SYSTEM    /////

var saxComp = new DSX.saxComp({
    threshold: -70,
    ratio: 12,
});

var sax_Comp1 = new DSX.valueChange("Comp1", saxComp.threshold);

var sax_Comp2 = new DSX.valueChange("Comp2", saxComp.reduction);


var sax_Comp3 = new DSX.valueChange("Comp3", saxComp.knee);
var sax_Comp4 = new DSX.valueChange("Comp4", saxComp.ratio);

var sax_Comp5 = new DSX.valueChange("Comp5", saxComp.attack);
var sax_Comp6 = new DSX.valueChange("Comp6", saxComp.release);

var compTogle = new DSX.functionChange('compbypass', comp);

function comp(e) {

    if (e.target.value == "1") {
        gain2.disconnect(0)
        gain2.connect(saxComp);
        saxComp.connect(gain3);
    }
    if (e.target.value == "0") {
        gain2.disconnect(0)
        gain2.connect(gain3);
    }
}

new DSX.functionChange("Comp1", function(e){
    $("#Comp1_text").text(e.target.value);
    socket.emit('comp', {
        threshold : e.target.value, // saxComp.threshold
        reduction : saxComp.reduction,
        knee : saxComp.knee.value,
        ratio : saxComp.ratio.value,
        attack : saxComp.attack.value,
        release : saxComp.release.value,
  });
});
socket.on('comp', function(data) {
    saxComp.threshold = data.threshold;
    $("#Comp1").val(data.threshold);
    $("#Comp1_text").text(data.threshold);
});




new DSX.functionChange("Comp2", function(e){
    $("#Comp2_text").text(e.target.value);

    socket.emit('comp', {
        threshold :  saxComp.threshold.value,
        reduction : e.target.value,
        knee : saxComp.knee.value,
        ratio : saxComp.ratio.value,
        attack : saxComp.attack.value,
        release : saxComp.release.value,
    });
});
socket.on('comp', function(data) {
    saxComp.reduction = data.reduction;
    $("#Comp2").val(data.reduction);
    $("#Comp2_text").text(data.reduction);
});



new DSX.functionChange("Comp3", function(e){
    $("#Comp3_text").text(e.target.value);

    socket.emit('comp', {
        threshold :  saxComp.threshold.value,
        reduction : saxComp.reduction,
        knee : e.target.value,
        ratio : saxComp.ratio.value,
        attack : saxComp.attack.value,
        release : saxComp.release.value,
  });
});
socket.on('comp', function(data) {
    saxComp.knee = data.knee;
    $("#Comp3").val(data.knee);
    $("#Comp3_text").text(data.knee);
});


new DSX.functionChange("Comp4", function(e){
    $("#Comp4_text").text(e.target.value);
    socket.emit('comp', {
        threshold :  saxComp.threshold.value,
        reduction : saxComp.reduction,
        knee : saxComp.knee.value,
        ratio : e.target.value,
        attack : saxComp.attack.value,
        release : saxComp.release.value,
  });
});
socket.on('comp', function(data) {
    saxComp.ratio = data.ratio;
    $("#Comp4").val(data.ratio);
    $("#Comp4_text").text(data.ratio);
});

new DSX.functionChange("Comp5", function(e){
    $("#Comp5_text").text(e.target.value);
    socket.emit('comp', {
        threshold :  saxComp.threshold.value,
        reduction : saxComp.reduction,
        knee : saxComp.knee.value,
        ratio : saxComp.ratio.value,
        attack : e.target.value,
        release : saxComp.release.value,
    });
});
socket.on('comp', function(data) {
    saxComp.attack = data.attack;
    $("#Comp5").val(data.attack);
    $("#Comp5_text").text(data.attack);
});




new DSX.functionChange("Comp6", function(e){
    $("#Comp6_text").text(e.target.value);
    socket.emit('comp', {
        threshold : saxComp.threshold.value,
        reduction : saxComp.reduction,
        knee : saxComp.knee.value,
        ratio : saxComp.ratio.value,
        attack : saxComp.attack.value,
        release : e.target.value,
    });
});
socket.on('comp', function(data) {
    saxComp.release = data.release;
    $("#Comp6").val(data.release);
    $("#Comp6_text").text(data.release);
});

// preset select selectBox

$("#comp_preset").change(function(){
    //console.log($(this).val());
    var dataSelect = $(this).val();
    switch (dataSelect) {
        case "1": //vocal
        socket.emit('comp', {
            threshold : -17,
            reduction : -10,
            knee : 0,
            ratio : 3.4,
            attack : 0.3,
            release : 0,
        });
        break;
        case "2": //brass
            socket.emit('comp', {
                threshold : -19,
                reduction : -5,
                knee : 0,
                ratio : 3,
                attack : 0.2,
                release : 0,
            });
        break;
        case "3": // guitar
            socket.emit('comp', {
                threshold : -24,
                reduction : -5,
                knee : 1,
                ratio : 5.2,
                attack : 0.6,
                release : 0.5,
            });
        break;
        case "4": //drum
            socket.emit('comp', {
                threshold : -27,
                reduction : -15,
                knee : 1,
                ratio : 3.3,
                attack : 0.7,
                release : 0.5,
            });

        break;
        case "5": // dance
            socket.emit('comp', {
                threshold : -24,
                reduction : -5,
                knee : 1,
                ratio : 2.7,
                attack : 0,
                release : 0.76,
            });
        break;
        default:
    }
});

//// Compressor SYSTEM    /////
