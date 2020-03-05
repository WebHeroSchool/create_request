// Получи ссылку на его аватарку, имя, описание профиля и ссылку на его страницу.

const url = window.location.toString();
const userName = getUserName(url);
console.log(url);

window.onload = () => {
    setTimeout( () => {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
}, 1000);
};

function getUserName(url) {
    let userName = url.split('=')[1];
    if (userName === undefined) {
        userName = 'Ekka-N';
    } 
    return userName;
}

fetch(`https://api.github.com/users/${userName}`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        if (json.login) {
                let name;
                if (json.name == null) {
                    name = json.login;
                } else {
                    name = json.name;
                }
                const nameTag = document.createElement('h1');
                nameTag.classList.add('username');
                let link = document.createElement('a');
                link.href = `https://github.com/${userName}`;
                link.innerHTML = `${name}`;
                document.body.appendChild(nameTag);
                nameTag.appendChild(link);

            const desc = document.createElement('p');  
            desc.classList.add('description');
            if (json.bio) {
                desc.innerHTML = `${json.bio}`;
            } else {
                desc.innerHTML = `Описание профиля отсутствует`;
            }
            document.body.appendChild(desc);

            if (json.avatar_url) {
                const avatar = document.createElement('img');
                avatar.src = json.avatar_url;                
                avatar.alt = `username's photo`;
                document.body.appendChild(avatar);
            }
        } else {
            document.body.innerHTML = '<h1>Информация о пользователе не доступна</h1>'
        }

    })
    .catch(() => document.body.innerHTML = '<h1>Информация о пользователе не доступна</h1>');

