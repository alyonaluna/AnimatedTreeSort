class Node {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.posX = null;
        this.posY = null;
    }
}

function insertNode(root, node, deltaX) {
    if (root.data < node.data) {
        if (!root.right) {
            if(root.left){
                moveNode(root.left, deltaX, true, true);
                node.posX = root.posX + deltaX;
            }else {
                node.posX = root.posX;
            }
            node.posY = root.posY + 70;
            node.parent = root;
            root.right = node;
            drawNode(node);
        } else {
            deltaX -= 40;
            insertNode(root.right, node, deltaX);
        }
    } else {
        if (!root.left) {
            if(root.right){
                moveNode(root.right, deltaX, false, true);
                node.posX = root.posX - deltaX;
            }else {
                node.posX = root.posX;
            }
            node.posY = root.posY + 70;
            node.parent = root;
            root.left = node;
            drawNode(node);
        } else {
            deltaX -=40;
            insertNode(root.left, node, deltaX);
        }
    }
}

function inOrder(node){
    if (node == null) return;
    inOrder(node.left);
    $("#svg-container").queue("fx", function () {
        $("#sorted-values").append('<div class="number-box">' + node.data + '</div>');
    });
    inOrder(node.right);
    
};
