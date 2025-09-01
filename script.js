const input=document.querySelector('#username')
const password=document.querySelector("#password")
const btn=document.querySelector(".btn")
const error1=document.querySelector(".p")
const error2=document.querySelector(".n")


    function addOn(){
      if(input.value ==="sathishkumar"){
        if(password.value ==="936018"){
            alert("login succesfully")
             window.location.href="home.html"
        }
  }
  else {
       error1.textContent="*please enter the correct username"
         error2.textContent="*please enter the correct password"   
  }
    
    }
