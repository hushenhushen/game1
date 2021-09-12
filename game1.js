
// 元素总数量（如：牙签，这里统一叫元素  对应对象 gameItem）
var ITEMMAX = 15;
// 玩家总数量 (对应对象  gamePlayer)
var PLAYERMAX = 2;
// 元素初始化状态  0 未取走  >0  表示玩家ID
var ITEMTYPE_INIT = 0;
// 初始化游戏
var gameItemList = Array();
var gamePlayerList = Array();
// 游戏行数设计，可随意修改每行数量,相加的总数应和ITEMMAX相同，如果有多余的会算作最后一行里
var gameMap = [3, 5, 7];



/**
 * 游戏入口
 */ 
function main(){

    initGame();

    startGame();
}

/**
 * 开始游戏
  */
function startGame(){

    console.log("开始游戏了！")

    console.log("玩家数量="+gamePlayerList.length);
    

    // 开始游戏
    while(true){

        console.log("元素剩余数量="+getGameItemNum());

        var isover = false;
        for (var index = 0; index < gamePlayerList.length; index++) {
            var gamePlayer = gamePlayerList[index];
            gamePlayerAttack(gamePlayer);
            if(getGameItemNum()<=0){
                console.log("没有元素了 输家是:"+gamePlayer.name);
                isover = true;
                break;
            }
            
        }

        if(isover){
            break;
        }

    }

}

/**
 * 初始化游戏数据
 */
function initGame(){


    console.log("元素总数="+ITEMMAX)
    for (var index = 0; index < ITEMMAX; index++) {
        
        // 游戏元素实体
        var gameItem = new Object();
        gameItem.id = index;
        gameItem.row = getRow(index);  // 所在行
        gameItem.playerId = ITEMTYPE_INIT;  // 此元素由哪个玩家取走   0 未取走  >0  表示玩家ID
    
        console.log("元素"+gameItem.id+" 所在行="+gameItem.row)
    
        gameItemList.push(gameItem);
    
    }
    
    
    // 初始化玩家队列
    
    for (var index = 0; index < PLAYERMAX; index++) {
        
        // 游戏玩家实体
        var gamePlayer = new Object();
        var tid = (index+1);  // 生成玩家ID
        gamePlayer.id=""+tid;
        gamePlayer.name="玩家"+tid;
    
        console.log("来了玩家"+gamePlayer.id+" 名字是="+gamePlayer.name)
    
        gamePlayerList.push(gamePlayer);
    
    }

}

/**
 * 单轮游戏进行
 * @param {*} gamePlayer 玩家对象
 */
function gamePlayerAttack(gamePlayer){

    // console.log("单轮游戏开始 操作者是"+gamePlayer.name)
    // 模拟玩家随机获取元素    
    var startidx = Math.floor(Math.random()*gameItemList.length)

    // 模拟玩家选择行和数量
    var playerSelectRow = 0
    var selectRowNum = 0;
    while(true){
        playerSelectRow = getRandom(0,3)
        selectRowNum = getGameItemNum(playerSelectRow)
        if(selectRowNum>0){
            // console.log("OK==="+selectRowNum);        
            break;
        }
        if(getGameItemNum()<=0){
            // console.log("没有元素了==="+selectRowNum);
            break;
        }
    }
    var playerSelectNum = getRandom(1,selectRowNum)
    console.log("玩家"+gamePlayer.id+" 选择从第"+playerSelectRow+"行 拿走"+playerSelectNum+"个元素 原有"+selectRowNum)

    setGameItem(playerSelectRow, gamePlayer.playerId, playerSelectNum);

    if(getGameItemNum() <= 0){
        // console.log("over  !!!"+gamePlayer.name);
        return gamePlayer;
    }

    return null;
   
}


/**
 * 随机数
 * @param {*} min 最小
 * @param {*} max 最大
 * @returns 不包含最大
 */
function getRandom(min, max){
    
    return Math.floor(Math.random()*(max-min))+min
}


/**
 * 根据索引，获得所在行
 * @param {*} idx 元素ID
 * @returns 分配所在行
 */
function getRow(idx){
    var curr = 0;
    for (var i = 0; i < gameMap.length; i++) {
        for (var j = 0; j < gameMap[i]; j++) {
            if(idx == curr){
                return i;
            }
            curr++;
        }   
    }
    return gameMap.length-1;
}


/**
 * 指定行，指定玩家，拿走指定数量
 * @param {*} row 行
 * @param {*} playerId 玩家ID
 * @param {*} setnum 拿走数量
 */
function setGameItem(row, playerId, setnum){

    var tnum = 0;
    for (var index = 0; index < gameItemList.length; index++) {
        // 游戏元素实体
        var gameItem = gameItemList[index];
        if(gameItem.row == row && gameItem.playerId == ITEMTYPE_INIT){
            gameItem.playerId = playerId;
            tnum++;
            if(tnum>=setnum){
                break;
            }
        }
    }
}


/**
 * 获取元素剩余数量  
 * @param {*} row row -1表示全部  >=0表示行数
 * @returns 剩余数量
 */
function getGameItemNum(row){
    if(!row && row != 0){
        row = -1
    }
     

    var num = 0
    for (var index = 0; index < gameItemList.length; index++) {
    
        // 游戏元素实体
        var gameItem = gameItemList[index];
        if(row != -1){
            if(gameItem.row == row && gameItem.playerId == ITEMTYPE_INIT){
                num++;
            }
        }else{
            if(gameItem.playerId == ITEMTYPE_INIT){
                num++;
            }
        }
        

    }
    return num;
}



main()