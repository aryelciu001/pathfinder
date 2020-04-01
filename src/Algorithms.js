export const dijkstraAlgo = (map, start, finish, size) => {
  var table = makeTable(map);
  //traverse all nodes while updating table
  table = traverseNeighborDijkstra(table, start, size, start)[0];
  var route = findRoute(finish, table);
  if (route[0][0] === start[0] && route[0][1] === start[1]) {
    return route;
  } else {
    return [];
  }
};

const makeTable = map => {
  var table = [];
  var newRow;
  var node;
  map.map(row => {
    newRow = [];
    row.map(el => {
      node = {
        isVisited: false,
        isWall: false,
        prevNode: null,
        distFromStart: Infinity
      };
      if (el.stat === "wall") {
        node.isWall = true;
      }
      newRow.push(node);
    });
    table.push(newRow);
  });
  return table;
};

const traverseNeighborDijkstra = (table, curNodeLoc, size, start) => {
  var recVisCount = 0;
  var x = curNodeLoc[0];
  var y = curNodeLoc[1];
  var curNode = table[y][x];
  if (x === start[0] && y === start[1]) {
    curNode.isVisited = true;
    curNode.distFromStart = 0;
    recVisCount++;
  }
  var left = [x - 1 >= 0 ? x - 1 : x, y];
  var right = [x + 1 < size ? x + 1 : x, y];
  var up = [x, y - 1 >= 0 ? y - 1 : y];
  var down = [x, y + 1 < size ? y + 1 : y];
  var neighbors = [up, down, left, right];
  var seenNeighbor = false;
  for (let neighbor of neighbors) {
    var [xn, yn] = neighbor;
    var node = table[yn][xn];
    if (node.isWall) continue;
    if (!node.isVisited) {
      node.isVisited = true;
      node.distFromStart = curNode.distFromStart + 1;
      node.prevNode = [x, y];
      recVisCount++;
      seenNeighbor = true;
    } else {
      if (node.distFromStart > curNode.distFromStart + 1) {
        node.distFromStart = curNode.distFromStart + 1;
        node.prevNode = [x, y];
        seenNeighbor = true;
      }
    }
    var childVisCount;
    if (seenNeighbor) {
      [table, childVisCount] = traverseNeighborDijkstra(
        table,
        neighbor,
        size,
        start,
        recVisCount
      );
      recVisCount += childVisCount;
    }
  }
  return [table, recVisCount];
};

const findRoute = (finish, table) => {
  var [x, y] = finish;
  var curNode = table[y][x];
  var route = [];
  while (1) {
    curNode = table[y][x];
    route.unshift([x, y]);
    if (curNode.prevNode === null) break;
    [x, y] = curNode.prevNode;
  }
  return route;
};
