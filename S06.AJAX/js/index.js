const SERVICE_URL = 'https://api.andromia.science/planets'

//$(document).ready(function() {});
$(document).ready(() => {
    console.log('JQuery fonctionne');
    retrieveAllPlanet();
});

async function retrieveAllPlanet() {
    try {
        const response = await axios.get(SERVICE_URL);
        if(response.status === 200) {
            //OK
            const planets = response.data;
            displayPlanets(planets);
        }
    } catch(err) {
        console.log(err);
    }
}

function displayPlanets(planets) {
    planets.forEach(p => {
        $('#planets').append(displayPlanet(p));
    }); 
}

function displayPlanet(planet) {
    let htmlPlanet = '<div class="col-2 card m-2">';
    htmlPlanet += `<h5 class="card-title">${planet.name}</h5>`;
    htmlPlanet += '</div>';

    return htmlPlanet;
}