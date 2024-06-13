"use strict";
const username = document.getElementById("username");
const victories = document.getElementById("victories");
const go = document.getElementById("go");

//מניעת כניסה למשתמש לא רשום
if (!localStorage.getItem("myUser")) {
  window.location.href = "/index.html";
}
//מביא את הנתונים של המשתמש ומציג אותם
document.addEventListener("DOMContentLoaded", function () {
  let user = JSON.parse(localStorage.getItem("myUser"));
  let usersObj = JSON.parse(localStorage.getItem("users"));
  let myuser = usersObj.find((a) => a.name === user.name);
  username.innerHTML = myuser.name;
  victories.innerHTML =
    myuser.victoriesMomery + myuser.victoriesFind + myuser.victoriesTactic;
  //כפתור ניתוק משתמש
  go.addEventListener("click", function () {
    localStorage.removeItem("mytUser");
    window.location.replace("/index.html");
  });
});
