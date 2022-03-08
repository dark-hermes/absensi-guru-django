let baseUrl = 'https://absen.smkn1cibinong.sch.id/';
// let baseUrl = 'https://localhost:8000/';


let img = $("img");
for (let i = 0; i < img.length; i++) {
    img[i].setAttribute("loading", "lazy")
}

function inputCheck() { // For laporan pengembangan page
    var checked = $('input[type=radio]:checked')
    $('input[type=radio]')
        .click(function () {
            checked.filter(':not(:checked)').trigger('deselect');
            checked = $('input[type=radio]:checked')
        })


    document.getElementById('inlineRadio4').addEventListener('click', function () {
        document.getElementById('text').removeAttribute("disabled");
    });

    $('#inlineRadio4').bind('deselect', function () {
        document.getElementById('text').setAttribute("disabled", "");
    })

    document.getElementById('inlineRadio8').addEventListener('click', function () {
        document.getElementById('text2').removeAttribute("disabled");
    });

    $('#inlineRadio8').bind('deselect', function () {
        document.getElementById('text2').setAttribute("disabled", "");
    });
}


function responsiveSlider() { // for Absen Page
    width = screen.width;
    height = screen.height;
    slider = document.getElementsByClassName("slider");

    (function ($) {
        let $window = $(window)

        function resize() {
            if ($window.width() >= 300 && $window.width() <= 760) {
                for (let i = 0; i < slider.length; i++) {
                    slider[i].classList.add("carousel-item")
                }

                slider[0].parentElement.parentElement.classList.add("mobile")
                slider[0].parentElement.parentElement.classList.remove("dekstop")
            } else {
                for (let i = 0; i < slider.length; i++) {
                    slider[i].classList.remove("carousel-item")
                }

                slider[0].parentElement.parentElement.classList.remove("mobile")
                slider[0].parentElement.parentElement.classList.add("dekstop")
            }
        }
        $window.resize(resize).trigger('resize');
    })(jQuery);
}



alertTemplate = {

    alert(title, text, icon, button) {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: button,
        });
    },


    confirm() {
        swal({
                title: "Anda Yakin?",
                text: "Sekali dihapus anda tidak bisa mengembalikanya lagi",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })

            .then((willDelete) => {
                if (willDelete) {
                    swal({
                        title: "Item dihapus",
                        icon: "success",
                        button: "Tulisan button",
                    });
                } else {
                    swal({
                        title: "Item tidak jadi dihapus",
                        icon: "info",
                        button: "Tulisan button",
                    });
                }
            });
    }
}
