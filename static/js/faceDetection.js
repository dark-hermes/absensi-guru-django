let checkinButton =  document.querySelector("#masuk");
let checkinButtonCamera = document.querySelector("#camera-masuk");
let checkoutButton =  document.querySelector("#keluar")
let checkoutButtonCamera = document.querySelector("#camera-keluar");
let checkinVideo = document.querySelector("#video-masuk");
let checkinCanvas = document.querySelector("#canvas-masuk");
let checkoutVideo = document.querySelector("#video-keluar");
let checkoutCanvas = document.querySelector("#canvas-keluar");

function capture_frame(presenceType){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream => {
        eval(`${presenceType}Video.srcObject = stream`);
    })
    .catch(error => {
        console.error(error);
    });
};

checkinButtonCamera.addEventListener('click', function(){
    checkinCanvas.getContext("2d").drawImage(checkinVideo, 0, 0, checkinCanvas.width, checkinCanvas.height);
    let image_data_url = checkinCanvas.toDataURL();

    fetch('', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFTOKEN': 'fetch'
        },
            body: JSON.stringify({'image': image_data_url, 'name': 'checkin'})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        alertTemplate.alert(data.title, data.text, data.icon, data.button);
        if (data.status == "success"){
            let swalButton = document.getElementsByClassName("swal-button")[0];
            const mediaStream = checkinVideo.srcObject;
            const tracks = mediaStream.getTracks();
            tracks[0].stop();

            swalButton.addEventListener("click", function() {
                document.getElementsByClassName("btn-presence")[0].click();
            });
            
        }
    })
});

checkoutButtonCamera.addEventListener('click', function(){
    checkoutCanvas.getContext("2d").drawImage(checkoutVideo, 0, 0, checkoutCanvas.width, checkoutCanvas.height);
    let image_data_url = checkoutCanvas.toDataURL();

    fetch('', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFTOKEN': 'fetch'
        },
            body: JSON.stringify({'image': image_data_url, 'name': 'checkout'})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        alertTemplate.alert(data.title, data.text, data.icon, data.button);
        if (data.status == "success"){
            let swalButton = document.getElementsByClassName("swal-button")[0];
            const mediaStream = checkoutVideo.srcObject;
            const tracks = mediaStream.getTracks();
            tracks[0].stop();

            swalButton.addEventListener("click", function() {
                document.getElementsByClassName("btn-presence")[0].click();
            });
            
        }
    })
});