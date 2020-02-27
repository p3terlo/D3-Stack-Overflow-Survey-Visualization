function countryByCoord(latlng, popup, map, callbackFunc, dataByCountry) {

	const API_KEY = 'AIzaSyDLtDLB9g6MD1HKdNrdThZCAhjpqPD-aUo';
	const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng.lat + ',' + latlng.lng + '&result_type=country'+ '&key=' + API_KEY;
	const request = new Request(url, {method: 'POST'});
	var country;

	// Make API call to Google Geocoding API to convert coordinates (lat,lng) to country
	let callback = fetch(request)
		.then(response => {
			if(response.status === 200) {
				return response.json();
			} else {
				throw new Error('Something went wrong on API server');
			}
		})
		.then(function(data){

    		country = data.results[0].formatted_address;
    		let countryData = retrieveDataByName(country, dataByCountry);
    		let numResponses;

    		if (countryData !== undefined) {
    			numResponses = countryData.values.length;
    		} else {
    			numResponses = 'N/A'
    		}

			popup
		        .setLatLng(latlng)
		        .setContent(country + ": " + numResponses + " responses")
		        .openOn(map);

		     callbackFunc(country, countryData);
		});
}