import { BACKEND_URL } from "./config.js";

export async function fetchUser(){
    let uci = localStorage.getItem("userCookieId");
    if(uci === 'null' || uci === null){
        const userName = "Akao";
        const newUserCookieId = generateUserCookieId();
        const lastActivate = new Date().toISOString();
        console.log(userName, newUserCookieId, lastActivate);
        let newUser = null

        fetch("https://api.ipify.org?format=json")
            .then((response) => response.json())
            .then((data) => {
                const ip = data.ip;
                newUser = {
                    userCookieId: newUserCookieId,
                    userName: userName,
                    lastActivate: lastActivate,
                    ip: ip,
                };
                postData("http://localhost:3222/users/", newUser);
            });
        localStorage.setItem("userCookieId", newUserCookieId);
        return newUser;
    }
    else{
        try{
            const user = await fetch(`${BACKEND_URL}/users/?userCookieId=${uci}`).then((r) => r.json());
            console.log(user);
            return user;
        }
        catch(e){
            console.log('cant fetch user');
        }
    }
}

export async function attack(_userId, bossId){
    try{
        await fetch(`${BACKEND_URL}/attack`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                userCookieId: _userId,
                bossId : "6619670c38ef6cdc4ac6b7e7" 
            })
        }) 
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
    catch(e){
        console.log("can't attack");
    }
}

export async function fetchBoss(){
    // TODO : fetch boss here
}

function generateUserCookieId() {
    // This will generate a string that looks like a MongoDB ObjectId.

    const hexDigits = "0123456789abcdef";
    let id = "";
    for (let i = 0; i < 24; i++) {
        id += hexDigits[Math.floor(Math.random() * 16)];
    }
    return id;
}

function postData(url, data) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
}