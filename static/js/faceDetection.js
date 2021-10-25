let camera_button =  document.querySelector("#masuk")
let click_button = document.querySelector("#camera-masuk");
let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");

function capture_frame(table){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function (stream){
        video.srcObject = stream
    })
    .catch(function (error){
        console.log("Something went wrong");
    });
};

click_button.addEventListener('click', function(){
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');
    console.log(image_data_url);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/absen/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-csrf-token','fetch');
    xhr.send(JSON.stringify({
        image: image_data_url
    }));

    const mediaStream = video.srcObject;
    const tracks = mediaStream.getTracks();
    tracks[0].stop();


});