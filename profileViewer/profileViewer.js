'use strict';

var Navn, StudieNr, LeagueName, LeagueLevel, DiscordName, SkypeName, SteamName, MainRole, OffRole;
var lolRankPicture;
var urlToWS = 'http://localhost:8080/webapi';
var profileIconID;

function updateButton() {
    document.getElementById('searchProfile').value = LeagueName;
    updatePage(LeagueName);

}

function onStartUp() {
    var urlString = window.location.toString();

    var studieNr = urlString.substring(urlString.indexOf('studieNr=') + 'studieNr='.length, urlString.indexOf('+'));
    var studieNavn = urlString.substring(urlString.indexOf('studieNavn=') + 'studieNavn='.length);
    studieNavn = studieNavn.replace("%20", " ").replace("%20", " ");

    document.getElementById('studieInfo').innerHTML = studieNavn + ' - ' + studieNr;
}

function updatePage(userName) {
    loadLeague();
    loadUserData();
    document.getElementById('searchProfile').value = "";
}
function loadUserData() {
    $.ajax({
        url: urlToWS + '/league/getBasic=' + document.getElementById("searchProfile").value,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            var obj = JSON.parse(data);
            $.each(obj, function (i, item) {
                LeagueName = item.name.toString();
                LeagueLevel = item.summonerLevel.toString();
                profileIconID = item.profileIconId.toString();

                document.getElementById('lolProfileImage').src = 'http://ddragon.leagueoflegends.com/cdn/7.9.2/img/profileicon/' + profileIconID + '.png';
                document.getElementById('summonerName').innerHTML = LeagueName + "   -   " +'Level: ' + LeagueLevel;

                document.getElementsByClassName('lol_rolesdesc').item(0).innerHTML = "Mainrole: <br>" + MainRole;
                document.getElementsByClassName('lol_rolesdesc').item(1).innerHTML = "Offrole: <br>" + OffRole;
            });
        }

    });


}

function loadLeague() {
    $.ajax({
        url: urlToWS + '/league/getLeagues=' + document.getElementById("searchProfile").value,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            var obj = JSON.parse(data);

            if(data.toString().length > 100) {
                $.each(obj, function (i, item) {
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
            } else {
                document.getElementById('lolRankImage').src = '../Image/base-icons/provisional.png';
                document.getElementById('lolRankText').innerHTML = "Unranked";
                document.getElementById('lolFlexRankImage').src = '../Image/base-icons/provisional.png';
                document.getElementById('lolFlexRankText').innerHTML = "Unranked";
            }

        },

        error: function () {
            alert("Error: Failed to contact League of Legends API!");
        }
    });

}
