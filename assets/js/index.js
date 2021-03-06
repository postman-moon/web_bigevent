$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo();

    var layer = layui.layer;

    // 退出功能
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            // 1. 清空 token
            localStorage.removeItem('token');

            // 2. 跳转到登录页面
            location.href = '/login.html';

            // 关闭 confirm 询问框
            layer.close(index);
        });
    });
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！');
            }

            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 清空 token
        //         localStorage.removeItem('token');

        //         // 2. 强制跳转到登录页面
        //         location.href = "/login.html";
        //     }
        // }
    });
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username;
    // 2. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avator').hide();
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avator').html(first).show();
    }
}