const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {

    list: (req,res)=>{
        res.render('products/list', { products});
    },

    create: (req,res)=>{
        res.render('products/creacionProd');
    },

	store: (req, res) => {
		//console.log(req.file)
		let nuevoProducto = {
		id: products[products.length - 1].id + 1, //Para no soreescribir productos
			...req.body,

        	 }
	    	
	    products.push(nuevoProducto)
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
			
			res.redirect("/products")	
	},

    detail: (req, res) => {
		let idProduct = req.params.id;
		let product = products.find(product => product.id == idProduct)
		console.log(product)
		res.render("products/detail", { title: product.marca, product})
    },

    editProd: (req, res) => {
		let id = req.params.id
		let editProduct = products.find(producto => producto.id == id)
		res.render("products/edicionProd", { editProduct })
    },

    update: (req, res) => {
		let id = req.params.id //El id que nos requiere por la url el usuario
		let editProduct = products.find(producto => producto.id == id) //El producto que se va a editar
		editProduct = {
			id: editProduct.id,
			...req.body,

		}; //El producto que se va a editar

		let newProducts = products.map(producto => {   // El metodo map nos devuelve un array modificado, lo que quiere decir esto es que 
													  //Nuestro array de productos se modifica completo con el nuevo producto editado
			if (producto.id === editProduct.id) {
				return producto = { ...editProduct };  // Metodo spread operator nos devuelve todo el objeto
			}
			    return producto;
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect("/products/" + editProduct.id)
	},


	destroy: (req, res) => {
		let id = req.params.id  // Lo mismo que en todas los otros metodos lo primero que capturamos aca es el id
		let finalProducts = products.filter(producto => producto.id != id) // Aqui lo que hacemos es filtrar los productos que no sean el id que nosotros queremos eliminar

  		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' ')); // Aqui lo que hacemos es escribir el archivo de nuevo con los productos que no sean el id que nosotros queremos eliminar
		res.redirect('/products'); 
	}

}
module.exports = productsController