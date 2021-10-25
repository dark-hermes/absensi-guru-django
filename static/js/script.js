var serverClock = jQuery("#jamServer");
if (serverClock.length > 0) {
    showServerTime(serverClock, serverClock.text());
}

function showServerTime(obj, time) {
    var parts   = time.split(":"),
        newTime = new Date();

    newTime.setHours(parseInt(parts[0], 10));
    newTime.setMinutes(parseInt(parts[1], 10));
    newTime.setSeconds(parseInt(parts[2], 10));

    var timeDifference  = new Date().getTime() - newTime.getTime();

    var methods = { 
        displayTime: function () {
            var now = new Date(new Date().getTime() - timeDifference);
            obj.text([
                methods.leadZeros(now.getHours(), 2),
                methods.leadZeros(now.getMinutes(), 2),
                methods.leadZeros(now.getSeconds(), 2)
            ].join(":"));
            setTimeout(methods.displayTime, 500);
        },

        leadZeros: function (time, width) {
            while (String(time).length < width) {
                time = "0" + time;
            }
            return time;
        }
    }
    methods.displayTime();
}


var checked = $('input[type=radio]:checked')
$('input[type=radio]')
    .click(function() {
    checked.filter(':not(:checked)').trigger('deselect');
    checked = $('input[type=radio]:checked')
})


document.getElementById('inlineRadio4').addEventListener('click', function() {
    document.getElementById('text').removeAttribute("disabled");
});

$('#inlineRadio4').bind('deselect', function () {
    document.getElementById('text').setAttribute("disabled","");
})  

document.getElementById('inlineRadio8').addEventListener('click', function() {
    document.getElementById('text2').removeAttribute("disabled");
});

$('#inlineRadio8').bind('deselect', function () {
    document.getElementById('text2').setAttribute("disabled","");
});
