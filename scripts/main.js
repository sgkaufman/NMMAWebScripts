const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/Perseids-2016-CC-2.0.jpg") {
    myImage.setAttribute("src", "images/C2017-M81M82-May22-23-2020-DEBartlett1024.jpg");
  } else {
    myImage.setAttribute("src", "images/Perseids-2016-CC-2.0.jpg");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  const myName = prompt("Please enter your name.");
  localStorage.setItem("name", myName);
    myHeading.textContent = `Learn about Meteors, ${myName}`;
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Mozilla is cool, ${storedName}`;
}

myButton.onclick = () => {
  setUserName();
};


