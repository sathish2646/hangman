const input1=document.querySelector("#number")
const msg=document.querySelector(".msg")
let currentotp;

function generateotp(){
    currentotp = Math.floor(Math.random() * 9000);
    return currentotp;
}
  alert("your OTP is: "+generateotp());
  function enter(){
    if(input1.value == currentotp){
        alert("login succesfully")
        window.location.href="home2.html"
    }
    else{
        msg.textContent="* please enter the correct opt "
        alert("please enter correct OTP or refresh the page")
    }
    
}