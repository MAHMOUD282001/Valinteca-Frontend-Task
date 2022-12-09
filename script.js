
let redirectedBtn = document.querySelector(".signup")

let nameInput = document.querySelector(".name")

let emailInput = document.querySelector(".email")

let firstPasswordInput = document.querySelector(".first-password")

let secondPasswordInput = document.querySelector(".second-password")

let errorName = document.querySelector(".name-error")

let errorEmail = document.querySelector(".email-error")

let firstErrorPassword = document.querySelector(".first-password-error")

let secondErrorPassword = document.querySelector(".second-password-error")




var letterNumber = /^[0-9a-zA-Z]+$/;

var number = /^[0-9]+$/;


function startsWithNumber(_string){
return /^\d/.test( _string);
}


function endsWithNumber(str) {
    return /[0-9]+$/.test(str);
}




//Redirect To Successfull Page

redirectedBtn.addEventListener("click", ()=>{
    
    //Validate Name
    
    if(nameInput.value.length >= 5 && nameInput.value.length <= 15 && nameInput.value.match(letterNumber) && startsWithNumber(nameInput.value) == false && endsWithNumber(nameInput.value) == false){
        errorName.innerHTML = ''
        
        
        //Validate Email
        
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        if (!filter.test(emailInput.value)) {
            errorEmail.innerHTML = 'Please provide a valid email address';
            errorEmail.focus;
            return false;
        }
        
        else{
            errorEmail.innerHTML = ''
        }
        
        //Validate First Password
        
        if(firstPasswordInput.value.length >= 8){
            firstErrorPassword.innerHTML = ''
        }
        else{
            firstErrorPassword.innerHTML = 'Please Enter Password With Length Greater Than 8'
        }
        
        //Validate Second Password
        
        if(secondPasswordInput.value.length >= 8){
            secondErrorPassword.innerHTML = ''
            
            
            //If All The Above Are Ok --> Post To Api
            
            let data = {username: nameInput.value, email: emailInput.value, password: firstPasswordInput.value , password_confirmation: secondPasswordInput};
            
            fetch("https://goldblv.com/api/hiring/tasks/register", {
              method: "POST",
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify(data)
            })
            .then(res => {
              console.log("Request complete! response:", res);
              
              if(res.status == 200){
                localStorage.setItem('email', emailInput.value)
                
                window.location.href = 'successful-page.html';
              }
            })
            .catch(error=>{
                console.log(error)
            })
        }
        
        else{
            secondErrorPassword.innerHTML = 'Please Enter Password With Length Greater Than 8'
        }
    }
    
    else{
        errorName.innerHTML = "Please Enter Corrected Name With Length Greater Than 5 and Less Than 15 and Consists of Letters and Numbers and Don't Start or End With Number"
    }

})

