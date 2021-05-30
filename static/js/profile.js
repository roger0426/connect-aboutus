$(document).ready(function(){
  $('#loadingfilter').hide();
  $('#loadinggif').hide();
  
  $('#phoneerrormsg').click(function(){
    $('#phoneerrormsg').hide();
  });
  
  
//  $(".normaltag").mouseenter(function() {
//    if($(this).parent().find('.deletetag').css({'display': 'none'}).length == 0) {
//      $(this).parent().css({'background-color': '#FFAD94'});
//    }
//  });
//  $('.normaltag').mouseleave(function() {
//    if($(this).parent().find('.deletetag').css({'display': 'none'}).length == 0) {
//      $(this).parent().css({'background-color': '#FFCFBF'});
//    }
//  });
  
  $(".normaltag").click(function() {
    if($(this).parent().find('.tag-commend').css("display") == "none") {
      $(this).parent().find('.tag-commend').css({'display': 'flex'});
      $(".normaltag").not(this).parent().find('.tag-commend').css({'display': 'none'});
    }
    else {
      $(this).parent().find('.tag-commend').css({'display': 'none'});
    }
  });
  
  $(window).click(function() {
    var i = 0
    $('.tag-commend').each(function(c) {
//      console.log($(this).css('display'));
      if($(this).css('display') === 'flex') {
        $('.tag-commend').each(function(c) {
          $(this).css('display', 'none');
        })
        return;
      }
    })
  });
  
  $('.normaltag').click(function(event){
    event.stopPropagation();
  });
  
  
  $('#friends-avatar a').mouseenter(function() {
    $(this).find('#friend-hover').css({'display': 'block'});
  });
  $('#friends-avatar a').mouseleave(function() {
    $(this).find('#friend-hover').css({'display': 'none'});
  });
  
  $("#tab-navbar :nth-child(1),#tag1").on('click touch', function(){
    console.log("1");
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(1)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(1))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(2),#tag2").on('click touch', function(){
    console.log("2");
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
    $('#indextag :nth-child(2)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(2))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(3),#tag3").on('click touch', function(){
    console.log("3");
    $('#activities').hide();
    $('#projects').hide();
    $('#personal').show();
    $('#indextag :nth-child(3)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(3))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(4),#tag4").on('click touch', function(){
    console.log("4");
    $('#activities').hide();
    $('#projects').show();
    $('#personal').hide();
    $('#indextag :nth-child(4)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(4))').css('background-color','white')
  });
  $("#tab-navbar :nth-child(5),#tag5").on('click touch', function(){
    console.log("5");
    $('#activities').show();
    $('#projects').hide();
    $('#personal').hide();
    $('#indextag :nth-child(5)').css('background-color','#FFE4DC')
    $('#indextag :not(:nth-child(5))').css('background-color','white')
  });

  $("#applybutton").click(function() {
    console.log("click apply");
    //$("#sent").show();
    $('#sent').css({"z-index": 1});
    $("#sent").animate({opacity: 1}, 500, function() {
      
    })
  });
  
  $("#sent").click(function() {
    console.log("click sent");
    $("#sent").css({opacity: 0, "z-index": -1});
  });
  
  $("#exitbtn1, #filter1").click(function() {
    console.log("click event exit");
    $("#eventwindow").animate({opacity: 0}, 400, function() {
      $("#eventwindow").hide();
    })
    $("#filter1").animate({opacity: 0}, 400, function() {
      $("#filter1").hide();
    })
  });
  
  let intervalId = window.setInterval(function(){ // check every 0.5 seconds
    if($('#user-image').val() != "") {
      $('#editpicfilter').hide();
      $('#fileselectedfilter').show();
    }
    else {
      $('#editpicfilter').show();
      $('#fileselectedfilter').hide();
    }
  }, 2000);
  
  $("#sendbutton").click(function() {
    console.log("sendbutton has been click.")
    $ajaxSetup({
      data: {
        csrfmiddlewaretoken: CSRF
      }
    });
    $.ajax({
      url: URL,
      type: "post",
      data: {
        'text': $.trim($(".comment-insert").val())
      },
      dataType: 'json',
    }),(data)=>{
        $('cmttext').html(data)
        console.log("comment success: "+ data);
      }
  });

})


//另一個版本

var map=[
	{
		name:"臺北市",
    category: "fixed"
	},
	
	{
		name:"新北市",
    category: "unfixed"
	},
	
	{
		name:"桃園市",
    category: "unfixed"
	},
	
	{
		name:"臺中市",
    category: "unfixed"
	},
	
	{
		name:"臺南市",
    category: "unfixed"
	},
	
	{
		name:"高雄市",
    category: "unfixed"
	},
	
	{
		name:"基隆市",
    category: "unfixed"
	},

  {
		name:"花蓮市",
    category: "unfixed"
	},
         
  {
		name:"臺南市",
    category: "unfixed"
	},
	
	{
		name:"高雄市",
    category: "unfixed"
	},
	
	{
		name:"基隆市",
    category: "unfixed"
	},

  {
		name:"花蓮市",
    category: "unfixed"
	},
	
];
var links=[
	{
		source:0,
	 	target:1
	},
	{
		source:0,
	 	target:6
	},
	{
		source:0,
	 	target:2
	},
	{
		source:1,
	 	target:6
	},
	{
		source:0,
	 	target:7
	},
	{
		source:0,
	 	target:4
	},
	{
		source:0,
	 	target:5
	},
	{
		source:3,
	 	target:7
	},
	{
		source:0,
	 	target:8
	},
	{
		source:1,
	 	target:9
	},
	{
		source:0,
	 	target:10
	},
	{
		source:0,
	 	target:11
	},
];


var width = window.innerWidth * 0.6
    height = window.innerHeight * 0.5;
    //width = $('#profilepanel').width
var svg = d3.select('#graph').append('svg')
    .attr('id', 'relation_graph')
    .attr('position', 'fixed')
    .attr('width', width)
    .attr('height', height)
    .attr('width', '100%');

//const forceX = d3.forceX(width / 2).strength(0.1) //橫向壓縮力
//const forceY = d3.forceY(height / 2).strength(0.1)
const forceX = d3.forceX(width / 2).strength(0.15) //橫向壓縮力
const forceY = d3.forceY(height / 2).strength(0.25)

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink())
    .force("charge", d3.forceManyBody())
    .force('x', forceX)
    .force('y', forceY);

