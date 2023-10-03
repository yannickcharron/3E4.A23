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
    }

  } catch (err) {
    console.log(err);
  }
}
