console.log('fe-index-js-connected');
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("pwd").value;

    fetch("https://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,pwd}),
    })
    .then((response) => console.log(response.json()))
    .then((data) => console.log('data: ',data))
})

