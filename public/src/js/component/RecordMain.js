////////////recorder//////////////

var recorder;

var gain_1 = drsax.createGain();
var gain_2 = drsax.createGain();



function startRecording() {
    gain8.connect(gain_1);
    gain_2.connect(gain9)
    recorder = new DSX.Record(gain_1, gain_2);
    recorder.record();
}

function stopRecording(button) {
    recorder.stop();
    createDownloadLink();
    recorder.clear();
}


var li;
var hf;

function createDownloadLink() {
    console.log('createDownload Fired!');
    //convert buffer to wav file
    recorder.exportWAV(function(root) {
        var url = URL.createObjectURL(root);
        li = document.createElement('li');
        var au = document.createElement('audio');
        hf = document.createElement('a');
        var list = document.getElementById("recordingslist");

        au.controls = true;
        au.src = URL.createObjectURL(root);
        hf.href = URL.createObjectURL(root);
        hf.download = new Date().getSeconds() + '.wav';
        hf.innerHTML = hf.download;
        li.appendChild(au);
        li.appendChild(hf);
        list.appendChild(li);
    });
};



function stop(button) {

    li.removeChild(li.childNodes[0]);
    hf.removeChild(hf.childNodes[0]);
}


//// recorder out   /////
