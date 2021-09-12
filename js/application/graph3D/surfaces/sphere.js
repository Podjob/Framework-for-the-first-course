Surface.prototype.sphere = (point = new Point(0, 0, 0), color = '#f03538', count = 20, R = 6) => {
    let points = [];
    let edges = [];
    let polygones = [];
    let center = new Point(point.x, point.y, point.z, color);

    // точки
    const delta = Math.PI  * 2 / count;
    for (let i = 0; i <= Math.PI; i += delta) {
        for (let j = 0; j < Math.PI * 2; j += delta) {
            const x = point.x + R * Math.sin(i) * Math.cos(j);
            const y = point.y + R * Math.sin(i) * Math.sin(j);
            const z = point.z + R * Math.cos(i);
            points.push(new Point(x, y, z, color));
        }
    }  

    // ребра 
    for (let i = 0; i < points.length; i++) {
        // вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1, color));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count, color));
        }
        // поперёк
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count, color));
        }
    }

    // полигоны
    let a = 0;
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], color, i));
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygones.push(new Polygon([i, i + 1 - count, i + 1, i + count], color , i))
        }
        //покрасить в зебру
        /*
        if(a < count){
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#ffffff'));
            } else if ((i + count) < points.length && (i + 1) % count === 0) {
                polygones.push(new Polygon([i, i + 1 - count, i + 1, i + count], '#ffffff'))
            }
        } else {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#000000'));
            } else if ((i + count) < points.length && (i + 1) % count === 0) {
                polygones.push(new Polygon([i, i + 1 - count, i + 1, i + count], '#000000'))
            }
        }
        a++;
        if(a === count*2){
            a = 0;
        }
        */
        //рисовать сферу рядами
        /*
        if(a < count){
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygones.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if ((i + count) < points.length && (i + 1) % count === 0) {
                polygones.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
            }
        }
        a++;
        if(a === count*2){
            a = 0;
        }
        */
    }

    points.push(center);
    //добавить ось через сферу
    /*
    points.push(new Point(points[0].x, points[0].y, points[0].z + 5));
    points.push(new Point(points[points.length - 2].x, points[points.length - 2].y, points[points.length - 2].z - 10));
    edges.push(new Edge(points.length - 2, points.length - 1));
    */
    //шахматный порядок у сферы
    /*
    let newPoints = [];
    for(let i = 0; i < polygones.length; i++){
        if(i % 2 === 1){
            newPoints.push(polygones[i]);
        }
    }
    */
    return new Subject(points, edges, polygones);
}
    
