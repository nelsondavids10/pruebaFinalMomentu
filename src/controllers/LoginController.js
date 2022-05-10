function index(req, res) {
  if (req.session.loggedin) {
    // Output username
    res.redirect('/');

  } else {
    res.render('login/index');
  }
}

function auth(req, res) {
  let user = req.body.user;
  let password = req.body.password;

  req.getConnection((error, conn) => {
    conn.query('SELECT * FROM users WHERE user = ? AND password = ?', [user, password], (error, rows) => {
      if (rows.length > 0) {
        req.session.loggedin = true;
        req.session.name = rows[0].names;

        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    });
  });
}

function data(req, res) {
  req.getConnection((error, conn) => {
    conn.query('SELECT * FROM users', (error, rows) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(rows);
        res.send(data);
      }
    });
  });
}

function dataProducts(req, res) {
  req.getConnection((error, conn) => {
    conn.query('SELECT id,description,concat("$ ",FORMAT(value, 0)) as value,cant FROM prueba_momentu_nodejs.products;', (error, rows) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(rows);
        res.send(data);
      }
    });
  });
}

function dataOrders(req, res) {
  req.getConnection((error, conn) => {
    conn.query('select o.id, u.names, u.user,SUBSTRING(o.date, 1, 10) as date,concat("$ ",FORMAT(o.total, 0)) as total,o.total as totalDirect,state,SUBSTRING(o.paydate, 1, 10) as paydate from orders o, users u where u.id = o.iduser;', (error, rows) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(rows);
        res.send(data);
      }
    });
  });
}

function create(req, res) {
  const user = req.body.user;
  const rol = req.body.rol;
  const names = req.body.names;
  const password = req.body.password;
  req.getConnection((error, conn) => {
    conn.query('INSERT INTO users SET ?', { user: user, rol: rol, names: names, password: password }, (error, results) => {
      if (error) {
        throw error;
      } else {
        res.redirect('/users');
      }
    });
  });
};

function createProduct(req, res) {
  req.getConnection((error, conn) => {
    const description = req.body.description;
    const value = req.body.value;
    const cant = req.body.cant;
    conn.query('INSERT INTO products SET ?', { description: description, value: value, cant: cant }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(results);   
            res.redirect('/products');
        }
    });
  });
};

function createOrder(req, res) {
  req.getConnection((error, conn) => {
    const user = req.body.user;
    conn.query('INSERT INTO orders SET ?', { iduser: user }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/orders');
        }
    });
  });
};

function edit(req, res) {
  req.getConnection((error, conn) => {
    const id = req.params.id;
    conn.query('SELECT * FROM users WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('general/edit', {user:results[0]});            
        }        
    });
  });
};

function editProduct(req, res) {
  req.getConnection((error, conn) => {
    const id = req.params.id;
    conn.query('SELECT * FROM products WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('general/editProduct', {product:results[0]});            
        }        
    });
  });
};

function deleteProduct(req, res) {
  req.getConnection((error, conn) => {
    const id = req.params.id;
    conn.query('DELETE FROM products WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/products');         
        }
    })
  });
};

function deleteUser(req, res) {
  req.getConnection((error, conn) => {
    const id = req.params.id;
    conn.query('DELETE FROM users WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/users');         
        }
    })
  });
};

function deleteOrder(req, res) {
  req.getConnection((error, conn) => {
    const id = req.params.id;
    conn.query('DELETE FROM orders WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            conn.query('DELETE FROM order_detail WHERE idorder = ?',[id], (error, results)=>{
                if(error){
                    console.log(error);
                }else{           
                    res.redirect('/orders');         
                }
            })        
        }
    })   
  });
};

function update(req, res) {
  req.getConnection((error, conn) => {
    const id = req.body.id;
    const user = req.body.user;
    const rol = req.body.rol;
    const names = req.body.names;
    const password = req.body.password;
    conn.query('UPDATE users SET ? WHERE id = ?', [{ user: user, rol: rol, names: names, password: password }, id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/users');
        }
    });
  });
};

function updateProduct(req, res) {
  req.getConnection((error, conn) => {
    const id = req.body.id;
    const description = req.body.description;
    const value = req.body.value;
    const cant = req.body.cant;
    conn.query('UPDATE products SET ? WHERE id = ?', [{ description: description, cant: cant, value: value }, id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/products');
        }
    });
  });
};

function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  res.redirect('/');
}


module.exports = {
  index: index,
  auth: auth,
  logout: logout,
  dataOrders: dataOrders,
  data: data,
  dataProducts: dataProducts,
  create: create,
  createProduct: createProduct,
  createOrder: createOrder,
  edit: edit,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
  deleteUser: deleteUser,
  deleteOrder: deleteOrder,
  update: update,
  updateProduct: updateProduct,
}
