const ELEMENT_IMG_URL = 'https://assets.andromia.science/elements';

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

  //Click sur le bouton ajouter un portal
  $('#btnAddPortal').click(() => {
    addPortal();
  });

  $('#btnMiner').click(() => {
    minerPlanet();
  });

});

async function minerPlanet() {

  const url = `${urlParams.planet}/actions?type=mine`;

  try {
    const response = await axios.get(url);
    if(response.status === 200) {
      const elements = response.data;
      $('#extraction tbody').empty();
      elements.forEach(e => {
        const elementHtml = `<tr><td><img class="imgElement" src="${ELEMENT_IMG_URL}/${e.element}.png"></td><td>${e.quantity}</td></tr>`;
        $('#extraction').append(elementHtml);
      });

    }
 
  } catch(err) {
    console.log(err);
  }
}

async function addPortal() {

  const position = $('#txtPosition').val();
  const affinity = $('#cboAffinity').val();

  const body = {
    position: position,
    affinity: affinity
  }
  console.log(body);

  try {
    const url = `${urlParams.planet}/portals`
    const response = await axios.post(url, body);

    if(response.status === 201) {
      const portal = response.data;
      const portalHtml = `<tr><td>${portal.position}</td><td><img class="imgAffinityPortal" src="img/${portal.affinity}.svg" alt="${portal.affinity}" /></td></tr>`;
      $("#portals").prepend(portalHtml);
    } else {
      console.log(response);
    }

  } catch(err) {
    console.log(err);
  }

}

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
