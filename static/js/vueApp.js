function absen() {
    var app = new Vue({
        el: '#absen',
        delimiters: ['[[', ']]'],
        data: {
            dataHariKerja: '',
            dataMasuk: '',
            dataKeluar: '',
        },

        created() {
            let urlMasuk = baseUrl + 'api/presence/checkin/';
            let urlKeluar = baseUrl + 'api/presence/checkout/';
            let urlKerja = baseUrl + 'api/presence/days/';

            // Check Work Day
            fetch(urlKerja)
                .then(response => response.json())
                .then(data => {
                    this.dataHariKerja = data;

                    $.each(data, function (index, value) {
                        for (let key in value) {
                            if (value.hasOwnProperty(key)) {
                                if (value[key] === false) {
                                    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                                    let day = new Date();
                                    let dayName = days[day.getDay()];

                                    // If dayoff
                                    if (key == dayName) {
                                        $("#masuk").attr("disabled", "")
                                        $("#keluar").attr("disabled", "")
                                        $("#izin").attr("disabled", "")
                                        $(".message").html("Anda sedang libur, selamat menikmati hari libur anda")
                                    }
                                    
                                    // If weekend
                                    else if (dayName == 'sunday' && dayName == 'saturday') {
                                        $("#masuk").attr("disabled", "")
                                        $("#keluar").attr("disabled", "")
                                        $(".message").html("Selamat menikmati akhir pekan anda")
                                    }

                                }
                            }
                        }
                    });
                });

            // If out of Distance
            distance = parseInt($('.presence-desc').attr('distance'));
            distanceMessage = $(".presence-desc").attr("dist-message");

            console.log(typeof(distance))

            if (distance > 1000) {
                $('#keluar').attr("disabled", "");
                $('#masuk').attr("disabled", "");
                $(".message").html(distanceMessage);
            }

            else {
                checkinStatus = '';
                checkoutStatus = '';

                let promise = new Promise (function (resolve, reject){
                    // if checkin
                    fetch(urlMasuk)
                        .then(response => response.json())
                        .then(data => {
                            this.dataMasuk = data;

                            $.each(data, function (index, value) {
                                checkinStatus = value.is_checked

                                if (value.is_checked == true) {
                                    $("#masuk").attr("disabled", "")
                                    $('#izin').attr("disabled", "")
                                } else { // If not checkin
                                    $("#keluar").attr("disabled", "")
                                    $(".message").html("Silahkan presensi masuk hari ini")
                                }
                            });
                        })
                        .then(
                            // if checkout    
                            fetch(urlKeluar)
                            .then(response => response.json())
                            .then(data => {
                                this.dataKeluar = data;

                                $.each(data, function (index, value) {
                                    checkoutStatus = value.is_checked

                                    if (value.is_checked == true) {
                                        $("#keluar").attr("disabled", "")
                                    }
                                    // If not checkout and done checkin  
                                    else if(checkinStatus == true) { 
                                        $(".message").html("Silahkan presensi keluar hari ini")
                                    }
                                });

                                resolve("OK")
                            })
                        )
                })

                promise.then (
                    function(value){
                        // If checkin and checkout 
                        if (checkinStatus == true && checkoutStatus == true) {
                            $("#izin").attr("disabled", "")
                            $("#masuk").attr("disabled", "")
                            $("#keluar").attr("disabled", "")
                            $(".message").html("Anda sudah melakukan presensi hari ini")
                        }
                    }
                )
            }            
        },

        methods: {
            message: function (event) {
                $('#staticBackdropLabel1').innerHTML = "tunggu beberapa <span>detik</span>";
                $('#staticBackdropLabel3').innerHTML = "tunggu beberapa <span>detik</span>";
            }
        }

    });
}


function showDataAbsen() {
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataAbsen: '',
        },

        created() {
            let url = baseUrl + 'api/showabsen/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataAbsen = data;

                    // Split data date
                    $.each(data, function (index, value) {
                        splitDate = (new Date(value.presence_date));
                        month = splitDate.getMonth() + 1;
                        year = splitDate.getFullYear();
                        date = splitDate.getDate();
                        day = splitDate.getDay();

                        dateCreated = year + '-' + month + '-' + date + '-' + day;

                        value.presence_date = dateCreated
                    });
                });
        },
    });
};



