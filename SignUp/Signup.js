'use strict';

function createAccount(studieNr, studieNavn) {

    var theUrl = 'http://ubuntu4.javabog.dk:15366/webservice_war/webapi/database';

    var username = document.getElementById('Username').value;
    var skype = document.getElementById('Skype').value;
    var discord = document.getElementById('Discord').value;
    var lolName = document.getElementById('Lolname').value;
    var mainRole = document.getElementById('Main').value;
    var offRole = document.getElementById('Off').value;
    console.log(theUrl + '/createUser=' + studieNr + '+' + username + '+' + skype + '+' + discord + '+' + lolName + '+' + mainRole + '+' + offRole);

    $.ajax({
        url: theUrl + '/createUser=' + studieNr + '+' + username + '+' + skype + '+' + discord + '+' + lolName + '+' + mainRole + '+' + offRole,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            window.location = "../profileViewer/profileViewer.html?" + 'studieNr=' + studieNr + '+studieNavn=' + studieNavn;
        },
        error: function () {
            window.location = "../profileViewer/profileViewer.html?" + 'studieNr=' + studieNr + '+studieNavn=' + studieNavn;
        }
    });


}