simulation
	.nodes(map)
	.on("tick", ticked);

simulation.force("link")
	.links(links)
	.distance(50)
  .strength(0.75);

simulation.force("charge")
	.strength(-1000)



var link = svg.append("g")
	.attr("class", "links")
	.selectAll("line")
	.data(links)
	.enter().append("line")
	.attr("stroke-width", 2)
	.attr("stroke","black");

var node = svg.append("g")
	.attr("class", "nodes")
	.selectAll("circle")
	.data(map)
	.enter().append("circle")
	.attr("r", 5.5)
	.attr("fill", 'black')
	.attr('stroke', function(d){
    if (d.category == 'fixed') {
      return 'red'
    } else {
      return 'white'
    };
  })
	.attr('stroke-width',2)
  .attr('cursor', function(d){
    if (d.category == 'fixed') {
      return 'grab'
    } else {
      return 'pointer'
    };
  })
	.call(d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended));

var text = svg.selectAll("text")
     .data(map)
     .enter()
     .append("text")
     .style("fill", "black")
     .style("font-size", 15)
     .attr("dx", 10)//12
     .attr("dy", 0)//5
     .text(function(d){
        return d.name;
     });


function ticked() {
link
	.attr("x1", function(d) { return d.source.x; })
	.attr("y1", function(d) { return d.source.y; })
	.attr("x2", function(d) { return d.target.x; })
	.attr("y2", function(d) { return d.target.y; });

node
	.attr("cx", function(d) { return d.x; })
	.attr("cy", function(d) { return d.y; })

text
	.attr("x", function(d) { return d.x;})
	.attr("y", function(d) { return d.y;});
};

function dragstarted(d) {
if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
if (!d3.event.active) simulation.alphaTarget(0);
//  d.fx = null;
//  d.fy = null;
  if (d.category == 'fixed') {
  //    d.category = 'fixed';
    //d3.select(this).classed("fixed", true);
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  else
  {
  //    d.category = 'unfixed';
    //d3.select(this).classed("fixed", false);
    d.fx = null;
    d.fy = null;
  }
}

