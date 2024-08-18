const $ = document;

let Name = $.querySelector(".name");
let Email = $.querySelector(".Email");
let password = $.querySelector(".password");
let button = $.querySelector("button");

function signup(event) {
       event.preventDefault()
  let User = {
    Name: Name.value,
    Email: Email.value,
    pass: password.value,
  };
  console.log(Name.value, Email.value, password.value);

  fetch('https://mobinweb-b2bf8-default-rtdb.firebaseio.com', {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(User),
  }).then((res) => console.log(res));
}

button.addEventListener("click", signup);
