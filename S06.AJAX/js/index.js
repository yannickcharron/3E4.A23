const SERVICE_URL = 'https://api.andromia.science/planets'

//$(document).ready(function() {});
$(document).ready(() => {
    console.log('JQuery fonctionne');
    retrieveAllPlanet();
});

async function retrieveAllPlanet() {
    try {
        const response = await axios.get(SERVICE_URL);
        console.log(response);
    } catch(err) {
        console.log(err);
    }
}