function studyReport() {
    var app = new Vue({
        el: '#mapel-form',
        delimiters: ['[[', ']]'],
        data: {
            dataKelas: '',
            dataMapel: '',
            resetData: '',
            loading: false,
        },

        async created() {
            let url = baseUrl + 'api/subjects/';
            this.loading = true

            try {
                const res = await fetch(url)
                this.dataKelas = await res.json()
                this.loading = false
                $('.load').removeClass('load')
                $('.loading').removeClass('loading')
            } catch (error) {
                console.log(error)
                this.loading = false
            }

            $('.submit').click(function () {
                checked = $(".form-check-input:checked").length;

                if (!checked) {
                    alertTemplate.alert("Error", "Harap pilih salah satu pilihan pada Media Pembelajaran", "error", "Tutup")
                    return false;
                }

            });
        },

        // filter mapel
        methods: {
            onChangeClass(event) {
                $("#jenis-mapel").removeAttr("disabled");

                let selValue = $("#id_class_name").val();
                let s = $("#jenis-mapel").val();
                let mapelKelas = this.dataKelas.filter(x => x.class_name.id == selValue);
                this.resetData = mapelKelas

                if (s == 2) {
                    this.dataMapel = this.resetData
                    let produktif = this.dataMapel.filter(x => x.category.id == 2);
                    this.dataMapel = produktif;
                } else if (s == 1) {
                    this.dataMapel = this.resetData
                    let mapelWajib = this.dataMapel.filter(x => x.category.id == 1);
                    this.dataMapel = mapelWajib;
                }
            },

            onChange(event) {
                $("#select-mapel").removeAttr("disabled");
                value = event.target.value;

                if (value == 2) {
                    this.dataMapel = this.resetData
                    let produktif = this.dataMapel.filter(x => x.category.id == 2);
                    this.dataMapel = produktif;
                } else if (value == 1) {
                    this.dataMapel = this.resetData
                    let mapelWajib = this.dataMapel.filter(x => x.category.id == 1);
                    this.dataMapel = mapelWajib;
                }

            }
        },
    });
};

















