function showUsers(){
    var app = new Vue({
        el: '.table',
        delimiters: ['[[', ']]'],
        data: {
            dataUsers:'',
        },

        mounted(){
            let url = baseUrl + 'api/users';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataUsers = data;

            });
        },
    });
}

function showReportAdmin(){
    var app = new Vue({
        el: '.content',
        delimiters: ['[[', ']]'],
        data: {
            dataUsers:'',
            dataStudyReport: '',
            dataGuidanceReport:'',
            dataDutyReport:'',
            dataDevelopmentReport:'',
            dataInovativ:'',
            dataScientific:'',
            isSelected:'',
        },

        mounted(){
            let url = baseUrl + 'api/users';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataUsers = data;
            });

            let url2 = baseUrl + 'api/laporan/belajar';
            fetch(url2)
                .then(response => response.json() )
                .then(data =>{
                    this.dataStudyReport = data;
            });

            let url3 = baseUrl + 'api/laporan/bimbingan';
            fetch(url3)
                .then(response => response.json() )
                .then(data =>{
                    this.dataGuidanceReport = data;
            });

            let url4 = baseUrl + 'api/laporan/tugas-lainnya';
            fetch(url4)
                .then(response => response.json() )
                .then(data =>{
                    this.dataDutyReport = data;
            });

            let url5 = baseUrl + 'api/laporan/pengembangan';
            fetch(url5)
                .then(response => response.json() )
                .then(data =>{
                    this.dataDevelopmentReport = data;
            });

            let url6 = baseUrl + 'api/laporan/karya-inovatif';
            fetch(url6)
                .then(response => response.json() )
                .then(data =>{
                    this.dataInovativ = data;
            });

            let url7 = baseUrl + 'api/laporan/karya-ilmiah';
            fetch(url7)
                .then(response => response.json() )
                .then(data =>{
                    this.dataScientific = data;
            });
        },

        methods: {
            selectReport(event) {
                this.isSelected = event.target.value

                switch (this.isSelected) {
                    case 'study':
                    $('.table-report').css("display", "none");
                    $('.table-study').css("display", "block");
                    break;

                    case 'guidance':
                    $('.table-report').css("display", "none");    
                    $('.table-guidance').css("display", "block");
                    break;

                    case 'development':
                    $('.table-report').css("display", "none");    
                    $('.table-development').css("display", "block");
                    break;

                    case 'duty':
                    $('.table-report').css("display", "none");    
                    $('.table-duty').css("display", "block");
                    break;

                    case 'inovative':
                    $('.table-report').css("display", "none");
                    $('.table-inovative').css("display", "block");
                    break;

                    case 'scientific':
                    $('.table-report').css("display", "none");    
                    $('.table-scientific').css("display", "block");
                    break;
                }
            }
        },

        computed: {
            dataFetchedStudy: function () {
                // Date and Hours
                $.each(this.dataStudyReport,function(index, value){
                    splitDate = (new Date(value.created_at));
                    month = splitDate.getMonth()+1;
                    year = splitDate.getFullYear();
                    date = splitDate.getDate();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();

                    dateCreated = year+'-'+month+'-'+date;
                    hourCreated = hour+':'+minute;

                    // const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                    // .format('DD-MM-YYYY');

                    value.hours = hourCreated
                    value.created_at = dateCreated
                    
                    if (value.desc.length > 1) {
                        value.desc = value.desc.substring(0, 60) + '...';
                    }
                });

                return this.dataStudyReport
            },

            dataFetchedGuidance: function () {
                // Date and Hours
                $.each(this.dataGuidanceReport,function(index, value){
                    splitDate = (new Date(value.created_at));
                    month = splitDate.getMonth()+1;
                    year = splitDate.getFullYear();
                    date = splitDate.getDate();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();

                    dateCreated = year+'-'+month+'-'+date;
                    hourCreated = hour+':'+minute;

                    // const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                    // .format('DD-MM-YYYY');

                    value.hours = hourCreated
                    value.created_at = dateCreated

                    if (value.desc.length > 60) {
                        value.desc = value.desc.substring(0, 60) + '...';
                    }
                });


                return this.dataGuidanceReport
            },

            dataFetchedDevelopment: function () {
                // Date and Hours
                $.each(this.dataDevelopmentReport,function(index, value){
                    splitDate = (new Date(value.created_at));
                    month = splitDate.getMonth()+1;
                    year = splitDate.getFullYear();
                    date = splitDate.getDate();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();

                    dateCreated = year+'-'+month+'-'+date;
                    hourCreated = hour+':'+minute;

                    // const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                    // .format('DD-MM-YYYY');

                    value.hours = hourCreated
                    value.created_at = dateCreated

                    if (value.desc.length > 60) {
                        value.desc = value.desc.substring(0, 60) + '...';
                    }
                });

                fetched =[]
                fetchedReport = []

                $.each(this.dataUsers, function(index, value){
                    fetched.push(value)
                });

                $.each(this.dataDevelopmentReport, function(index, value){
                    fetchedReport.push(value)
                });

                fetchedReport.map(function(x){ 
                    var result = fetched.filter(a1=> a1.user == x.employee_id);
                    if(result.length > 0) { 
                        x.fullName = result[0].full_name;
                    }
                    return x 
                    
                })

                return fetchedReport
            },

            dataFetchedDuty: function () {
                // Date and Hours
                $.each(this.dataDutyReport,function(index, value){
                    splitDate = (new Date(value.created_at));
                    month = splitDate.getMonth()+1;
                    year = splitDate.getFullYear();
                    date = splitDate.getDate();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();

                    dateCreated = year+'-'+month+'-'+date;
                    hourCreated = hour+':'+minute;

                    // const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                    // .format('DD-MM-YYYY');

                    value.hours = hourCreated
                    value.created_at = dateCreated

                    if (value.desc.length > 60) {
                        value.desc = value.desc.substring(0, 60) + '...';
                    }
                });

                fetched =[]
                fetchedReport = []

                $.each(this.dataUsers, function(index, value){
                    fetched.push(value)
                });

                $.each(this.dataDutyReport, function(index, value){
                    fetchedReport.push(value)
                });

                fetchedReport.map(function(x){ 
                    var result = fetched.filter(a1=> a1.user == x.employee_id);
                    if(result.length > 0) { 
                        x.fullName = result[0].full_name;
                    }
                    return x 
                    
                })

                return fetchedReport
            },

            dataFetchedInovative: function () {
                // Date and Hours
                $.each(this.dataInovativ,function(index, value){
                    splitDate = (new Date(value.created_at));
                    month = splitDate.getMonth()+1;
                    year = splitDate.getFullYear();
                    date = splitDate.getDate();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();

                    dateCreated = year+'-'+month+'-'+date;
                    hourCreated = hour+':'+minute;

                    // const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                    // .format('DD-MM-YYYY');

                    value.hours = hourCreated
                    value.created_at = dateCreated

                    if (value.desc.length > 60) {
                        value.desc = value.desc.substring(0, 60) + '...';
                    }
                });

                fetched =[]
                fetchedReport = []

                $.each(this.dataUsers, function(index, value){
                    fetched.push(value)
                });

                $.each(this.dataInovativ, function(index, value){
                    fetchedReport.push(value)
                });

                fetchedReport.map(function(x){ 
                    var result = fetched.filter(a1=> a1.user == x.employee_id);
                    if(result.length > 0) { 
                        x.fullName = result[0].full_name;
                    }
                    return x 
                    
                })

                return fetchedReport
            },

            dataFetchedScientific: function () {
                // Date and Hours
                $.each(this.dataScientific,function(index, value){
                    splitDate = (new Date(value.created_at));
                    month = splitDate.getMonth()+1;
                    year = splitDate.getFullYear();
                    date = splitDate.getDate();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();

                    dateCreated = year+'-'+month+'-'+date;
                    hourCreated = hour+':'+minute;

                    // const dateString  = dayjs(dateCreated, "YYYY-MM-DD")
                    // .format('DD-MM-YYYY');

                    value.hours = hourCreated
                    value.created_at = dateCreated

                    if (value.desc.length > 60) {
                        value.desc = value.desc.substring(0, 60) + '...';
                    }
                });

                fetched =[]
                fetchedReport = []

                $.each(this.dataUsers, function(index, value){
                    fetched.push(value)
                });

                $.each(this.dataScientific, function(index, value){
                    fetchedReport.push(value)
                });

                fetchedReport.map(function(x){ 
                    var result = fetched.filter(a1=> a1.user == x.employee_id);
                    if(result.length > 0) { 
                        x.fullName = result[0].full_name;
                    }
                    return x 
                    
                })

                return fetchedReport
            }
        },        
    });
}


function showAttendAdmin(){
    var app = new Vue({
        el: '.content',
        delimiters: ['[[', ']]'],
        data: {
            dataAttendUser: '',
        },
        mounted(){
            let url = baseUrl + 'api/showabsen';
            fetch(url)
                .then(response => response.json() )
                .then(data =>{
                    this.dataAttendUser = data;
            });
        },

    })
}