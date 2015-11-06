var text = "";
var header = "Chave,MEEM,Atividade Fisica Total,Tempo Sentado,GDS,FES,MAN,Fraqueza Muscular,LAWTON,KATZ,CAAVD,TUG,CAMINHADA," +
    "MOS,Circunferencia 14,15,16,17,BERG,IDADE,RELOGIO,QUEDAS,FINDRISC,SCORED,Fragilidade\n";

$(document).ready(function() {
    if(isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
    }
});


function isAPIAvailable() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
    } else {
        // source: File API availability - http://caniuse.com/#feat=fileapi
        // source: <output> availability - http://html5doctor.com/the-output-element/
        document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        // 6.0 File API & 13.0 <output>
        document.writeln(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
        document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
        // 10.0 File API & 10.0 <output>
        document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        // ? File API & 5.1 <output>
        document.writeln(' - Safari: Not supported<br />');
        // ? File API & 9.2 <output>
        document.writeln(' - Opera: Not supported');
        return false;
    }
}

function exportToCsv() {
    window.open('data:text/csv;charset=utf-8,' + escape(header + text));
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];

    // read the file metadata
    var output = ''
    output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
    output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
    output += ' - FileSize: ' + file.size + ' bytes<br />\n';
    output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

    // read the file contents
    printTable(file);
    calculateVariables(file);

    // post the results
    $('#list').append(output);
}

//Abertura do arquivo
function printTable(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        var csv = event.target.result;
        //Leitura do CSV
        var data = $.csv.toArrays(csv);
        var html = '';
        for (var row in data) {
            html += '<tr>\r\n';
            for (var item in data[row]) {
                html += '<td>' + data[row][item] + '</td>\r\n';
            }
            html += '</tr>\r\n';
        }

        $('#contents').html(html);
    };
}

