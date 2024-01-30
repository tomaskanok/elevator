{
    /*
        https://play.elevatorsaga.com/
        challange 4 success
    */
    
    init: function(elevators, floors) {
        var debug = true;

        var p = []; // array of pushes

        for (var i = 0; i < floors.length; i++) {
            (function (index) {
                floors[index].on("up_button_pressed", function () {
                    debug ? console.log("up_button_pressed " + index) : false;
                    p.push(index);
                });

                floors[index].on("down_button_pressed", function () {
                    debug ? console.log("down_button_pressed " + index) : false;
                    p.push(index);
                });
            })(i);
        }

        for (var e = 0; e < elevators.length; e++) {
            console.log(e);
            (function (index) {
                elevators[index].on("idle", function () {

                    if (this.getPressedFloors().length > 0) {
                        debug ? console.log("getPressedFloors" + orderElevator(this.getPressedFloors())) : false;

                        this.destinationQueue = orderElevator(this.getPressedFloors())

                        this.checkDestinationQueue();
                    } else {
                        console.log("p1 " + p);
                        if (p.length > 0) {
                            elevators[index].goToFloor(p[0]);
                            p.shift()
                        }
                    }
                });
            })(e);
        }

        function orderElevator(pressedFloors) {
            const map = pressedFloors.reduce((pressedFloors, e) => pressedFloors.set(e, (pressedFloors.get(e) || 0) + 1), new Map());

            map[Symbol.iterator] = function* () {
                yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
            }

            array = Array.from(map, ([name, value]) => ({ name, value }));

            var ret = [];
            array.forEach((element) => ret.push(element.name));

            console.log(ret);

            return ret;
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}