const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");

let basepath = "./docs"; //解析目录路径
let filterFile = ["CNAME", "auto.js", "README.md", "_sidebar.md", "index.html", ".nojekyll", "autosidebar.js", "_sidebar.md.bak"]; //过滤文件名，使用，隔开
let stopFloor = 10; //遍历层数
let isFullPath = true; //是否输出完整路径

function getPartPath(dirPath) {
    let base = basepath.split(/\/|\\/g);
    dirPath = dirPath.split(/\/|\\/g);
    while (base.length && dirPath.length && base[0] === dirPath[0]) {
        base.shift();
        dirPath.shift();
    }
    return dirPath.join("/");
}

function isFilterPath(item) {
    for (let i = 0; i < filterFile.length; i++) {
        let reg = filterFile[i];
        if (item.match(reg) && item.match(reg)[0] === item) return true;
    }
    return false;
}

function processDir(dirPath, dirTree = [], floor = 1) {
    let list = fs.readdirSync(dirPath);
    list = list.filter((item) => {
        return !isFilterPath(item);
    });
    list.forEach((itemPath) => {
        const fullPath = path.join(dirPath, itemPath);
        const fileStat = fs.statSync(fullPath);
        const isFile = fileStat.isFile();
        const dir = {
            filepath: isFullPath ? getPartPath(fullPath) : itemPath,
        };
        if (!isFile) {
            dir.children = processDir(fullPath, [], floor + 1);
            dir.isFile = false
        } else {
            dir.isFile = true
        }
        dirTree.push(dir);
    });
    return dirTree;
}

let dirTree = [];
dirTree = processDir(basepath, dirTree);


let list = new Array();
list.length = 0




function consoleTree(tree) {


    tree.forEach(obj => {
        var filename = obj.filepath.split('/').slice(-1)[0]
        var file = filename.split('-')

        obj.num = Number(file[0])
        obj.name = file[1].replace('.md', '')
        obj.fullname = filename
        if (obj.children) {
            consoleTree(obj.children)
        }
    });

    tree.sort(function(a, b) { return a.num - b.num });
}

consoleTree(dirTree);

fs.writeFileSync("./data.json", JSON.stringify(dirTree));



// function consoleTree(tree) {


//     tree.forEach(obj => {
//         var filename = obj.filepath.split('/').slice(-1)
//         var file = filename[0].split('-')

//         obj.num = Number(file[0])
//         obj.name = file[1].replace('.md', '')
//         list.push(obj)
//         if (obj.children) {
//             consoleTree(obj.children)
//         }
//     });

//     list.sort(function(a, b) { return a.num - b.num });
// }



// consoleTree(dirTree);


// fs.writeFileSync("./data.json", JSON.stringify(list));