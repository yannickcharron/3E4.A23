const urlParams = {};
(window.onpopstate = function () {
  let match;
  const pl = /\+/g; // Regex for replacing addition symbol with a space
  const search = /([^&=]+)=?([^&]*)/g;
  const decode = function (s) {
    return decodeURIComponent(s.replace(pl, ' '));
  };
  const query = window.location.search.substring(1);

  while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(() => {
  const hrefPlanet = urlParams.planet; //.planet est le nom du paramètre que j'ai choisi dans index.js
  retrievePlanet(hrefPlanet);
});

async function retrievePlanet(href) {
  try {
    const response = await axios.get(href);
    if(response.status === 200) {
        const planet = response.data;
        console.log(planet);

        $('#imgIcon').attr('src', planet.icon);
        $('#lblName').html(planet.name);
        $('#lblDiscoveredBy').html(planet.discoveredBy);
        $('#lblDiscoveryDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        $('#lblPosition').html(`(${planet.position.x.toFixed(3)} ; ${planet.position.y.toFixed(3)} ; ${planet.position.z.toFixed(3)} )`);
        
        //Satellites
        const satellites = planet.satellites;
        if(satellites.length === 0) {
          $('#satellites').append(`Aucun satellite`); 
        }

        satellites.forEach(s => {
          $('#satellites').append(`<li>${s}</li>`);          
        });

        //Portals
        displayPortals(planet.portals);

    }

  } catch (err) {
    console.log(err);
  }
}

function displayPortals(portals) {

  portals.forEach(p => {
    const portalHtml = `<tr><td>${p.position}</td><td><img class="imgAffinityPortal" src="img/${p.affinity}.svg" alt="${p.affinity}" /></td></tr>`;
    $("#portals").append(portalHtml);
  });
}
