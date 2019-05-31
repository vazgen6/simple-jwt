const API_URL = 'http://localhost:8888';
const AUTH_URL = 'http://localhost:3000';

let ACCESS_TOKEN = void (0);

const headlineBtn = document.querySelector('#headline');
const secretBtn = document.querySelector('#secret');
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');

headlineBtn.addEventListener('click', () => {
    fetch(`${API_URL}/resource`).then(resp => resp.text()).then(data => UIUpdate.alertBox(data));
});

secretBtn.addEventListener('click', () => {
    fetch(`${API_URL}/resource/secret`).then(resp => {
        UIUpdate.updateCat(resp.status);
        resp.text();
    }).then(data => UIUpdate.alertBox(data));
});

loginBtn.addEventListener('click', () => {

});

logoutBtn.addEventListener('click', () => {
    fetch(`${AUTH_URL}/login`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json', 'accept': 'application/json'
            },
            body: JSON.stringify(UIUpdate.getUsernamePassword())
        })
        .then(resp => {
            UIUpdate.updateCat(resp.status);
            return resp.status === 200 ? resp.json() : resp.text()
        }).then(data => {
            if (data.access_token) {
                ACCESS_TOKEN = data.access_token;
                data = `Access Token: ${ACCESS_TOKEN}`;
                UIUpdate.loggedIn();
            }
            UIUpdate.alertBox(data);
        });
});

const UIUpdate = {
    alertBox: (text) => alert(text),
    updateCat: () => undefined
}
