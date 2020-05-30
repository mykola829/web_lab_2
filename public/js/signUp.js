async function signUp() {
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');
    let user = {
        "email": emailInput.value,
        "password": passwordInput.value
    }

    let response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }).then(
        function(response) {
            if (response.status !== 200) {
                alert('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function(data) {
                alert('Success. User added.');
            });
        }
    )
        .catch(function(err) {
            alert('Fetch Error :-S', err);
        });
}

async function signIn() {
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');
    console.log(emailInput.value);
    console.log(passwordInput.value);
    let user = {
        "email": emailInput.value,
        "password": passwordInput.value
    }

    let response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }).then(
        function(response) {
            if (response.status !== 200) {
                alert('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function(data) {
                alert('Success. User logged.');
            });
        }
    )
        .catch(function(err) {
            alert('Fetch Error :-S', err);
        });
}

async function getUserInfo() {
    let response = await fetch('http://localhost:3000/api/users/1');
    if (response.ok) {
        let json = await response.json();
        console.log(json.email);
        console.log(json.password);
        document.getElementById('emailInput').value = json.email;
        document.getElementById('passwordInput').value = json.password;
    } else {
        alert("Error: " + response.status);
    }
}

async function updateUserEmail(){
    let user = {
        "email": document.getElementById('emailInput').value,
        "password": document.getElementById('passwordInput').value
    }

    let response = await fetch('http://localhost:3000/api/users/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }).then(
        function(response) {
            if (response.status !== 200) {
                alert('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function(data) {
                alert('Success. User info edited.');
            });
        }
    )
        .catch(function(err) {
            alert('Fetch Error :-S', err);
        });
}

getUserInfo();




