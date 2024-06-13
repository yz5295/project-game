"use strict";
const box = document.getElementsByClassName("box");
const maintitle = document.getElementById("maintitle");
let tit = document.querySelector("#tit");
let tit1 = document.querySelector("#tit1");
let tit2 = document.querySelector("#tit2");
let modal = document.getElementById("myModal");
let modal1 = document.getElementById("myModal1");
let modal2 = document.getElementById("myModal2");
let modal3 = document.getElementById("myModal3");
const butTOrules = document.getElementById("hover");
const closeButton = document.querySelector(".close");
const username = document.getElementById("username");
const victories = document.getElementById("victories");
const go = document.getElementById("go");
const numwas = [10, 10, 10];

//מניעת כניסה למשתמש לא רשום
if (!localStorage.getItem("myUser")) {
  window.location.href = "/index.html";
}
//מביא את הנתונים של המשתמש ומציג אותם
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("myUser"));
  username.innerHTML = user.name;
  victories.innerHTML = user.victoriesFind;
  //כפתור ניתוק
  go.addEventListener("click", function () {
    window.location.replace("/index.html");
  });
});
//כפתור הוראת הפעלה וסגירה
butTOrules.addEventListener("click", function () {
  modal3.style.display = "block";
});
closeButton.addEventListener("click", function () {
  modal3.style.display = "none";
});
//חיפוש מטמון
let num = Math.floor(Math.random() * 9);
console.log(num);
for (let i = 0; i < box.length; i++) {
  box[i].addEventListener("click", mat);
}
let times = 3;
function mat(event) {
  const cheknum = numwas.find((num) => num === this.id);
  if (cheknum === undefined) {
    times--;
    console.log(this.id);
    if (this.id == num) {
      const timg = document.createElement("img");
      timg.src = "https://freesvg.org/img/money-3221936.png";
      timg.alt = "treasure";
      timg.style.height = "100%";
      timg.style.width = "100%";
      box[num].appendChild(timg);
      tit1.innerHTML = "כל הכבוד מצאת את המטמון";
      modal1.style.display = "block";
      let user = JSON.parse(localStorage.getItem("myUser"));
      let usersObj = JSON.parse(localStorage.getItem("users"));
      usersObj.find((a) => a.name === user.name).victoriesFind++;
      const newnum = usersObj.find((a) => a.name === user.name).victoriesFind;
      localStorage.setItem("users", JSON.stringify(usersObj));
      user.victoriesFind = newnum;
      localStorage.setItem("myUser", JSON.stringify(user));
    } else if (times === 0) {
      maintitle.innerHTML = "";
      tit.innerHTML = "לא הצלחת למצוא את המטמון";
      modal.style.display = "block";
      const no = document.createElement("img");
      no.src = "https://www.svgrepo.com/show/438262/x-round.svg";
      no.alt = "no";
      no.style.height = "100%";
      no.style.width = "100%";
      box[this.id].append(no);
    } else {
      const no = document.createElement("img");
      no.src = "https://www.svgrepo.com/show/438262/x-round.svg";
      no.alt = "no";
      no.style.height = "100%";
      no.style.width = "100%";
      box[this.id].append(no);
      maintitle.innerHTML = "מספר ניסיונות שנותרו: " + times;
      tit2.innerHTML = "לא מצאת!<br>יש לך עוד " + times + " ניסיונות";
      modal2.style.display = "block";
      setTimeout(function () {
        modal2.style.display = "none";
      }, 1200);
      numwas[times] = this.id;
    }
  }
}
