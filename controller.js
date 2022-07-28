var fs = require("fs");


exports.getAll = function(req, res){
    var path = "./products.json";
    fs.readFile(path,(err, data)=>{
        if(data){
            var products = JSON.parse(data);
            res.send(products);
        }
        else
        res.send("data is not available");
    });
};

exports.getById = function(req, res){
    var productId = req.params.id;
    var path = "./products.json";
    fs.readFile(path,(err, data)=>{
        if(data){
            var products = JSON.parse(data);
            var product = products.find((p=>(p.id == productId)));
            res.send(product);
        }
        else
        res.send("data is not available");
    })

}

exports.insert = function(req, res){
    // var newProduct = JSON.parse(req.body);
    var newProduct = {id:req.body.id, title:req.body.title, description:req.body.description};
    var path = "./products.json";
    fs.readFile(path,(err, data)=>{
        if(data){
            var products = JSON.parse(data);
            products.push(newProduct);
            var p = JSON.stringify(products);

            fs.writeFile(path, p,(err)=>{
                if(err){
                    res.send("File IO problem");
                }
                else
                res.send("new products added into collection");
            })
        }
        else
        res.send("data not available");
    })

}

exports.update = function(req, res){
    var path = "./products.json";
    var updateProduct = {id:req.body.id, title:req.body.title, description:req.body.description};
    fs.readFile(path, (err, data)=>{
        if(data){
            var products = JSON.parse(data);
            var objIndex = products.findIndex((obj=> obj.id==updateProduct.id));
            if(objIndex > -1){
                products[objIndex].title = updateProduct.title;
                products[objIndex].description = updateProduct.description;
                var temp = JSON.stringify(products);
                fs.writeFile(path, temp, (err)=>{
                    if(err)
                    res.send("File IO error");
                    else
                    res.send("Record updated "+updateProduct);
                })
               
            }
            else
            res.send("Product not found");
          

        }
    })

}

exports.delete = function(req, res){
    var productId = req.params.id;
    var path = "./products.json";
    fs.readFile(path,(err, data)=>{
        if(data){ 
            var products = JSON.parse(data);
            var newProducts = products.filter(p=>p.id!=productId);
            var newP = JSON.stringify(newProducts);
            fs.writeFile(path,newP,(error)=>{
                if(error)
                res.send("File IO error");
                else
                res.send("product deleted successfully");
            } )
            res.send("product removed");
        }
        else
        res.send("data not found");
    })
    
}