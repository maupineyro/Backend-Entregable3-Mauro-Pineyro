//importar fileSystem
import { promises as fs } from 'fs';

//Creo la clase ProductManager
export default class ProductManager {
    constructor (){
        this.products = [];
        this.path = "./dbProducts.txt";
        this.incrementalId = 0
    }

    //método addProduct
    addProduct = async ( title, description, price, thumbnail, code, stock) => {

    this.incrementalId++;

    let newProduct = {//estructura del producto a agregar
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.incrementalId,
   }
    
    this.products.push (newProduct);//uso this.products para almacenar los diferentes push que genere el addProduct
    
    try{ //write    
        let Write = await fs.writeFile (this.path, JSON.stringify(this.products, null, 2));          
    }
    catch (err){
        console.log("error al agregar o crear el archivo");
    }
}//cierra el addProduct 

    //"sub-método" readProducts (con un delay para evitar problemas con la escritura del txt / json)
    readProducts = async () => {
        return new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              let readProductsResponse = await fs.readFile(this.path, "utf-8");
              let readProductsParsed = JSON.parse(readProductsResponse, null, 2);
              resolve(readProductsParsed);
            } catch (err) {
              reject(err);
            }
          }, 2500); // Espera 2.5 seg para leer el archivo, para esperar que la escritura del fs.writefile, cree el txt y finalice el json - No devuelva undefined y json unexpected end error
        });
      };

    //método getProducts
    getProducts = async () => {
        try {
          const readAsync = await this.readProducts();
          console.log(readAsync);
        } catch (err) {
          console.error("no se pueden obtener los productos desde el archivo path",err);
        }
      };

    //método getProductById
    getProductById =async (id) => {
        let readAsyncFindId= await this.readProducts();
        let findID = readAsyncFindId.find((product) => product.id === id);
        if (findID){
            console.log ("producto encontrado por ID es:")
            console.log (findID);
        } else {
            console.log ("Producto no encontrado");
        }
    }

    //método deleteProduct
    deleteProduct = async (id) => {
        let readProductsForDelete= await this.readProducts();
        const filterProducts = readProductsForDelete.filter ((products) => products.id !== id)
        console.log (`el product Id elegido para borrar es ${id}`);
        await fs.writeFile (this.path, JSON.stringify(filterProducts));
        console.log ("producto eliminado, chequear dbProducts.txt");
        
    }

    //método updateProduct
    updateProduct = async (id, newProps) =>{
        let readProductsForUpdate = await this.readProducts();
        let productToUpdate = readProductsForUpdate.find ((product) => product.id === id);
        console.log (`el product id elegido para modificar es ${id}`, productToUpdate);

        if (productToUpdate){
            if (newProps.title){
                productToUpdate.title = newProps.title
            };
            if (newProps.description){
                productToUpdate.description = newProps.description
            }
            if (newProps.price){
                productToUpdate.price = newProps.price
            }
            if (newProps.thumbnail){
                productToUpdate.thumbnail= newProps.thumbnail
            }
            if (newProps.code){
                productToUpdate.code = newProps.code
            }
             if (newProps.stock){
                productToUpdate.stock = newProps.stock
            }
            if (newProps.id && newProps.id !== productToUpdate.id){
                console.log ("el Id de un producto no puede modificarse con este método")
            }

            await fs.writeFile (this.path, JSON.stringify(readProductsForUpdate));
            console.log (`Producto actualizado: ${JSON.stringify(productToUpdate)}`)
        } else {
            console.log (`No se encontró el producto Id: ${id}`)
        }

        

    }



} //cierra la class ProductManager

/////////////////////////////////////////////////////////////////////////////////


