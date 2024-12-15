const { filterProducts } = require('./search');

describe('filterProducts', () => {
    const products = [
      { id: 1, title: 'Product 1', category: 'Category A' },
      { id: 2, title: 'Product 2', category: 'Category B' },
      { id: 3, title: 'Another Product', category: 'Category A' },
    ];

  test('filters products by category', () => {
    const filteredProducts = filterProducts(products, 'Category A', '');
    expect(filteredProducts).toHaveLength(2);
    expect(filteredProducts).toContainEqual({ id: 1, title: 'Product 1', category: 'Category A' });
    expect(filteredProducts).toContainEqual({ id: 3, title: 'Another Product', category: 'Category A' });
  });

  test('filters products by search term', () => {
    const filteredProducts = filterProducts(products, 'all', 'product');
    expect(filteredProducts).toHaveLength(2);
    expect(filteredProducts).toContainEqual({ id: 1, title: 'Product 1', category: 'Category A' });
    expect(filteredProducts).toContainEqual({ id: 2, title: 'Product 2', category: 'Category B' });
  });

  test('filters products by category and search term', () => {
    const filteredProducts = filterProducts(products, 'Category A', 'product');
    expect(filteredProducts).toHaveLength(1);
    expect(filteredProducts).toContainEqual({ id: 1, title: 'Product 1', category: 'Category A' });
  });
});