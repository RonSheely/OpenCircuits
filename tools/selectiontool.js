class SelectionTool extends Tool {
    constructor() {
        super();
        this.isWirePressed = false;
        this.pressedWire = undefined;
        this.selection = undefined;
    }
    onKeyDown(code) {
        if (code === 18) { // Option key
            panTool.activate();
        }
    }
    onKeyUp(code) {
    }
    onMouseMove() {
        if (this.isWirePressed) {
            this.pressedWire.move(mousePos.x,mousePos.y);
            render();
        }
    }
    onMouseDown() {
        var pressed = false;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].isPressable && objects[i].contains(mousePos)) {
                pressed = true;
                objects[i].press();
                render();
                break;
            }

            if (objects[i].oPortContains(mousePos) !== -1) {
                pressed = true;
                break;
            }
        }
        if (!pressed && !this.isWirePressed) {
            for (var i = 0; i < wires.length; i++) {
                var t;
                if ((t = wires[i].curve.getNearestT(mousePos.x,mousePos.y)) !== -1) {
                    this.isWirePressed = true;
                    this.pressedWire = wires[i];
                    console.log("press-arooney " + t);
                    wires[i].press(t);
                    render();
                    break;
                }
            }
        }
    }
    onMouseUp() {
        if (this.isWirePressed) {
            this.isWirePressed = false;
            this.pressedWire = undefined;
        }

        for (var i = 0; i < objects.length; i++) {
            if (objects[i].isPressable && objects[i].curPressed) {
                objects[i].release();
                render();
                break;
            }
        }
    }
    onClick() {
        var clicked = false;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].sContains(mousePos)) {
                popup.select(objects[i]);
                this.selection = objects[i];
                clicked = true;
                render();
                break;
            }
            if (objects[i].isPressable && objects[i].contains(mousePos)) {
                objects[i].click();
                clicked = true;
                render();
                break;
            }

            var ii;
            if ((ii = objects[i].oPortContains(mousePos)) !== -1) {
                wiringTool.activate(objects[i], ii);
                render();
                break;
            }
        }

        if (!clicked) {
            popup.deselect();
            this.selection = null;
            render();
        }
    }
}
