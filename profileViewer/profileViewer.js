'use strict';

var Navn, StudieNr, LeagueNavn, DiscordNavn, SkypeNavn, SteamNavn, MainRole, OffRole;
var lolRankPicture;


function myFunction1(n1, n2) {
    return n1 + n2;
}

function myFunction2() {
    window.alert("Not implemented yet! LUL!");
}

function faaStudieNr(val){
    return val + 1;
}

function updatePage(userName) {
    loadLeague();
}

function loadLeague() {
    $.ajax({
        url: 'http://localhost:8080/webapi/league/getLeagues=' + LeagueNavn,
        dataType: 'json',
        type: 'get',
        success: function (data) {
            $.each(data, function (i, item) {
                var tier = item[0].tier.toString();
                var division = item[0].entries[0].division.toString();
                lolRankPicture = tier.toLowerCase() + '_' + division.toLowerCase();
                document.getElementById('lolRankImage').src = '../Image/tier-icons/' + lolRankPicture + '.png';
                document.getElementById('lolRankText').innerHTML = lolRankPicture.toUpperCase().replace("_", " ");

                tier = item[1].tier.toString();
                division = item[1].entries[0].division.toString();
                lolRankPicture = tier.toLowerCase() + '_' + division.toLowerCase();
                document.getElementById('lolFlexRankImage').src = '../Image/tier-icons/' + lolRankPicture + '.png';
                document.getElementById('lolFlexRankText').innerHTML = lolRankPicture.toUpperCase().replace("_", " ");
            });
        },
        error: function () {
            document.getElementById('lolRankImage').src = '../Image/base-icons/provisional.png';
            document.getElementById('lolRankText').innerHTML = "Unranked";
            document.getElementById('lolFlexRankImage').src = '../Image/base-icons/provisional.png';
            document.getElementById('lolFlexRankText').innerHTML = "Unranked";
        }
    });

    document.getElementsByClassName('lol_rolesdesc').item(0).innerHTML = "Mainrole: <br>" + LeagueNavn;
    document.getElementsByClassName('lol_rolesdesc').item(1).innerHTML = "Offrole: <br>" + LeagueNavn;
}