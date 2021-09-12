Surface.prototype.ellipticalParaboloid = (color = '#f03538', x = 0, y = -55, a = 10, b = 5, count = 19) => {
    angle = 2 * Math.PI / count;
    let points = [];
    let edges = [];
    let polygones = [];

    //точки
    for (let j = 0; j < count; j++) {
        for (let i = 0; i < count; i++) {
            points.push(
                new Point(
                    x + a * j * Math.cos(angle * i),
                    y + Math.pow(j, 2),
                    b * j * Math.sin(angle * i),
                )
            )
        }
    }

    //ребра

    let current = count;
    for (let i = count; i < count * count; i++) {
        if (i % count != count - 1) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, current));
            current += count;
        }
    }
    for (let i = 0; i < count * count - count; i++) {
        edges.push(new Edge(i, i + count));
    }

    //полигоны
    let polCurrent = 0;
    for (let i = 0; i < count * count - count; i++) {
        if (i % count != count - 1) {
            polygones.push(new Polygon([i, i + 1, i + count + 1, i + count], color));
        } else {
            polygones.push(new Polygon([i, polCurrent, i + 1, i + count], color));
            polCurrent += count;
        }
    }
    let ab = true;
    let clr1 = { r: 0, g: 0, b: 0 };
    let clr2 = { r: 255, g: 255, b: 255 };
    let clr = clr1;
    for (let i = 0; i < polygones.length; i++) {
        if (i % count == 0) {
            if (ab) {
                clr = clr2;
            } else {
                clr = clr1;
            }
            ab = !ab;
        }
        polygones[i].color = clr;
    }
    let dotes = [];
    for (let i = 1; i <= count; i++) {
        dotes.push(count * count - i);
    }
    polygones.push(new Polygon(dotes, color));

    return new Subject(points, edges, polygones);
}