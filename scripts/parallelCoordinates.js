function ParallelCoordinates(svg,twoCountries){
	console.log('in ParallelCoordinates');
	this.svg = svg;
	let boundingBox = svg.node().getBoundingClientRect();
    let svgHeight = boundingBox.height;
    let svgWidth = boundingBox.width;
    let margin = {top: 30, right: 10, bottom: 10, left: 10}

    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    let country0 = twoCountries[0].values;
    let country1 = twoCountries[1].values;

    let data = country0;
    let data1 = country1;
 	// let dimensions = ['Age','YearsCode','EdLevel', 'ConvertedComp'];

 	let dimensions = [
 		{
 			name: 'Age',
 			scale: d3.scaleLinear().range([height,0]),
 				type: 'number'
 		},
 		{
 			name: 'YearsCode',
 			scale: d3.scaleLinear().range([height,0]),
 				type: 'number'
 		},
 		// {
 		// 	name: 'EdLevel',
 		// 	scale: d3.scalePoint().range([0,height]),
 		// 		type: 'string'
 		// },
 		{
 			name: 'WorkWeekHrs',
 			scale: d3.scaleLinear().range([height,0]),
 				type: 'number'
 		},
 		{
 			name: 'ConvertedComp',
 			scale: d3.scaleLinear().range([height,0]),
 				type: 'number'
 		}
 	];

 	let x = d3.scalePoint()
 		.domain(dimensions.map(function(d) {
 			return d.name;
 		}))
 		.range([0,width]),
 			y = {};

 	let line = d3.line(),
 		axis = d3.axisLeft(),
 		background,
 		foreground,
 		foreground1;

 	svg.selectAll('*').remove();

 	let mygroup = svg
 		.attr('width', width)
 		.attr('height', height)
 		.append('g')
 			.attr('transform', 'translate(' + (margin.left+9) + ',' + (margin.top+5) + ')');

 	for (i = 0; i < dimensions.length; i++) {
	 	mygroup.append('text')
	 		.text(dimensions[i].name)
	 		.attr('x', margin.left+(i*225))
	 		.attr('y', -10)
 	}

 	dimensions.forEach(function(dimension){
 		dimension.scale.domain(dimension.type === 'number'
 			? d3.extent(data, function(d) { return +d[dimension.name]; })
 			: data.map(function(d) { return d[dimension.name]; }).sort());
 	});

 	background = mygroup.append("g")
					.attr("class", "background")
					.selectAll("path")
					.data(data)
					.enter().append("path")
					.attr("d", path);

	foreground = mygroup.append("g")
					.attr("class", "foreground0")
					.selectAll("path")
					.data(data)
					.enter().append("path")
					.attr("d", path);

	foreground1 = mygroup.append("g")
					.attr("class", "foreground1")
					.selectAll("path")
					.data(data1)
					.enter().append("path")
					.attr("d", path);

	let g = mygroup.selectAll(".dimension")
        .data(dimensions)
      .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; });

	g.append("g")
		.attr("class", "axis")
		.each(function(d) { d3.select(this).call(axis.scale(d.scale)); })
		.append("text")
			.style("text-anchor", "middle")
			.attr("class", "axis-label")
			.attr("y", -9)
			.text(function(d) { return d.name; });

	g.append("g")
		.attr("class", "brush")
		.each(function(d) {
			d3.select(this).call(d.scale.brush = d3.brushY()
				.extent([[-10,0], [10,height]])
          		.on("brush", brush)           
            	.on("end", brush)
            )
		})
		.selectAll("rect")
			.attr("x", -8)
			.attr("width", 16);

	function path(d) {
      return line(dimensions.map(function(dimension) { return [x(dimension.name), dimension.scale(d[dimension.name])]; }));
  	}

  	function brush() {  
	    var actives = [];
	    mygroup.selectAll(".brush")
	        .filter(function(d) {
	            d.scale.brushSelectionValue = d3.brushSelection(this);
	            return d3.brushSelection(this);
	        })
	        .each(function(d) {
	            // Get extents of brush along each active selection axis (the Y axes)
	            actives.push({
	                dimension: d.name,
	                extent: d3.brushSelection(this).map(d.scale.invert)
	            });
	        });
	      
	    var selected = [];
	      // Update foreground to only display selected values
	    foreground.style("display", function(d) {
	        let isActive = actives.every(function(active) {
	            let result = active.extent[1] <= d[active.dimension] && d[active.dimension] <= active.extent[0];
	            return result;
	        });

	        if(isActive) selected.push(d);
	        return (isActive) ? null : "none";
	    });

	    foreground1.style("display", function(d) {
	        let isActive = actives.every(function(active) {
	            let result = active.extent[1] <= d[active.dimension] && d[active.dimension] <= active.extent[0];
	            return result;
	        });

	        if(isActive) selected.push(d);
	        return (isActive) ? null : "none";
	    });


	}
	return svg.node();
}





	
