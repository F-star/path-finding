
// 简单 svg 库，造个简单的针对本项目的轮子（其实是我想练手。。）

// 需要做的功能
// 1. 创建根部 svg
// 2. 创建嵌套 svg
// 3. 创建 circle rect line。
// 4. 获取 zoom
// 5. 进行缩放的方法？
// const ns = "http://www.w3.org/1999/xlink"
const ns = "http://www.w3.org/2000/svg"


const SVG = (seletor, w, h) => {
    let container = document.getElementById(seletor);
    let attrs = {};
    if (w != undefined) attrs.width = w;
    if (h != undefined) attrs.height = h;
    return new RootSVG(container, attrs);
};

class Container{
    constructor() {}
    circle(attrs) {
        // this.el('circle', attrs);
        return new Circle(this.node, attrs);
    }
    group(attrs) {
        return new Group(this.node, attrs)
    }
    line(x1, y1, x2, y2) {
        const attrs = {
            x1, y1, x2, y2
        }
        return new Line(this.node, attrs)
    }
    text(text, x, y) {
        const attrs = {x, y}
        return new Text(this.node, text, attrs)
    }
}

class RootSVG extends Container{
    constructor(parentNode, attrs) {
        super()
        // this.node = el.node;
        this.node = document.createElementNS(ns, 'svg');
        setAttributes(this.node, attrs);
        parentNode.appendChild(this.node);
    }
    neated(params) {

    }
}
class Group extends Container{
    constructor(parentNode, attrs) {  // cx, cy, r
        super();
        this.node = document.createElementNS(ns, 'g');
        setAttributes(this.node, attrs);
        parentNode.appendChild(this.node);
    }
}


class Element{
    constructor() {}
    attrs(attrs) {
        for (let key in attrs) {
            this.node.setAttribute(key, attrs[key])
        }
    }

}

class Circle extends Element{
    constructor(parentNode, attrs) {  // cx, cy, r
        super();
        this.node = document.createElementNS(ns, 'circle');
        setAttributes(this.node, attrs);
        parentNode.appendChild(this.node);
    }
}

class Line extends Element{
    constructor(parentNode, attrs) {  // cx, cy, r
        super();
        this.node = document.createElementNS(ns, 'line');
        setAttributes(this.node, attrs);
        parentNode.appendChild(this.node);
    }
} 

class Text extends Element{
    constructor(parentNode, text, attrs) {  // cx, cy, r
        super();
        this.node = document.createElementNS(ns, 'text');
        this.node.innerHTML = text;
        setAttributes(this.node, attrs);
        parentNode.appendChild(this.node);
    }
} 


function setAttributes (node, attrs) {
    if (!attrs) return;
    for (let key in attrs) {
        if (attrs[key] == undefined) continue;
        node.setAttribute(key, attrs[key])
    }
}

const createNeatedSVG = () => {}

export default SVG;