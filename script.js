function initCubeCss(height, width, perspective, scale) {
    let scene = document.querySelector('.scene');
    scene.style.perspective = perspective + "px";

    let cube = document.querySelector('.cube');
    cube.style.fontSize = scale + "px";
    cube.style.height = height + "em";
    cube.style.width = width + "em";

    let sides = document.querySelectorAll('.side');

    sides.forEach(el => {
        el.style.height = height + "em";
        el.style.width = width + "em";
    })

    setTimeout(() => {
        cube.style.opacity = "1";
    }, 3000)

    return cube;
}


function start() {
    let app = document.getElementById('app');
    let loader = document.getElementById('loader');

    const Cube = function(width, height, scale) {
        this.width = width,
        this.height = height,
        this.perspective = scale * height * 4;
        this.scale = scale;
        this.cssCube = null;
        this.content = [];
        this.intervales = [];
    }

    Cube.prototype.createContent = function(name, width, height) {
        if(!this.content.includes(name)) {
            this.content[name] = [];
            this.content[name]['width'] = width;
            this.content[name]['height'] = height;
        }
    }

    Cube.prototype.rotate = function(to) {
        let description = "";
        switch(to) {
            case 'right':
                description = "rotate3d(1, 0, 0, 90deg)";
            case 'up':
                description = "rotate3d(0, 0, 0, 90deg)";
            case 'down':
                description = "rotate3d(0, 0, 0, -90deg)";
            case 'left':
                description = "rotate3d(1, 0, 0, -90deg)";
        }
        this.cssCube.style.transform = description;
    }

    Cube.prototype.showRotation = function() {
        let deg = 0;
        let sr = setInterval(() => {
            deg += 1;
            if(deg == 360) 
                deg = 0;
            this.cssCube.style.transform = "rotate3d(0, 1, 0, "+deg+"deg)";
        }, 60);
        if(!this.intervales.includes('showRotation'))
            this.intervales['showRotation'] = sr;
    }

    Cube.prototype.clear = function(name) {
       if(this.intervales[name] != undefined)
            clearInterval(this.intervales[name]);

    }

    let c = new Cube(8, 8, 50); // em em px

    c.cssCube = initCubeCss(c.height, c.width, c.perspective, c.scale); // px px

    app.style.transition = "opacity 2s ease-in-out";
    setTimeout(() => {
        loader.style.display = "none";
        app.classList.remove('hidden');
        app.style.opacity = "1";
    }, 4000);

    return c;
}

let cube = start();
cube.showRotation();

const line = document.querySelector('.line');
line.style.width = "200px";line.style.height = "200px";
line.style.background = "#111";
line.style.position = "absolute";
line.style.bottom = "0px";
line.style.right = "0px";
line.style.transform = "rotate3d(1,1,1,50deg)";

