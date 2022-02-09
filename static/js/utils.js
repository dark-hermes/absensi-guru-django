// Create Excel
function excel(data, head,type) {
    let Heading = [head];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);
    XLSX.utils.sheet_add_json(ws, data, {
        origin: 'A2',
        skipHeader: true
    });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `laporan-${type}.xlsx`);
}




// Create PDF
function pdf(raw, data, costumColumns, type, size, image) {
    const {jsPDF} = window.jspdf;
    
    // Create a new date for pdf
    const date = new Date()
    const month = date.toLocaleString('id-ID', {month: 'long'});
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, "0");
    const fullDate = (`${day} ${month} ${year}`)

    // Data Employee 
    let fullName, nip, position

    $.each(raw, function (index, value) {
        fullName = value.employee_id.full_name
        nip = value.employee_id.nip
        position = value.employee_id.position
    })

    // PDF data
    let columns = data;
    let pdfContent = raw;
    let url = (`${baseUrl}static/image/${image}`)

    // Initiate pdf
    let doc = new jsPDF({orientation: size,});
    
    // Structuring PDF
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64data = reader.result;

        // Header PDF initiate
        doc.addImage(base64data, 'PNG', 10, 5)

        // PDF Title initiate
        doc.autoTable({
            startY: 50,

            body: [
                [`Laporan ${type} Keseluruhan`],
            ],

            pageBreak: 'avoid',
            rowPageBreak: 'avoid',
            theme: 'plain',
            styles: {
                halign: 'center',
                fontSize: 14,
            },
        })

        // Employee Data initiate
        doc.autoTable({
            body: [
                ['Nama', ':', `${fullName}`],
                ['NIP', ':', `${nip}`],
                ['Posisi', ':', `${position}`],
            ],

            columnStyles: {
                0: {cellWidth: 20},
                1: {cellWidth: 5}
            },

            pageBreak: 'avoid',
            rowPageBreak: 'avoid',
            theme: 'plain',
            styles: {
                halign: 'left',
                fontSize: 12,
            },

            margin: {
                left: 20,
            },
        })

        // PDF Data initiate
        doc.autoTable(columns, pdfContent, {
            columnStyles: costumColumns,

            showHead: 'firstPage',
            headStyles: {
                fillColor: [255, 255, 255],
                lineColor: [0, 0, 0],
                lineWidth: .1,
                fontSize: 11,
            },
            bodyStyles: {
                lineColor: [0, 0, 0],
            },

            theme: 'grid',

            styles: {
                textColor: [0, 0, 0],
                overflow: 'linebreak',
                fontSize: 11,
                cellWidth: 'wrap',
                cellPadding: {
                    top: 2,
                    right: 2,
                    left: 2,
                    bottom: 2
                },
            },
        });

        footerMargin = 200;
        footerFontSize = 12;

        if (size == "portrait") {
            footerMargin = 150
            footerFontSize = 10
        }

        // Footer PDF initiate
        doc.autoTable({
            head: [
                [`${fullDate}`]
            ],
            body: [
                ['Kepala'],
                ['CUCU SALMAN, M.Ag.'],
                ['                   '],
                ['                   '],
                ['                   '],
                ['PEMBINA TINGKAT I'],
                ['NIP. 197103011998021002']
            ],

            pageBreak: 'avoid',
            rowPageBreak: 'avoid',
            theme: 'plain',
            styles: {
                halign: 'center',
                fontSize: footerFontSize,
            },

            margin: {
                left: footerMargin,
            },
        })

        // Download PDF
        doc.save(`laporan-${type}.pdf`);
    }

    (async () => {
        const response = await fetch(url)
        const imageBlob = await response.blob()
        const a = reader.readAsDataURL(imageBlob);
    })()
}