dayjs.extend(window.dayjs_plugin_customParseFormat);

function absen() {
    var app = new Vue({
        el: '#absen',
        delimiters: ['[[', ']]'],
        data: {
            dataHariKerja: '',
            dataMasuk:'',
            dataKeluar:'',
        },

        mounted(){
            let urlMasuk = 'https://localhost:8000/api/presence/checkin/';
            let urlKeluar = 'https://localhost:8000/api/presence/checkout/';
            let urlKerja = 'https://localhost:8000/api/presence/days/';

            fetch(urlKerja)
                .then(response => response.json())
                .then(data => {
                    this.dataHariKerja = data;


                    $.each(data, function(index, value) {
                        for (let key in value) {
                            if (value.hasOwnProperty(key)) {
                                if (value[key] === false) {
                                    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                                    let day = new Date();
                                    let dayName = days[day.getDay()];

                                    if (key == dayName) {
                                        console.log(key)
                                        console.log("bukan hari kerja")
                                        document.getElementById("masuk").setAttribute("disabled", "")
                                        document.getElementById("keluar").setAttribute("disabled", "")
                                    }

                                }
                            }
                        }
                    });
            });


            fetch(urlMasuk)
                .then(response => response.json() )
                .then(data =>{
                    this.dataMasuk = data;

                    // if checkin
                    $.each(data,function(index, value){
                        if (value.is_checked == true) {
                            document.getElementById("masuk").setAttribute("disabled", "")
                        }
                    });
            });

            fetch(urlKeluar)
                .then(response => response.json() )
                .then(data =>{
                    this.dataKeluar = data;

                    // if checkin
                    $.each(data,function(index, value){
                        if (value.is_checked == true) {
                            document.getElementById("keluar").setAttribute("disabled", "")
                        }
                    });
            });    


        },

        methods: {
            message: function(event) {
                document.getElementById('staticBackdropLabel1').innerHTML= "tunggu beberapa <span>detik</span>";
                document.getElementById('staticBackdropLabel3').innerHTML= "tunggu beberapa <span>detik</span>";
            }
        }

    });
}


function showDataAbsen(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataAbsen: '',
        },

        mounted(){
            let url = 'https://localhost:8000/api/showabsen/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataAbsen = data;

                    // Split data date
                    $.each(data,function(index, value){
                        splitDate = (new Date(value.presence_date));
                        month = splitDate.getMonth()+1;
                        year = splitDate.getFullYear();
                        date = splitDate.getDate();
                        day = splitDate.getDay();

                        console.log(day)
                        

                        dateCreated = year+'-'+month+'-'+date+'-'+day;
                        const dateString  = dayjs(dateCreated, "YYYY-MM-DD-dddd")
                        .format('dddd DD-MM-YYYY');

                        value.presence_date = dateString
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



function studyReport(){
    var app = new Vue({
        el: '#mapel-form',
        delimiters: ['[[', ']]'],
        data: {
            dataKelas:'',
            resetData:'',
        },

        mounted(){
            let url = 'https://localhost:8000/api/subjects/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{this.dataKelas = data;
                    this.resetData = data
            });
        },

        // filter mapel
        methods:{
            onChange(event) {
                value = event.target.value;

                document.getElementById("select-mapel").removeAttribute("disabled");

                if (value == 2) {
                    this.dataKelas = this.resetData
                    let produktif = this.dataKelas.filter(x => x.category == 2);
                    this.dataKelas = produktif;
                }

                else if (value == 1) {
                    this.dataKelas = this.resetData
                    let mapelWajib = this.dataKelas.filter(x => x.category == 1);
                    this.dataKelas = mapelWajib;
                }
              
            }
        },
    });
};

















function showStudyReport(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataBelajar:'',
        },

        mounted(){
            let url = 'https://localhost:8000/api/laporan/belajar/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataBelajar = data;

                    $.each(data,function(index, value){
                        splitDate = (new Date(value.created_at));
                        month = splitDate.getMonth()+1;
                        year = splitDate.getFullYear();
                        date = splitDate.getDate();

                        dateCreated = year+'-'+month+'-'+date;
                        const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                        .format('DD-MM-YYYY');

                        value.created_at = dateString

                    });
            });
        },
    });
}


function showGuidanceReport(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataBimbingan:'',
        },

        mounted(){
            let url = 'https://localhost:8000/api/laporan/bimbingan/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataBimbingan = data;

                    $.each(data,function(index, value){
                        splitDate = (new Date(value.created_at));
                        month = splitDate.getMonth()+1;
                        year = splitDate.getFullYear();
                        date = splitDate.getDate();

                        dateCreated = year+'-'+month+'-'+date;
                        const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                        .format('DD-MM-YYYY');

                        value.created_at = dateString

                    });
            });
        },
    });
}


function showDutyReport(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataTugas:'',
        },

        mounted(){
            let url = 'https://localhost:8000/api/laporan/tugas-lainnya/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataTugas = data;

                    $.each(data,function(index, value){
                        splitDate = (new Date(value.created_at));
                        month = splitDate.getMonth()+1;
                        year = splitDate.getFullYear();
                        date = splitDate.getDate();

                        dateCreated = year+'-'+month+'-'+date;
                        const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                        .format('DD-MM-YYYY');

                        value.created_at = dateString

                    });
            });
        },
    });
}


function showDevelopmentReport(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataPengembangan:'',
        },

        mounted(){
            let url = 'https://localhost:8000/api/laporan/pengembangan/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataPengembangan = data;

                    $.each(data,function(index, value){
                        splitDate = (new Date(value.created_at));
                        month = splitDate.getMonth()+1;
                        year = splitDate.getFullYear();
                        date = splitDate.getDate();

                        dateCreated = year+'-'+month+'-'+date;
                        const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                        .format('DD-MM-YYYY');

                        value.created_at = dateString

                    });          
            });
        },
    });
}


function showScientificReport(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataIlmiah:'',
        },

        mounted(){
            let url = 'https://localhost:8000/api/laporan/karya-ilmiah/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataIlmiah = data;

                    $.each(data,function(index, value){
                        splitDate = (new Date(value.created_at));
                        month = splitDate.getMonth()+1;
                        year = splitDate.getFullYear();
                        date = splitDate.getDate();

                        dateCreated = year+'-'+month+'-'+date;
                        const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                        .format('DD-MM-YYYY');

                        value.created_at = dateString

                    });
            });
        },
    });
}

function showInnovativeReport(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataInovatif:'',
        },

        mounted(){
            let url = 'https://localhost:8000/api/laporan/karya-inovatif/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataInovatif = data;

                    $.each(data,function(index, value){
                        splitDate = (new Date(value.created_at));
                        month = splitDate.getMonth()+1;
                        year = splitDate.getFullYear();
                        date = splitDate.getDate();

                        dateCreated = year+'-'+month+'-'+date;
                        const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                        .format('DD-MM-YYYY');

                        value.created_at = dateString

                    });
            });
        },
    });
}

