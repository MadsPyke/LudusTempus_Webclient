'use strict';

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
                    window.location = "../profileViewer/profileViewer.html?" + 'studieNr=' + studieNr + '+studieNavn=' + studieNavn;
            } else {
                alert("Wrong password");
            }
        },
        error: function () {
            alert("Please enter values");
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