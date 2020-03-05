// 2. Получи ссылку на его аватарку, имя, описание профиля и ссылку на его страницу.

const url = window.location.toString();
const userName = getUserName(url);
console.log(url);

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
        if (json.name !== undefined) {
            const name = document.createElement('h1');
            let a = document.createElement('a');
            a.href = `https://github.com/${userName}`;
            a.innerHTML = `${json.name}`;
            document.body.appendChild(name);
            name.appendChild(a);
        }
        if (json.bio !== undefined) {
            const desc = document.createElement('p');
            desc.innerHTML = `${json.bio}`;
            document.body.appendChild(desc);
        }//https://github.com/KsuBurn

        if (json.avatar_url !== undefined) {
            const avatar = document.createElement('img');
            avatar.src = json.avatar_url;
            document.body.appendChild(avatar);
        }
    })
    .catch(err => document.body.innerHTML = '<h1>Пользователь не найден</h1>');


console.log(userName);
console.log(url);