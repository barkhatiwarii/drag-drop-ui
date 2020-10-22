var x = 1;
// event called white dragging
document.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("Text", event.target.id);
});

// to display text while element is dragging
document.addEventListener("drag", function(event) {
    // document.getElementById("display").innerHTML = "The icon is being dragged";
});

// event called while dropping
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

// To drop at given id/area
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if (event.target.id == "drop-container") {
        var data = event.dataTransfer.getData("Text");
        var nodeCopy = document.getElementById(data).cloneNode(true);
        newId = "newId" + x;
        // console.log(newId);
        nodeCopy.id = newId;
        event.target.appendChild(nodeCopy);
        var test = nodeCopy.firstElementChild;
        test.classList.add("test");
        x = x + 1;

        // code for canvas
        nodeCopy.onmousedown = function(event) {
            nodeCopy.ondragstart = function() {
                return false;
            };
            let shiftX = event.clientX - nodeCopy.getBoundingClientRect().left;
            let shiftY = event.clientY - nodeCopy.getBoundingClientRect().top;

            // (1) prepare to moving: make absolute and on top by z-index
            nodeCopy.style.position = 'absolute';
            nodeCopy.style.zIndex = 1000;

            // move it out of any current parents directly into body
            // to make it positioned relative to the body
            document.body.append(nodeCopy);

            // centers the icon at (pageX, pageY) coordinates
            function moveAt(pageX, pageY) {
                nodeCopy.style.left = pageX - shiftX / 2 + 'px';
                nodeCopy.style.top = pageY - shiftY / 2 + 'px';
            }

            // move our absolutely positioned icon under the pointer
            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // (2) move the icon on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // (3) drop the icon, remove unneeded handlers
            nodeCopy.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                nodeCopy.onmouseup = null;
            };
        }
    }
});

function clearArea() {
    // document.getElementById("drop-container").style.display = "none";
    document.getElementById("drop-container").innerHTML = "";

}