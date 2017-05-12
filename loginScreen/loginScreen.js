'use strict';

var dataBaseUrl = 'http://localhost:8080/webapi';

function login() {
    var studieNr = document.getElementById('studieNrInput').value;
    var password = document.getElementById('passwordInput').value;

    $.ajax({
        url: 'http://localhost:8080/webapi/brugerautorisation/hentBruger=' + studieNr + '+' + password,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            if (data != null) {
                    var studieNavn = data.fornavn.toString() + ' ' + data.efternavn.toString();
                    isUserCreated(studieNr, studieNavn);
            } else {
                alert("Wrong password");
            }
        },
        error: function () {
            alert("Username / Password combination not found!");
        }
    });
}

function isUserCreated(studieNr, studieNavn) {

    $.ajax({
        url: dataBaseUrl + '/database/getUser=' + studieNr,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            if(data.toString().length > 2) {
                window.location = "../profileViewer/profileViewer.html?" + 'studieNr=' + studieNr + '+studieNavn=' + studieNavn;
            } else {
                window.location = "../SignUp/Signup.html?" + 'studieNr=' + studieNr + '+studieNavn=' + studieNavn;
            }
        },
        error: function () {

        }
    });

}

function checkKey() {
    $(function() {
        $('#passwordEnter').on('click', function () {
            login();
        });

        $("#passwordInput").keyup(function(event){
            if(event.keyCode == 13){
                login();
            }
        });

    });
}