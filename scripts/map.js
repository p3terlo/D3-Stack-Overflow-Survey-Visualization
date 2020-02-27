function generateMap(geoJSONobj, dataByCountry){
	// console.log(dataByCountry);
	var mymap = L.map('mapid').setView([0,0], 3);
	
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox/light-v10',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: MAPBOX_API_KEY
	}).addTo(mymap);

	// Init visualizations with two default countries: U.S. and India
	let twoCountries = [dataByCountry[172], dataByCountry[70]];

	let radarChart = new RadarChart(d3.select('.radarChart'), twoCountries);
	radarChart.draw();

	let parallelCoordinates = new ParallelCoordinates(d3.select('.parallelCoordinates'), twoCountries);
	







	function getColor(d) {
	    return d > 10000 ? '#800026' :
	           d > 5000  ? '#BD0026' :
	           d > 1000  ? '#E31A1C' :
	           d > 500  ? '#FC4E2A' :
	           d > 100   ? '#FD8D3C' :
	           d > 50   ? '#FEB24C' :
	           d > 0   ? '#FED976' :
	                      '#f0efeb';
	}

	function style(feature) {
		return {
			fillColor: getColor(feature.properties.responses),
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7
		};
	}

	function highlightFeature(e) {
	    var layer = e.target;

	    layer.setStyle({
	        weight: 5,
	        color: '#666',
	        dashArray: '',
	        fillOpacity: 0.7
	    });

	    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	        layer.bringToFront();
	    }
	}

	function resetHighlight(e) {
	    geojson.resetStyle(e.target);
	}

	function zoomToFeature(e) {
	    mymap.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
	    layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight,
	        click: zoomToFeature
	    });
	}

	geojson = L.geoJSON(geoJSONobj, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(mymap);







	let popup = L.popup();

	// Callback function to return country from API
	function getCountry(country, countryData) {
		// console.log('country = ' + country);
		// console.log('countryData = ', countryData);

		if (twoCountries.length === 2) {
			twoCountries.shift();
		}
		twoCountries.push(countryData);

		radarChart = new RadarChart(d3.select('.radarChart'), twoCountries);
		radarChart.draw();
		parallelCoordinates = new ParallelCoordinates(d3.select('.parallelCoordinates'), twoCountries);
	}

	function onMapClick(e, feature) {
		countryByCoord(e.latlng, popup, mymap, getCountry, dataByCountry);

	}

	mymap.on('click', onMapClick);

};