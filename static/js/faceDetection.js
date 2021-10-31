let checkinButton =  document.querySelector("#masuk");
let checkinButtonCamera = document.querySelector("#camera-masuk");
let checkoutButton =  document.querySelector("#keluar")
let checkoutButtonCamera = document.querySelector("#camera-keluar");
let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");

function capture_frame(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream => {
        video.srcObject = stream
    })
    .catch(error => {
        console.error(error);
    });
};

checkinButtonCamera.addEventListener('click', function(){
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
            body: JSON.stringify({'image': image_data_url, 'name': 'checkin'})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        alertTemplate.alert(data.title, data.text, data.icon, data.button);
        if (data.status == "success"){
            let swalButton = document.getElementsByClassName("swal-button")[0];
            const mediaStream = video.srcObject;
            const tracks = mediaStream.getTracks();
            tracks[0].stop();

            swalButton.addEventListener("click", function() {
                document.getElementsByClassName("btn-presence")[0].click();
            });
            
        }
    })
});

checkoutButtonCamera.addEventListener('click', function(){
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
            body: JSON.stringify({'image': image_data_url, 'name': 'checkout'})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        alertTemplate.alert(data.title, data.text, data.icon, data.button);
        if (data.status == "success"){
            let swalButton = document.getElementsByClassName("swal-button")[0];
            const mediaStream = video.srcObject;
            const tracks = mediaStream.getTracks();
            tracks[0].stop();

            swalButton.addEventListener("click", function() {
                document.getElementsByClassName("btn-presence")[0].click();
            });
            
        }
    })
});