function showStudyReport() {
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataBelajar: '',
            dataTemp: '',

        },

        created() {
            let url = baseUrl + 'api/laporan/belajar/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataBelajar = data;
                    this.dataTemp = data;

                    $.each(data, function (index, value) {
                        splitDate = (new Date(value.created_at));
                        month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                        year = splitDate.getFullYear();
                        hour = splitDate.getHours();
                        minute = splitDate.getMinutes();
                        day = splitDate.getDate().toString().padStart(2, "0");
                        timeStamp = splitDate.getTime();

                        dateCreated = year + '-' + month + '-' + day;
                        hourCreated = hour + ':' + minute;

                        filterDate = new Date()
                        filterDay = filterDate.getDate().toString().padStart(2, "0");
                        filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                        filterYear = filterDate.getFullYear();

                        thisToday = `${year}${month}${day}`
                        thisMonth = `${month}${year}`
                        thisYear = `${year}`

                        filterToday = `${filterYear}${filterMonth}${filterDay}`
                        filterMonth = `${filterMonth}${filterYear}`

                        value.created_at = dateCreated
                        value.hours = hourCreated
                        value.descSort = value.desc
                        value.thisToday = thisToday
                        value.thisMonth = thisMonth
                        value.thisYear = thisYear
                        value.class_name = value.class_name.class_name
                        value.subject_name = value.subject_name.subject_name

                        if (value.desc.length > 60) {
                            value.descSort = value.desc.substring(0, 60) + '...';
                        }
                    });
                });
        },

        methods: {
            filterToday: function (event) {
                this.dataBelajar = this.dataTemp;
                let filtered = this.dataBelajar.filter(x => x.thisToday == filterToday)
                this.dataBelajar = filtered
            },

            filterThisMonth: function (event) {
                this.dataBelajar = this.dataTemp;
                let filtered = this.dataBelajar.filter(x => x.thisMonth == filterMonth)
                this.dataBelajar = filtered
            },

            filterThisYear: function (event) {
                event.preventDefault()
                this.dataBelajar = this.dataTemp;
                let filtered = this.dataBelajar.filter(x => x.thisYear == filterYear);
                this.dataBelajar = filtered
            },

            filterCostum: function (event) {
                event.preventDefault()
                this.dataBelajar = this.dataTemp;
                fromDate = $("#from-date").val().split("-").join("")
                toDate = $("#to-date").val().split("-").join("")
                let filtered = this.dataBelajar.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);
                this.dataBelajar = filtered
            },

            exportPdf() {
                pdf(
                    this.dataBelajar,

                    [
                        {title: "Tanggal", dataKey: "created_at"},
                        {title: "Jam", dataKey: "hours"},
                        {title: "Kelas", dataKey: "class_name"},
                        {title: "Mata Pelajaran", dataKey: "subject_name"},
                        {title: "Total Murid", dataKey: "total_student"},
                        {title: "Murid Hadir", dataKey: "presence_student"},
                        {title: "Murid Tidak Hadir", dataKey: "absence_student"},
                        {title: "Metode Pembelajaran", dataKey: "method"},
                        {title: "Deskripsi", dataKey: "desc"},
                    ],

                    {
                    total_student: {cellWidth: 20},
                    presence_student: { cellWidth: 20},
                    absence_student: {cellWidth: 20},
                    method: {cellWidth: 50},
                    subject_name: {cellWidth: 50},
                    desc: {cellWidth: 50},
                    },

                    "Belajar",
                    "Landscape",
                    "pdf-header-landscape.png"
                )
            },

            exportExcels() {
                let dataExcel = []

                $.each(this.dataBelajar, function (index, value) {
                    raw = {
                        date: value.created_at,
                        hours: value.hours,
                        className: value.class_name,
                        subjectName: value.subject_name,
                        totalStudent: value.total_student,
                        presenceStudent: value.presence_student,
                        absenceStudent: value.absence_student,
                        method: value.method,
                        desc: value.desc
                    }

                    dataExcel.push(raw)
                })

                excel(
                    dataExcel,

                    ['Tanggal', 'Jam Lapor', 'Kelas KBM', 'Mata Ajar', 'Jumlah Siswa', 'Jumlah Siswa Hadir', 'Jumlah Siswa Tidak Hadir', 'Media Pembelajaran', 'Keterangan'],

                    "Belajar"
                )
            },
        }
    });
}

