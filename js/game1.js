"use strict";
const img = document.getElementsByClassName("images");
const cover = document.getElementsByClassName("cover");
const num = document.getElementById("number");
const stock = document.getElementsByClassName("theCard");
const tit = document.getElementById("tit");
const tit2 = document.getElementById("tit2");
const form = document.querySelector("form");
let modal = document.getElementById("myModal");
let modal2 = document.getElementById("myModal2");
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
  victories.innerHTML = user.victoriesMomery;
  //כפתור ניתוק
  go.addEventListener("click", function () {
    window.location.replace("/index.html");
  });
});
//מכסה את הקלפים
closeButton.addEventListener("click", function () {
  modal3.style.display = "none";
});
let clickCount = 0;
let card = [];
let card2 = [];
let card3 = [];
let plus = 0;
let menycard = img.length;
let isscend = true;
let scendclick = 0;
//כפתור להצגת הוראות המשחק
butTOrules.addEventListener("click", function () {
  modal3.style.display = "block";
});
//בחירת קלף
for (let i = 0; i < img.length; i++) {
  cover[i].addEventListener("click", mat);
  function mat() {
    if (card3[0] !== i && card3[1] !== i) {
      card2[clickCount] = i;
      card3[clickCount] = i;
      console.log(i);
      if (isscend) {
        scendclick = i;
        isscend = false;
      }
      tit.innerHTML = "";
      if (clickCount < 2) {
        img[i].style.display = "inline";
        card[clickCount] = img[i].id;
        clickCount++;
        //בדיקה אם יש קלפים שווים
        if (clickCount === 2) {
          if (card[0] === card[1]) {
            const goodCard = document.getElementById(card[0]);
            img[card2[0]].style.animationName = "example";
            img[card2[1]].style.animationName = "example";
            img[card2[0]].style.border = "2px #e6c619 solid";
            img[card2[1]].style.border = "2px #e6c619 solid";
            const thecard = document.createElement("img");
            thecard.src = goodCard.src;
            thecard.alt = goodCard.alt;
            thecard.classList.add("imgintheCard");
            stock[plus].append(thecard);
            console.log(stock);
            console.log(plus);
            plus++;
            num.innerHTML = plus + "/6";
            clickCount = 0;
            isscend = true;
          } else {
            tit2.innerHTML = "לא תואם נסה שוב";
            modal2.style.display = "block";
            card3 = [];
            setTimeout(function () {
              img[i].style.display = "none";
              img[scendclick].style.display = "none";
              modal2.style.display = "none";
              console.log(i);
              console.log(scendclick);
            }, 2000);
            clickCount = 0;
            isscend = true;
          }
          //בדיקה סיום כל הקלפים ועדכון נתוני משתמש
          if (plus === 6) {
            modal.style.display = "block";
            tit.innerHTML = "כל הכבוד סיימת";
            clickCount = 2;
            let user = JSON.parse(localStorage.getItem("myUser"));
            let usersObj = JSON.parse(localStorage.getItem("users"));
            usersObj.find((a) => a.name === user.name).victoriesMomery++;
            let newnum = usersObj.find((a) => a.name === user.name)
            localStorage.setItem("users", JSON.stringify(usersObj));
            user.victoriesMomery = newnum;
            localStorage.setItem("myUser", JSON.stringify(user));
          }
        }
      }
    }
  }
}
