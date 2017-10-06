// Seed data to populate the donut pie chart
var seedData = [{
  "label": "Aquarius",
  "value": 25,
  "data": "Make tem happy and stop sharing memes",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/aquarius-zodiacsign-ink.jpg"
}, {
  "label": "Pisces",
  "value": 25,
  "data": "To find love, at least start talking to people",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/pisces-zodiacsign-ink.jpg"
}, {
  "label": "Aries",
  "value": 25,
  "data": "One year is way much to complete a task",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/aries-zodiacsign-ink.jpg"
}, {
  "label": "Taurus",
  "value": 25,
  "data": "Your childhood stories are humdrum",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/taurus-zodiacsign-ink.jpg"
}, {
  "label": "Gemini",
  "value": 25,
  "data": "Take a sit, he is not going to come today",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/gemini-zodiacsign-ink.jpg"
}, {
  "label": "Leo",
  "value": 25,
  "data": "The extra money is an illusion",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/leo-zodiacsign-ink.jpg"
}, {
  "label": "Cancer",
  "value": 25,
  "data": "You feel physically great. Try to read a book",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/cancer-zodiacsign-ink.jpg"
}, {
  "label": "Virgo",
  "value": 25,
  "data": "Passion is on your mind... focus!!",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/virgo-zodiacsign-ink.jpg"
}, {
  "label": "Libra",
  "value": 25,
  "data": "It's too late to 'fix' things with a present",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/libra-zodiacsign-ink.jpg"
}, {
  "label": "Scorpio",
  "value": 25,
  "data": "A bot is not a girlfriend",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/scorpio-zodiacsign-ink.jpg"
}, {
  "label": "Sagittarius",
  "value": 25,
  "data": "Don't think you're right. She is",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/sagittarius-zodiacsign-ink.jpg"
}, {
  "label": "Capricorn",
  "value": 25,
  "data": "If you are reading this, you need a friend",
  "image": "https://www.zodiacsignastrology.org/wp-content/uploads/capricorn-zodiacsign-ink.jpg"
}];

// Define size & radius of donut pie chart
var width = 600,
    height = 600,
    radius = Math.min(width, height) / 2;

// Define arc colours
var colour = d3.scaleOrdinal(d3.schemeCategory20);

// Define arc ranges
var arcText = d3.scaleOrdinal()
  .range([0, width]);

// Determine size of arcs
var arc = d3.arc()
  .innerRadius(radius - 130)
  .outerRadius(radius - 10);

// Create the donut pie chart layout
var pie = d3.pie()
  .value(function (d) { return d["value"]; })
  .sort(null);

// Append SVG attributes and append g to the SVG
var svg = d3.select("#donut-chart")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

// Define inner circle
svg.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 169)
  .attr("fill", "white") ;

// Calculate SVG paths and fill in the colours
var g = svg.selectAll(".arc")
  .data(pie(seedData))
  .enter().append("g")
  .attr("class", "arc")

  // Make each arc clickable ON CLICK
  .on("click", function(d, i) {
    d3.select("image").attr("xlink:href", seedData[i].image); //Changes image tag

    d3.select('.inner-circle_title').text(function(d) { return seedData[i].label;}); //Changes title tag.

    d3.select('.inner-circle_paragraph').text(function(d) { return seedData[i].data;}); //Changes data tag.
  });

	// Append the path to each g
	g.append("path")
  	.attr("d", arc)
  	.attr("fill", function(d, i) {
    	return colour(i);
  	});

	// Append text labels to each arc
	g.append("text")
	.attr("transform", function(d) {
	return "translate(" + arc.centroid(d) + ")";
	})
	.attr("dy", ".35em")
	.style("text-anchor", "middle")
	.attr("fill", "#fff")
		.text(function(d,i) { return seedData[i].label; })

g.selectAll(".arc text").call(wrap, arcText.range([0, width]));

// Append text to the inner circle
svg.append("image")
   .style("text-align", "center")
   .attr("class", "inner-image")
   .attr("xlink:href", 'https://lh6.ggpht.com/dzAUlpSK42O8hMEPKGh7XDL2nO1RVq8HcBW5to-0Lo1q9zUvnCDNM7YRI498J7vipi-j=w170')
   .attr("x", -65)
   .attr("y", -100)
   .attr("height", "80px")
   .attr("width", "80px")

svg.append("text")
  .attr("dy", "1.5em")
  .style("text-anchor", "middle")
  .attr("class", "inner-circle_title")
  .attr("fill", "#36454f")
  .text(function(d) { return "It's time to pick a Zodiac Sign..." });

svg.append("text")
      .attr("dy", "3.5em")
      .style("text-anchor", "middle")
      .attr("class", "inner-circle_paragraph")
      .attr("fill", "#36454f")
      .text(function(d) { return "...the stars will do the rest." });

// Wrap function to handle labels with longer text
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    console.log("tspan: " + tspan);
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > 90) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
