#个人的小垃圾博客
##借鉴nswbmw的教程[简单博客](https://github.com/nswbmw/N-blog);

计划使用 bootstrap + jquery 完善前端界面，感觉 ejs 要比 jade 更适应～

`node` `express` `mongoDB` `mongoose` `bootstrap` `jquery`

>后续计划使用 `react` 进行改版～
---

##页面权限控制

登录的用户应该阻止访问 localhost:3000/reg 页面，需设为页面设置访问权限。即注册和登陆页面应该阻止已登陆的用户访问，登出及后面我们将要实现的发表页只对已登录的用户开放。如何实现页面权限的控制呢？我们可以把用户登录状态的检查放到路由中间件中，在每个路径前增加路由中间件，即可实现页面权限控制。我们添加 checkLogin 和 notLogin函数;






---
 >坑1
  mongoose查找出来的数据是数组，可以通过长度判断
  
  ```
  user.find({
			username: name
		}, function(err, user) {
			if (err) {
				console.log(err);
				return res.redirect('/reg');
			}
			console.log(user);
			`if (user.length)` {
				req.flash('error','用户已存在!');
				console.log('用户已存在！');
				return res.redirect('/reg');
			}
			
			newUser.save(function(err, user) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success', '注册成功!');
			res.redirect('/');
			});
		});
  ```
 ---


