$(function() {
    // 添加点击 “去注册账号” 按钮事件
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    // 添加点击 “去登陆” 按钮事件
    $("#link_login").on('click', function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // layui 中获取 form 对象
    var form = layui.form;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 检测两次密码是否一致规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=repassword]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    })


    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();

        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);

            // 模拟人的点击行为
            $("#link_login").click();
        });
    });

    // 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败！");
                }
                layer.msg("登录成功！");
                localStorage.setItem('token', res.token);
                location.href = "/index.html";
            }
        })
    });
})