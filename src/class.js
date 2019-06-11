import { gPoints, gLines, gGuideLine } from "./view.js";
import { colors } from "./data.js";

// 图的实现
const createIndex = (() => {
    let index = -1;
    return () => {
        return ++index;
    }
})()


// 图的邻接表实现
class StationGraph {
    constructor() {
        this.items = []   // 邻接矩阵（Adjacency Matrix）
        this.transfers = {};    // 换乘站。例子：{ '大学城南': [12, 35, 21]}
    }
    getSize() {
        return this.items.length;
    }
    addEdge(s, t) {
        // s 和 t 为索引值。这里需要根据 id 遍历 数组。
        this.adj[s].add(t);
        this.adj[t].add(s);
    }

    // 传入一个 Station 实例对象
    addStation(station) {
        this.items.push(station)
    }

    initStations(data, transfers) {
        // alias 用来表示哪些 id 其实是指向同一个 id。
        // 防止中转站的 id 创建相同的 station
        let hashMap = {};  // 缓存中转站的 station 对象。

        for (let key in transfers) {
            this.transfers[key] = [];
        }

        for (let index in data) {
            const stations = data[index];    // n 号线
            const lineColor = colors[index];

            let prevStation = null;   // 上一个站。
            stations.forEach((params, i) => {
                const realId = index + '-' + params.id;
                let station = null; 
                let name = params.name;

                // TODO 代码很乱，优化一下

                if (transfers[name] === 0) {
                    // 需要记录 id 是否被记录。。另外要考虑一个地铁站有三个 id 的情况。
                    // 检查同名的多个 readId 是否有一个被实例过。
                    station = new Station(Object.assign(params,  { id: realId}));
                    hashMap[name] = station;
                    transfers[name] = 1;
                    this.transfers[name].push(realId);
                    this.addStation(station);
                } else if ((transfers[name] === 1) ) {
                    station = hashMap[name];
                    this.transfers[name].push(realId);
                }
                else {
                    station = new Station(Object.assign(params, {id: realId}));
                    this.addStation(station);
                }

                if (prevStation) {
                    station.addOut(prevStation);
                    prevStation.addOut(station);
                    // 生成线条
                    gLines.line(prevStation.x, prevStation.y, station.x, station.y)
                          .attrs({
                              stroke: lineColor,
                              'stroke-width': 3
                            });
                }
                
                prevStation = station;
            });
        }
    }

    getStationById(id) {
        const items = this.items;
        for (let i = 0, len = items.length; i < len; i++) {
            const station = items[i];
            if (station.id === id) return station;
            else if (this.transfers[station.name]) {
                // 检查所有 别名id
                const ids = this.transfers[station.name]; 
                for (let i = 0, len = ids.length; i < len; i++) {
                    if (ids[i] == id) return station;
                }
            }
        }
    }
    // 广度优先查找。
    // s 和 t 为索引值。
    bfs(s, t) {
        const size = this.getSize();

        if (s < 0 || s >= size || t < 0 || t >= size) {
            console.warn('索引越界')
            return '索引越界';   // 索引越界。
        }
        if (s == t) return s + '';  
        
        const queue = [],
              visited = new Array(size),
              prev = new Array(size);
        
        queue.push(s);  // 放入初始值
        

        while (true) {
            // console.log(queue)
            const topIndex = queue.shift(),
                  top = this.items[topIndex];

            // top.out.forEach(p => {
            // top.out

            for (let j = 0, len = top.out.length; j < len; j++) {
                
                let i = top.out[j].index;
                if (visited[i]) continue;
                prev[i] = topIndex;
                if (i == t) {
                    console.log(i);
                    return resolvePrev(prev, s, t);
                }
                queue.push(i);
                visited[i] = true;
            }
        }
        
    }
    // 绘制。
    draw() {
        // g#point
        // g#line
        // g#guideLine
    }
}

// 解析 prev 数组，得到正序路径
function resolvePrev(prev, s, t) {
    if (s == t) return s + '';
    return f(t);
    function f(p) {
        if (p == s) {
            return s
        } 
        return f(prev[p]) + ' -> ' + p  // 我自己都不太理解。。。
    }

}

class Station{
    constructor(params) {
        this.id = params.id;
        this.index = createIndex();
        this.name = params.name;
        this.aliasId = params.aliasId
        this.x = params.x
        this.y = params.y
        // this.lat = params.lat;
        // this.long = params.long;
        this.out = [];   // 出度。和什么地铁站相连

        this.createNode()
    }

    createNode() {
        const scale = 60;
        this.x = (this.x + 1) * scale;
        this.y = (this.y + 1) * scale;
        this.node = gPoints.circle({
            cx: this.x,
            cy: this.y,
            r: 4,
            fill: '#f04',
        })

        gGuideLine.text(this.index, this.x + 1, this.y - 5)
    }

    // 添加出度
    addOut(station) {
        this.out.push(station);
    }

}

export {
    StationGraph,
    Station,
}

// 链表的实现（要想实现图，先得实现链表）
// 这里其实可以考虑动态数组。。
// class LinkedList{
//     constructor() {
//         this.items = [];
//     }
//     add(val) {
//         this.items.push(val);
//     }
// }

// class Vertex {
//     constructor(name, long, lat) {
//         this.id = 0;
//         this.name_ = name;
//         this.long_ = long       // 经度
//         this.lat_ = lat         // 维度
//         // this.
//     }
// }


// 自己实现个 lin jie。地铁线路是稀疏图，