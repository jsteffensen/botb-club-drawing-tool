var playerEyesDC = [
  {'x': 1107, 'y': 1703
  },
  {'x': 1278, 'y': 1689
  },
  {'x': 3149, 'y': 1916
  },
  {'x': 3307, 'y': 1987
  }
];

var playerEyesMW = [
  {'x': 1944, 'y': 1911
  },
  {'x': 2920, 'y': 1508
  },
  {'x': 3066, 'y': 1512
  }
];

var playerEyesMW = [];

var imageWidth = 4416;
var imageHeight = 3336;
var imageRatio = 0.2;

var colorDC = 'white';
var gradientSizeDC = 350;
var colorMW = 'white';
var gradientSizeMW = 250;

var svgDC = d3.select('#svg-dc')
  .attr('width', imageWidth * imageRatio)
  .attr('height', imageHeight * imageRatio)
  .attr('style', 'cursor:none;margin:20px;background:url(\"https://botb-club.com/wp-content/uploads/2022/03/dc1022.jpg\") no-repeat;background-size:cover;');
  
var svgMW = d3.select('#svg-mw')
  .attr('width', imageWidth * imageRatio)
  .attr('height', imageHeight * imageRatio)
  .attr('style', 'cursor:none;margin:20px;background:url(\"https://botb-club.com/wp-content/uploads/2022/03/mw1022.jpg\") no-repeat;background-size:cover;');
  
var xyLabelDC = svgDC.append('text')
  .attr('class', 'xyLabel')
  .attr('fill', colorDC)
  .attr('stroke', 'white')
  .attr('x', (imageWidth * imageRatio)-100)
  .attr('y', 20)
  .style('font-family', 'monospace')
  .style('font-size', 16);
  
var xyLabelMW = svgMW.append('text')
  .attr('class', 'xyLabel')
  .attr('fill', colorDC)
  .attr('stroke', 'white')
  .attr('x', (imageWidth * imageRatio)-100)
  .attr('y', 20)
  .style('font-family', 'monospace')
  .style('font-size', 16);
  
  
var circularGradientDefDC = svgDC.append('defs').append('radialGradient')
	.attr('id', 'circularGradientDC')
	.attr('cx', '50%')
	.attr('cy', '50%')
	.attr('r', '50%')
	.attr('fx', '50%')
	.attr('fy', '50%');
	
circularGradientDefDC.append('stop')
	.attr('offset', '0%')
	.attr('style', 'stop-color:rgb(255,255,255);stop-opacity:0.8');

circularGradientDefDC.append('stop')
	.attr('offset', '100%')
	.attr('style', 'stop-color:rgb(255,255,255);stop-opacity:0');
	
var circularGradientDC = svgDC.append('circle')
	.attr('r', imageRatio * gradientSizeDC)
	.attr('cx', 0)
	.attr('cy', 0)
	.attr('fill', 'url(#circularGradientDC)');


var circularGradientDefMW = svgMW.append('defs').append('radialGradient')
	.attr('id', 'circularGradientMW')
	.attr('cx', '50%')
	.attr('cy', '50%')
	.attr('r', '50%')
	.attr('fx', '50%')
	.attr('fy', '50%');
	
circularGradientDefMW.append('stop')
	.attr('offset', '0%')
	.attr('style', 'stop-color:rgb(255,255,255);stop-opacity:0.8');

circularGradientDefMW.append('stop')
	.attr('offset', '100%')
	.attr('style', 'stop-color:rgb(255,255,255);stop-opacity:0');
	
var circularGradientMW = svgMW.append('circle')
	.attr('r', imageRatio * gradientSizeMW)
	.attr('cx', 0)
	.attr('cy', 0)
	.attr('fill', 'url(#circularGradientMW)');
	
var linesDC = svgDC.append('g').attr('class', 'lines');
var linesMW = svgMW.append('g').attr('class', 'lines');

playerEyesDC.forEach((e)=>{
	linesDC.append('line')
		.attr('id', e.x + '-' + e.y)
		.attr('class', 'activeLine')
		.attr('x1', e.x * imageRatio)
		.attr('y1', e.y * imageRatio)
		.attr('x2', e.x * imageRatio)
		.attr('y2', e.y * imageRatio)
		.attr('stroke-width', '1px')
		.attr('stroke', colorDC);
});

playerEyesMW.forEach((e)=>{
	linesMW.append('line')
		.attr('id', e.x + '-' + e.y)
		.attr('class', 'activeLine')
		.attr('x1', e.x * imageRatio)
		.attr('y1', e.y * imageRatio)
		.attr('x2', e.x * imageRatio)
		.attr('y2', e.y * imageRatio)
		.attr('stroke-width', '1px')
		.attr('stroke', colorMW);
});
  
  
svgDC.on('mousemove', function(event, d) {
	xyLabelDC.text(Math.round(event.layerX / imageRatio) + ', ' + Math.round(event.layerY / imageRatio));
	circularGradientDC.attr('cx', event.layerX).attr('cy', event.layerY);
	linesDC.selectAll('line')
		.attr('x2', event.layerX)
		.attr('y2', event.layerY);
});

svgMW.on('mousemove', function(event, d) {
	xyLabelMW.text(Math.round(event.layerX / imageRatio) + ', ' + Math.round(event.layerY / imageRatio));
	circularGradientMW.attr('cx', event.layerX).attr('cy', event.layerY);
	linesMW.selectAll('line')
		.attr('x2', event.layerX)
		.attr('y2', event.layerY);
});