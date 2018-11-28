function create(tag) {
    var svgNS = "http://www.w3.org/2000/svg";
    return document.createElementNS(svgNS, tag);
}

function setA(el, o) {
    for (var i in o) {
        el.setAttribute(i, o[i])
    }
}

function initSvg(){
    var svg = create('svg');
    setA(svg, {
        version: '1.1',
        width: $(window).width(),
        height: $(window).height()
    });
    document.getElementById('svg-container').appendChild(svg);
}

function getSvg(){
    return document.getElementById('svg-container').getElementsByTagName('svg')[0];
}

function createCircleGroup(node){
    var circleGroup = create("g");
    setA(circleGroup, {class: "circle"});
    var circle = create('circle');
    var radius = 20;
    setA(circle, {
        cx: node.posX,
        cy: node.posY,
        r: radius,
        fill: node.parent && node.parent.left == node? "#ce3535": "#fcb250",
        stroke: "#d3d3d3",
        'stroke-width': "2"
    });
    circleGroup.appendChild(circle);
    var number = create('text');
    setA(number,{
        x:node.posX,
        y: node.posY + 5,
        fill: "#ffffff"
    });
    var text = document.createTextNode(node.data);
    number.appendChild(text);
    circleGroup.appendChild(number);
   // nodeGroup.appendChild(circleGroup);
    return circleGroup;
}

function createLineGroup(node){
    var lineGroup = create("g");
    setA(lineGroup, {class:"line"});
    var radius = 20;
    var line = create('path');
    var toX = node.posX;
    var toY = node.posY - radius;
    var fromX = node.parent.posX;
    var fromY = node.parent.posY + radius;
    setA(line, {
        d: "M " + fromX + "," + fromY + " L " + toX + "," + toY,
        stroke: "#d3d3d3",
        'stroke-width': "2"
    });
    lineGroup.appendChild(line);
    return lineGroup;
}

function drawNode(node) {
    var svg = getSvg();
    var nodeGroup = create("g");
    setA(nodeGroup,{id: node.id});
    var circleGroup = createCircleGroup(node);
    nodeGroup.appendChild(circleGroup);

    if(node.parent) {
        var lineGroup = createLineGroup(node);
        nodeGroup.appendChild(lineGroup);
    }
    svg.appendChild(nodeGroup);
    animate(node);
}

function animate(node){
    $("#"+node.id+" .circle").velocity({ opacity: 0 }, 0)
        .velocity({ opacity: 1 }, {duration: 500, delay: 200});
    if($("#"+node.id+" .line")){
        animateLine(node);
    }
}

function animateLine(node){
    $("#"+node.id+" .line").velocity({ 'stroke-dashoffset': 500 }, 0)
        .velocity({ 'stroke-dashoffset': 0 }, 500);
}

function moveNode(node, deltaX, toLeft, expandLine){
    if(!node) return;
    node.posX = toLeft? node.posX - deltaX: node.posX + deltaX;
    var nodeGroup = document.getElementById(node.id);
    $("#" +node.id+" .circle").velocity({'translateX': toLeft? "-"+deltaX +"px":deltaX +"px"}, 500, function(){
        $("#" +node.id+" .circle").remove();
        nodeGroup.appendChild(createCircleGroup(node));
    });

    if(!expandLine){
        $("#"+node.id+" .line").velocity({'translateX': toLeft?"-"+deltaX +"px":deltaX +"px"}, 500);
    }
    else{
        animateLine(node);
    }

    $("#"+node.id+" .line").remove();
    var lineGroup = createLineGroup(node);
    nodeGroup.appendChild(lineGroup);

    moveNode(node.left, deltaX, toLeft, false);
    moveNode(node.right, deltaX, toLeft, false);
}
