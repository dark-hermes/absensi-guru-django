function showDataAbsen(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataAbsen: '',
            dateNow: '',
        },

        mounted(){
            let url = 'https://localhost:8000/api/showabsen/'
            fetch(url)
                .then(response => response.json())
                .then(data =>{
                    this.dataAbsen = data

                    // Split data date
                    $.each(data,function(index, value){
                        splitDate = (new Date(value.presence_date));
                        this.month = splitDate.getMonth()+1;
                        this.year = splitDate.getFullYear()
                    });

                    // Split date now
                    let today = new Date();
                    this.dateNow = today.getFullYear()+'-'+(today.getMonth()+2)+'-'+today.getDate();
                    console.log(this.dataAbsen.length)
                })
        }

    });
};