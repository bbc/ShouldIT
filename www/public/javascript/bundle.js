var converter = new Showdown.converter();
var width = ($(window).width() - 350),
    height = ($(window).height() - 60);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.05)
    .distance(100)
    .charge(-100)
    .size([width, height]);

d3.json("graph.json", function(error, json) {
  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  jsonLoaded(json);
});

function jsonLoaded(json) {
   var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  function color(d) {
    return d.status;
  }

  function size(d) {
    if(d.depth >= 5 ){ return 5; }
    return (15 - (d.depth/1)*2);
  }

  function styleClass(d) {
    return d.depth === 0 ? "node node-parent" : "node";
  }

  node.append("circle")
      .attr("class", styleClass)
      .attr("r", size)
      .style("fill", color)
      .on("click", clickHandler)
      .call(force.drag);

  node.append("text")
      .attr("dx", 20)
      .attr("dy", ".35em")
      .text(function(d) { return d.name });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
};

function clickHandler(d) {
  if (d.shoulds) {
      var $should = $(".should");
      $should.off();
    var panel = $('.panel').first().html('');
    var breadcrumb = $('<h3></h3>').text(d.key);
    panel.append(breadcrumb);
    var title = $('<h2></h2>').text(d.name);
    panel.append(title);
    var list = $('<ul></ul>');
    var should;
    for (var key in d.shoulds) {
        if(d.shoulds.hasOwnProperty(key) ) {
            should = $('<li></li>');
            should.attr("class", "should")
              .attr("data-feature", d.shoulds[key].ref)
              .attr("style", "color:"+d.shoulds[key].status)
              .text(key);
            list.append(should);
        }
    }
    panel.append(list);
    $(".should").on('click', function (){
      var url = '/feature/' + $(this).data('feature').split(':')[0];
            $.getJSON(url, function(data) {
                $(".feature").html(converter.makeHtml(data.feature));
                $(".feature-container").show();
                $("svg").hide();
            });
    });
  }
}

$(function() {
  $(".close-feature").on('click', function (){
    $( ".feature-container" ).hide();
    $( "svg" ).show();
  });
  $(".feature-container").css("width", (width-40)+'px').css('height', (height-40)+'px');
});