function showGuidanceReport() {
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataBimbingan: '',
            dataTemp: '',
        },

        created() {
            let url = baseUrl + 'api/laporan/bimbingan/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataBimbingan = data;
                    this.dataTemp = data;

                    $.each(data, function (index, value) {
                        splitDate = (new Date(value.created_at));
                        month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                        year = splitDate.getFullYear();
                        hour = splitDate.getHours();
                        minute = splitDate.getMinutes();
                        day = splitDate.getDate().toString().padStart(2, "0");
                        timeStamp = splitDate.getTime();

                        dateCreated = year + '-' + month + '-' + day;
                        hourCreated = hour + ':' + minute;

                        filterDate = new Date()
                        filterDay = filterDate.getDate().toString().padStart(2, "0");
                        filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                        filterYear = filterDate.getFullYear();

                        thisToday = `${year}${month}${day}`
                        thisMonth = `${month}${year}`
                        thisYear = `${year}`

                        filterToday = `${filterYear}${filterMonth}${filterDay}`
                        filterMonth = `${filterMonth}${filterYear}`

                        value.created_at = dateCreated
                        value.hours = hourCreated
                        value.descSort = value.desc
                        value.thisToday = thisToday
                        value.thisMonth = thisMonth
                        value.thisYear = thisYear

                        if (value.desc.length > 60) {
                            value.descSort = value.desc.substring(0, 60) + '...';
                        }
                    });
                });
        },

        methods: {
            filterToday: function (event) {
                event.preventDefault()
                this.dataBimbingan = this.dataTemp;
                let filtered = this.dataBimbingan.filter(x => x.thisToday == filterToday);
                this.dataBimbingan = filtered
            },

            filterThisMonth: function (event) {
                event.preventDefault()
                this.dataBimbingan = this.dataTemp;
                let filtered = this.dataBimbingan.filter(x => x.thisMonth == filterMonth);
                this.dataBimbingan = filtered
            },

            filterThisYear: function (event) {
                event.preventDefault()
                this.dataBimbingan = this.dataTemp;
                let filtered = this.dataBimbingan.filter(x => x.thisYear == filterYear);
                this.dataBimbingan = filtered
            },

            filterCostum: function (event) {
                event.preventDefault()
                this.dataBimbingan = this.dataTemp;
                fromDate = $("#from-date").val().split("-").join("")
                toDate = $("#to-date").val().split("-").join("")

                console.log(fromDate)
                console.log(toDate)

                let filtered = this.dataBimbingan.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);
                this.dataBimbingan = filtered
            },

            exportPdf() {
                pdf(
                    this.dataBimbingan,

                    [
                        {title: "Tanggal", dataKey: "created_at"},
                        {title: "Deskripsi", dataKey: "desc"},
                    ],

                    {
                    created_at:{cellWidth: 50},
                    },

                    "Bimbingan",
                    "portrait",
                    "pdf-header-potrait.png"
                )
            },
            exportExcels() {
                let dataExcel = []

                $.each(this.dataBimbingan, function (index, value) {
                    raw = {
                        date: value.created_at,
                        desc: value.desc
                    }

                    dataExcel.push(raw)
                })

                excel(
                    dataExcel,
                    ['Tanggal', 'Laporan'],
                    "bimbingan"
                )
            },
        }
    });
}


function showDutyReport() {
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataTugas: '',
            dataTemp: '',
        },

        created() {
            let url = baseUrl + 'api/laporan/tugas-lainnya/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataTugas = data;

                    this.dataTemp = data;

                    $.each(data, function (index, value) {
                        splitDate = (new Date(value.created_at));
                        month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                        year = splitDate.getFullYear();
                        hour = splitDate.getHours();
                        minute = splitDate.getMinutes();
                        day = splitDate.getDate().toString().padStart(2, "0");
                        timeStamp = splitDate.getTime();

                        dateCreated = year + '-' + month + '-' + day;
                        hourCreated = hour + ':' + minute;

                        filterDate = new Date()
                        filterDay = filterDate.getDate().toString().padStart(2, "0");
                        filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                        filterYear = filterDate.getFullYear();

                        thisToday = `${year}${month}${day}`
                        thisMonth = `${month}${year}`
                        thisYear = `${year}`

                        filterToday = `${filterYear}${filterMonth}${filterDay}`
                        filterMonth = `${filterMonth}${filterYear}`

                        value.created_at = dateCreated
                        value.hours = hourCreated
                        value.descSort = value.desc
                        value.thisToday = thisToday
                        value.thisMonth = thisMonth
                        value.thisYear = thisYear
                        value.roleName = value.role.role_name

                        if (value.desc.length > 60) {
                            value.descSort = value.desc.substring(0, 60) + '...';
                        }
                    });
                });
        },

        methods: {
            filterToday: function (event) {
                event.preventDefault()
                this.dataTugas = this.dataTemp;
                let filtered = this.dataTugas.filter(x => x.thisToday == filterToday);
                this.dataTugas = filtered
            },

            filterThisMonth: function (event) {
                event.preventDefault()
                this.dataTugas = this.dataTemp;
                let filtered = this.dataTugas.filter(x => x.thisMonth == filterMonth);
                this.dataTugas = filtered
            },

            filterThisYear: function (event) {
                event.preventDefault()
                this.dataTugas = this.dataTemp;
                let filtered = this.dataTugas.filter(x => x.thisYear == filterYear);
                this.dataTugas = filtered
            },

            filterCostum: function (event) {
                event.preventDefault()
                this.dataTugas = this.dataTemp;
                fromDate = $("#from-date").val().split("-").join("")
                toDate = $("#to-date").val().split("-").join("")

                console.log(fromDate)
                console.log(toDate)

                let filtered = this.dataTugas.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);
                this.dataTugas = filtered
            },

            exportPdf() {
                pdf(
                    this.dataTugas,

                    [
                        {title: "Tanggal", dataKey: "created_at"},
                        {title: "Posisi", dataKey: "roleName"},
                        {title: "Deskripsi", dataKey: "desc"},
                    ],

                    {
                        created_at:{cellWidth: 50},
                        roleName:{cellWidth: 50},
                    },

                    "Tugas",
                    "portrait",
                    "pdf-header-potrait.png"
                )
            },

            exportExcels() {
                let dataExcel = []

                $.each(this.dataTugas, function (index, value) {
                    raw = {
                        date: value.created_at,
                        position: value.role.role_name,
                        desc: value.desc
                    }

                    dataExcel.push(raw)
                })

                excel(
                    dataExcel,
                    ['Tanggal', 'Posisi Kerja', 'Laporan'],
                    "Tugas"
                )
            },
        }
    });
}


