const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const cors = require("cors");

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = 'tomlaz'

// Create a token
function createToken(loadData){
  return jwt.sign(loadData, SECRET_KEY)
}

// Verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

// Register New User
server.post('/auth/register', (req, res) => {
    const {email, password} = req.body;

    fs.readFile("./users.json", (err, data) => {
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        }

        // Get current users data
        var parsedData = JSON.parse(data.toString());

        // Check if user exists
        const emailExists = parsedData.users.some( user => user.email.toString() === email.toString() );
        if ( emailExists ) {
          const status = 409
          const message = 'Email already exists'
          res.status(status).json({status, message})
        } else {
          // Get the id of last user
          var newUserId = parsedData.users[parsedData.users.length-1].id + 1;

          //Add new user
          parsedData.users.push({id: newUserId, email: email, password: password, role: 'user'}); //add new user
          fs.writeFile("./users.json", JSON.stringify(parsedData), (resErr, result) => {  // WRITE
              if (resErr) {
                const status = 401
                const message = err
                res.status(status).json({status, message})
              }
          });

          // Create token for new user
          const access_token = createToken({email, role: 'user', id: newUserId})
          res.status(200).json({access_token});
        }
    });
})

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }

  const user = userdb.users.find( item => item.email === email && item.password === password );
  const access_token = createToken({email, role: user.role, id: user.id});
  res.status(200).json({access_token})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if ( req.baseUrl === '/products' || req.baseUrl === '/categories' || req.baseUrl === '/subcategories' ) {
    next();
  } else {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
      const status = 401
      const message = 'Error in authorization format'
      res.status(status).json({status, message})
      return
    }

    try {
      let verifyTokenResult;
       verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

       if (verifyTokenResult instanceof Error) {
         const status = 401
         const message = 'Access token not provided'
         res.status(status).json({status, message})
         return
       }

       next()
    } catch (err) {
      const status = 401
      const message = 'Error access_token is revoked'
      res.status(status).json({status, message})
    }
  }
});

// Update password
server.put('/auth/update', (req, res) => {
  // Get user id
  const userId =  jwt.decode( req.headers.authorization.split(' ')[1] ).id;

  // Get index Id from users list
  const objIndex = userdb.users.findIndex(( user => user.id === userId ));


  if ( userdb.users[objIndex].password !== req.body.currentPassword ) {
    const status = 400;
    const message = 'Current password not match';
    res.status(status).json({status, message});
  } else {
    userdb.users[objIndex].password = req.body.password;
    writeFile( "./users.json", userdb, res );
  }
});

// Get Products
server.get('/products', (req, res) => {
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    // Get products
    const currentData = JSON.parse(data.toString());
    res.status(200).json( currentData.products );
  });
});

// Get Categories
server.get('/categories', (req, res) => {
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    // Get categories
    const currentData = JSON.parse(data.toString());

    res.status(200).json( currentData.categories );
  });
});

// Get Subcategories
server.get('/subcategories', (req, res) => {
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    // Get subcategories
    const currentData = JSON.parse(data.toString());

    res.status(200).json( currentData.subcategories );
  });
});

// Get User Favourites
server.get('/user/favourites', (req, res) => {
  const token = req.headers.authorization.split( ' ' )[1];
  const decodedToken = jwt.decode( token );

  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    // Get db data
    const currentData = JSON.parse(data.toString());

    // Filter user favourites
    const result = currentData.favourites.find( item => item.id === decodedToken.id );

    res.status(200).json( result );
  });
});

// Get User Basket Products
server.get('/user/basket', (req, res) => {
  const token = req.headers.authorization.split( ' ' )[1];
  const decodedToken = jwt.decode( token );

  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    // Get db data
    const currentData = JSON.parse(data.toString());

    // Filter user basket products
    const basketProducts = currentData.basket.find( item => item.id === decodedToken.id );

    res.status(200).json( basketProducts );
  });
});

const writeFile = ( db, currentData, res ) => {
  fs.writeFile( db, JSON.stringify( currentData ), ( resErr ) => {
    if ( resErr ) {
      const status = 401;
      const message = err;
      res.status(status).json({status, message});
    }

    res.status(200).json();
  });
}

// Add/Remove User Favourites Products
server.put('/user/favourites', (req, res) => {
  fs.readFile("./database.json", (err, data) => {
    if ( err ) {
      const status = 401;
      const message = err;
      res.status(status).json({status, message});
      return;
    }

    // Get db data
    const currentData = JSON.parse( data.toString() );

    // Get index Id
    const objIndex = currentData.favourites.findIndex(( fav => fav.id === req.body.id ));
    if ( objIndex === -1 ) {
      currentData.favourites.push({
        'id': req.body.id,
        'products': req.body.products
      });
    } else {
      currentData.favourites[objIndex].products = req.body.products;
    }

    writeFile( "./database.json", currentData, res );
  });
});

// Add/Remove User Basket Products
server.put('/user/basket', (req, res) => {
  fs.readFile("./database.json", (err, data) => {
    if ( err ) {
      const status = 401;
      const message = err;
      res.status(status).json({status, message});
      return;
    }

    // Get db data
    const currentData = JSON.parse( data.toString() );

    // Get index Id
    const objIndex = currentData.basket.findIndex(( fav => fav.id === req.body.id ));
    if ( objIndex === -1 ) {
      currentData.basket.push({
        'id': req.body.id,
        'products': req.body.products
      });
    } else {
      currentData.basket[objIndex].products = req.body.products;
    }

    writeFile( "./database.json", currentData, res );
  });
});

server.use( cors() );

server.use( router );

server.listen( 8000, () => {
  console.log('Run Auth API Server')
} );