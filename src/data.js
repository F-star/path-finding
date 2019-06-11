
const data = {
    1: [
        {
            id: 1,
            name: 'a',
            // lat: 1,   // 纬度（对应 x 轴）
            // long: 0,  // 经度
            x: 0, y: 1,
        },
        { id: 2, aliasId: '2-2', name: 'b', x: 1, y: 1,},
        { id: 3, aliasId: '3-2', name: 'c', x: 2, y: 1}, 
        { id: 4, name: 'd', x: 3, y: 1 }, 
    ],
    2 : [
        { id: 1 , name: 'e', x: 1, y: 0 },
        { id: 2, name: 'b', aliasId: '1-2', x: 1, y: 1 },
        { id: 3, name: 'f', x: 1, y: 2},
    ],
    3: [
        { id: 1, name: 'g', x: 2, y: 0},
        { id: 2, aliasId: '1-3', name: 'c', x: 2, y: 1},
        {id: 3, name: 'h', x: 2, y: 2},
        {id: 4, name: 'i', x: 2, y: 3}
    ],
    4: [
        {id: 1, name: 'j', x: 1, y: 3},
        {id: 2, name: 'i', x: 2, y: 3},
        {id: 3, name: 'k', x: 3, y: 3},
    ],
    5: [ 
        {id: 1, name: 'c', x: 2, y: 1},
        {id: 2, name: 'k', x: 3, y: 3},
        {id: 3, name: 'l', x: 4, y: 4}, 
    ]
}

const colors = [
    '#2e3a1f', '#f58220', '#181d4b', '#7a1723', '#00a6ac', '#3c3645'
]


// 换乘站
const transfers = {
    'b': 0,  // 0 表示已经尚未初始化，1 表示已经初始化
    'c': 0,
    'i': 0,
    'k': 0,
}


// 线路别名。卧槽，某地铁站有 3 个id的情况：嘉禾望岗
// const alias = {
//     '1-2': '2-2',
//     '1-3': ['3-2', '5-1'],
//     '4-2': '3-4',
//     '4-3': '5-2',
// }
// // 遍历这个对象，产生逆哈希表。
// for (let key in alias) {
//     if (Array.isArray(alias[key])) {
//         alias[key].forEach((item, index) => {
//             let newArr = alias[key].slice();
//             newArr.splice(index, 1, key);
//             alias[item] = newArr;
//         });
//     } else {
//         alias[alias[key]] = key;
//     }
// }
export { data, transfers, colors }