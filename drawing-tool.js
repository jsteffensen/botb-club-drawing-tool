<script>
var data;
var isLoggedIn = document.body.classList.contains('logged-in');

jQuery.getJSON( 'api/data.php', function( avgdata ) {
  data = avgdata;
  assignShowAvg();
});

function assignShowAvg() {
  jQuery('#dc-container span').click(function() {

	jQuery.getJSON( 'api/data.php', function( avgdata ) {
		data = avgdata;

		avgLabelDC.text( data.dc.avgx + ', ' + data.dc.avgy + ' (' + data.dc.count + ')' );
		xyLabelDC.text( data.dc.avgx + ', ' + data.dc.avgy );
		circularGradientDC.attr('cx', data.dc.avgx * imageRatio).attr('cy', data.dc.avgy * imageRatio);
		linesDC.selectAll('line')
			.attr('x2', data.dc.avgx * imageRatio)
			.attr('y2', data.dc.avgy * imageRatio);
	});
	  
  });
  
  jQuery('#mw-container span').click(function() {
	
	jQuery.getJSON( 'api/data.php', function( avgdata ) {
		data = avgdata;
		
		avgLabelMW.text( data.mw.avgx + ', ' + data.mw.avgy + ' (' + data.mw.count + ')' );
		xyLabelMW.text( data.mw.avgx + ', ' + data.mw.avgy );
		circularGradientMW.attr('cx', data.mw.avgx * imageRatio).attr('cy', data.mw.avgy * imageRatio);
		linesMW.selectAll('line')
			.attr('x2', data.mw.avgx * imageRatio)
			.attr('y2', data.mw.avgy * imageRatio);
	});
  });
}

var playerEyesDC = [
  {'x': 2252, 'y': 2258
  },
  {'x': 2170, 'y': 2254
  },
  {'x': 2674, 'y': 2219
  },
  {'x': 2767, 'y': 2219
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

var imageWidth = 4416;
var imageHeight = 3336;
var imageRatio = 0.2;

var colorDC = 'white';
var gradientSizeDC = 230;
var colorMW = 'white';
var gradientSizeMW = 250;

var svgDC = d3.select('#svg-dc')
  .attr('width', imageWidth * imageRatio)
  .attr('height', imageHeight * imageRatio)
  .attr('style', 'cursor:none;margin:20px;background:url(\"https://botb-club.com/wp-content/uploads/2022/03/dc1122.jpg\") no-repeat;background-size:cover;');
  
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
  
var avgLabelDC = svgDC.append('text')
  .attr('class', 'xyLabel')
  .attr('fill', colorDC)
  .attr('stroke', 'white')
  .attr('x', 20)
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

var avgLabelMW = svgMW.append('text')
  .attr('class', 'xyLabel')
  .attr('fill', colorDC)
  .attr('stroke', 'white')
  .attr('x', 20)
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
		.attr('stroke', colorDC)
		.attr('opacity', 0.6);
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
		.attr('stroke', colorMW)
		.attr('opacity', 0.6);
});
  
  
svgDC.on('mousemove', function(event, d) {
	xyLabelDC.text(Math.round(event.layerX / imageRatio) + ', ' + Math.round(event.layerY / imageRatio));
	circularGradientDC.attr('cx', event.layerX).attr('cy', event.layerY);
	linesDC.selectAll('line')
		.attr('x2', event.layerX)
		.attr('y2', event.layerY);
});

svgDC.on('click', function(event, d) {
	if(isLoggedIn) {
		jQuery('.dc-x input').val('' + (event.layerX / imageRatio));
		jQuery('.dc-y input').val('' + (event.layerY / imageRatio));
	}
});

svgMW.on('mousemove', function(event, d) {
	xyLabelMW.text(Math.round(event.layerX / imageRatio) + ', ' + Math.round(event.layerY / imageRatio));
	circularGradientMW.attr('cx', event.layerX).attr('cy', event.layerY);
	linesMW.selectAll('line')
		.attr('x2', event.layerX)
		.attr('y2', event.layerY);
});

svgMW.on('click', function(event, d) {
	if(isLoggedIn) {
		jQuery('.mw-x input').val('' + (event.layerX / imageRatio));
		jQuery('.mw-y input').val('' + (event.layerY / imageRatio));		
	}
});
</script>