import axios from "axios"
import html2pdf from 'html2pdf.js';
export default {
    methods: {
        async exportData(type='excel') {
            if (document.getElementById('export')) {
                document.body.removeChild(document.getElementById('export'))
            }
            
            const route = this.$route.name;
            
            const models = ['admin', 'user', 'category', 'question'];

            if (models.includes(route) && type == 'excel') {
                const result = await axios.post('http://localhost:8080/export', { model: route, type});
                if (result.data && result.data.path) {
                    const a = document.createElement('a');
                    a.id = 'export';
                    a.href = result.data.path;
                    a.download = true;
                    a.click();
                }
            }
            console.log('type ', type);
            if (type == 'pdf') {
                this.generatePdf();
            }
        },
        generatePdf() {
            const route = this.$route.name;
            let thead = '';
            let tbody = '';
            let title = 'List of ' + route[0].toUpperCase() + route.slice(1);
            switch (route) {
                case 'question':
                    thead += '<th>Title</th>';
                    thead += '<th>Category</th>';
                    thead += '<th>Type</th>';
                    thead += '<th>Attachment Required</th>';
                    thead += '<th>Options</th>';
                    this.questions.forEach((q, index) => {
                        let options = '';

                        if (q.options) {
                            q.options.forEach((o) => {
                                options += o.value + ', '
                            })
                        }
                        if (options) {
                            options = options.slice(0, -2);
                        }

                        tbody += `
                            <tr>
                                <td>${Number(index) + 1}.</td>
                                <td>${q.title}</td>
                                <td>${q.category.name}</td>
                                <td>${q.type.toUpperCase()}</td>
                                <td>${q.attachment}</td>
                                <td>${options}</td>
                            </tr>
                        `
                    });
                    break;
                case 'user':
                    thead += '<th>Name</th>';
                    thead += '<th>Email</th>';
                    this.students.forEach((s, id) => {
                        tbody += `
                            <tr>
                                <td>${Number(id) + 1}.</td>
                                <td>${s.name}</td>
                                <td>${s.email}</td>
                            </tr>
                        `
                    });
                    break;
                case 'admin':
                    thead += '<th>Name</th>';
                    thead += '<th>Email</th>';
                    this.users.forEach((u, i) => {
                        tbody += `
                            <tr>
                                <td>${Number(i) + 1}.</td>
                                <td>${u.name}</td>
                                <td>${u.email}</td>
                            </tr>
                        `
                    });
                    break;
                case 'category':
                    thead += '<th>Name</th>';
                    thead += '<th>Email</th>';
                    this.categories.forEach((c, ci) => {
                        tbody += `
                            <tr>
                                <td>${Number(ci) + 1}.</td>
                                <td>${c.name}</td>
                                <td>${c.description}</td>
                            </tr>
                        `
                    });
                    break;
                default:
                    break;
            }

            let contents = `
                <!doctype html>
                <html lang="en">
                    <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>${title}</title>
                    <style type="text/css" media="print">
                        @page {
                            size: auto; 
                            margin: 5mm;
                        }
                        @page :footer {
                            display: none
                        }
                    
                        @page :header {
                            display: none
                        }
                        body {
                            font-family: Arial, Helvetica, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                        
                        table {
                            width: 100%;
                            margin: auto;
                            border-collapse: collapse;
                            margin: 20px 0;
                            overflow: hidden;
                        }
                        thead tr th {
                            font-weight: 800;
                            padding: 0 2px;
                            border: 1px solid;
                        }
                        tbody tr td {
                            padding: 0 4px;
                            border: 1px solid;
                        }
                        tr:hover {
                            background-color: #f5f5f5;
                        }
                    </style>
                <body>
                        <h1 style="text-align: center;">${title}</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    ${thead}
                                </tr>
                            </thead>
                            <tbody>${tbody}</tbody>
                        </table>
                </body>
                </html>
            `;

            const windowWidth = 800;
            const windowHeight = 600;

            const windowLeft = (window.screen.width - windowWidth) / 2;
            const windowTop = (window.screen.height - windowHeight) / 2;

            const newWindow = window.open('', '_blank', `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`);          

            newWindow.document.write(contents);
            newWindow.print();
        }
    }
}