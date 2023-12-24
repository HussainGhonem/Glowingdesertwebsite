// mod-pages.js

function loadModPage(modId) {
    // Load mod content dynamically based on modId
    var modTitle, modDescription, modReleaseDate, modGame;

    // Update the mod content based on modId
    switch (modId) {
        case '00001':
            modTitle = "CK2 Republic Army & Loyalist Militia";
            modDescription = "The mod contains 2 decisions The first one is just for Republic governments which is raise a number of 500 solider for an amount of cash The second is...";
            modReleaseDate = "Aug 5 2019";
            modGame = "Crusader King II";
            break;

        case '00002':
            modTitle = "EUIV Phoenix mod";
            modDescription = "Restore ancient Egypt and change history, dive into the culture and religion. This mod will change the middle eastern gameplay forever in EUIV please notice...";
            modReleaseDate = "TBD";
            modGame = "Europa Universalis IV";
            break;

        // Add cases for other modIds if needed

        default:
            modTitle = "";
            modDescription = "";
            modReleaseDate = "";
            modGame = "";
    }

    // Update the content on the mod page
    document.getElementById('modTitle').innerText = modTitle;
    document.getElementById('modDescription').innerText = modDescription;
    document.getElementById('modReleaseDate').innerText = modReleaseDate;
    document.getElementById('modGame').innerText = modGame;
}
