function showDataAbsen(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataAbsen: ''
        },

        mounted(){
            let url = 'https://127.0.0.1:8000/api/showabsen/'
            fetch(url)
                .then(response => response.json())
                .then(data =>{
                    this.dataAbsen = data
                })
        }

    });
};