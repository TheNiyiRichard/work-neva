'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

const logout = select('.logout');
const logoutBtn = select('.logout a');
const profile = select('.profile');


const userStorage = select('.user');
const userbox = select('.other-users');
const url = 'https://randomuser.me/api/?nat=CA&results=10';

const options = {
    method: 'GET',
    mode: 'cors'
};

async function getUsers() {
    try {
        const response = await fetch(url, options);

        if(response.status >= 200 && response.status < 400) {
            const data = await response.json();
            const users = data.results;
            getProfileData(users);
        }
    } catch(error) {
        console.log(error);
    }
}
getUsers();

function getProfileData(el) {
    el.forEach(element => {
        let userImage = document.createElement('div');
        let userStorage = document.createElement('div');
        let userInfo = document.createElement('div');
        let addUserIcon = document.createElement('div'); // New div for the icon

        userInfo.classList.add('userinfo');
        userImage.classList.add('image');
        userStorage.classList.add('user');
        addUserIcon.classList.add('add-user-icon'); // Add a class for styling

        userImage.innerHTML = `<img src="${element.picture.medium}" max-width="100%" max-height="100%" border-radius="50%">`;

        userInfo.innerHTML = `<p>${element.name.first} ${element.name.last}</p>` +
                             `<p>${element.location.city}</p>`;

        // Add the Font Awesome icon to the new div
        addUserIcon.innerHTML = '<i class="fas fa-user-plus"></i>';

        userStorage.append(userImage, userInfo, addUserIcon);

        userbox.append(userStorage);
    });
}



onEvent('click', profile, () => {
    logout.classList.toggle('is-visible');
})

onEvent('click', logoutBtn, () => {
    window.location.replace("index.html");
})