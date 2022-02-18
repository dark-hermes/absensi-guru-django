function showUsers() {
    var app = new Vue({
        el: '.table',
        delimiters: ['[[', ']]'],
        data: {
            dataUsers: '',
        },

        mounted() {
            let url = baseUrl + 'api/users';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataUsers = data;

                });
        },
    });
}

function showReportAdmin() {
    var app = new Vue({
        el: '.content',
        delimiters: ['[[', ']]'],
        data: {
            dataUsers: '',
            dataStudyReport: '',
            dataGuidanceReport: '',
            dataDutyReport: '',
            dataDevelopmentReport: '',
            dataInovativ: '',
            dataScientific: '',

            dataTempStudyReport: '',
            dataTempGuidanceReport: '',
            dataTempDutyReport: '',
            dataTempDevelopmentReport: '',
            dataTempInovativ: '',
            dataTempScientific: '',
            dataFilter: '',
        },

        async mounted() {
            this.loading = true

            let url = baseUrl + 'api/users';
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataUsers = data;
                });

            let url2 = baseUrl + 'api/laporan/belajar';
            await fetch(url2)
                .then(response => response.json())
                .then(data => {
                    this.dataStudyReport = data;
                    this.dataTempStudyReport = data;
                });

            let url3 = baseUrl + 'api/laporan/bimbingan';
            await fetch(url3)
                .then(response => response.json())
                .then(data => {
                    this.dataGuidanceReport = data;
                    this.dataTempGuidanceReport = data;
                });

            let url4 = baseUrl + 'api/laporan/tugas-lainnya';
            await fetch(url4)
                .then(response => response.json())
                .then(data => {
                    this.dataDutyReport = data;
                    this.dataTempDutyReport = data;
                });

            let url5 = baseUrl + 'api/laporan/pengembangan';
            await fetch(url5)
                .then(response => response.json())
                .then(data => {
                    this.dataDevelopmentReport = data;
                    this.dataTempDevelopmentReport = data;
                });

            let url6 = baseUrl + 'api/laporan/karya-inovatif';
            await fetch(url6)
                .then(response => response.json())
                .then(data => {
                    this.dataInovativ = data;
                    this.dataTempInovativ = data;
                });

            let url7 = baseUrl + 'api/laporan/karya-ilmiah';
            await fetch(url7)
                .then(response => response.json())
                .then(data => {
                    this.dataScientific = data;
                    this.dataTempScientific = data;
                });

            this.loading = false
            $('.load').removeClass('load')
            $('.content').removeClass('loading')
        },

        methods: {
            selectReport(event) {
                isSelected = event.target.value
                $('.filter-select option:first').prop('selected', true);

                switch (isSelected) {
                    case 'study':
                        this.dataStudyReport = this.dataTempStudyReport;
                        $('.table-report').css("display", "none");
                        $('.table-study').css("display", "block");
                        this.dataFilter = isSelected;
                        break;

                    case 'guidance':
                        this.dataGuidanceReport = this.dataTempGuidanceReport;
                        $('.table-report').css("display", "none");
                        $('.table-guidance').css("display", "block");
                        this.dataFilter = isSelected;
                        break;

                    case 'development':
                        this.dataDevelopmentReport = this.dataTempDevelopmentReport;
                        $('.table-report').css("display", "none");
                        $('.table-development').css("display", "block");
                        this.dataFilter = isSelected;
                        break;

                    case 'duty':
                        this.dataDutyReport = this.dataTempDutyReport;
                        $('.table-report').css("display", "none");
                        $('.table-duty').css("display", "block");
                        this.dataFilter = isSelected;
                        break;

                    case 'inovative':
                        this.dataInovativ = this.dataTempInovativ;
                        $('.table-report').css("display", "none");
                        $('.table-inovative').css("display", "block");
                        this.dataFilter = isSelected;
                        break;

                    case 'scientific':
                        this.dataScientific = this.dataTempScientific;
                        $('.table-report').css("display", "none");
                        $('.table-scientific').css("display", "block");
                        this.dataFilter = isSelected;
                        break;
                }
            },

            exportPdf() {
                switch (this.dataFilter) {
                    case 'study':
                        pdf(
                            this.dataStudyReport,
        
                            [   {title: "Tanggal",dataKey: "created_at"},
                                {title: "Nama",dataKey: "fullName"},
                                {title: "NIP",dataKey: "nip"},
                                {title: "Jam",dataKey: "hours"},
                                {title: "Kelas",dataKey: "className"},
                                {title: "Mata Pelajaran",dataKey: "subjectName"},
                                {title: "Total Murid",dataKey: "total_student"},
                                {title: "Murid Hadir",dataKey: "presence_student"},
                                {title: "Metode Pembelajaran",dataKey: "method"},
                                {title: "Deskripsi",dataKey: "desc"},
                            ],
        
                            {
                                created_at:{cellWidth: 25},
                                fullName: {cellWidth: 30},
                                nip: {cellWidth: 35},
                                hours:{ cellWidth: 15},
                                className:{ cellWidth: 20},
                                subjectName:{cellWidth: 25},
                                total_student: {cellWidth: 20},
                                presence_student: {cellWidth: 20},
                                method: {cellWidth: 30},
                                desc: {cellWidth: 50},
                            },
        
                            "Belajar",
                            "Landscape",
                            "pdf-header-landscape.png",
                            false
                        )
                    break

                    case 'guidance':
                        pdf(
                            this.dataGuidanceReport,
        
                            [   {title: "Tanggal",dataKey: "created_at"},
                                {title: "Nama",dataKey: "fullName"},
                                {title: "NIP",dataKey: "nip"},
                                {title: "Deskripsi",dataKey: "desc"},
                            ],
        
                            {
                                created_at:{cellWidth: 25},
                                fullName:{cellWidth: 40},
                                nip:{cellWidth: 40},
                                desc: {cellWidth: 80},
                            },
        
                            "Bimbingan",
                            "Portrait",
                            "pdf-header-potrait.png",
                            false
                        )               
                    break

                    case 'development':
                        pdf(
                            this.dataDevelopmentReport,
        
                            [   {title: "Tanggal",dataKey: "created_at"},
                                {title: "Nama",dataKey: "fullName"},
                                {title: "NIP",dataKey: "nip"},
                                {title: "Kegiatan",dataKey: "category"},
                                {title: "Peran",dataKey: "role"},
                                {title: "Durasi",dataKey: "duration"},
                                {title: "Deskripsi",dataKey: "desc"},
                            ],
        
                            {
                                created_at:{cellWidth: 25},
                                fullName:{cellWidth: 40},
                                nip:{cellWidth: 40},
                                desc: {cellWidth: 70},
                            },
        
                            "Pengembangan",
                            "Landscape",
                            "pdf-header-landscape.png",
                            false
                        )               
                    break

                    case 'duty':
                        pdf(
                            this.dataDutyReport,
        
                            [   {title: "Tanggal",dataKey: "created_at"},
                                {title: "Nama",dataKey: "fullName"},
                                {title: "NIP",dataKey: "nip"},
                                {title: "Posisi Kerja",dataKey: "roleName"},
                                {title: "Deskripsi",dataKey: "desc"},
                            ],
        
                            {
                                created_at:{cellWidth: 25},
                                fullName:{cellWidth: 40},
                                nip:{cellWidth: 30},
                                desc: {cellWidth: 50},
                            },
        
                            "Tugas",
                            "Portrait",
                            "pdf-header-potrait.png",
                            false
                        )               
                    break

                    case 'inovative':
                        pdf(
                            this.dataInovativ,
        
                            [   {title: "Tanggal",dataKey: "created_at"},
                                {title: "Nama",dataKey: "fullName"},
                                {title: "NIP",dataKey: "nip"},
                                {title: "Karya",dataKey: "creationCategory"},
                                {title: "Deskripsi",dataKey: "desc"},
                            ],
        
                            {
                                created_at:{cellWidth: 25},
                                fullName:{cellWidth: 40},
                                nip:{cellWidth: 30},
                                creationCategory:{cellWidth: 30},
                                desc: {cellWidth: 60},
                            },
        
                            "Karya Inovatif",
                            "Portrait",
                            "pdf-header-potrait.png",
                            false
                        )               
                    break

                    case 'scientific':
                        pdf(
                            this.dataScientific,
        
                            [   {title: "Tanggal",dataKey: "created_at"},
                                {title: "Nama",dataKey: "fullName"},
                                {title: "NIP",dataKey: "nip"},
                                {title: "Karya",dataKey: "creationCategory"},
                                {title: "Deskripsi",dataKey: "desc"},
                            ],
        
                            {
                                created_at:{cellWidth: 25},
                                fullName:{cellWidth: 40},
                                nip:{cellWidth: 30},
                                creationCategory:{cellWidth: 30},
                                desc: {cellWidth: 60},
                            },
        
                            "Karya Ilmiah",
                            "Portrait",
                            "pdf-header-potrait.png",
                            false
                        )               
                    break
                    
                }
            },

            exportExcels() {
                let dataExcel;

                switch(this.dataFilter){
                    case 'study':
                        dataExcel = []

                        $.each(this.dataStudyReport, function (index, value) {
                            raw = {
                                date: value.created_at,
                                name: value.fullName,
                                nip: value.nip,
                                hours: value.hours,
                                className: value.className,
                                subjectName: value.subjectName,
                                totalStudent: value.total_student,
                                presenceStudent: value.presence_student,
                                absenceStudent: value.absence_student,
                                method: value.method,
                                desc: value.desc
                            }

                            dataExcel.push(raw)
                        })

                        excel(
                            dataExcel,

                            ['Tanggal', 'Nama' , 'NIP','Jam Lapor', 'Kelas KBM', 'Mata Ajar', 'Jumlah Siswa', 'Jumlah Siswa Hadir', 'Jumlah Siswa Tidak Hadir', 'Media Pembelajaran', 'Keterangan'],

                            "Belajar"
                        )
                    break

                    case 'guidance':
                        dataExcel = []

                        $.each(this.dataGuidanceReport, function (index, value) {
                            raw = {
                                date: value.created_at,
                                name: value.fullName,
                                nip: value.nip,
                                desc: value.desc
                            }

                            dataExcel.push(raw)
                        })

                        excel(
                            dataExcel,

                            ['Tanggal', 'Nama' , 'NIP','Keterangan'],

                            "Bimbingan"
                        )
                    break

                    case 'development':
                        dataExcel = []

                        $.each(this.dataDevelopmentReport, function (index, value) {
                            raw = {
                                date: value.created_at,
                                name: value.fullName,
                                nip: value.nip,
                                category: value.category,
                                role: value.role,
                                duration: value.duration,
                                desc: value.desc
                            }

                            dataExcel.push(raw)
                        })

                        excel(
                            dataExcel,

                            ['Tanggal', 'Nama' , 'NIP', 'Kegiatan', 'Peran', 'Druasi' ,'Keterangan'],

                            "Pengembangan"
                        )
                    break

                    case 'duty':
                        dataExcel = []

                        $.each(this.dataDutyReport, function (index, value) {
                            raw = {
                                date: value.created_at,
                                name: value.fullName,
                                nip: value.nip,
                                role: value.roleName,
                                desc: value.desc
                            }

                            dataExcel.push(raw)
                        })

                        excel(
                            dataExcel,

                            ['Tanggal', 'Nama' , 'NIP', 'Posisi Kerja','Keterangan'],

                            "Tugas"
                        )
                    break

                    case 'inovative':
                        dataExcel = []

                        $.each(this.dataInovativ, function (index, value) {
                            raw = {
                                date: value.created_at,
                                name: value.fullName,
                                nip: value.nip,
                                role: value.creationCategory,
                                desc: value.desc
                            }

                            dataExcel.push(raw)
                        })

                        excel(
                            dataExcel,

                            ['Tanggal', 'Nama' , 'NIP', 'Karya Inovatif','Keterangan'],

                            "Karya Inovatif"
                        )
                    break

                    case 'scientific':
                        dataExcel = []

                        $.each(this.dataScientific, function (index, value) {
                            raw = {
                                date: value.created_at,
                                name: value.fullName,
                                nip: value.nip,
                                role: value.creationCategory,
                                desc: value.desc
                            }

                            dataExcel.push(raw)
                        })

                        excel(
                            dataExcel,

                            ['Tanggal', 'Nama' , 'NIP', 'Karya Inovatif','Keterangan'],

                            "Karya Ilmiah"
                        )
                    break
                }
            },

            filter(event) {
                isSelected = event.target.value.toLowerCase();
                switch (isSelected) {
                    case 'reset':
                        switch (this.dataFilter) {
                            case 'study':
                                this.dataStudyReport = this.dataTempStudyReport;
                                break
                            case 'guidance':
                                this.dataGuidanceReport = this.dataTempGuidanceReport;
                                break
                            case 'development':
                                this.dataDevelopmentReport = this.dataTempDevelopmentReport;
                                break

                            case 'duty':
                                this.dataDutyReport = this.dataTempDutyReport;
                                break
                            case 'inovative':
                                this.dataInovativ = this.dataTempInovativ;
                                break

                            case 'scientific':
                                this.dataScientific = this.dataTempScientific;
                                break
                        };
                    break


                    case 'today':
                        switch (this.dataFilter) {
                            case 'study':
                                this.dataStudyReport = this.dataTempStudyReport;
                                filtered = this.dataStudyReport.filter(x => x.thisToday == filterToday);
                                this.dataStudyReport = filtered
                                break
                            case 'guidance':
                                this.dataGuidanceReport = this.dataTempGuidanceReport;
                                filtered = this.dataGuidanceReport.filter(x => x.thisToday == filterToday);
                                this.dataGuidanceReport = filtered
                                break
                            case 'development':
                                this.dataDevelopmentReport = this.dataTempDevelopmentReport;
                                filtered = this.dataDevelopmentReport.filter(x => x.thisToday == filterToday);
                                this.dataDevelopmentReport = filtered
                                break

                            case 'duty':
                                this.dataDutyReport = this.dataTempDutyReport;
                                filtered = this.dataDutyReport.filter(x => x.thisToday == filterToday);
                                this.dataDutyReport = filtered
                                break
                            case 'inovative':
                                this.dataInovativ = this.dataTempInovativ;
                                filtered = this.dataInovativ.filter(x => x.thisToday == filterToday);
                                this.dataInovativ = filtered
                                break

                            case 'scientific':
                                this.dataScientific = this.dataTempScientific;
                                filtered = this.dataScientific.filter(x => x.thisToday == filterToday);
                                this.dataScientific = filtered
                                break
                        };
                    break

                    case 'month':
                        switch (this.dataFilter) {
                            case 'study':
                                this.dataStudyReport = this.dataTempStudyReport;
                                filtered = this.dataStudyReport.filter(x => x.thisMonth == filterMonth);
                                this.dataStudyReport = filtered
                                break

                            case 'guidance':
                                this.dataGuidanceReport = this.dataTempGuidanceReport;
                                filtered = this.dataGuidanceReport.filter(x => x.thisMonth == filterMonth);
                                this.dataGuidanceReport = filtered
                                break
                            case 'development':
                                this.dataDevelopmentReport = this.dataTempDevelopmentReport;
                                filtered = this.dataDevelopmentReport.filter(x => x.thisMonth == filterMonth);
                                this.dataDevelopmentReport = filtered
                                break

                            case 'duty':
                                this.dataDutyReport = this.dataTempDutyReport;
                                filtered = this.dataDutyReport.filter(x => x.thisMonth == filterMonth);
                                this.dataDutyReport = filtered
                                break
                            case 'inovative':
                                this.dataInovativ = this.dataTempInovativ;
                                filtered = this.dataInovativ.filter(x => x.thisMonth == filterMonth);
                                this.dataInovativ = filtered
                                break

                            case 'scientific':
                                this.dataScientific = this.dataTempScientific;
                                filtered = this.dataScientific.filter(x => x.thisMonth == filterMonth);
                                this.dataScientific = filtered
                                break
                        }
                        break

                    case 'year':
                        switch (this.dataFilter) {
                            case 'study':
                                this.dataStudyReport = this.dataTempStudyReport;
                                filtered = this.dataStudyReport.filter(x => x.thisYear == filterYear);
                                this.dataStudyReport = filtered
                                break

                            case 'guidance':
                                this.dataGuidanceReport = this.dataTempGuidanceReport;
                                filtered = this.dataGuidanceReport.filter(x => x.thisYear == filterYear);
                                this.dataGuidanceReport = filtered
                                break
                            case 'development':
                                this.dataDevelopmentReport = this.dataTempDevelopmentReport;
                                filtered = this.dataDevelopmentReport.filter(x => x.thisYear == filterYear);
                                this.dataDevelopmentReport = filtered
                                break

                            case 'duty':
                                this.dataDutyReport = this.dataTempDutyReport;
                                filtered = this.dataDutyReport.filter(x => x.thisYear == filterYear);
                                this.dataDutyReport = filtered
                                break
                            case 'inovative':
                                this.dataInovativ = this.dataTempInovativ;
                                filtered = this.dataInovativ.filter(x => x.thisYear == filterYear);
                                this.dataInovativ = filtered
                                break

                            case 'scientific':
                                this.dataScientific = this.dataTempScientific;
                                filtered = this.dataScientific.filter(x => x.thisYear == filterYear);
                                this.dataScientific = filtered
                                break
                        }
                        break
                }

                if (isSelected == 'custom') {
                    $('#myModal').modal('show')

                    switch (this.dataFilter) {
                        case 'study':
                            $('#custom-filter').click(function () {
                                app.dataStudyReport = filtered;
                                let fromDate = $("#from-date").val().split("-").join("")
                                let toDate = $("#to-date").val().split("-").join("")

                                let filtered = app.dataStudyReport.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);

                                app.dataStudyReport = filtered;
                            })
                            break

                        case 'guidance':
                            $('#custom-filter').click(function () {
                                app.dataGuidanceReport = app.dataTempGuidanceReport;
                                let fromDate = $("#from-date").val().split("-").join("")
                                let toDate = $("#to-date").val().split("-").join("")

                                let filtered = app.dataGuidanceReport.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);

                                app.dataGuidanceReport = filtered;
                            })
                            break
                        case 'development':
                            $('#custom-filter').click(function () {
                                app.dataDevelopmentReport = app.dataTempDevelopmentReport;
                                let fromDate = $("#from-date").val().split("-").join("")
                                let toDate = $("#to-date").val().split("-").join("")

                                let filtered = app.dataDevelopmentReport.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);

                                app.dataDevelopmentReport = filtered;
                            })
                            break

                        case 'duty':
                            $('#custom-filter').click(function () {
                                app.dataDutyReport = app.dataTempDutyReport;
                                let fromDate = $("#from-date").val().split("-").join("")
                                let toDate = $("#to-date").val().split("-").join("")

                                let filtered = app.dataDutyReport.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);

                                app.dataDutyReport = filtered;
                            })
                            break
                        case 'inovative':
                            $('#custom-filter').click(function () {
                                app.dataInovativ = app.dataTempInovativ;
                                let fromDate = $("#from-date").val().split("-").join("")
                                let toDate = $("#to-date").val().split("-").join("")

                                let filtered = app.dataInovativ.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);

                                app.dataInovativ = filtered;
                            })
                            break

                        case 'scientific':
                            $('#custom-filter').click(function () {
                                app.dataScientific = app.dataTempScientific;
                                let fromDate = $("#from-date").val().split("-").join("")
                                let toDate = $("#to-date").val().split("-").join("")

                                let filtered = app.dataScientific.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);

                                app.dataScientific = filtered;
                            })
                            break
                    }
                }
            }
        },

        computed: {
            dataFetchedStudy: function () {
                // Date and Hours
                $.each(this.dataStudyReport, function (index, value) {
                    splitDate = (new Date(value.created_at));
                    month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                    year = splitDate.getFullYear();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();
                    day = splitDate.getDate().toString().padStart(2, "0");
                    hour = hour.toString().padStart(2, "0");
                    minute = minute.toString().padStart(2, "0");
                    timeStamp = splitDate.getTime();
                    dateCreated = `${year}-${month}-${day}`;
                    hourCreated = `${hour}:${minute}`;

                    filterDate = new Date()
                    filterDay = filterDate.getDate().toString().padStart(2, "0");
                    filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                    filterYear = filterDate.getFullYear();

                    thisToday = `${year}${month}${day}`
                    thisMonth = `${month}${year}`
                    thisYear = `${year}`

                    filterToday = `${filterYear}${filterMonth}${filterDay}`
                    filterMonth = `${filterMonth}${filterYear}`

                    value.created_at = dateCreated;
                    value.hours = hourCreated
                    value.descSort = value.desc
                    value.thisToday = thisToday
                    value.thisMonth = thisMonth
                    value.thisYear = thisYear
                    value.fullName = value.employee_id.full_name
                    value.nip = value.employee_id.nip
                    value.className = value.class_name.class_name
                    value.subjectName = value.subject_name.subject_name 

                    if (value.desc.length > 1) {
                        value.descSort = value.desc.substring(0, 60) + '...';
                    }
                });

                return this.dataStudyReport
            },

            dataFetchedGuidance: function () {
                // Date and Hours
                $.each(this.dataGuidanceReport, function (index, value) {
                    splitDate = (new Date(value.created_at));
                    month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                    year = splitDate.getFullYear();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();
                    day = splitDate.getDate().toString().padStart(2, "0");
                    timeStamp = splitDate.getTime();
                    dateCreated = `${year}-${month}-${day}`;
                    hourCreated = `${hour}:${minute}`;

                    filterDate = new Date()
                    filterDay = filterDate.getDate().toString().padStart(2, "0");
                    filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                    filterYear = filterDate.getFullYear();

                    thisToday = `${year}${month}${day}`
                    thisMonth = `${month}${year}`
                    thisYear = `${year}`

                    filterToday = `${filterYear}${filterMonth}${filterDay}`
                    filterMonth = `${filterMonth}${filterYear}`

                    value.created_at = dateCreated;
                    value.hours = hourCreated
                    value.descSort = value.desc
                    value.thisToday = thisToday
                    value.thisMonth = thisMonth
                    value.thisYear = thisYear
                    value.fullName = value.employee_id.full_name
                    value.nip = value.employee_id.nip

                    if (value.desc.length > 1) {
                        value.descSort = value.desc.substring(0, 60) + '...';
                    }
                });


                return this.dataGuidanceReport
            },

            dataFetchedDevelopment: function () {
                // Date and Hours
                $.each(this.dataDevelopmentReport, function (index, value) {
                    splitDate = (new Date(value.created_at));
                    month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                    year = splitDate.getFullYear();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();
                    day = splitDate.getDate().toString().padStart(2, "0");
                    timeStamp = splitDate.getTime();
                    dateCreated = `${year}-${month}-${day}`;
                    hourCreated = `${hour}:${minute}`;

                    filterDate = new Date()
                    filterDay = filterDate.getDate().toString().padStart(2, "0");
                    filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                    filterYear = filterDate.getFullYear();

                    thisToday = `${year}${month}${day}`
                    thisMonth = `${month}${year}`
                    thisYear = `${year}`

                    filterToday = `${filterYear}${filterMonth}${filterDay}`
                    filterMonth = `${filterMonth}${filterYear}`

                    value.created_at = dateCreated;
                    value.hours = hourCreated
                    value.descSort = value.desc
                    value.thisToday = thisToday
                    value.thisMonth = thisMonth
                    value.thisYear = thisYear
                    value.fullName = value.employee_id.full_name
                    value.nip = value.employee_id.nip

                    if (value.desc.length > 1) {
                        value.descSort = value.desc.substring(0, 60) + '...';
                    }
                });

                return this.dataDevelopmentReport
            },

            dataFetchedDuty: function () {
                // Date and Hours
                $.each(this.dataDutyReport, function (index, value) {
                    splitDate = (new Date(value.created_at));
                    month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                    year = splitDate.getFullYear();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();
                    day = splitDate.getDate().toString().padStart(2, "0");
                    timeStamp = splitDate.getTime();
                    dateCreated = `${year}-${month}-${day}`;
                    hourCreated = `${hour}:${minute}`;

                    filterDate = new Date()
                    filterDay = filterDate.getDate().toString().padStart(2, "0");
                    filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                    filterYear = filterDate.getFullYear();

                    thisToday = `${year}${month}${day}`
                    thisMonth = `${month}${year}`
                    thisYear = `${year}`

                    filterToday = `${filterYear}${filterMonth}${filterDay}`
                    filterMonth = `${filterMonth}${filterYear}`

                    value.created_at = dateCreated;
                    value.hours = hourCreated
                    value.descSort = value.desc
                    value.thisToday = thisToday
                    value.thisMonth = thisMonth
                    value.thisYear = thisYear
                    value.fullName = value.employee_id.full_name
                    value.nip = value.employee_id.nip
                    value.roleName = value.role.role_name

                    if (value.desc.length > 1) {
                        value.descSort = value.desc.substring(0, 60) + '...';
                    }
                });

                return this.dataDutyReport
            },

            dataFetchedInovative: function () {
                // Date and Hours
                $.each(this.dataInovativ, function (index, value) {
                    splitDate = (new Date(value.created_at));
                    month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                    year = splitDate.getFullYear();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();
                    day = splitDate.getDate().toString().padStart(2, "0");
                    timeStamp = splitDate.getTime();
                    dateCreated = `${year}-${month}-${day}`;
                    hourCreated = `${hour}:${minute}`;

                    filterDate = new Date()
                    filterDay = filterDate.getDate().toString().padStart(2, "0");
                    filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                    filterYear = filterDate.getFullYear();

                    thisToday = `${year}${month}${day}`
                    thisMonth = `${month}${year}`
                    thisYear = `${year}`

                    filterToday = `${filterYear}${filterMonth}${filterDay}`
                    filterMonth = `${filterMonth}${filterYear}`

                    value.created_at = dateCreated;
                    value.hours = hourCreated
                    value.descSort = value.desc
                    value.thisToday = thisToday
                    value.thisMonth = thisMonth
                    value.thisYear = thisYear
                    value.fullName = value.employee_id.full_name
                    value.nip = value.employee_id.nip
                    value.creationCategory = value.category.category_name

                    if (value.desc.length > 1) {
                        value.descSort = value.desc.substring(0, 60) + '...';
                    }
                });

                return this.dataInovativ
            },

            dataFetchedScientific: function () {
                // Date and Hours
                $.each(this.dataScientific, function (index, value) {
                    splitDate = (new Date(value.created_at));
                    month = (splitDate.getMonth() + 1).toString().padStart(2, "0");
                    year = splitDate.getFullYear();
                    hour = splitDate.getHours();
                    minute = splitDate.getMinutes();
                    day = splitDate.getDate().toString().padStart(2, "0");
                    timeStamp = splitDate.getTime();
                    dateCreated = `${year}-${month}-${day}`;
                    hourCreated = `${hour}:${minute}`;

                    filterDate = new Date()
                    filterDay = filterDate.getDate().toString().padStart(2, "0");
                    filterMonth = (filterDate.getMonth() + 1).toString().padStart(2, "0");
                    filterYear = filterDate.getFullYear();

                    thisToday = `${year}${month}${day}`
                    thisMonth = `${month}${year}`
                    thisYear = `${year}`

                    filterToday = `${filterYear}${filterMonth}${filterDay}`
                    filterMonth = `${filterMonth}${filterYear}`

                    value.created_at = dateCreated;
                    value.hours = hourCreated
                    value.descSort = value.desc
                    value.thisToday = thisToday
                    value.thisMonth = thisMonth
                    value.thisYear = thisYear
                    value.fullName = value.employee_id.full_name
                    value.nip = value.employee_id.nip
                    value.creationCategory = value.category.category_name

                    if (value.desc.length > 1) {
                        value.descSort = value.desc.substring(0, 60) + '...';
                    }
                });

                return this.dataScientific
            }
        },
    });
}


function showAttendAdmin() {
    var app = new Vue({
        el: '.content',
        delimiters: ['[[', ']]'],
        data: {
            dataAttendUser: '',
        },
        mounted() {
            let url = baseUrl + 'api/showabsen';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataAttendUser = data;
                });
        },

    })
}