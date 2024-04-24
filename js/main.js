
//random 144 btn 18 loai, moi loai co so luong la 8
function getRandom(n) {
    return Math.round(Math.random() * (n - 1));
}
var currentLevel =6;
function level() {
    currentLevel++;
    $('.level').html(currentLevel);
    startCountDown();
}
const nodeText =$('.text');
function loadImg() {
    var arr = [];
    for (var i = 1; i <= 18; i++) {
        arr.push('img/level'+currentLevel+'/icon' + i + '.png')
    }
    return arr;
}
function loadB() {
    var arr = [];
    for (var i = 1; i <= 14; i++) {
        arr.push('img/background/b' + i + '.jpg')
    }
    return arr;
}
var b = loadB();
function newArray(row) {
    var a = new Array;
    for (var i = 0; i < row; i++)
        a[i] = new Array;
    return a;
}
var arrImg = loadImg();
// var arrImg2 = loadImg2();
function getNewMatrix() {
    var a = newArray(11);
    var i, j, k, t, remain, key;
    var stop;
    for (i = 0; i < 11; i++)
        for (j = 0; j < 18; j++)
            a[i][j] = 0;
    remain = 144;
    for (k = 0; k <= 18; k++) {
        for (t = 1; t <= 8; t++) {
            key = getRandom(remain--) + 1;
            stop = false;
            for (i = 1; i <= 9; i++) {
                if (stop)
                    break;
                else
                    for (j = 1; j <= 16; j++)
                        if (a[i][j] == 0) {
                            key--;
                            if (key == 0) {
                                stop = true;
                                a[i][j] = arrImg[k];
                                break;
                            }
                        }
            }
        }
    }
    console.log(a);
    return a;
}
//tao ma tran 9 * 16
function createMatrix(row, col) {
    $(".pokemon-background").css({'background-image': "url(" + b[Math.floor(Math.random() * b.length)] + ")"})
    var pikachuHtml = '';
    var arr1 = getNewMatrix()
    for (var i = 1; i < row - 1; i++) {
        for (var j = 1; j < col - 1; j++) {
            $(".btn-item").css({'background-image': 'url(' + arr1[i][j] + ')'})
            pikachuHtml += '<button class="btn-item" style="display: flex; id="item' + i + '-' + j + '" x=' + i + ' y=' + j + ' z='+ arr1[i][j] +'><img class="icon" src='+arr1[i][j]+'> </button>'
            arr1[i][j] = arr1[i][j];
        }
    }
    $('.pokemon-body__center-icon').html(pikachuHtml);
    // console.log(arr1)
    return arr1;
}
var arr = createMatrix(11, 18)
console.log("arr: " + arr)
// check;
function checkLineX(y1, y2, x) {
    // find point have column max and min
    var min = Math.min(y1, y2);
    var max = Math.max(y1, y2);
    // run column
    for (var y = min + 1; y < max; y++) {
        if (arr[x][y] != 0) { // if see barrier then die
            return false;
        }
    }
    return true;
}
function checkLineY(x1, x2, y) {
    var min = Math.min(x1, x2);
    var max = Math.max(x1, x2);
    for (var x = min + 1; x < max; x++) {
        if (arr[x][y] != 0) {
            return false;
        }
    }
    return true;
}
function checkRectX(p1, p2) {

    // find point have y min and max
    var pMinY = p1, pMaxY = p2;
    if (p1.y > p2.y) {
        pMinY = p2;
        pMaxY = p1;
    }
    for (var y = pMinY.y; y <= pMaxY.y; y++) {
        if (y > pMinY.y && arr[pMinY.x][y] != 0) {
            return false;
        }
        // check two line
        if ((arr[pMaxY.x][y] == 0)
            && checkLineY(pMinY.x, pMaxY.x, y)
            && checkLineX(y, pMaxY.y, pMaxY.x)) {

            console.log("Rect x");
            console.log("(" + pMinY.x + "," + pMinY.y + ") -> ("
                + pMinY.x + "," + y + ") -> (" + pMaxY.x + "," + y
                + ") -> (" + pMaxY.x + "," + pMaxY.y + ")");
            // if three line is true return column y
            return true;
        }
    }
    // have a line in three line not true then return -1
    return false;
}
function checkRectY(p1, p2) {
    var pMinX = p1, pMaxX = p2;
    if (p1.x > p2.x) {
        pMinX = p2;
        pMaxX = p1;
    }
    // find line and y begin
    for (var x = pMinX.x; x <= pMaxX.x; x++) {
        if (x > pMinX.x && arr[x][pMinX.y] != 0) {
            return false;
        }
        if ((arr[x][pMaxX.y] == 0)
            && checkLineX(pMinX.y, pMaxX.y, x)
            && checkLineY(x, pMaxX.x, pMaxX.y)) {

            console.log("Rect y");
            console.log("(" + pMinX.x + "," + pMinX.y + ") -> (" + x
                + "," + pMinX.y + ") -> (" + x + "," + pMaxX.y
                + ") -> (" + pMaxX.x + "," + pMaxX.y + ")");
            return true;
        }
    }
    return false;
}
function checkMoreLineX(p1, p2, type) {

    // find point have y min
    var pMinY = p1, pMaxY = p2;
    if (p1.y > p2.y) {
        pMinY = p2;
        pMaxY = p1;
    }
    // find line and y begin
    var y = pMaxY.y + type;
    var row = pMinY.x;
    var colFinish = pMaxY.y;
    if (type == -1) {
        colFinish = pMinY.y;
        y = pMinY.y + type;
        row = pMaxY.x;
    }

    // find column finish of line
    // check more
    if ((arr[row][colFinish] == 0 || pMinY.y == pMaxY.y)
        && checkLineX(pMinY.y, pMaxY.y, row)) {
        while (arr[pMinY.x][y] == 0
        && arr[pMaxY.x][y] == 0) {
            if (checkLineY(pMinY.x, pMaxY.x, y)) {

                console.log("TH X " + type);
                console.log("(" + pMinY.x + "," + pMinY.y + ") -> ("
                    + pMinY.x + "," + y + ") -> (" + pMaxY.x + "," + y
                    + ") -> (" + pMaxY.x + "," + pMaxY.y + ")");
                return true;
            }
            y += type;
        }
    }
    return false;
}
function checkMoreLineY(p1, p2, type) {
    var pMinX = p1, pMaxX = p2;
    if (p1.x > p2.x) {
        pMinX = p2;
        pMaxX = p1;
    }
    var x = pMaxX.x + type;
    var col = pMinX.y;
    var rowFinish = pMaxX.x;
    if (type == -1) {
        rowFinish = pMinX.x;
        x = pMinX.x + type;
        col = pMaxX.y;
    }
    if ((arr[rowFinish][col] == 0 || pMinX.x == pMaxX.x)
        && checkLineY(pMinX.x, pMaxX.x, col)) {
        while (arr[x][pMinX.y] == 0
        && arr[x][pMaxX.y] == 0) {
            if (checkLineX(pMinX.y, pMaxX.y, x)) {
                console.log("TH Y " + type);
                console.log("(" + pMinX.x + "," + pMinX.y + ") -> ("
                    + x + "," + pMinX.y + ") -> (" + x + "," + pMaxX.y
                    + ") -> (" + pMaxX.x + "," + pMaxX.y + ")");
                return true;
            }
            x += type;
        }
    }
    return false;
}
function checkTwoPoint(p1, p2) {
    if (!(p1.x === p2.x && p1.y === p2.y) && arr[p1.x][p1.y] == arr[p2.x][p2.y]) {
        // check line with x
        if (p1.x == p2.x) {
            if (checkLineX(p1.y, p2.y, p1.x)) {
                return 1;
            }
        }
        // check line with y
        if (p1.y == p2.y) {
            if (checkLineY(p1.x, p2.x, p1.y)) {
                return 1;
            }
        }
        // check in rectangle with x
        if (checkRectX(p1, p2)) {
            // System.out.println("rect x");
            return 1;
        }
        // check in rectangle with y
        if (checkRectY(p1, p2)) {
            return 1;
        }
        // check more right
        if (checkMoreLineX(p1, p2, 1)) {
            return 1;
        }
        // check more left
        if (checkMoreLineX(p1, p2, -1)) {
            return 1;
        }
        // check more down
        if (checkMoreLineY(p1, p2, 1)) {
            return 1;
        }
        // check more up
        if (checkMoreLineY(p1, p2, -1)) {
            return 1;
        }
    }
    return null;
}
var tmp = 0;
var time = 0;
function startCountDown() {
    if (time > 0) clearInterval(time);
    tmp = 355;
    $(".pokemon-body__right-time").css({'height': '355px', 'background-image': 'linear-gradient(red, yellow, green)'});
    time = setInterval('decTime()', 1000);
    if(currentLevel==6){
        tmp=150;
        $('.pokemon-body__right').css('height','150px')
        $(".pokemon-body__right-time").css({'height': '150px', 'background-image': 'linear-gradient(red, yellow, green)'});
        time = setInterval('decTime()', 1000);
    }
}
function decTime() {
    tmp-=1;
    $(".pokemon-body__right-time").css({'height': tmp + "px"});
    console.log(tmp)
    if (tmp <= 0) {
        clearInterval(time);
        alert("ĐÃ HẾT THỜI GIAN");
        $('.pokemon-body__right').css('height','355px')
        currentLevel=0;
        level();
        arrImg = loadImg();
        createLevel();
        scores();
    }
}
startCountDown();
var check = null;
var height = 150;
function main() {
    if(currentLevel==1){
        nodeText.html('Cách chơi truyền thống!')
    }
    else if(currentLevel==2){
        nodeText.html('Bạn cần thu thập hết quả cầu pokemon để qua level!')
    }
    else  if(currentLevel==3){
        nodeText.html('Nếu bạn chạm trúng quả bom bạn sẽ thua cuộc!')
    }
    else if(currentLevel==4){
        nodeText.html('Nếu bạn chọn sai thì sẽ từ đi 5 giây trong thanh thời gian!')
    }
    else if(currentLevel==5){
        nodeText.html('Level này cách chơi như level 4 nhưng sẽ có các vật chắn!')
    }
    else if(currentLevel==6){
        nodeText.html('Bạn chỉ có 150 giây ban đầu, nếu bạn chọn đúng thì sẽ cộng thêm 4 giây thời gian!')
    }
    score = 0;
    $('.btn-item img[src*="img/level3/icon1.png"]').click(function (){
        alert("Game over");
        currentLevel=0;
        level();
        arrImg = loadImg();
        createLevel();
        scores();
    })
    $(".btn-item").click(function () {
        if (check == null) {
            check = $(this)
            $(this).focus().css({'transform': 'scale(1.1)'});
            check.focus().css({'transform': 'scale(1.1)'});
        } else {
            var p1 = {x: Number(check.attr("x")), y: Number(check.attr("y"))};
            var p2 = {x: Number($(this).attr("x")), y: Number($(this).attr('y'))};
            check.focus().css({'transform': 'scale(1)'});
            $(this).focus().css({'transform': 'scale(1)'});
            if (checkTwoPoint(p1, p2)) {
                if(currentLevel==6 && tmp <=355 && height<=355){
                    tmp+=4;
                    $('.pokemon-body__right').css('height',height)
                    height+=4;
                    console.log("h:" + height)
                }
                console.log(true)
                score += 50
                scores();
                check.addClass('icon--hidden')
                $(this).addClass('icon--hidden')
                // $(this).addClass('icon--hidden')
                arr[p1.x][p1.y] = 0;
                arr[p2.x][p2.y] = 0;
                checkWin();
            } else{
                if(currentLevel==5||currentLevel==4){
                    tmp -=10;
                }
                console.log(false);
            }

            check = null;
        }
    })
}
main()
var score;
function scores() {
    $('.scores').html(score)
}
function createLevel() {
    arr = createMatrix(11, 18)
    main();
    scores();
}
$('button[z*="img/level5/icon1.png"]').attr('disabled','true');
function checkWin(){
    var isFoundArr = false;
    if(currentLevel==1){
        loop: for (var i = 1; i < arr.length - 1; i++) {
            for (var j = 1; j < arr[i].length - 1; j++) {
                if (arr[i][j] !=0 ) {
                    isFoundArr = true;
                    break loop;
                }
            }
        }
    }
    else if(currentLevel==2){
        loop:for (var i = 1; i < arr.length - 1; i++) {
            for (var j = 1; j < arr[i].length - 1; j++) {
                if (arr[i][j] == "img/level2/icon1.png") {
                    isFoundArr = true;
                    break loop;

                }

            }
        }

    }
    else if(currentLevel==3){
        loop:for (var i = 1; i < arr.length - 1; i++) {
            for (var j = 1; j < arr[i].length - 1; j++) {
                if (arr[i][j]!=0 && arr[i][j] != "img/level3/icon1.png") {
                    isFoundArr = true;
                    break loop;

                }

            }
        }

    }
    else if(currentLevel==4){
        loop:for (var i = 1; i < arr.length - 1; i++) {
            for (var j = 1; j < arr[i].length - 1; j++) {
                if (arr[i][j]!=0) {
                    isFoundArr = true;
                    break loop;
                }

            }
        }

    }
    else if(currentLevel==5){
        loop:for (var i = 1; i < arr.length - 1; i++) {
            for (var j = 1; j < arr[i].length - 1; j++) {
                if (arr[i][j]!=0 && arr[i][j] != "img/level4/icon1.png") {
                    isFoundArr = true;
                    break loop;
                }

            }
        }

    }
    else if(currentLevel==6){
        loop:for (var i = 1; i < arr.length - 1; i++) {
            for (var j = 1; j < arr[i].length - 1; j++) {
                if (arr[i][j]!=0) {
                    isFoundArr = true;
                    break loop;
                }

            }
        }
    }
    if (!isFoundArr) {
        // console.log("hi");
        if(currentLevel<6){
            level();
            arrImg = loadImg();
            createLevel();
        }
        else{
            currentLevel=0;
            level();
            arrImg = loadImg();
            createLevel();
            scores();
            $('.pokemon-body__right').css('height','355px')
        }
    }
}
//replay
$('.btn-replay').click(function () {
    currentLevel=0;
    level();
    arrImg = loadImg();
    createLevel();
    scores();
    $('.pokemon-body__right').css('height','355px')
})