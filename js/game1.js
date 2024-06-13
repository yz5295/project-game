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
//מחלק את הקלפים בסדר אקראי
const cards = [
  {
    src: "https://deadsea.com/wp-content/uploads/2019/12/Israel-mountains.jpg",
    alt: "Mountain",
    id: "Mountain",
    class: "images",
  },
  {
    src: "https://adama-il.co.il/wp-content/uploads/2021/06/%D7%92%D7%99%D7%A0%D7%94-%D7%9E%D7%A2%D7%95%D7%A6%D7%91%D7%AA-%D7%91%D7%91%D7%99%D7%AA-%D7%A4%D7%A8%D7%98%D7%99.jpg",
    alt: "garden",
    id: "garden",
    class: "images",
  },
  {
    src: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
    alt: "cat",
    id: "cat",
    class: "images",
  },
  {
    src: "https://adama-il.co.il/wp-content/uploads/2021/06/%D7%92%D7%99%D7%A0%D7%94-%D7%9E%D7%A2%D7%95%D7%A6%D7%91%D7%AA-%D7%91%D7%91%D7%99%D7%AA-%D7%A4%D7%A8%D7%98%D7%99.jpg",
    alt: "garden",
    id: "garden",
    class: "images",
  },
  {
    src: "https://deadsea.com/wp-content/uploads/2019/12/Israel-mountains.jpg",
    alt: "Mountain",
    id: "Mountain",
    class: "images",
  },
  {
    src: "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/rolls_royce_phantom_top_10.jpg?itok=XjL9f1tx",
    alt: "car",
    id: "car",
    class: "images",
  },
  {
    src: "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/rolls_royce_phantom_top_10.jpg?itok=XjL9f1tx",
    alt: "car",
    id: "car",
    class: "images",
  },
  {
    src: "https://www.kalmbachfeeds.com/cdn/shop/articles/sheep-grazing-on-pasture-up-close.jpg?v=1706873635",
    alt: "sheep",
    id: "sheep",
    class: "images",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Acela_old_saybrook_ct_summer2011.jpg/800px-Acela_old_saybrook_ct_summer2011.jpg",
    alt: "train",
    id: "train",
    class: "images",
  },
  {
    src: "https://www.kalmbachfeeds.com/cdn/shop/articles/sheep-grazing-on-pasture-up-close.jpg?v=1706873635",
    alt: "sheep",
    id: "sheep",
    class: "images",
  },
  {
    src: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
    alt: "cat",
    id: "cat",
    class: "images",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Acela_old_saybrook_ct_summer2011.jpg/800px-Acela_old_saybrook_ct_summer2011.jpg",
    alt: "train",
    id: "train",
    class: "images",
  },
];
let numplus = 0;
let randnum = 0;
let ifnum = [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13];
while (numplus !== 12) {
  randnum = Math.floor(Math.random() * 12);
  const cheknum = ifnum.find((num) => num === randnum);
  if (cheknum === undefined) {
    ifnum[numplus] = randnum;
    const nimg = document.createElement("img");
    nimg.src = cards[randnum].src;
    nimg.alt = cards[randnum].alt;
    nimg.classList = cards[randnum].class;
    nimg.id = cards[randnum].id;
    // console.log(nimg);
    cover[numplus].appendChild(nimg);
    numplus++;
  }
}
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
            }, 1200);
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
            let newnum = usersObj.find(
              (a) => a.name === user.name
            ).victoriesMomery;
            localStorage.setItem("users", JSON.stringify(usersObj));
            user.victoriesMomery = newnum;
            localStorage.setItem("myUser", JSON.stringify(user));
          }
        }
      }
    }
  }
}
