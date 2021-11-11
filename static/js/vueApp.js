function showDataAbsen(){
    var app = new Vue({
        el: '#table-pdf',
        delimiters: ['[[', ']]'],
        data: {
            dataAbsen: ''
        },

        mounted(){
            let url = 'https://localhost:8000/api/showabsen/'
            fetch(url)
                .then(response => response.json())
                .then(data =>{
                    this.dataAbsen = data
                })
        }

    });
};