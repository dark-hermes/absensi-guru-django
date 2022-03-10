function showUsers() {
    var app = new Vue({
        el: '.content',
        delimiters: ['[[', ']]'],
        data: {
            dataUsers: '',
            search: '',
            successLoad: false,
        },

        async mounted() {
            let url = baseUrl + 'api/users';
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataUsers = data;

                });

            this.successLoad = true
            $('.load').removeClass('load')
            $('.content').removeClass('loading')
        },

        computed: {
            dataFetchedUsers() {
                if (this.successLoad == true) {
                    return app.dataUsers.filter(keyName => {
                        return keyName.full_name.toLowerCase().includes(app.search.toLowerCase())
                    })
                }
            }
        }
    });
}