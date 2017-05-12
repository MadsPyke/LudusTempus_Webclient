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

    updatePage(studieNr);
}

function updatePage(studyNr) {
    if(studyNr.length == 7 && studyNr.charAt(0) == 's') {
        getSummonerName(studyNr);
        loadProfileInfo(studyNr);
    } else {
        loadLeague(document.getElementById("searchProfile").value);
        loadUserData(document.getElementById("searchProfile").value);
        document.getElementById('studieInfo').innerHTML = '';
        document.getElementById('DiscordName').innerHTML = '';
        document.getElementById('SkypeName').innerHTML = '';
        document.getElementsByClassName('lol_rolesdesc').item(0).innerHTML = '';
        document.getElementsByClassName('lol_rolesdesc').item(1).innerHTML = '';
    }
        document.getElementById('searchProfile').value = "";
}

function loadProfileInfo(studyNr) {

    // Name
    $.ajax({
        url: urlToWS + '/database/getUser=' + studyNr,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            document.getElementById('studieInfo').innerHTML = data.toString() + ' - ' + studyNr;
        },
        error: function () {

        }
    });

    // Discord
    $.ajax({
        url: urlToWS + '/database/getDiscord=' + studyNr,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            document.getElementById('DiscordName').innerHTML = 'Discord: ' + data.toString();
        },
        error: function () {

        }
    });

    // Skype
    $.ajax({
        url: urlToWS + '/database/getSkype=' + studyNr,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            document.getElementById('SkypeName').innerHTML = 'Skype: ' + data.toString();
        },
        error: function () {

        }
    });

    // Main role
    $.ajax({
        url: urlToWS + '/database/getMain=' + studyNr,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            switch(data.toString()) {
                case '1':
                    document.getElementsByClassName('lol_rolesdesc').item(0).innerHTML = "Mainrole: <br>" + 'Top';
                    break;
                case '2':
                    document.getElementsByClassName('lol_rolesdesc').item(0).innerHTML = "Mainrole: <br>" + 'Jungle';
                    break;
                case '3':
                    document.getElementsByClassName('lol_rolesdesc').item(0).innerHTML = "Mainrole: <br>" + 'Middle';
                    break;
                case '4':
                    document.getElementsByClassName('lol_rolesdesc').item(0).innerHTML = "Mainrole: <br>" + 'Bot';
                    break;
                case '5':
                    document.getElementsByClassName('lol_rolesdesc').item(0).innerHTML = "Mainrole: <br>" + 'Support';
                    break;
            }
        },
        error: function () {

        }
    });

    // Off role
    $.ajax({
        url: urlToWS + '/database/getOff=' + studyNr,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            switch(data.toString()) {
                case '1':
                    document.getElementsByClassName('lol_rolesdesc').item(1).innerHTML = "Offrole: <br>" + 'Top';
                    break;
                case '2':
                    document.getElementsByClassName('lol_rolesdesc').item(1).innerHTML = "Offrole: <br>" + 'Jungle';
                    break;
                case '3':
                    document.getElementsByClassName('lol_rolesdesc').item(1).innerHTML = "Offrole: <br>" + 'Middle';
                    break;
                case '4':
                    document.getElementsByClassName('lol_rolesdesc').item(1).innerHTML = "Offrole: <br>" + 'Bot';
                    break;
                case '5':
                    document.getElementsByClassName('lol_rolesdesc').item(1).innerHTML = "Offrole: <br>" + 'Support';
                    break;
            }
        },
        error: function () {

        }
    });
}

function getSummonerName(studyNr) {

    $.ajax({
        url: urlToWS + '/database/getSummoner=' + studyNr,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            loadLeague(data.toString());
            loadUserData(data.toString());
        },
        error: function () {

        }
    });
}

//2204

function loadUserData(leagueName) {
    $.ajax({
        url: urlToWS + '/league/getBasic=' + leagueName,
        dataType: 'text',
        type: 'get',
        success: function (data) {
            var obj = JSON.parse(data);
            $.each(obj, function (i, item) {
                LeagueName = item.name.toString();
                LeagueLevel = item.summonerLevel.toString();
                profileIconID = item.profileIconId.toString();

                document.getElementById('lolProfileImage').src = 'http://ddragon.leagueoflegends.com/cdn/7.9.2/img/profileicon/' + profileIconID + '.png';
                document.getElementById('summonerName').innerHTML = 'League info: ' + LeagueName + "   -   " +'Level: ' + LeagueLevel;
            });
        }
    });
}

function loadLeague(leagueName) {
    $.ajax({
        url: urlToWS + '/league/getLeagues=' + leagueName,
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
