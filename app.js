const express = require('express');
const app = express();
const path = require('path');

const methodOverride =  require('method-override');

const rutasMain = require('./routes/main');
const rutasProducts = require('./routes/productos');

//Creamos la carpeta estática
app.use(express.static('public'));

//Template Engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))

app.use('/', rutasMain);
app.use("/products", rutasProducts);

app.listen(3000, ()=>{
   console.log('Servidor corriendo en puerto 3000');
})
app.get('/', (req,res)=>{
    res.render(__dirname  + '/views/home.ejs');
});
