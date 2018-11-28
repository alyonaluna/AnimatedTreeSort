$(function () {

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

   /* $("#generate-btn").click(function () {
        var x = 0;
        var y = 30;
        for (var i = 0; i < 10; i++) {
            $("#svg-container").queue("rand-array", function () {
                var randValue = randomInteger(1, 20);
                randomArray.push(randValue);
                x += 55;
                drawCircle(randValue, x, y);
            });
        }
        setInterval(function(){
            $("#svg-container").dequeue("rand-array");
        }, 300);
    });*/

    function getRandArray(){
        var randomArray = [];
        for (var i = 0; i < 10; i++) {
            randomArray.push(randomInteger(1, 20));
        }
       /* randomArray.push(16);
        randomArray.push(11);
        randomArray.push(9);
        randomArray.push(2);
        randomArray.push(6);
        randomArray.push(2);
        randomArray.push(13);
        randomArray.push(11);
        randomArray.push(1);
        randomArray.push(19);*/
        return randomArray;
    }

    $("#create-tree").click(function () {
        var sourceArray = getRandArray();
        sourceArray.forEach(function(elem){
           // $("#svg-container").queue("rand-array", function () {
                $("#random-values").append('<div class="number-box">' + elem + '</div>');
              //  animateArray();
            //});
        });
       // setInterval(function(){
          //  $("#svg-container").dequeue("rand-array");
       // }, 300);
        initSvg();
        var root = null;
        var id = 0;
        if (sourceArray != null) {
            sourceArray.forEach(function (element) {
                if (root == null) {
                    root = new Node(id, Number(element));
                    root.posX = $(window).width()/2;
                    root.posY = 30;
                    $("#svg-container").queue("fx", function () {
                        drawNode(root);
                    });
                }
                else {
                    id++;
                    var childNode = new Node(id, Number(element));
                    $("#svg-container").queue("fx", function () {
                        insertNode(root, childNode, 200);
                    });
                }
            });

            $("#svg-container").queue("fx", function () {
                inOrder(root);
            });

            setInterval(function(){
                $("#svg-container").dequeue();
            }, 700);
        }

    });
});
