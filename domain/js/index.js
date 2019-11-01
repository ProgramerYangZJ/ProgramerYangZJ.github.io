var scope = {
    switchHbl: true    // 心电图开关
};

$(function () {
    scope.init();
});

/**
 * 初始化
 */
scope.init = function () {
    scope.initComponents();
};

/**
 * 初始化组件
 */
scope.initComponents = function () {
    $("#btnTest").unbind("click").bind("click", function () {
        alert("Hello world!");
    });

    $("#heartBeatLine").unbind('click').bind('click', function () {
        scope.switchHbl = !scope.switchHbl;
    });

    scope.drawEcg();
};

/**
 * 绘制心电图
 */
scope.drawEcg = function () {
    var config = {
        domId : "heartBeatLine",
        initX : 0,
        initY : 0,
        offsetA : 20    // 偏移角度
    };

    var hblDom = document.getElementById(config.domId);

    config.initY = hblDom.offsetHeight / 2;

    var posX = config.initX;    //横坐标
    var posY = config.initY;  //纵坐标

    var randomX = 0;    //随机横轴距离
    var desX = posX + randomX;  // 下一次目的地
    var dir = 0; // 运动方向

    

    hblDom.appendChild2 = function (dom) {
        if (hblDom.children || hblDom.children.length > 0) {
            $(hblDom.children[hblDom.children.length - 1]).removeClass("curCircle");
        }
        hblDom.appendChild(dom);
    }
    var createCircle = function (x, y) {
        var circle = document.createElement('span');
        circle.setAttribute('class', 'circle curCircle');
        circle.style.marginLeft = x + 'px';
        circle.style.marginTop = y + 'px';
        return circle;
    };
    hblDom.removeAllChildren = function () {
        if (!this.children || !this.children.length) {
            return;
        }
        var count = this.children.length;
        for (var i = 0; i < count; i++) {
            this.removeChild(this.children[0]);
        }
    };

    var init = function () {
        hblDom.removeAllChildren();
        posX = config.initX;
        posY = config.initY;
        randomX = 0;
        desX = posX + randomX;
    };

    var drawHbl = function () {
        if (!scope.switchHbl) {
            return;
        }
        if (posX > hblDom.offsetWidth - 3) {
            window.clearInterval(scope.hblInterVal);
            init();
            scope.hblInterVal = window.setInterval(drawHbl, Math.round(hblDom.offsetWidth / 20));
            return;
        }
        if (posX >= desX) {//开始下一个随机点
            dir = Math.round(Math.random() * 2);
            dir = dir == 1 ? Math.round(Math.random() * 2) : dir;
            if (dir == 1){
                randomX = Math.round(Math.random() * 40);
            }else{
                randomX = Math.round(Math.random() * 20);
            }
            desX = posX + randomX;
        } else {
            switch (dir) {
                case 0://上
                    if (posX < desX - randomX / 2) {  // 向上
                        posY -= parseInt((randomX - (desX - posX)) * Math.tan(config.offsetA * Math.PI / 180));
                    } else {  // 向下
                        posY += parseInt(((desX - posX)) * Math.tan(config.offsetA * Math.PI / 180));
                    }
                    hblDom.appendChild2(createCircle(posX, posY));
                    // 水平平移距离
                    posX += 0.5;
                    break;
                case 1://水平
                    hblDom.appendChild2(createCircle(posX, posY));
                    // 水平平移距离
                    posX += 1;
                    break;
                case 2://下
                    if (posX < desX - randomX / 2) {
                        posY -= parseInt((randomX - (desX - posX)) * Math.tan((0-config.offsetA) * Math.PI / 180));
                    } else {
                        posY += parseInt(((desX - posX)) * Math.tan((0-config.offsetA) * Math.PI / 180));
                    }
                    hblDom.appendChild2(createCircle(posX, posY));
                    // 水平平移距离
                    posX += 0.5;
                    break;
            }
        }
    };
    scope.hblInterVal = window.setInterval(drawHbl, 15);
};


