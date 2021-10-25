var path = window.location.pathname;
// var page = path.split("/").pop().replace('tampil', 'ajax');
// var suffix = page.split("_");
console.log(path)
// suffix = suffix[suffix.length - 1];

if (path == "/absen/"){
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    var successHandler = function(position){
        var lat = position.coords.latitude;
        var longi = position.coords.longitude;
        var date = new Date();
        date.setTime(date.getTime() + (15 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
        document.cookie = escape("latitude") + "=" + escape(lat) + expires + "; path=/";
        document.cookie = escape("longitude") + "=" + escape(longi) + expires + "; path=/";
        location.reload();
    }

    var errorHandler = function(errorObj){
        alert(errorObj.code + ": " + errorObj.message);
    }

    if (getCookie('latitude') == null){
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {enableHighAccuracy: true, maximumAge: 10000});
    }
    
}