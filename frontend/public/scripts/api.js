import { BACKEND_URL } from "./config.js";
import { setupEvent } from "./eventCenter.js";

async function NewUser(uci) {
  const userName = "user" + Math.floor(Math.random() * 100000) + 1;
  const newUserCookieId = uci;
  const lastActivate = new Date().toISOString();
  console.log(userName, newUserCookieId, lastActivate);
  let newUser = null;

  const res = await fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then(async (data) => {
      const ip = data.ip;
      newUser = {
        userCookieId: newUserCookieId,
        userName: userName,
        lastActivate: lastActivate,
        ip: ip,
      };
      await postData(`${BACKEND_URL}/users/`, newUser);
    });
  localStorage.setItem("userCookieId", newUserCookieId);
  console.log(newUser);
  return newUser;
}

export async function fetchUser() {
  let uci = localStorage.getItem("userCookieId");
  if (uci === "null" || uci === null) {
    return await NewUser(generateUserCookieId());
  } else {
    try {
      const user = await fetch(`${BACKEND_URL}/users/?userCookieId=${uci}`);
      if (user.status === 200) {
        return user.json();
      } else if (user.status === 404) {
        return NewUser(localStorage.getItem("userCookieId"));
      }
    } catch (e) {
      console.log("cant fetch user");
    }
  }
}
export async function fetchUserItem() {
  try {
    const uci = localStorage.getItem("userCookieId");
    const res = await fetch(`${BACKEND_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCookieId: uci,
      }),
    }).then((response) => response.json());
    return res;
  } catch (e) {
    console.log("can't fetch");
  }
}

export async function fetchUserScore() {
  const userScore = await fetch(
    `${BACKEND_URL}/board/user?userCookieId=${localStorage.getItem(
      "userCookieId"
    )}`
  ).then((r) => r.json());

  if (userScore.score === undefined || userScore.score === null) {
    return 0;
  }
  return userScore.score;
}

export async function attack(ind) {
  if (ind === null) {
    ind = 0;
  }
  try {
    const uci = localStorage.getItem("userCookieId");
    const boss = await fetchBoss();
    const res = await fetch(`${BACKEND_URL}/attack`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCookieId: uci,
        bossId: boss.bossId,
        index: ind,
      }),
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (e) {
    console.log("can't attack");
    return false;
  }
}

export async function fetchBoss() {
  try {
    const boss = await fetch(`${BACKEND_URL}/boss/current`).then((r) =>
      r.json()
    );
    return boss;
  } catch (e) {
    console.log("can't attack");
  }
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

async function postData(url, data) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => console.error("Error:", error));
}

export async function upgradeItem(ind) {
  const res = await fetch(`${BACKEND_URL}/items/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userCookieId: localStorage.getItem("userCookieId"),
      index: ind,
    }),
  }).then((response) => response.json());
  return res;
}

export async function updateScore(ind, sco) {
  const res = await fetch(`${BACKEND_URL}/board/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userCookieId: localStorage.getItem("userCookieId"),
      score: sco,
    }),
  }).then((response) => response.json());
  return res;
}