function showDevelopmentReport() {
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataPengembangan: '',
            dataTemp: '',
        },

        created() {
            let url = baseUrl + 'api/laporan/pengembangan/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataPengembangan = data;
                    this.dataTemp = data;

                    $.each(data, function (index, value) {
                        splitDate = (new Date(value.created_at));
                        month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                        year = splitDate.getFullYear();
                        hour = splitDate.getHours();
                        minute = splitDate.getMinutes();
                        day = splitDate.getDate().toString().padStart(2, "0");
                        timeStamp = splitDate.getTime();

                        dateCreated = year + '-' + month + '-' + day;
                        hourCreated = hour + ':' + minute;

                        filterDate = new Date()
                        filterDay = filterDate.getDate().toString().padStart(2, "0");
                        filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                        filterYear = filterDate.getFullYear();

                        thisToday = `${year}${month}${day}`
                        thisMonth = `${month}${year}`
                        thisYear = `${year}`

                        filterToday = `${filterYear}${filterMonth}${filterDay}`
                        filterMonth = `${filterMonth}${filterYear}`

                        value.created_at = dateCreated
                        value.hours = hourCreated
                        value.descSort = value.desc
                        value.thisToday = thisToday
                        value.thisMonth = thisMonth
                        value.thisYear = thisYear

                        if (value.desc.length > 60) {
                            value.descSort = value.desc.substring(0, 60) + '...';
                        }
                    });
                });
        },

        methods: {
            filterToday: function (event) {
                event.preventDefault()
                this.dataPengembangan = this.dataTemp;
                let filtered = this.dataPengembangan.filter(x => x.thisToday == filterToday);
                this.dataPengembangan = filtered
            },

            filterThisMonth: function (event) {
                event.preventDefault()
                this.dataPengembangan = this.dataTemp;
                let filtered = this.dataPengembangan.filter(x => x.thisMonth == filterMonth);
                this.dataPengembangan = filtered
            },

            filterThisYear: function (event) {
                event.preventDefault()
                this.dataPengembangan = this.dataTemp;
                let filtered = this.dataPengembangan.filter(x => x.thisYear == filterYear);
                this.dataPengembangan = filtered
            },

            filterCostum: function (event) {
                event.preventDefault()
                this.dataPengembangan = this.dataTemp;
                fromDate = $("#from-date").val().split("-").join("")
                toDate = $("#to-date").val().split("-").join("")

                console.log(fromDate)
                console.log(toDate)

                let filtered = this.dataPengembangan.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);
                this.dataPengembangan = filtered
            },
            exportPdf() {
                pdf(
                    this.dataPengembangan,

                    [
                        {title: "Tanggal", dataKey: "created_at"},
                        {title: "Kegiatan", dataKey: "category"},
                        {title: "Peran", dataKey: "role"},
                        {title: "Durasi", dataKey: "duration"},
                        {title: "Deskripsi", dataKey: "desc"},
                    ],

                    {
                        created_at:{cellWidth: 30},
                    },

                    "Pengembangan",
                    "portrait",
                    "pdf-header-potrait.png"
                )
            },

            exportExcels() {
                let dataExcel = []

                $.each(this.dataPengembangan, function (index, value) {
                    raw = {
                        date: value.created_at,
                        category: value.category,
                        role: value.role,
                        duration: value.duration,
                        desc: value.desc
                    }

                    dataExcel.push(raw)
                })

                excel(
                    dataExcel,
                    ['Tanggal', 'Kegiatan', 'Peran', 'Jumlah Jam', 'Laporan'],
                    "Pengembangan"
                )
            },
        }
    });
}


