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

        var size = data.length;

        var cont = 0;

        for (var i = 0; i < size; i++) {
            var chave = data[i]['Chave'];
            console.log(chave + "\n");
            var meem = Number(data[i]['B2']) + Number(data[i]['B3']) + Number(data[i]['B4']) + Number(data[i]['B5']) +
                Number(data[i]['B6']) + Number(data[i]['B7']) + Number(data[i]['B8']) + Number(data[i]['B9']) +
                Number(data[i]['B10']) + Number(data[i]['B11']) + Number(data[i]['B12a']) + Number(data[i]['B12b']) +
                Number(data[i]['B12c']) + Number(data[i]['B13a']) + Number(data[i]['B13b']) + Number(data[i]['B13c']) +
                Number(data[i]['B13d']) + Number(data[i]['B13e']) + Number(data[i]['B14a']) + Number(data[i]['B14b']) +
                Number(data[i]['B14c']) + Number(data[i]['B15']) + Number(data[i]['B16']) + Number(data[i]['b17']) +
                Number(data[i]['B18a']) + Number(data[i]['B18b']) + Number(data[i]['B18c']) + Number(data[i]['B19']) +
                Number(data[i]['B20']) + Number(data[i]['B21']);
            console.log(meem);

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