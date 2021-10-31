let camera_button =  document.querySelector("#masuk")
let click_button = document.querySelector("#camera-masuk");
let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");

function capture_frame(table){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream => {
        video.srcObject = stream
    })
    .catch(error => {
        console.error(error);
    });
};

click_button.addEventListener('click', function(){
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL();
    console.log(image_data_url);

    fetch('', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFTOKEN': 'fetch'
        },
            body: JSON.stringify({'image': image_data_url})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        alertTemplate.alert(data.title, data.text, data.icon, data.button);
        if (data.status == "success"){
            const mediaStream = video.srcObject;
            const tracks = mediaStream.getTracks();
            tracks[0].stop();
        }
    })




});