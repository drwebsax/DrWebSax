//////////////Tape BG/////////

fileFunc= {};

var playing = new DSX.musicPlayer();
playing.load("mF", "sound11");
sound11.volume = 0.01;

// sound11r.play();


fileFunc.defalut = function () {
    sound11.playbackRate = 1;
    sound11.volume = 0.3;
    $("#file-volume").text(0.3);
    $("#file_gain").val(0.3);
    $("#speed-volume").text(1);
    $("#file_speed").val(1);
};


new DSX.functionChange("file_gain", function(e){
    sound11.volume = e.target.value;
    var micData= (e.target.value * 100).toFixed(0);
    $("#file-volume").text(micData);
    // network main
    socket.emit('audioFile', {
        vol : e.target.value,
        speed: sound11.playbackRate,
    });
});
socket.on('audioFile', function(data) {
    var newData= (data.vol * 100).toFixed(0);
    sound11.volume = data.vol;
    $("#file_gain").val(data.vol);
    $("#file-volume").text(newData);
});





new DSX.functionChange("file_speed", function(e){
    sound11.playbackRate = e.target.value;
    //var micData= (e.target.value * 100).toFixed(0);
    $("#speed-volume").text(e.target.value);
    socket.emit('audioFile', {
        vol : sound11.volume,
        speed: e.target.value,
    });
});
socket.on('audioFile', function(data) {
    sound11.playbackRate = data.speed;
    $("#file_speed").val(data.speed);
    $("#speed-volume").text(data.speed);

});
