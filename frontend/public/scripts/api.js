import { BACKEND_URL } from "./config.js";

export async function fetchUser(){
    try{
        const user = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
        return user;
    }
    catch(e){
        console.log('cant fetch user');
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
                userId : _userId,
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