dayjs.extend(window.dayjs_plugin_customParseFormat);

let baseUrl = 'https://localhost:8000/';

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
            let urlMasuk = baseUrl + 'api/presence/checkin/';
            let urlKeluar = baseUrl + 'api/presence/checkout/';
            let urlKerja = baseUrl + 'api/presence/days/';

           

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
            let url = baseUrl + 'api/showabsen/';
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
            dataMapel:'',
            resetData:'',
        },

        mounted(){
            let url = baseUrl + 'api/subjects/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{this.dataKelas = data;  

                $("#id_class_name").on("change",()=>{

                    let selValue = $("#id_class_name").val();
                    let s = $("#jenis-mapel").val();

                    let mapelKelas = this.dataKelas.filter(x => x.class_name == selValue);
                    this.resetData = mapelKelas

                    if (s == 2) {
                        this.dataMapel = this.resetData
                        let produktif = this.dataMapel.filter(x => x.category == 2);
                        this.dataMapel = produktif;
                        console.log(produktif)
                    }

                    else if (s == 1) {
                        this.dataMapel = this.resetData
                        let mapelWajib = this.dataMapel.filter(x => x.category == 1);
                        this.dataMapel = mapelWajib;
                        console.log(mapelWajib)
                    }

                    document.getElementById("jenis-mapel").removeAttribute("disabled");

                });

                
            });





        },

        // filter mapel
        methods:{

            onChange(event) {
                value = event.target.value;
                // let selValue = $("#id_class_name").val();
                // this.dataKelas.filter(x => x.class_name == selValue);

                
                if (value == 2) {
                    this.dataMapel = this.resetData
                    let produktif = this.dataMapel.filter(x => x.category == 2);
                    this.dataMapel = produktif;
                }

                else if (value == 1) {
                    this.dataMapel = this.resetData
                    let mapelWajib = this.dataMapel.filter(x => x.category == 1);
                    this.dataMapel = mapelWajib;
                }

                document.getElementById("select-mapel").removeAttribute("disabled");
              
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
            let url = baseUrl + 'api/laporan/belajar/';
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
            let url = baseUrl + 'api/laporan/bimbingan/';
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
            let url = baseUrl + 'api/laporan/tugas-lainnya/';
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
            let url = baseUrl + 'api/laporan/pengembangan/';
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
            let url = baseUrl + 'api/laporan/karya-ilmiah/';
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
            let url = baseUrl + 'api/laporan/karya-inovatif/';
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