function calculateVariables(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event){
        var csv = event.target.result;
        var data = $.csv.toObjects(csv);
        var html = '<tr>\r\n<td>Chave</td>\r\n<td>MEEM</td>\r\n<td>Atividade Física</td>\r\n' +
            '<td>Tempo Sentado</td>\r\n<td>GDS</td>\r\n<td>FES</td>\r\n<td>MAN</td>\r\n<td>Fraqueza Muscular</td>\r\n' +
            '<td>Lawton</td>\r\n<td>Katz</td>\r\n<td>CAAVD</td>\r\n<td>TUG</td>\r\n<td>Caminhada</td>\r\n<td>MOS</td>\r\n' +
            '<td>Circunferência - 14</td>\r\n<td>Circunferência - 15</td>\r\n<td>Circunferência - 16</td>\r\n<td>Circunferência - 17</td>\r\n' +
            '<td>BERG</td>\r\n<td>Idade</td>\r\n<td>Relógio</td>\r\n<td>Quedas</td>\r\n<td>Findrisc</td>\r\n<td>Scored</td>\r\n<td>Fragilidade</td>';

        for (var row in data) {
            html += '<tr>\r\n';
            var nchave = data[row]['Chave'];
            text += nchave + ",";
            html += '<td>' + nchave + '</td>\r\n';

            //MEEM
            var nmeem = Number(data[row]['B2']) + Number(data[row]['B3']) + Number(data[row]['B4']) + Number(data[row]['B5']) +
                Number(data[row]['B6']) + Number(data[row]['B7']) + Number(data[row]['B8']) + Number(data[row]['B9']) +
                Number(data[row]['B10']) + Number(data[row]['B11']) + Number(data[row]['B12a']) + Number(data[row]['B12b']) +
                Number(data[row]['B12c']) + Number(data[row]['B13a']) + Number(data[row]['B13b']) + Number(data[row]['B13c']) +
                Number(data[row]['B13d']) + Number(data[row]['B13e']) + Number(data[row]['B14a']) + Number(data[row]['B14b']) +
                Number(data[row]['B14c']) + Number(data[row]['B15']) + Number(data[row]['B16']) + Number(data[row]['b17']) +
                Number(data[row]['B18a']) + Number(data[row]['B18b']) + Number(data[row]['B18c']) + Number(data[row]['B19']) +
                Number(data[row]['B20']) + Number(data[row]['B21']);
            text += nmeem + ",";
            html += '<td>' + nmeem + '</td>\r\n';
            //Atividade Fisica - Verificar os campos
            var naftotal =
                /*AF transporte*/
                (Number(data[row]['C34b']) * (Number(data[row]['C34c1']) * 60 + Number(data[row]['C34c2']))) +
                (Number(data[row]['C34d']) * (Number(data[row]['C34e1']) * 60 + Number(data[row]['C34e2']))) +
                /*AF lazer*/
                (Number(data[row]['C36']) * (Number(data[row]['C36a1']) * 60 + Number(data[row]['C36a2']))) +
                (Number(data[row]['C36b']) * (Number(data[row]['C36c1']) * 60 + Number(data[row]['C36c2']))) +
                (Number(data[row]['C36d']) * (Number(data[row]['C36e1']) * 60 + Number(data[row]['C36e2'])));
            text += naftotal + ",";
            html += '<td>' + naftotal + '</td>\r\n';

            //Tempo sentado
            var ntsentado = (Number(data[row]['C371']) * 60 + Number(data[row]['C372']) +
                Number(data[row]['C381']) * 60 + Number(data[row]['C382'])) / 2;
            text += ntsentado + ",";
            html += '<td>' + ntsentado + '</td>\r\n';

            //GDS
            var ngds = Number(data[row]['C14a']) + Number(data[row]['C14b']) + Number(data[row]['C14c']) +
                Number(data[row]['C14d']) + Number(data[row]['C14e']) + Number(data[row]['C14f']) +
                Number(data[row]['C14g']) + Number(data[row]['C14h']) + Number(data[row]['C14i']) +
                Number(data[row]['C14j']) + Number(data[row]['C14k']) + Number(data[row]['C14l']) +
                Number(data[row]['C14m']) + Number(data[row]['C14n']) + Number(data[row]['C14o']);
            text += ngds + ",";
            html += '<td>' + ngds + '</td>\r\n';

            //FES
            var nfes = 0;
            for(var aux = 1; aux < 17; aux++) {
                var field = "C25f" + aux;
                nfes += Number(data[row][field]);
            }
            text += nfes + ",";
            html += '<td>' + nfes + '</td>\r\n';

            //MAN
            var a;
            if(Number(data[row]['C23a']) == 1){
                if(Number(data[row]['C23b']) >= 3)
                    a = 0;
                else if(Number(data[row]['C23b']) >= 1 && Number(data[row]['C23b']) < 3)
                    a = 2;
            } else if(Number(data[row]['C23a']) == 98 || Number(data[row]['C23a']) == 99)
                a = 1;
            else a = 0;
            var imc;
            if (Number(data[row]['I5']) != 0)
                imc = Number(data[row]['I8']) / Number(data[row]['I5']);
            else
                imc = 0;
            var nman = Number(data[row]['C39']) + a + Number(data[row]['C40']) +
                Number(data[row]['C41']) + Number(data[row]['C42']) + imc;

            console.log("Teste " + nchave + " number: a - " + a + " imc - " + imc);

            text += nman.toFixed(2) + ",";
            html += '<td>' + nman.toFixed(2) + '</td>\r\n';

            //Fraqueza Muscular
            var nmkfg = (Number(data[row]['I4a2']) + Number(data[row]['I4b2']) + Number(data[row]['I4c2']))/3;
            text += nmkfg.toFixed(2) + ",";
            html += '<td>' + nmkfg.toFixed(2) + '</td>\r\n';

            //Lawton
            var nlawton = 0;
            for(var aux = 14; aux < 21; aux++) {
                var field = "D" + aux;
                nlawton += 3 - Number(data[row][field]);
            }
            text += nlawton + ",";
            html += '<td>' + nlawton + '</td>\r\n';

            //KATZ
            var nkatz = 0;
            for(var aux = 22; aux < 28; aux++) {
                var field = "D" + aux;
                if(Number(data[row][field]) != 0)
                    nkatz += 1;
            }
            text += nkatz + ",";
            html += '<td>' + nkatz + '</td>\r\n';

            //CAAVD
            var ncaavd = 0;
            for (var aux = 2; aux < 14; aux++) {
                var field = "D" + aux;
                ncaavd += Number(data[row][field]);
            }
            text += ncaavd + ",";
            html += '<td>' + ncaavd + '</td>\r\n';

            //TUG
            var ntug = Number(data[row]['I12d']);
            text += ntug + ",";
            html += '<td>' + ntug + '</td>\r\n';

            //Caminhada
            var ncaminhada = (Number(data[row]['I12a']) + Number(data[row]['I12b']) + Number(data[row]['I12c']))/3;
            text += ncaminhada.toFixed(2) + ",";
            html += '<td>' + ncaminhada.toFixed(2) + '</td>\r\n';

            //MOS
            var nmos = 0;
            for (var aux = 'a'; aux < 't'; aux++) {
                var field = 'E1' + aux;
                nmos += Number(data[row][field]);
            }
            text += nmos + ",";
            html += '<td>' + nmos + '</td>\r\n';

            //Circunferencia
            var nc14 = Number(data[row]['I7a']);
            text += nc14 + ",";
            html += '<td>' + nc14 + '</td>\r\n';
            var nc15 = Number(data[row]['I7b']);
            text += nc15 + ",";
            html += '<td>' + nc15 + '</td>\r\n';
            var nc16 = Number(data[row]['I6']);
            text += nc16 + ",";
            html += '<td>' + nc16 + '</td>\r\n';
            var nc17 = Number(data[row]['I7']);
            text += nc17 + ",";
            html += '<td>' + nc17 + '</td>\r\n';

            //BERG
            var nberg = Number(data[row]['I13t']);
            text += nberg + ",";
            html += '<td>' + nberg + '</td>\r\n';

            //Idade
            var nidade = Number(data[row]['A1b']);
            text += nidade + ",";
            html += '<td>' + nidade + '</td>\r\n';

            //Relogio
            var nrelogio = Number(data[row]['B1']);
            text += nrelogio + ",";
            html += '<td>' + nrelogio + '</td>\r\n';

            //Quedas
            var nquedas = Number(data[row]['C25a']);
            text += nquedas + ",";
            html += '<td>' + nquedas + '</td>\r\n';

            //Findrisc
            var nfindrisc = 0;
                //1 - Idade
            if (nidade >= 60 && nidade <= 64)
                nfindrisc += 3;
            else nfindrisc +=4;
                //2 - IMC
            if (imc >= 25 && imc <= 30)
                nfindrisc += 1;
            else if (nfindrisc > 30)
                nfindrisc += 3;
                //3 - Circunferencia
            if(Number(data[row]['Sexo']) == 0){
                if(nc16 >= 94 && nc16 <= 102)
                    nfindrisc += 3;
                else if(nc16 > 102)
                    nfindrisc += 4;
            } else {
                if (nc16 >= 80 && nc16 <= 88)
                    nfindrisc += 3;
                else if (nc16 > 88)
                    nfindrisc += 4;
            }
                //4
            if (Number(data[row]['C38a']) == 2)
                nfindrisc += 2;
                //5
            if (Number(data[row]['C47']) == 0)
                nfindrisc += 2;
                //6
            if (Number(data[row]['F13']) == 1)
                nfindrisc += 2;
                //7
            if (Number(data[row]['C10']) == 1)
                nfindrisc += 2;
                //8
            if (Number(data[row]['C10b']) == 1)
                nfindrisc += 3;
            else if (Number(data[row]['C10b']) == 2)
                nfindrisc += 5;

            text += nfindrisc + ",";
            html += '<td>' + nfindrisc + '</td>\r\n';

            //Scored
            var nscored = 0;

                //1 - Idade
            if (nidade >= 60 && nidade <= 69)
               nscored += 3;
            else if (nidade >= 70)
                nscored += 4;
                //2 - Sexo
            nscored += Number(data[row]['Sexo']);
                //3
            if (Number(data[row]['C11']) != 98 && Number(data[row]['C11']) != 99)
                nscored++;
                //4
            if (Number(data[row]['C7']) != 98 && Number(data[row]['C7']) != 99)
                nscored++;
                //5
            if (Number(data[row]['C10']) != 98 && Number(data[row]['C10']) != 99)
                nscored++;
                //6
            if (Number(data[row]['C6']) != 98 && Number(data[row]['C6']) != 99)
                nscored++;
                //7
            if (Number(data[row]['C6a']) != 98 && Number(data[row]['C6a']) != 99)
                nscored++;
                //8
            if (Number(data[row]['C6b']) != 98 && Number(data[row]['C6b']) != 99)
                nscored++;
                //9
            if (Number(data[row]['C7c']) != 98 && Number(data[row]['C7c']) != 99)
                nscored++;

            text += nscored;
            html += '<td>' + nscored + '</td>\r\n';

            //Fragilidade
            var nfrag = 0;
            var resultfrag;
            if(Number(data[row]['C23a']) == 1) {
                if (Number(data[row]['C23b']) >= 3)
                    nfrag++;
            }
            if (Number(data[row]['C29']) == 1)
                nfrag++;
            if (Number(data[row]['I1']) == 0)
                nfrag++;
            if (Number(data[row]['I9']) == 0)
                nfrag++;
            if (Number(data[row]['C14p']) == 1 || Number(data[row]['C14p']) == 2 || Number(data[row]['C14p']) == 3)
                nfrag++;
            if (Number(data[row]['C14q']) == 1 || Number(data[row]['C14q']) == 2 || Number(data[row]['C14q']) == 3)
                nfrag++;

            if (nfrag == 0)
                resultfrag = "N";
            else if (nfrag == 1 || nfrag == 2)
                resultfrag = "P";
            else
                resultfrag = "F";

            text += "," + resultfrag + "\n";
            html += '<td>' + resultfrag + '</td>\r\n';

            html += '</tr>\r\n';

        }
        $('#results').html(html);
    };

}