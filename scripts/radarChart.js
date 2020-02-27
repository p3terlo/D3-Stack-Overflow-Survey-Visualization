function RadarChart(svg,twoCountries) {

	// Prepare data before drawing chart
	console.log('twoCountries = ', twoCountries);

 	// Arrange country data by dev type responses
 	// Note that responses can vary: ex) 'Developer, front-end' refers to only those who identified as that, while 'Developer, front-end; Developer, back-end' refers to those who identify as both
 	// We take care of this problem in prepDevData and countDevType
 	let splitByDevType0 = d3.nest()
 		.key(function(d) {return d.DevType;})
 		.entries(twoCountries[0].values);

 	let splitByDevType1 = d3.nest()
 		.key(function(d) {return d.DevType;})
 		.entries(twoCountries[1].values);

 	// Create dictionary to keep track of how many dev types per country
 	let dict0 = [
 		{
 			country: ''
 		},
 		{
 			key: 'Developer, full-stack',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, back-end',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, front-end',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, desktop or enterprise applications',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, mobile',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Student',
 			value: 0,
 			percentage: 0
 		},
 		{ 	key: 'Database administrator',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Designer',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'System administrator',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'DevOps specialist',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, embedded applications or devices',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Data scientist or machine learning specialist',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, QA or test',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Data or business analyst',
 			value: 0,
 			percentage: 0
 		},
 		{ 	key: 'Academic researcher',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Engineer, data',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Educator',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, game or graphics',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Engineering manager',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Product manager',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Scientist',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Engineer, site reliability',
 			value: 0,
 			percentage: 0
 		},
 		{ 	key: 'Senior executive/VP',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Marketing or sales professional',
 			value: 0,
 			percentage: 0
 		}
 	];

  	let dict1 = [
  		{
 			country: ''
 		},
 		{
 			key: 'Developer, full-stack',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, back-end',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, front-end',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, desktop or enterprise applications',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, mobile',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Student',
 			value: 0,
 			percentage: 0
 		},
 		{ 	key: 'Database administrator',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Designer',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'System administrator',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'DevOps specialist',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, embedded applications or devices',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Data scientist or machine learning specialist',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, QA or test',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Data or business analyst',
 			value: 0,
 			percentage: 0
 		},
 		{ 	key: 'Academic researcher',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Engineer, data',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Educator',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Developer, game or graphics',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Engineering manager',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Product manager',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Scientist',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Engineer, site reliability',
 			value: 0,
 			percentage: 0
 		},
 		{ 	key: 'Senior executive/VP',
 			value: 0,
 			percentage: 0
 		},
 		{
 			key: 'Marketing or sales professional',
 			value: 0,
 			percentage: 0
 		}
 	];	
 	// console.log('dict = ', dict);
 	// console.log('splitByDevType = ', splitByDevType);
 	// console.log(splitByDevType[1].key.split(';'));

 	// Add country names to dict
 	dict0[0].country = twoCountries[0].key;
 	dict1[0].country = twoCountries[1].key;

 	prepDevData(splitByDevType0, dict0);
 	prepDevData(splitByDevType1, dict1);

 	calcPercentages(dict0, twoCountries[0].values.length);
 	calcPercentages(dict1, twoCountries[1].values.length);

 	// console.log('dict0 = ', dict0);
 	// console.log('dict1 = ', dict1);

 	// Draw chart
 	this.svg = svg;
	let boundingBox = svg.node().getBoundingClientRect();
    let svgHeight = boundingBox.height;
    let svgWidth = boundingBox.width;
    let margin = {top: 80, right: 10, bottom: 80, left: 10}

    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

	let country0Data = [];
	let country1Data = [];

	createAxisData(country0Data, dict0);
	createAxisData(country1Data, dict1);
	let data = [country0Data, country1Data];
	console.log('data = ', data);

	let color = d3.scaleOrdinal()
			.range(["#CC333F","#00A0B0"]);

	let maxValue = 0;
	for (let i = 0; i < country0Data.length; i++) {
		if (country0Data[i].value > maxValue) {
			maxValue = country0Data[i].value;
		}
	}
	for (let i = 0; i < country1Data.length; i++) {
		if (country1Data[i].value > maxValue) {
			maxValue = country1Data[i].value;
		}
	}

	let cfg = {
		w: width,
		h: height,
		margin: margin,
		maxValue: maxValue,
		levels: 4,
		roundStrokes: true,
		color: color,
		labelFactor: 1.3,
		wrapWidth: 60,
		opacityArea: 0.35,
		dotRadius: 4,
		opacityCircles: 0.1,
		strokeWidth: 2
	};

    this.draw = function() {
    	let allAxis = (data[0].map(function(i, j){return i.axis})),
    	total = allAxis.length,
    	radius = Math.min(cfg.w/2, cfg.h/2),
    	Format = d3.format('.0%'),
    	angleSlice = Math.PI * 2 / total;

    	let rScale = d3.scaleLinear()
			.range([0, radius])
			.domain([0, cfg.maxValue]);
    	
    	svg
    		.attr('width', svgWidth)
    		.attr('height', svgHeight)
    		.selectAll('*').remove();

    	let g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

		// Glow filter
		let filter = g.append('defs').append('filter').attr('id','glow'),
			feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
			feMerge = filter.append('feMerge'),
			feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
			feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');
    	
    	let axisGrid = g.append("g");

    	axisGrid.selectAll(".levels")
			.data(d3.range(1,(cfg.levels+1)).reverse())
		   	.enter()
			.append("circle")
			.attr("class", "gridCircle")
			.attr("r", function(d, i){return radius/cfg.levels*d;})
			.style("fill", "#CDCDCD")
			.style("stroke", "#CDCDCD")
			.style("fill-opacity", cfg.opacityCircles)
			.style("filter" , "url(#glow)");

		axisGrid.selectAll(".axisLabel")
			.data(d3.range(1,(cfg.levels+1)).reverse())
		   	.enter().append("text")
			.attr("class", "axisLabel")
			.attr("x", 4)
			.attr("y", function(d){return -d*radius/cfg.levels;})
			.attr("dy", "0.4em")
			.style("font-size", "10px")
			.attr("fill", "#737373")
			.text(function(d,i) { return Format( cfg.maxValue*d/cfg.levels ); });

		let axis = axisGrid.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

		axis.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", function(d, i){ return rScale(cfg.maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
			.attr("y2", function(d, i){ return rScale(cfg.maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
			.attr("class", "line")
			.style("stroke", "white")
			.style("stroke-width", "1px");

		axis.append("text")
			.attr("class", "prettyFont")
			.style("font-size", "10px")
			.attr("text-anchor", "middle")
			.attr("dy", "0.35em")
			.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
			.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
			.text(function(d){return d});
			// .call(wrap, cfg.wrapWidth);

		let radarLine = d3.radialLine()
			.radius(function(d) { return rScale(d.value); })
			.angle(function(d,i) { return i*angleSlice; })
			.curve(d3.curveLinearClosed);

		if(cfg.roundStrokes) {
			radarLine.curve(d3.curveCardinalClosed);
		}

		let blobWrapper = g.selectAll(".radarWrapper")
			.data(data)
			.enter().append("g")
			.attr("class", "radarWrapper");

		blobWrapper
			.append("path")
			.attr("class", "radarArea")
			.attr("d", function(d,i) { return radarLine(d); })
			.style("fill", function(d,i) { return cfg.color(i); })
			.style("fill-opacity", cfg.opacityArea)
			.on('mouseover', function (d,i){
			//Dim all blobs
			d3.selectAll(".radarArea")
			.transition().duration(200)
			.style("fill-opacity", 0.1); 
			//Bring back the hovered over blob
			d3.select(this)
			.transition().duration(200)
			.style("fill-opacity", 0.7);	
			})
			.on('mouseout', function(){
			//Bring back all blobs
			d3.selectAll(".radarArea")
			.transition().duration(200)
			.style("fill-opacity", cfg.opacityArea);
			});

		blobWrapper.append("path")
			.attr("class", "radarStroke")
			.attr("d", function(d,i) { return radarLine(d); })
			.style("stroke-width", cfg.strokeWidth + "px")
			.style("stroke", function(d,i) { return cfg.color(i); })
			.style("fill", "none")
			.style("filter" , "url(#glow)");

		blobWrapper.selectAll(".radarCircle")
			.data(function(d,i) { return d; })
			.enter().append("circle")
			.attr("class", "radarCircle")
			.attr("r", cfg.dotRadius)
			.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
			.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
			.style("fill", function(d,i,j) { return cfg.color(j); })
			.style("fill-opacity", 0.8);
	 
	 	let blobCircleWrapper = g.selectAll(".radarCircleWrapper")
			.data(data)
			.enter().append("g")
			.attr("class", "radarCircleWrapper");

		blobCircleWrapper.selectAll(".radarInvisibleCircle")
			.data(function(d,i) { return d; })
			.enter().append("circle")
			.attr("class", "radarInvisibleCircle")
			.attr("r", cfg.dotRadius*1.5)
			.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
			.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
			.style("fill", "none")
			.style("pointer-events", "all")
			.on("mouseover", function(d,i) {
				newX =  parseFloat(d3.select(this).attr('cx')) - 10;
				newY =  parseFloat(d3.select(this).attr('cy')) - 10;

				tooltip
					.attr('x', newX)
					.attr('y', newY)
					.text(Format(d.value))
					.transition().duration(200)
					.style('opacity', 1);
					})
					.on("mouseout", function(){
					tooltip.transition().duration(200)
					.style("opacity", 0);
			});

		let tooltip = g.append("text")
			.attr("class", "tooltip")
			.style("opacity", 0);

		svg.append('rect')
			.attr('x', margin.left)
			.attr('y', margin.top - 10)
			.attr('width', 20)
			.attr('height', 20)
			.attr('fill', function() { return cfg.color(0); });
		svg.append('rect')
			.attr('x', margin.left)
			.attr('y', margin.top + 30)
			.attr('width', 20)
			.attr('height', 20)
			.attr('fill', function() { return cfg.color(1); });
		svg.append('text')
			.attr('x', margin.left + 25)
			.attr('y', margin.top + 5)
			.attr('class', 'prettyFont')
			.text(dict0[0].country);
		svg.append('text')
			.attr('x', margin.left + 25)
			.attr('y', margin.top + 45)
			.attr('class', 'prettyFont')
			.text(dict1[0].country);

	}

	

}

function createAxisData(countryData, dict) {
	for (let i = 1; i < dict.length; i++) {
		let object = {}
		object.axis = dict[i].key;
		object.value = dict[i].percentage;
		countryData.push(object);
	}
}
















function prepDevData(splitByDevType, dict) {
	for (let i = 0; i < splitByDevType.length; i++) {
 		let devArray = splitByDevType[i].key.split(';');
 		let numDevs = splitByDevType[i].values.length;

 		countDevType(devArray, numDevs, dict);
 	}

}

// Iterate through devArray and add counts of each dev type to dict dict
function countDevType(devArray, numDevs, dict) {
	// console.log('devArray = ', devArray)
	// console.log('numDevs = ', numDevs);
	for (let i = 0; i < devArray.length; i++) {
		for (let j = 1; j < dict.length; j++) {
			if (devArray[i] === dict[j].key) {
				dict[j].value += numDevs;
			}
		}
	}
}

function calcPercentages(dict, numResponses) {
	for (let i = 1; i < dict.length; i++) {
		percentage = dict[i].value / numResponses;
		dict[i].percentage = round(percentage, 2);
	}
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}