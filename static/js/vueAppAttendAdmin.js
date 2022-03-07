function showAttendAdmin() {
    var app = new Vue({
        el: '.content',
        delimiters: ['[[', ']]'],
        data: {
            dataAttendUser: '',
            dataTempAttendUser: '',
        },
        async created() {
            let url = baseUrl + 'api/showabsen';
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dataAttendUser = data;
                    this.dataTempAttendUser = data;
                });

            $('.load').removeClass('load')
            $('.content').removeClass('loading')

            $.each(this.dataAttendUser, function (index, value) {
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

                value.thisToday = thisToday
                value.thisMonth = thisMonth
                value.thisYear = thisYear
                value.fullName = value.employee_id.full_name
                value.nip = value.employee_id.nip
            });
        },

        methods: {
            filter(event) {
                let filtered;
                isSelected = event.target.value.toLowerCase();
                switch (isSelected) {
                    case 'reset':
                        this.dataAttendUser = this.dataTempAttendUser;
                        break
                    case 'today':
                        this.dataAttendUser = this.dataTempAttendUser;
                        filtered = this.dataAttendUser.filter(x => x.thisToday == filterToday);
                        this.dataAttendUser = filtered
                        break
                    case 'month':
                        this.dataAttendUser = this.dataTempAttendUser;
                        filtered = this.dataAttendUser.filter(x => x.thisMonth == filterMonth);
                        this.dataAttendUser = filtered
                        break
                    case 'year':
                        this.dataAttendUser = this.dataTempAttendUser;
                        filtered = this.dataAttendUser.filter(x => x.thisYear == filterYear);
                        this.dataAttendUser = filtered
                        break
                    case 'custom':
                        $('#myModal').modal('show')

                        $('#custom-filter').click(function () {
                            this.dataAttendUser = this.dataTempAttendUser;
                            let fromDate = $("#from-date").val().split("-").join("")
                            let toDate = $("#to-date").val().split("-").join("")

                            filtered = this.dataAttendUser.filter(x => x.thisToday >= fromDate && x.thisToday <= toDate);

                            this.dataAttendUser = filtered;
                        })
                        break
                }
            },

            exportPdf() {
                pdf(
                    this.dataAttendUser,

                    [{
                            title: "Tanggal",
                            dataKey: "presence_date"
                        },
                        {
                            title: "Nama",
                            dataKey: "fullName"
                        },
                        {
                            title: "NIP",
                            dataKey: "nip"
                        },
                        {
                            title: "Jam Masuk",
                            dataKey: "checkin_time"
                        },
                        {
                            title: "Jam Keluar",
                            dataKey: "checkout_time"
                        },
                        {
                            title: "Keterangan Masuk",
                            dataKey: "checkin_desc"
                        },
                        {
                            title: "Keterangan Keluar",
                            dataKey: "checkout_desc"
                        },
                    ],

                    {
                        created_at: {
                            cellWidth: 15
                        },
                        fullName: {
                            cellWidth: 40
                        },
                        nip: {
                            cellWidth: 40
                        },
                        checkin_time: {
                            cellWidth: 35
                        },
                        checkout_time: {
                            cellWidth: 35
                        },
                        checkin_desc: {
                            cellWidth: 35
                        },
                        checkout_desc: {
                            cellWidth: 35
                        },
                    },

                    "Absensi",
                    "Landscape",
                    "pdf-header-landscape.png",
                    false
                )
            },

            exportExcels() {
                let dataExcel;
                dataExcel = []

                $.each(this.dataAttendUser, function (index, value) {
                    raw = {
                        date: value.presence_date,
                        name: value.fullName,
                        nip: value.nip,
                        checkin_time: value.checkin_time,
                        checkout_time: value.checkout_time,
                        checkin_desc: value.checkin_desc,
                        checkout_desc: value.checkout_desc,
                    }

                    dataExcel.push(raw)
                })

                excel(
                    dataExcel,

                    ['Tanggal', 'Nama', 'NIP', 'Jam Masuk', 'Jam Keluar', 'Keterangan Masuk', 'Keterangan Keluar'],

                    "Absensi"
                )
            },
        }
    })
}