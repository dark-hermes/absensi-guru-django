dayjs.extend(window.dayjs_plugin_customParseFormat);

let baseUrl = 'https://localhost:8000/';

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

                                    if (key == dayName) {
                                        $("#masuk").attr("disabled", "")
                                        $("#keluar").attr("disabled", "")
                                    }

                                }
                            }
                        }
                    });
                });


            fetch(urlMasuk)
                .then(response => response.json())
                .then(data => {
                    this.dataMasuk = data;

                    // if checkin
                    $.each(data, function (index, value) {
                        if (value.is_checked == true) {
                            $("#masuk").attr("disabled", "")
                            $('#izin').attr("disabled", "")
                        }
                    });
                });

            fetch(urlKeluar)
                .then(response => response.json())
                .then(data => {
                    this.dataKeluar = data;

                    // if checkin
                    $.each(data, function (index, value) {
                        if (value.is_checked == true) {
                            $("#keluar").attr("disabled", "")
                            $('#izin').attr("disabled", "")
                        }
                    });
                });

            distance = $('#distance-value').attr('distance');
            if (distance > 1000) {
                $('#keluar').attr("disabled", "")
                $('#masuk').attr("disabled", "")
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
                        // const dateString  = dayjs(dateCreated, "YYYY-MM-DD-dddd")
                        // .format('dddd DD-MM-YYYY');

                        value.presence_date = dateCreated
                    });
                });
        },

        // methods:{
        //     filterToday(){
        //         let pastDates = this.dataAbsen.filter(x => Date.parse(x.presence_date) < this.dateNow);
        //         console.log(pastDates.presence_date)
        //         this.dataAbsen = pastDates
        //     }
        // },

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

                        if (value.desc.length > 60) {
                            value.descSort = value.desc.substring(0, 60) + '...';
                        }
                    });
                });
        },

        methods: {
            filterToday: function (event) {
                event.preventDefault()
                this.dataBelajar = this.dataTemp;
                let filtered = this.dataBelajar.filter(x => x.thisToday == filterToday);
                this.dataBelajar = filtered
            },

            filterThisMonth: function (event) {
                event.preventDefault()
                this.dataBelajar = this.dataTemp;
                let filtered = this.dataBelajar.filter(x => x.thisMonth == filterMonth);
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

                console.log(fromDate)
                console.log(toDate)

                let filtered = this.dataBelajar.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);
                this.dataBelajar = filtered
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
        }
    });
}