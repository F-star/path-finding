// 0. svg 相关方法编写（不使用 svgjs 库，调研canvas 方案和 svg 方案的优缺点）
// 1. 获取地铁站的经纬度（这个可以慢慢收集）
// 2. 如何保存 顶点 和 边
// 3. 可以选择寻路算法（提供算法选择）
// 4. svg 动画实现从一个点到另一个点。
// 5. 交互以及适配移动端（最后才做）


import { data, transfers } from './data.js';
import { StationGraph } from'./class.js'


const graph = new StationGraph();
graph.initStations(data, transfers);

console.log(transfers)
console.log(graph)
console.log( graph.bfs(0, 11))

document.getElementById('getpath_btn').addEventListener('click', getPath)

function getPath() {
    let s = parseInt (document.getElementById('start').value);
    let t = parseInt (document.getElementById('destination').value);
    let pathStr;
    if (Number.isNaN(s) || Number.isNaN(t)) {
        console.error('输入有误')
        pathStr = '输入有错误'
        // return false;
    } else {
        pathStr = graph.bfs(s, t)
    }
    document.getElementById('output').innerHTML = pathStr;
}

