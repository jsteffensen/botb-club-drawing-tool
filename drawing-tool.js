var imageWidth = 4416;
var imageHeight = 3336;
var imageRatio = 0.2;

var svgDC = d3.select('#svg-dc')
  .attr('width', imageWidth * imageRatio)
  .attr('height', imageHeight * imageRatio)
  .attr('style', 'cursor:none;margin:20px;')
  .style('background', 'url(https://botb-club.com/wp-content/uploads/2022/03/dc1022.jpg) no-repeat')
  .style('background-size', 'cover');
  
console.log(svgDC);