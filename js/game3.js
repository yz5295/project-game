"use strict";
const x = document.querySelector("#x");
const o = document.querySelector("#o");
const box = document.getElementsByClassName("box");
const form = document.querySelector("form");
const boxxo = document.querySelector(".boxxo");
const continer = document.querySelector(".continer");
const continergrid = document.querySelector(".continer-grid");
let tit = document.querySelector("#tit");
let modal = document.getElementById("myModal");
let modal3 = document.getElementById("myModal3");
const butTOrules = document.getElementById("hover");
const closeButton = document.querySelector(".close");
const username = document.getElementById("username");
const victories = document.getElementById("victories");
const go = document.getElementById("go");

//מניעת כניסה למשתמש לא רשום
if (!localStorage.getItem("myUser")) {
  window.location.href = "/index.html";
}
//מביא את הנתונים של המשתמש ומציג אותם
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("myUser"));
  username.innerHTML = user.name;
  victories.innerHTML = user.victoriesTactic;
  //כפתור ניתוק
  go.addEventListener("click", function () {
    window.location.replace("/index.html");
  });
});
//כפתור בחירה איקס או עיגול ומעביר למשחק
continer.style.displey = "inline";
butTOrules.addEventListener("click", function () {
  modal3.style.display = "block";
});
closeButton.addEventListener("click", function () {
  modal3.style.display = "none";
});
x.addEventListener("click", () => play(x));
o.addEventListener("click", () => play(o));
let goodcomp = false;
let finish = 0;
let num;
let forthecomputer = "";
let thefrist = "";
let thefristnot = "";
let notageintopres = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let foll = 0;
const thetrue = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let moneTheTrueuser = [0, 0, 0, 0, 0, 0, 0, 0];
let moneTheTruecomputer = [0, 0, 0, 0, 0, 0, 0, 0];
//התור של המשתמש
function play(varele) {
  if (x == varele) {
    forthecomputer = o;
    thefristnot = "o";
    thefrist = "x";
  } else {
    forthecomputer = x;
    thefristnot = "x";
    thefrist = "o";
  }

  continer.style.display = "inline-block";
  boxxo.style.display = "none";
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener("click", mat);
  }
  function mat(event) {
    let x = event.target.id;
    if (notageintopres[x] === 0) {
      finish++;
      notageintopres[x]++;
      if (this.children.length === 0 && !this.classList.contains("thefrist")) {
        const newimg = document.createElement("img");
        newimg.src = varele.src;
        newimg.alt = varele.alt;
        newimg.classList.add("putintable");
        this.append(newimg);
        this.classList.add(thefrist);
      }
      let chektrin = 0;
      if (trin() === true) {
        trin();
        chektrin = 1;
      }
      // התור של המחשב
      goodcomp = false;
      if (finish < 5) {
        while (!goodcomp) {
          num = Math.floor(Math.random() * 9);
          if (box[num].children.length === 0) {
            goodcomp = true;
          }
        }
        const compnewimg = document.createElement("img");
        compnewimg.src = forthecomputer.src;
        compnewimg.alt = forthecomputer.alt;
        compnewimg.classList = "putintable";
        box[num].appendChild(compnewimg);
        box[num].classList.add(thefristnot);
        if (chektrin === 0) {
          trin();
        }
      }
      //בדיקה עם יש תיקו
      if (finish === 5) {
        if (trin() === true) {
          trin();
        } else {
          modal.style.display = "block";
          tit.innerHTML = "תיקו, נסה שוב";
        }
      }
    }
  }
}
//בדיקה עם יש נצחון ועדכון פרטי משתמש
function trin() {
  for (let i = 0; i < thetrue.length; i++) {
    let frist = box[thetrue[i][0]].classList[2];
    for (let j = 0; j < thetrue[i].length; j++) {
      let chelandernum = box[thetrue[i][j]].classList[2];
      if (chelandernum === frist && chelandernum !== undefined) {
        if (box[thetrue[i][j]].classList[2] === thefrist) {
          moneTheTrueuser[i]++;
        } else {
          moneTheTruecomputer[i]++;
        }
      }
    }
    if (moneTheTrueuser[i] === 3) {
      tit.innerHTML = "כל הכבוד ניצחת";
      modal.style.display = "block";
      let user = JSON.parse(localStorage.getItem("myUser"));
      let usersObj = JSON.parse(localStorage.getItem("users"));
      const newnum = usersObj.find((a) => a.name === user.name)
        .victoriesTactic++;
      console.log(newnum);
      localStorage.setItem("users", JSON.stringify(usersObj));
      user.victoriesTactic = newnum;
      localStorage.setItem("myUser", JSON.stringify(user));
      console.log(user);
      return true;
    }
    if (moneTheTruecomputer[i] === 3) {
      tit.innerHTML = "הפסדת, לא נורא";
      modal.style.display = "block";
    } else {
      moneTheTrueuser[i] = 0;
      moneTheTruecomputer[i] = 0;
    }
  }
  return false;
}
