var canvas = document.getElementById('lab07');
    var ctx = canvas.getContext('2d');

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }


    function fillTriangle(ctx, points) {
        var max = points[0].y, min = points[0].y;
        for (var i = 1; i < points.length; i++) {
            if (points[i].y > max) max = points[i].y;
            if (points[i].y < min) min = points[i].y;
        }

        console.log(max, min);
        var yarray = [];
        for (var i = 0; i < points.length; ++i) {
            let hi = 0, lo = 0;
            let p = 0;

            if (i !== points.length - 1) p = i + 1;

            if (points[i].y > points[p].y) {
                hi = i;
                lo = p;
            } else if (points[i].y < points[p].y) {
                hi = p;
                lo = i;
            } else continue;

            console.log("high = ", hi, " low = ", lo);

            var k = (points[hi].y - points[lo].y) /
                (points[hi].x - points[lo].x);

            console.log("k = ", k);

            for (var j = points[lo].y; j < points[hi].y; ++j) {
                if (typeof yarray[j] == "undefined") yarray[j] = [];

                yarray[j].push((j - points[lo].y) / k + points[lo].x);
            }
        }

        for (var y = min; y < max; y++) {
            let xarray = yarray[y].sort(function (a, b) {
                return a - b;
            });
            for (var j = 0; j < xarray.length / 2; ++j) {
                for (var k = xarray[j * 2]; k < xarray[j * 2 + 1]; k++) {
                    ctx.fillRect(k, y, 1, 1);
                }
            }
        }
    }

    var point_index = 0;
    var points = [];
    canvas.addEventListener('click', function (e) {
        points[point_index] = new Point(e.offsetX, e.offsetY);
        ctx.fillRect(e.offsetX, e.offsetY, 1, 1);
        point_index += 1;
    });

    canvas.addEventListener("contextmenu", function () {
        console.log("contextmenu");
        fillTriangle(ctx, points);
        point_index = 0;
        points = [];
    });
