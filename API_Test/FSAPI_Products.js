fetch('https://fakestoreapi.com/products', { //Add New Item
    method: "POST",
    body: JSON.stringify(
        {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }
    )
})
    .then(res => res.json())
    .then(json => console.log(json))

function handleProduct(productId) {
    fetch('https://fakestoreapi.com/products/1')  //Get Single Item
        .then(res => res.json())
        .then(json => {
            console.log("Single Item: ", json);

        const updatedItem = {
            ...json,
            title: 'updated test product',
            price: 19.99,
            description: 'update: lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }

        fetch(`https://fakestoreapi.com/products/${json.id}`, { //Update Item
            method: "PUT",
            body: JSON.stringify(updatedItem)
        })
            .then(res => res.json())
            .then(json => console.log('Updated Item: ', json))

            const confirmDelete = confirm(`Are youn sure you want to delete item ${json.id}?`);
            if (confirmDelete) {
                fetch(`https://fakestoreapi.com/products/${json.id}`, { //Delete
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(json => console.log('Deleted item: ', json))
            }
    })
}

fetch('https://fakestoreapi.com/products') //Get all Products
            .then(res => res.json())
            .then(json => {
                console.log(json);
                const productIds = prompt('Enter Product IDs:');
                const ids = productIds.split(',').map(id => id.trim());
                ids.forEach(id => handleProduct(id));
            })

fetch('https://fakestoreapi.com/products/category/jewelery') //Get in Category
     .then(res=>res.json())
     .then(json=>console.log(json))

fetch('https://fakestoreapi.com/products/categories') //Get all Categories
     .then(res=>res.json())
     .then(json=>console.log(json))

fetch('https://fakestoreapi.com/products?sort=desc') //Sort Results
     .then(res=>res.json())
     .then(json=>console.log(json))

fetch('https://fakestoreapi.com/products?limit=5')  //Limit Results
     .then(res=>res.json())
     .then(json=>console.log(json))