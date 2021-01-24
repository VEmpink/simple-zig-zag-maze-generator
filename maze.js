const btn = document.getElementById('generateMaze');
const maze = document.getElementById('maze');

function generateMaze(s, box = [], currentColumn = 0) {
    const mazeDimension = parseInt(s),
        mazeWall = '@',
        mazePath = '\xa0\xa0\xa0',
        isOdd = currentColumn % 2 === 0,
        contentRow = [];

    if (isNaN(mazeDimension)) {
        alert('Please enter a Number!');
        return;
    }

    if (mazeDimension < 4) {
        alert('Minimum is 4!');
        return;
    }

    if (currentColumn > mazeDimension - 1) {
        const oddIndex = [];

        for (let index = 0; index < mazeDimension; index++) {
            const isIndexOdd = index % 2 === 0;

            isIndexOdd && oddIndex.push(index);
        }

        const listEvenIndexFromOddIndex = [];
        for (let index = 0; index < oddIndex.length; index++) {
            const isIndexEven = index % 2 === 1;

            isIndexEven && listEvenIndexFromOddIndex.push(oddIndex[index]);
        }

        const remapBox = box.map((v, i) => {
            if (listEvenIndexFromOddIndex.includes(i)) {
                return v.reverse();
            }

            return v;
        });

        remapBox.forEach((v, i) => {
            maze.innerText += `${v.join('')}\n`;
        });

        return remapBox;
    }

    for (let index = 0; index < mazeDimension; index += 1) {
        if (isOdd) {
            contentRow.push(index === 1 ? mazePath : mazeWall);
        } else {
            contentRow.push(index === 0 || index === mazeDimension - 1 ? mazeWall : mazePath);
        }
    }

    box.push(contentRow);
    currentColumn += 1;
    generateMaze(s, box, currentColumn);
}

btn.onclick = function () {
    const S = prompt('Please enter the Maze Dimension you want', '15');

    generateMaze(S);
};
