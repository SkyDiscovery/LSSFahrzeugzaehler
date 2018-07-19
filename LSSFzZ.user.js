// ==UserScript==
// @name         LSS Fahrzeugzähler
// @version      0.5.3
// @description  Zählt die noch benötigten Fahrzeuge bei einer GSL o.ä.
// @author       accessburn
// @include      *://www.leitstellenspiel.de/missions/*
// @updateURL    https://github.com/accessburn/LSSFahrzeugzaehler/raw/master/LSSFzZ.user.js
// @downloadURL  https://github.com/accessburn/LSSFahrzeugzaehler/raw/master/LSSFzZ.user.js
// @run          document-start
// ==/UserScript==

var node = document.getElementsByClassName('alert alert-danger')[0]; // rotes Div auslesen
var nurcontent = node.textContent; // Nur Text, kein HTML extrahieren
if (nurcontent.indexOf("Wir") == "-1" || nurcontent.indexOf("Gefangene") == "-1") // Auf das Stichwort prüfen um RTW, Gefangene o.ä. zu ignorieren
{
    nurcontent.replace('Zusätzlich benötigte Fahrzeuge: ', ''); // Anfangstext entfernen
    var array_Fahrzeug = nurcontent.slice(38).split(','); // Array anlegen
    var NurDieZahl = '0';
    var AnzahlFahrzeuge = 0;
    array_Fahrzeug.forEach(function(einArrayElement)
    {
        NurDieZahl = einArrayElement.split(' ');
        if (isNaN(parseInt(NurDieZahl[1]))) // Auf Zahl prüfen
        {
            // Keine Zahl
        } else {
            AnzahlFahrzeuge = AnzahlFahrzeuge + parseInt(NurDieZahl[1]);
        }
    });
    if (AnzahlFahrzeuge == 1)
    {
        var Textausgabe = "Es fehlt nur noch " + AnzahlFahrzeuge + " Fahrzeug!";
    } else {
        var Textausgabe = "Es fehlen noch " + AnzahlFahrzeuge + " Fahrzeuge!";
    }
    document.getElementsByClassName('alert alert-danger')[0].innerHTML = node.textContent + "<hr />" + Textausgabe;
}


