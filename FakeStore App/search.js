const filterProducts = (products, category, searchTerm) => {
    let filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filteredProducts;
};

module.exports = { filterProducts };