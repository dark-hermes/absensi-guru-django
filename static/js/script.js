// let baseUrl = 'https://absen.smkn1cibinong.sch.id/';
let baseUrl = "https://localhost:8000/";

// Lazy Load
let img = $("img");
for (let i = 0; i < img.length; i++) {
	img[i].setAttribute("loading", "lazy");
}

// For Input laporan pengembangan page
function inputCheck() {
	var checked = $("input[type=radio]:checked");
	$("input[type=radio]").click(function () {
		checked.filter(":not(:checked)").trigger("deselect");
		checked = $("input[type=radio]:checked");
	});

	document.getElementById("inlineRadio4").addEventListener("click", function () {
		document.getElementById("text").removeAttribute("disabled");
	});

	$("#inlineRadio4").bind("deselect", function () {
		document.getElementById("text").setAttribute("disabled", "");
	});

	document.getElementById("inlineRadio8").addEventListener("click", function () {
		document.getElementById("text2").removeAttribute("disabled");
	});

	$("#inlineRadio8").bind("deselect", function () {
		document.getElementById("text2").setAttribute("disabled", "");
	});
}

// for Slider Absen Page
function responsiveSlider() {
	width = screen.width;
	height = screen.height;
	slider = document.getElementsByClassName("slider");

	(function ($) {
		let $window = $(window);

		function resize() {
			if ($window.width() >= 300 && $window.width() <= 760) {
				for (let i = 0; i < slider.length; i++) {
					slider[i].classList.add("carousel-item");
				}

				slider[0].parentElement.parentElement.classList.add("mobile");
				slider[0].parentElement.parentElement.classList.remove("dekstop");
			} else {
				for (let i = 0; i < slider.length; i++) {
					slider[i].classList.remove("carousel-item");
				}

				slider[0].parentElement.parentElement.classList.remove("mobile");
				slider[0].parentElement.parentElement.classList.add("dekstop");
			}
		}
		$window.resize(resize).trigger("resize");
	})(jQuery);
}

// Alert
alertTemplate = {
	alert(title, text, icon, button) {
		swal({
			title: title,
			text: text,
			icon: icon,
			button: button,
		});
	},
};

// Show Password
function showPassword() {
	const seePassword = document.getElementById("password");
	seePassword.addEventListener("click", function () {
		const inputPassword = this.previousElementSibling;
		if (inputPassword.type == "password") {
			inputPassword.type = "text";
			seePassword.classList.remove("bi-eye-slash-fill")
			seePassword.classList.add("bi-eye-fill");
		} else {
			inputPassword.type = "password";
			seePassword.classList.remove("bi-eye-fill");
			seePassword.classList.add("bi-eye-slash-fill");
		}
	});
}