function showScientificReport() {
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataIlmiah: '',
            dataTemp: ','
        },

        created() {
            let url = baseUrl + 'api/laporan/karya-ilmiah/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataIlmiah = data;

                    this.dataTemp = data;

                    $.each(data, function (index, value) {
                        splitDate = (new Date(value.created_at));
                        month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                        year = splitDate.getFullYear();
                        hour = splitDate.getHours();
                        minute = splitDate.getMinutes();
                        day = splitDate.getDate().toString().padStart(2, "0");
                        timeStamp = splitDate.getTime();

                        dateCreated = year + '-' + month + '-' + day;
                        hourCreated = hour + ':' + minute;

                        filterDate = new Date()
                        filterDay = filterDate.getDate().toString().padStart(2, "0");
                        filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                        filterYear = filterDate.getFullYear();

                        thisToday = `${year}${month}${day}`
                        thisMonth = `${month}${year}`
                        thisYear = `${year}`

                        filterToday = `${filterYear}${filterMonth}${filterDay}`
                        filterMonth = `${filterMonth}${filterYear}`

                        value.created_at = dateCreated
                        value.hours = hourCreated
                        value.descSort = value.desc
                        value.thisToday = thisToday
                        value.thisMonth = thisMonth
                        value.thisYear = thisYear
                        value.categoryName = value.category.category_name

                        if (value.desc.length > 60) {
                            value.descSort = value.desc.substring(0, 60) + '...';
                        }
                    });
                });
        },

        methods: {
            filterToday: function (event) {
                event.preventDefault()
                this.dataIlmiah = this.dataTemp;
                let filtered = this.dataIlmiah.filter(x => x.thisToday == filterToday);
                this.dataIlmiah = filtered
            },

            filterThisMonth: function (event) {
                event.preventDefault()
                this.dataIlmiah = this.dataTemp;
                let filtered = this.dataIlmiah.filter(x => x.thisMonth == filterMonth);
                this.dataIlmiah = filtered
            },

            filterThisYear: function (event) {
                event.preventDefault()
                this.dataIlmiah = this.dataTemp;
                let filtered = this.dataIlmiah.filter(x => x.thisYear == filterYear);
                this.dataIlmiah = filtered
            },

            filterCostum: function (event) {
                event.preventDefault()
                this.dataIlmiah = this.dataTemp;
                fromDate = $("#from-date").val().split("-").join("")
                toDate = $("#to-date").val().split("-").join("")

                console.log(fromDate)
                console.log(toDate)

                let filtered = this.dataIlmiah.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);
                this.dataIlmiah = filtered
            },
            exportPdf() {
                pdf(
                    this.dataIlmiah,

                    [
                        {title: "Tanggal", dataKey: "created_at"},
                        {title: "Karya", dataKey: "categoryName"},
                        {title: "Deskripsi", dataKey: "desc"},
                    ],

                    {
                        created_at:{cellWidth: 30},
                        categoryName:{cellWidth: 40},
                    },

                    "Karya Ilmiah",
                    "portrait",
                    "pdf-header-potrait.png"
                )
            },

            exportExcels() {
                let dataExcel = []

                $.each(this.dataIlmiah, function (index, value) {
                    raw = {
                        date: value.created_at,
                        category: value.category.category_name,
                        desc: value.desc
                    }

                    dataExcel.push(raw)
                })

                excel(
                    dataExcel,
                    ['Tanggal', 'Karya', 'Laporan'],
                    "Karya Ilmiah"
                )
            },
        }
    });
}

