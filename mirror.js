// De pas-app is driehonderd kilobyte javascript op een ander domein, en zolang die
// binnenkomt en uitgevoerd wordt, komt de browser niet toe aan het tekenen van deze
// pagina. Op de Hoet-spiegel viel het eerste beeld daardoor op 4,5 seconden voor een
// kop van twee kilobyte; met het iframe na het load-event werd dat 1,7.
//
// Zonder javascript staat het iframe er meteen: dan is er ook geen bundel die de
// hoofddraad bezet houdt.
addEventListener('load', function () {
    var frame = document.getElementById('mirror');
    frame.src = frame.dataset.src;
});
