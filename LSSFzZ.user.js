// ==UserScript==
// @name         LSS Fahrzeugzähler
// @version      0.3
// @description  Zählt die noch benötigten Fahrzeuge bei einer GSL o.ä.
// @author       accessburn
// @include      *://www.leitstellenspiel.de/missions/*
// @updateURL    https://github.com/accessburn/LSSFahrzeugzaehler/blob/master/LSSFzZ.user.js
// @downloadURL  https://github.com/accessburn/LSSFahrzeugzaehler/blob/master/LSSFzZ.user.js
// @run          document-start
// ==/UserScript==

var node = document.getElementsByClassName('alert alert-danger')[0]; // rotes Div auslesen
var nurcontent = node.textContent;                                   // Nur Text, kein HTML extrahieren
nurcontent.replace('Zusätzlich benötigte Fahrzeuge: ', '');          // Anfangstext entfernen
var array_Fahrzeug = nurcontent.slice(38).split(',');                // Array anlegen

var NurDieZahl = '0';
var AnzahlFahrzeuge = 0;
array_Fahrzeug.forEach(function(einArrayElement) {
    NurDieZahl = einArrayElement.split(' ');
    if (isNaN(parseInt(NurDieZahl[1])))
    {
        // Keine Zahl
    } else {
        alert(NurDieZahl[1]);
        AnzahlFahrzeuge = AnzahlFahrzeuge + parseInt(NurDieZahl[1]);
    }
});
document.getElementsByClassName('alert alert-danger')[0].innerHTML = node.textContent + "<hr />Es fehlen " + AnzahlFahrzeuge + " Fahrzeuge!";
