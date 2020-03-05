// Получи ссылку на его аватарку, имя, описание профиля и ссылку на его страницу.

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
        if (json.login) {
            if (json.name == 'null') {
                let name = json.login;
            } else {
                let name = json.name;
            }
            if (name) {
                const nameTag = document.createElement('h1');
                let link = document.createElement('a');
                link.href = `https://github.com/${userName}`;
                link.innerHTML = `${json.name}`;
                document.body.appendChild(nameTag);
                    nameTag.appendChild(link);
            }
            if (json.bio) {
                const desc = document.createElement('p');
                desc.innerHTML = `${json.bio}`;
                document.body.appendChild(desc);
            } 
    
            if (json.avatar_url) {
                const avatar = document.createElement('img');
                avatar.src = json.avatar_url;
                document.body.appendChild(avatar);
            }
        } else {
            document.body.innerHTML = '<h1>Пользователь не найден</h1>'
        }

    })
    .catch(() => document.body.innerHTML = '<h1>Пользователь не найден</h1>');


// console.log(userName);
// console.log(url);