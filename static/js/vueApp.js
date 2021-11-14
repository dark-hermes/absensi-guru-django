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



function showMapel(){
    var app = new Vue({
        el: '#mapel-form',
        delimiters: ['[[', ']]'],
        data: {
            dataKelas:'',
            parseData:'',
        },

        mounted(){
            let url = 'https://localhost:8000/api/subjects/';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{this.dataKelas = data;
            });
        },

        methods:{
           onChange(event) {
              value = event.target.value;

              if (value == 2) {
                    let produktif = this.dataKelas.filter(x => x.category == 2);
                    this.dataKelas = produktif;
              };

              else if (value == 1) {
                    let mapelWajib = this.dataKelas.filter(x => x.category == 1);
                    this.dataKelas = mapelWajib;
              };

              
            };
        },
    });
};