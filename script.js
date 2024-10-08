// script.js
let originalTopChampions, originalJungleChampions, originalMidChampions, originalAdcChampions, originalSuportChampions;

function initializeChampionLists() {
    originalTopChampions = [
        "Aatrox", "Aurora", "Camille", "Darius", "Fiora", "Garen", "Irelia",
        "Jax", "Kled", "Renekton", "Riven", "Sett", "Tryndamere", "Urgot",
        "Yasuo", "Yone", "Cho'Gath", "Dr. Mundo", "Gnar", "Malphite", "Maokai",
        "Ornn", "Sion", "Shen", "Singed", "Mordekaiser", "Rumble", "Sylas", "Teemo", "Vladimir",
        "Akali", "Gangplank", "Jayce", "Kayle", "Quinn", "Rengar", "Vayne", "Gwen", "Illaoi",
        "Kennen", "Nasus", "Pantheon", "Ryze", "Volibear", "Wukong", "Yorick"
    ];

    originalJungleChampions = [
        "Amumu", "Bel'Veth", "Diana", "Dr. Mundo", "Elise", "Evelynn", "Ekko",
        "Fiddlesticks", "Gragas", "Graves", "Hecarim", "Ivern", "Jarvan IV", "Jax",
        "Kayn", "Kha'Zix", "Kindred", "Lee Sin", "Lillia", "Maokai", "Master Yi",
        "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Poppy", "Rammus", "Rek'Sai",
        "Rengar", "Sejuani", "Shaco", "Shyvana", "Skarner", "Taliyah", "Trundle",
        "Udyr", "Vi", "Viego", "Warwick", "Wukong", "Xin Zhao", "Zac", "Karthus", "Volibear"
    ];

    originalMidChampions = [
        "Ahri", "Akali", "Aurora", "Anivia", "Annie", "Aurelion Sol", "Azir",
        "Brand", "Cassiopeia", "Corki", "Diana", "Ekko", "Fizz", "Galio",
        "Gragas", "Heimerdinger", "Irelia", "Kassadin", "Katarina", "LeBlanc",
        "Lissandra", "Lux", "Malzahar", "Neeko", "Orianna", "Qiyana", "Ryze",
        "Seraphine", "Sylas", "Syndra", "Taliyah", "Talon", "Twisted Fate", "Veigar",
        "Vel'Koz", "Vex", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Ziggs", "Zoe"
    ];

    originalAdcChampions = [
        "Aphelios", "Ashe", "Caitlyn", "Draven", "Ezreal", "Jhin", "Jinx",
        "Kai'Sa", "Kalista", "Kog'Maw", "Lucian", "Miss Fortune", "Samira",
        "Senna", "Sivir", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Zeri"
    ];

    originalSuportChampions = [
        "Alistar", "Amumu", "Bard", "Brand", "Blitzcrank", "Braum", "Janna",
        "Karma", "Leona", "Lulu", "Lux", "Morgana", "Nami", "Nautilus", "Pyke",
        "Rakan", "Rell", "Renata Glasc", "Seraphine", "Sona", "Soraka", "Swain",
        "Tahm Kench", "Taric", "Thresh", "Yuumi", "Zilean", "Zyra"
    ];

    // Tenta restaurar as listas do localStorage
    restoreChampionLists();
}

function rafflePlayers() {
    let topChampions = [...originalTopChampions];
    let jungleChampions = [...originalJungleChampions];
    let midChampions = [...originalMidChampions];
    let adcChampions = [...originalAdcChampions];
    let suportChampions = [...originalSuportChampions];

    const positions = ['Top', 'Jungle', 'Mid', 'Adc', 'Suporte'];
    shuffleArray(positions);

    let names = [];
    for (let i = 1; i <= 5; i++) {
        names.push(document.getElementById(`name${i}`).value);
    }

    let resultsHTML = "";
    names.forEach((name, index) => {
        switch (positions[index]) {
            case 'Top':
                shuffleArray(topChampions);
                const topChampion = topChampions.pop(); // Remove o campeão sorteado
                resultsHTML += `<p>${name} - ${positions[index]} - ${topChampion}</p>`;
                break;

            case 'Jungle':
                shuffleArray(jungleChampions);
                const jungleChampion = jungleChampions.pop();
                resultsHTML += `<p>${name} - ${positions[index]} - ${jungleChampion}</p>`;
                break;

            case 'Mid':
                shuffleArray(midChampions);
                const midChampion = midChampions.pop();
                resultsHTML += `<p>${name} - ${positions[index]} - ${midChampion}</p>`;
                break;

            case 'Adc':
                shuffleArray(adcChampions);
                const adcChampion = adcChampions.pop();
                resultsHTML += `<p>${name} - ${positions[index]} - ${adcChampion}</p>`;
                break;

            case 'Suporte':
                shuffleArray(suportChampions);
                const suportChampion = suportChampions.pop();
                resultsHTML += `<p>${name} - ${positions[index]} - ${suportChampion}</p>`;
                break;
        }
    });

    document.getElementById('results').style.display = "block";
    document.getElementById('results').innerHTML = resultsHTML;

    // Salva as listas atualizadas no localStorage
    saveChampionLists(topChampions, jungleChampions, midChampions, adcChampions, suportChampions);
}

function resetChampionLists() {
    initializeChampionLists();
    document.getElementById('results').innerHTML = "";

    // Reseta as listas no localStorage
    saveChampionLists(originalTopChampions, originalJungleChampions, originalMidChampions, originalAdcChampions, originalSuportChampions);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Salva as listas de campeões no localStorage
function saveChampionLists(top, jungle, mid, adc, suport) {
    localStorage.setItem('topChampions', JSON.stringify(top));
    localStorage.setItem('jungleChampions', JSON.stringify(jungle));
    localStorage.setItem('midChampions', JSON.stringify(mid));
    localStorage.setItem('adcChampions', JSON.stringify(adc));
    localStorage.setItem('suportChampions', JSON.stringify(suport));
}

// Restaura as listas de campeões do localStorage
function restoreChampionLists() {
    if (localStorage.getItem('topChampions')) {
        originalTopChampions = JSON.parse(localStorage.getItem('topChampions'));
        originalJungleChampions = JSON.parse(localStorage.getItem('jungleChampions'));
        originalMidChampions = JSON.parse(localStorage.getItem('midChampions'));
        originalAdcChampions = JSON.parse(localStorage.getItem('adcChampions'));
        originalSuportChampions = JSON.parse(localStorage.getItem('suportChampions'));
    }
}

// Inicializa as listas de campeões ao carregar o script
initializeChampionLists();
