//top.js will only run with top.html
var thisurl = window.location.href;
const myurl = thisurl.split("?");
//extract initials=xxx from URL
var params = myurl[1];
UPPER = params.toUpperCase();
initialsArr = UPPER.split("=");
const newinitials = initialsArr[1];
//let ahrefIndex = pageContent.indexOf("a href=");
let init_ptr = document.getElementById("initials");
init_ptr.innerHTML = newinitials;

// DEBUG there is no Elf element 
// and so the following code does not work and is commented out
//let elf = document.getElementById("Elf");
//let elfstring = elf.innerHTML;
//let index = elfstring.indexOf("|");

//add code to pass initials through

// try using cookie
// does not work and so commented out
// const newcookie = "newinitials=" + newinitials;
// document.cookie = newcookie;
// const tempx = 3;


	
