fetch('https://fakestoreapi.com/users', {  //add new user
    method: "POST",
    body: JSON.stringify(
        {
            email: 'ok@test.com',
            username: 'johnd',
            password: 'm38rmF$@3',
            name: {
                firstname: 'vadim',
                lastname: 'tudor'
            },
            address: {
                city: 'bucuresti',
                street: 'in cimitir',
                number: 0,
                zipcode: '12926-3874',
                geolocation: {
                    lat: '-37.3159',
                    long: '81.1496'
                }
            },
            phone: '07namtelefonMariane'
        }
    )
})
    .then(res => res.json())
    .then(json => console.log(json))

fetch('https://fakestoreapi.com/users/1')  //get single user
    .then(res => res.json())
    .then(json => console.log(json))

fetch('https://fakestoreapi.com/auth/login', {  //login user
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "johnd",
        password: "m38rmF$"
    })
})
    .then(res => res.json())
    .then(json => console.log(json))

fetch('https://fakestoreapi.com/users/6',{ //Delete user
        method:"DELETE"
    })
        .then(res => res.json())
        .then(json => console.log(json))