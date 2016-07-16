/* GET home page. */
var user = require('./users');
var post = require('./posts');
var crypto = require('crypto');
var markdown = require('markdown').markdown;
module.exports = function(app) {

	//testonly  ajax
	app.get('/testonly',function(req, res) {
		res.end('点的好!');
	});
	app.get('/', function(req, res) {
		post.find(function(err, posts) {
			if (err) {
				post = [];
			}
			res.render('index', {
				title: '主页',
				user: req.session.user,
				posts: posts,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});

		});

	});

	//收到get ／reg 请求时候判断是否已经登录，已登录则flash'已登录'错误,否则继续往下走。
	//没有响应请求则会走到第二个路由上。
	app.get('/reg', checkNotLogin);
	app.get('/reg', function(req, res) {
		// if(req.session.user){
		// 	req.flash('error','已登录,退出后再注册!');
		// 	return res.redirect('/');
		// }
		res.render('reg', {
			title: '注册',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.post('/reg', checkNotLogin);
	app.post('/reg', function(req, res) {
		var name = req.body.name,
			password = req.body.password,
			password_re = req.body['password-repeat'];
		if (password_re !== password) {
			console.log('密码不一致!');
			req.flash('error', '两次输入的密码不一致!');
			return res.redirect('/reg');
		}
		var md5 = crypto.createHash('md5');
		password = md5.update(password).digest('hex');
		var newUser = new user({
			username: name,
			password: password,
			email: req.body.email
		});

		user.find({
			username: name
		}, function(err, user) {
			if (err) {
				console.log(err);
				return res.redirect('/reg');
			}
			console.log(user);
			if (user.length) {
				req.flash('error', '用户已存在!');
				console.log('用户已存在！');
				return res.redirect('/reg');
			}

			newUser.save(function(err, user) {
				if (err) {
					console.log('save----' + err);
					req.flash('error', err);
					return res.redirect('/reg');
				}
				req.session.user = newUser;
				req.flash('success', '注册成功!');
				res.redirect('/');
			});
		});
	});


	app.get('/login', checkNotLogin);
	app.get('/login', function(req, res) {
		// if(req.session.user){
		// 	req.flash('error','请不要重复登录！');
		// 	return res.redirect('/');
		// }
		res.render('login', {
			title: '登录',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.post('/login', checkNotLogin);
	app.post('/login', function(req, res) {
		var name = req.body.name;
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		user.find({
			username: name
		}, function(err, user) {
			if (!user.length) {
				req.flash('error', '用户不存在！');
				return res.redirect('/login');
			}
			if (err) {
				console.log(err);
			}
			//坑！！！！
			if (user[0].password !== password) {
				req.flash('error', '密码错误！');
				return res.redirect('/login');
			}
			req.session.user = user;
			req.flash('success', '登录成功！');
			res.redirect('/');

		});

	});

	app.get('/logout', function(req, res) {
		req.session.user = null;
		res.redirect('/');
	});

	app.get('/post', checkLogin);
	app.get('/post', function(req, res) {
		res.render('post', {
			title: '发表',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});


	app.post('/post', checkLogin);
	app.post('/post', function(req, res) {
		var currentUser = req.session.user;
		var date = new Date();
		var newPost = new post({
			name: currentUser.username,
			title: req.body.title,
			post: req.body.post,
			time : {
				month : date.getFullYear()+'-'+(date.getMonth()+1),
				day : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay(),
				minute : date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay()+'-'+date.getHours()+'-'+date.getMinutes()
			}

		});
		newPost.save(function(err) {
			if (err) {
				req.flash('error', err);
				res.redirect('/');
			}
			req.flash('success', '发布成功！');
			res.redirect('/');
		});

	});

	app.get('/user/:name',function(req, res) {
		post.find({name:req.params.name},function(err, posts) {
			if(err){
				posts = [];
				req.flash('error','未知错误');
				return res.redirect('/');
			}
				MarkDownPosts(posts);
				res.render('index',{
					// title: post[0].name+'的文章',
					title : 'haha',
					user: req.session.user,
					posts:posts,
					success: req.flash('success').toString(),
					error: req.flash('error').toString()

				});
		});
	});

	//测试界面专用～
	app.get('/test',function (req,res) {
		res.render('blogHeader');
	});

};

function checkNotLogin(req, res, next) {
		if (req.session.user) {
			req.flash('error', '已登录！');
			return res.redirect('back');
		}
		next();
	}

	function checkLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录！');
			return res.redirect('/');
		}
		next();
	}

function MarkDownPosts(posts) {
	posts.forEach(function(post, index) {
	post.post = markdown.toHTML(post.post);
				});

}