function showInnovativeReport() {
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataInovatif: '',
            dataTemp: '',
        },

        created() {
            let url = baseUrl + 'api/laporan/karya-inovatif/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataInovatif = data;

                    this.dataTemp = data;

                    $.each(data, function (index, value) {
                        splitDate = (new Date(value.created_at));
                        month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                        year = splitDate.getFullYear();
                        hour = splitDate.getHours();
                        minute = splitDate.getMinutes();
                        day = splitDate.getDate().toString().padStart(2, "0");
                        timeStamp = splitDate.getTime();

                        dateCreated = year + '-' + month + '-' + day;
                        hourCreated = hour + ':' + minute;

                        filterDate = new Date()
                        filterDay = filterDate.getDate().toString().padStart(2, "0");
                        filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                        filterYear = filterDate.getFullYear();

                        thisToday = `${year}${month}${day}`
                        thisMonth = `${month}${year}`
                        thisYear = `${year}`

                        filterToday = `${filterYear}${filterMonth}${filterDay}`
                        filterMonth = `${filterMonth}${filterYear}`

                        value.created_at = dateCreated
                        value.hours = hourCreated
                        value.descSort = value.desc
                        value.thisToday = thisToday
                        value.thisMonth = thisMonth
                        value.thisYear = thisYear
                        value.categoryName = value.category.category_name

                        if (value.desc.length > 60) {
                            value.descSort = value.desc.substring(0, 60) + '...';
                        }
                    });
                });
        },

        methods: {
            filterToday: function (event) {
                event.preventDefault()
                this.dataInovatif = this.dataTemp;
                let filtered = this.dataInovatif.filter(x => x.thisToday == filterToday);
                this.dataInovatif = filtered
            },

            filterThisMonth: function (event) {
                event.preventDefault()
                this.dataInovatif = this.dataTemp;
                let filtered = this.dataInovatif.filter(x => x.thisMonth == filterMonth);
                this.dataInovatif = filtered
            },

            filterThisYear: function (event) {
                event.preventDefault()
                this.dataInovatif = this.dataTemp;
                let filtered = this.dataInovatif.filter(x => x.thisYear == filterYear);
                this.dataInovatif = filtered
            },

            filterCostum: function (event) {
                event.preventDefault()
                this.dataInovatif = this.dataTemp;
                fromDate = $("#from-date").val().split("-").join("")
                toDate = $("#to-date").val().split("-").join("")

                console.log(fromDate)
                console.log(toDate)

                let filtered = this.dataInovatif.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);
                this.dataInovatif = filtered
            },

            exportPdf() {
                pdf(
                    this.dataInovatif,

                    [
                        {title: "Tanggal", dataKey: "created_at"},
                        {title: "Karya", dataKey: "categoryName"},
                        {title: "Deskripsi", dataKey: "desc"},
                    ],

                    {
                        created_at:{cellWidth: 30},
                        categoryName:{cellWidth: 40},
                    },

                    "Karya Inovatif",
                    "portrait",
                    "pdf-header-potrait.png"
                )
            },

            exportExcels() {
                let dataExcel = []

                $.each(this.dataInovatif, function (index, value) {
                    raw = {
                        date: value.created_at,
                        category: value.category.category_name,
                        desc: value.desc
                    }

                    dataExcel.push(raw)
                })

                excel(
                    dataExcel,
                    ['Tanggal', 'Karya', 'Laporan'],
                    "Karya Inovatif"
                )
            },
        }
    });
}