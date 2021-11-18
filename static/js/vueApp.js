<<<<<<< HEAD
function showDataAbsen(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataAbsen: '',
            dateNow:'',
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
                        this.month = splitDate.getMonth()+1;
                        this.year = splitDate.getFullYear();
                    });

                    // Split date now
                    let today = new Date();
                    this.dateNow = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
=======
function absen(){

}


function showDataAbsen(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataAbsen: '',
            dateNow:'',
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
                        this.month = splitDate.getMonth()+1;
                        this.year = splitDate.getFullYear();
                    });

                    // Split date now
                    let today = new Date();
                    this.dateNow = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
            });
        },
    });
}
>>>>>>> 16badeda6f217d97964bdaf943f2d7fde4d75781
