d3.csv('./data/developer_survey_2019/survey_results_public.csv', function(d) {
	// console.log(d[88882].Country);
	// console.log(d.length);

	let data = d;
	// console.log('data = ', data);
	let dataByCountry = d3.nest()
		.key(function(d){ return d.Country; })
		.entries(data);

	// Sort by alphabetical order of country name
	dataByCountry.sort(function(a,b) {
		let x = a.key;
		let y = b.key;
		return x < y ? -1 : x > y ? 1 : 0;
	})

	// number of responses per country
	//console.log(dataByCountry[0].values.length);


	// Store GeoJSON file in Javascript object
	function fetchJSON(url) {
		return fetch(url)
			.then(function(response) {
				return response.json();
			});
	}

	// Store number of responses in CSV file as a 'responses' property in GeoJSON file -> Javascript object
	let geoData = fetchJSON('./data/countries.geo.json')
		.then(function(data) {
			data.features.forEach(function(feature) {
				// console.log(feature);
				// console.log(feature.properties.name);
				
				for (let i = 0; i < dataByCountry.length; i++) {
					if (compareNames(feature.properties.name, dataByCountry[i].key)) {
						feature.properties.responses = dataByCountry[i].values.length;
					}
				}

			})
			generateMap(data, dataByCountry);

			// console.log("geoJSON data = ", data);
			// console.log("dataByCountry = ", dataByCountry);
		});

});

function initCharts() {
	// radarChart = new RadarChart(d3.select('.radarChart'))
}
