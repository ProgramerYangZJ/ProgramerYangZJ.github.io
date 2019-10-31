var scope = {};

/**
 * 初始化
 */
scope.init = function(){
    scope.initComponents();
};

/**
 * 初始化组件
 */
scope.initComponents = function(){
    $("#btnTest").unbind("click").bind("click",function(){
        alert("Hello world!");
    });
};

$(function(){
    scope.init();
});

