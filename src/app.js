const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/login');
const { redirect } = require('express/lib/response');
const router = express.Router();

const app = express();
app.set('port', 5000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
	extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'prueba_momentu_nodejs',
	port: 3306,
}, 'single'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.listen(app.get('port'), () => {
	console.log('listening on port ', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('home', { name });
	} else {
		res.redirect('/login');
	}
});

app.get('/users', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/users', { name });
	} else {
		res.redirect('/login');
	}
});

app.get('/orders', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/orders', { name });
	} else {
		res.redirect('/login');
	}
});

app.get('/products', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/products', { name });
	} else {
		res.redirect('/login');
	}
});

app.get('/create', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/create');
	} else {
		res.redirect('/login');
	}
});

app.get('/getUsers', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/createOrder');
	} else {
		res.redirect('/login');
	}
});

app.post('/update', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/update');
	} else {
		res.redirect('/login');
	}
});

app.get('/createProduct', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/createProduct');
	} else {
		res.redirect('/login');
	}
});

app.post('/updateProduct', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/editProduct');
	} else {
		res.redirect('/login');
	}
});

app.get('/createOrder', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/createOrder');
	} else {
		res.redirect('/login');
	}
});

app.get('/edit/:id', (req, res) => {
	if (req.session.loggedin) {
		const id = req.params.id;
		conexion.query('SELECT * FROM users WHERE id=?', [id], (error, results) => {
			if (error) {
				throw error;
			} else {
				res.render('edit.hbs', { user: results[0] });
			}
		});
	} else {
		res.redirect('/login');
	}
});

app.get('/editProduct/:id', (req, res) => {
	if (req.session.loggedin) {
		let name = req.session.name;

		res.render('general/editProduct');
	} else {
		res.redirect('/login');
	}
});

const { json } = require('express');
