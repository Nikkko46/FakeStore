# Fake Store Web Page
A small JS and HTML app using FakestoreAPI

## Content
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tools](#tools)

## Description
A primarily JS and HTML app using the FakestoreAPI in order for a user to be able to search for, add and view products from the FakeStore.

## Features
- Login and Login -> Uses the FakestoreAPI's for the Login.html's script :

                ```javascript
                const login = async () => {
                const username = document.getElementById('username').value; // gets username
                const password = document.getElementById('password').value; // gets password

                const response = await fetch('https://fakestoreapi.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                }); //FakestoreAPI's login command

                const data = await response.json(); // gets the login response from the API's command by analyzing the credentials

                if (response.ok) {
                    console.log('Login successful:', data);
                    localStorage.setItem('isLoggedIn', true);
                    window.location.href = 'FakeStore.html';
                } // if the credentials are correct and a user with them is found, then Login function commences

                else {
                    console.error('Login failed:', data.error);
                } //else, error is displayed in order for the user to understand why Login was unable to be performed
                };
                ```
                  -> For efficiency, the user functions of the file 'Login_Logout.js' are declared globally to prevent 'overloading':

                ```javascript
                const isLoggedIn = localStorage.getItem('isLoggedIn'); //checks whether the user is logged in or not

                const logout = () => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'Login.html';
                }; //if the user ends up clicking the Logout button on the pages that use the function

                if (isLoggedIn) {
                const logoutButton = document.createElement('button');
                logoutButton.textContent = 'Logout';
                logoutButton.onclick = logout;
                authContainer.appendChild(logoutButton);
                } //if user is logged in, 'Logout' button is displayed

                else {
                const loginLink = document.createElement('a');
                loginLink.href = 'Login.html';
                loginLink.textContent = 'Login';
                authContainer.appendChild(loginLink);
                } //else, Login button shows
                ```


- Product Listing -> Lists all products via the FakestoreAPI's 'Get All Products' command:

                ```javascript
                const getProducts = async () => { //get all products to be displayed
                    const response = await fetch('https://fakestoreapi.com/products'); //FakestoreAPI's command
                    const data = await response.json();
                    products = data;
                    categories = [...new Set(data.map(product => product.category))]; //for when the user had selected a category for display
                    renderProducts(products); //renders products before displaying
                    renderCategoryTabs();
                };

                AND

                const renderProducts = (products) => { //function that renders the products before displaying
                    productContainer.innerHTML = '';

                    products.forEach(product => { //renders the product's own tab with all its information for the user to view easily
                        const productTab = document.createElement('div'); //creates the product's own tab
                        productTab.classList.add('product-card');
                        productTab.addEventListener('click', () => {
                            window.location.href = `Product.html?id=${product.id}`; //redirects you to the product's own page
                        });

                        const img = document.createElement('img'); //depends whether the product does have an image or not for display
                        img.src = product.image;
                        img.alt = product.title;

                        const title = document.createElement('h3'); //creates title element
                        title.textContent = product.title;
                        const price = document.createElement('p'); //creates price element
                        price.textContent = `Price: $${product.price}`;
                        const category = document.createElement('p'); //creates category element
                        category.textContent = `Category: ${product.category}`;

                        productTab.appendChild(img);
                        productTab.appendChild(title);
                        productTab.appendChild(price);
                        productTab.appendChild(category);
                        productContainer.appendChild(productTab);
                        //gets product's info
                    });
                };
                ```
                  -> Filtering products using the FakestoreAPI's sorting functions:

                ```javascript
                const filterProducts = (category, searchTerm) => { //filters depending on category and searching mechanism
                let filteredProducts = category === 'all' ? products : products.filter(product => product.category === category); //gets by category
                if (searchTerm) { //gets by search
                    filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
                }
                 renderProducts(filteredProducts); //renders to display products based on applied client-sdie filters
                };
                ``` 

- Product Searching -> FakeStore Search functions:

                    ```javascript
                        if (searchTerm) { //checks what the user had inputted into the search tab, so that the products that do display, live-match the characters the user inputs
                            filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())); 
                        }
                    ```
                    -> Search Unit Testing:

    *search.js*

                    ```javascript
                    const filterProducts = (products, category, searchTerm) => { //acquires every variable within the function in order for testing (no local variables)
                        let filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
                        if (searchTerm) {
                            filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
                        }
                        return filteredProducts;
                    }; /*   ^
                            |
                Same code as in FakeStore script
                        */

                    module.exports = { filterProducts }; //exports 'filterProducts' function, allowing it to be imported and tested in jest, to test the function's behavior with various inputs
                    ```
    *search.test.js*

                    ```javascript
                    const { filterProducts } = require('./search'); //takes the exported module from search.js
                    describe('filterProducts', () => { //implementing several inputs to test
                        const products = [
                        { id: 1, title: 'Product 1', category: 'Category A' },
                        { id: 2, title: 'Product 2', category: 'Category B' },
                        { id: 3, title: 'Another Product', category: 'Category A' },
                        ];
                    //testing
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
                    //testing does unfortunately result in only 1 out of 3 tests being passed...
                    ```


- Adding Product -> Adding a New Product:

                ```javascript
                const addItem = async () => { //add item general function
                    const title = document.getElementById('title').value;
                    const price = document.getElementById('price').value;
                    const description = document.getElementById('description').value;
                    const image = document.getElementById('image').value;
                    const category = document.getElementById('category').value;

                    const response = await fetch('https://fakestoreapi.com/products', { //FakestoreAPI's 'Add new Product' command
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title,
                            price,
                            description,
                            image,
                            category
                        })
                    });

                    if(!response.ok) { //added for error handling
                        const error = await response.json();
                        console.error('Error adding item:', error);
                        return;
                    }

                    const data = await response.json(); //when response is ok
                    console.log('Item added successfully:', data);

                    const newProduct = { //the new product's info, including id, tried making this before realizing that the API doesn't store new products in order for me to see the product's own page
                        id: data.id,
                        title,
                        price,
                        description,
                        image,
                        category
                    };
                    //tried making this to store the product locally, again, before realizing the API doens't store new items
                    const storedProducts = JSON.parse(localStorage.getItem('products')) || []; 
                    storedProducts.unshift(newProduct);
                    localStorage.setItem('products', JSON.stringify(storedProducts));

                    products.unshift(newProduct); //returns the new product's info
                    renderProducts(products.slice(0, 5)); //limits the amount of displayed products back to 5
                    clearInput(); //clears input (different function inside the 'AddProduct' page)
                };
                ```
                -> Displaying only five of the most recent products of the FakeStore, using the API's limit command

                ```javascript
                 fetch('https://fakestoreapi.com/products?limit=5') //FakestoreAPI's limit command
                    .then(res => res.json())
                    .then(data => {
                        products = data; //sets products to be limited
                        renderProducts(products); //renders the limited products
                    })
                    .catch(error => console.error('Error fetching initial products:', error)); //added for error handling
                ```



## Installation 
1. Clone repository: `git clone https://github.com/Nikkko46/FakeStore`
2. Navigate to the project directory: `cd FakeStore`
3. Install dependencies: `npm install`

**Note:** Make sure you install 'jest' for unit testing ('search.js'): `npm install --save-dev jest`

## Usage
Here is a brief explanation on how to use this app:
1. Start the development server: `npm start`
2. Open your browser and navigate to `http://localhost:3000`
3. Home should be the main page (obviously), and from there, you are able to either go to the main FakeStore page, or either Login or Logout (depends whether you are logged in or not)
4. Unfortunately, for Login, you cannot create yourself a new user and be able to use those credentials, due to the FakestoreAPI being a mock API, new credentials do not get saved inside the API's DB, therefore you may only use -> `username : johnd` and `password: m38rmF$`
5. - On the FakeStore Page, you are met with the sight of a list of all available products, already ready to view, however, for usage simplicity, there is a search function you can use to search much easier for your desired products, as the program would automatically display products based on search input
   - If you wish to instead view products based on category, you can, by easily clicking on a category tab to display desired products
   - On top of that, the FakeStore page also comes with an 'Add Product' Hyperlink, which if clicked, redirects you to to an add product page
6. On the Add Product Page, you are able to add yourself a product manually, by inputting its name (title), price, description, image *(you are able to actually select an image directly from your device)* and category, to which you are then able to add your new product, which would be immediately displayed as the newest product in the catalogue
**Note:** Although the new item was created and displayed in the Add Product page amongst the other limited items, the actual new product does not get saved in the API's DB, yet again due to the API's mocking status
7. You are also able to view every product's "page" so-to-speak, by clicking on a product to bring up its own page where all its information are displayed to you
**Note:** This isn't the case for newly added products, since, as mentioned, the API doesn't store new products, so once the page is refreshed, your new product goes **poof** "Where's my product? Nowhere..." (had to learn this out the hard way), instead an 'custom' Error Message would be displayed, referncing the problem: `Failed to execute 'json' on 'Response': Unexpected end of JSON input.` 

## Tools
• JavaScript
• HTML
• CSS (briefly)
• [FakestoreAPI](https://fakestoreapi.com/)
• Jest (for unit testing)