'use strict';

function login() {
    var studieNr = document.getElementById('studieNrInput').value;
    var password = document.getElementById('passwordInput').value;

    $.ajax({
        url: 'http://ubuntu4.javabog.dk:15366/webservice_war/webapi/brugerautorisation/hentBruger=' + studieNr + '+' + password,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            if (data != null) {
                window.location = "../profileViewer/profileViewer.html";
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
                $("#passwordEnter").click();
            }
        });

    });
}