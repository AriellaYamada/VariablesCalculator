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
    reader.onload = function(event){
        var csv = event.target.result;
        //Leitura do CSV
        var data = $.csv.toArrays(csv);
        var html = '';
        for(var row in data) {
            html += '<tr>\r\n';
            for(var item in data[row]) {
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

        for (var row in data) {
            var nchave = data[row]['Chave'];
            console.log(nchave + "\n");
            //MEEM
            var nmeem = Number(data[row]['B2']) + Number(data[row]['B3']) + Number(data[row]['B4']) + Number(data[row]['B5']) +
                Number(data[row]['B6']) + Number(data[row]['B7']) + Number(data[row]['B8']) + Number(data[row]['B9']) +
                Number(data[row]['B10']) + Number(data[row]['B11']) + Number(data[row]['B12a']) + Number(data[row]['B12b']) +
                Number(data[row]['B12c']) + Number(data[row]['B13a']) + Number(data[row]['B13b']) + Number(data[row]['B13c']) +
                Number(data[row]['B13d']) + Number(data[row]['B13e']) + Number(data[row]['B14a']) + Number(data[row]['B14b']) +
                Number(data[row]['B14c']) + Number(data[row]['B15']) + Number(data[row]['B16']) + Number(data[row]['b17']) +
                Number(data[row]['B18a']) + Number(data[row]['B18b']) + Number(data[row]['B18c']) + Number(data[row]['B19']) +
                Number(data[row]['B20']) + Number(data[row]['B21']);
            console.log(nmeem);
            //Atividade Fisica - Verificar os campos
            /*var naftotal = (Number(data[row]['C34b']) * Number(data[row]['C34c'])) +
                (Number(data[row]['C34d']) * Number(data[row]['C34e']))
                (Number(data[row]['C36']) * Number(data[row]['C36a'])) +
                (Number(data[row]['C36b']) * Number(data[row]['C36c'])) +
                (Number(data[row]['C36d']) * Number(data[row]['C36e']));
            console.log(naftotal);*/
            //GDS
            var ngds = Number(data[row]['C14a']) + Number(data[row]['C14b']) + Number(data[row]['C14c']) +
                Number(data[row]['C14d']) + Number(data[row]['C14e']) + Number(data[row]['C14f']) +
                Number(data[row]['C14g']) + Number(data[row]['C14h']) + Number(data[row]['C14i']) +
                Number(data[row]['C14j']) + Number(data[row]['C14k']) + Number(data[row]['C14l']) +
                Number(data[row]['C14m']) + Number(data[row]['C14n']) + Number(data[row]['C14o']);

            console.log(ngds);

           /* var meem =
            atividadeFisica: ,
            tempoSentado: ,
            gds:,
            fes:,
            man:,
            fraquezaMuscular:,
            lawton:,
            katz:,
            caavd:,
            tug:,
            caminhada:,
            mos:,
            circunferencia:,
            berg:,
            idade:,
            relogio:,
            quedas:
            results[cont] = {};
*/
        }
    };

}