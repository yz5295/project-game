const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const buttonNewUser = document.getElementById("buttonNewUser");
const buttonLogin = document.getElementById("buttonLogin");
const buttonSignup = document.getElementById("buttonSignup");
const title1 = document.querySelector(".title1");
const title2 = document.querySelector(".title2");
const chars = ["!", "@", "#", "$", "%", "^", "&", "*"];
//כפתור להרשמת משתמש
buttonNewUser.addEventListener("click", function () {
  login.style.display = "none";
  signup.style.display = "inline-block";
});
//בודק האם המשתמש קיים והסיסמה נכונה
buttonLogin.addEventListener("click", function logIn(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((user) => user.email === email);
  if (user) {
    if (pass === user.pass) {
      const myUser = JSON.stringify(user);
      localStorage.setItem("myUser", myUser);
      window.location.replace("/pages/menu.html");
    } else if (pass !== user.pass) {
      title1.style.visibility = "visible";
      title1.innerHTML = "סיסמה לא נכונה";
    } else {
      title1.style.visibility = "visible";
      title1.innerHTML = "משתמש לא קיים, הירשם";
    }
  } else {
    title1.style.visibility = "visible";
    title1.innerHTML = "משתמש לא קיים, הירשם";
  }
});
//בודק שהנתונים עומדים בתנאים ואם כן מוסיף משתמש חדש
buttonSignup.addEventListener("click", function signUp(event) {
  event.preventDefault();
  const newName = document.getElementById("newName").value;
  const newEmail = document.getElementById("newEmail").value;
  const newPass = document.getElementById("newPass").value;
  const againNewPass = document.getElementById("againNewPass").value;

  if (
    newPass.length < 6 ||
    !chars.some((a) => newPass.includes(a)) ||
    !/[a-zA-Z]/.test(newPass)
  ) {
    title2.style.visibility = "visible";
    title2.innerHTML =
      "הסיסמה חייבת להכיל 6 תווים,</br>אות אחת ותו מיוחד אחד (!@%$#^&*)";
    return;
  }
  if (newPass !== againNewPass) {
    title2.style.visibility = "visible";
    title2.innerHTML = "סיסמאות לא תואמות";
    return;
  } else {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === newEmail)) {
      title2.style.visibility = "visible";
      title2.innerHTML = "משתמש קיים";
      return;
    } else {
      const objUser = {
        name: newName,
        email: newEmail,
        pass: newPass,
        victoriesMomery: 0,
        victoriesFind: 0,
        victoriesTactic: 0,
      };
      const myUser = JSON.stringify(objUser);
      localStorage.setItem("myUser", myUser);
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(objUser);
      localStorage.setItem("users", JSON.stringify(users));

      title2.style.visibility = "visible";
      title2.innerHTML = "הרשמה הושלמה בהצלחה";
      setTimeout(() => {
        signup.style.display = "none";
        login.style.display = "inline-block";
      }, 2000);
    }
  }
});
