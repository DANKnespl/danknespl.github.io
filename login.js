let userID = -1;

const form = document.getElementById('login-form');
form.addEventListener("submit", event => {
  event.preventDefault(); // Prevent the form from submitting
  const data = {
    email: form.elements.email.value,
    password: form.elements.password.value
  };
  fetch("https://stinbanking.ey.r.appspot.com/login?"+new URLSearchParams({
    email: data.email,
    password: data.password
    }), {mode: 'cors'})
    .then(response => {
        if (response.ok) {
          return response.json(); // If the response is successful, parse the JSON data
        } else {
          throw new Error('API request failed'); // If the response is not successful, throw an error
        }
      })
    .then(data => 
        {var x = document.getElementById("2FA");
            if(data>=0){
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        console.log(data);
        userID=data;
        })
    .catch(error => console.error(error));
    console.log(data.email)
    console.log(data.password)
});

function TFA(){
    event.preventDefault(); // Prevent the form from submitting
    fetch("https://stinbanking.ey.r.appspot.com/2FA?"+new URLSearchParams({
      userID: userID,
      FKey: form.elements.FKey.value
      }), {mode: 'cors'})
      .then(response => {
          if (response.ok) {
            window.location.href = "account.html?userID="+userID
          } else {
            throw new Error('API request failed'); // If the response is not successful, throw an error
          }
        })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
