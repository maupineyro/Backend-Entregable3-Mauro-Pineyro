//Entregable 3

import express from "express";
import ProductManager from "./src/ProductManager.js";


const app = express (); //ejecuto express
const productManager = new ProductManager; // Instanciar const productManager 

//agrego 10 productos
productManager.addProduct ("título 1","description 1", 100,"imagen 1", "abc121",25);
productManager.addProduct ("título 2","description 2", 100,"imagen 2", "abc122",25);
productManager.addProduct ("título 3","description 3", 100,"imagen 3", "abc123",25);
productManager.addProduct ("título 4","description 4", 100,"imagen 4", "abc124",25);
productManager.addProduct ("título 5","description 5", 100,"imagen 5", "abc125",25);
productManager.addProduct ("título 6","description 6", 100,"imagen 6", "abc126",25);
productManager.addProduct ("título 7","description 7", 100,"imagen 7", "abc127",25);
productManager.addProduct ("título 8","description 8", 100,"imagen 8", "abc128",25);
productManager.addProduct ("título 9","description 9", 100,"imagen 9", "abc129",25);
productManager.addProduct ("título 10","description 10", 100,"imagen 10", "abc130",25);

//llamo a getProducts
const AppProducts = productManager.readProducts()


const PORT = 8080;
app.listen (PORT, () => {
    console.log ("port 8080 run");
})


//endpoint "/products" - ejemplo de limit .../products/?limit=3
app.get ('/products',async (req, res) => {

    let limit = parseInt(req.query.limit); // tomo el limit del req de navegación, parseInt para pasar el string a número
    let fullCollection = await AppProducts; // para poder hacerle el slice a AppProducts creo fullCollection
    let limitCollection =fullCollection.slice (0, limit); // slice para mostrar productos con limit

    limit ? res.send (await limitCollection) : res.send (await fullCollection);
})

//endpoint "/products/:id"
app.get ('/products/:id',async (req, res) => {
    let id = parseInt (req.params.id); //tomo el id del req de navegación.
    res.send (await productManager.getProductById(id));
    
})

//Comprobaciones

// cargo http://localhost:8080/products  para ver el total de productos
// cargo http://localhost:8080/products/1 para ver el product id:1
// cargo http://localhost:8080/products/7 para ver el product id:7
// cargo http://localhost:8080/products/?limit=3 para probar que muestra los primeros 3 productos
