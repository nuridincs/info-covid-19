(function () {
	const init = function() {
		const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
	  if (isMobile === null) {
	    $('#footer').addClass('fix-footer')
	  }
		// fetchCovid();
		fetchCovidRealtime();
	};

	const fetchCovid = function() {
		fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Indonesia", {
	    "method": "GET",
	    "headers": {
	      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	      "x-rapidapi-key": "dcc1f5dea3msh6f73150e9884ac4p10f2dfjsn18ec02bdcf9a"
	    }
	  }).then((response) => {
	       return response.json();
	    })
	  .then(data => {
	    const confirmed = data.data.covid19Stats[0].confirmed;
	    const recovered = data.data.covid19Stats[0].recovered;
	    const deaths = data.data.covid19Stats[0].deaths;
	    const lastChecked = data.data.lastChecked;
	    const lastUpdate = data.data.covid19Stats[0].lastUpdate;
	    const country = data.data.covid19Stats[0].country;
	    const activeCare = confirmed - (recovered + deaths);

	    $('#confirmed').html(confirmed);
	    $('#recovered').html(recovered);
	    $('#deaths').html(deaths);
	    $('#lastUpdate').html(lastUpdate);
	    $('#activeCare').html(activeCare);
	  })
	  .catch(err => {
	    console.log(err);
	  });
	};

  const fetchCovidRealtime = function() {
  	fetch("https://kawalcovid19.harippe.id/api/summary", {
  		"method": "GET"
  	})
  	.then((response) => {
  		return response.json();
  	})
  	.then(data => {
  		const confirmed = data.confirmed.value;
	    const recovered = data.recovered.value;
	    const deaths = data.deaths.value;
	    const lastChecked = data.lastChecked;
	    const lastUpdate = data.metadata.lastUpdatedAt;
	    const country = data.country;
	    const activeCare = data.activeCare.value;
	    const lastUpdates = new Date(lastUpdate).toLocaleString();

	    $('#confirmed').html(confirmed);
	    $('#recovered').html(recovered);
	    $('#deaths').html(deaths);
	    $('#lastUpdate').html(lastUpdates);
	    $('#activeCare').html(activeCare);
  	})
  	.catch(err => {
  		console.log(err);
  	})
  };

	init();
})();