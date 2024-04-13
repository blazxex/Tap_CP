import { BACKEND_URL } from "./config.js";

export async function fetchUser(){
    try{
        const user = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
        console.log(user);
        return user;
    }
    catch(e){
        console.log('cant fetch user');
    }
}

export async function attack(){
    try{
        await fetch(`${BACKEND_URL}/attack`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                userId : "507f1f77bcf86cd799439011",
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