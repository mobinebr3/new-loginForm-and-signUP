const $ = document


let Formregester = $.querySelector('.form')
let EmailUsersInput = $.querySelector('.Email')
let passwordUsersInput = $.querySelector('.password')

let UserTableELm = $.querySelector('table')

Formregester.addEventListener('submit',()=>{
event.preventDefault()
       let indexdb = indexedDB.open('mobinWeb', 17)



       
       indexdb.addEventListener('error', (err) => {
              console.warn('Error', err);
       })

       indexdb.addEventListener('success', (event) => {
              console.log("success", event.target.result);
            let  db = event.target.result
              GetUsers (db)
       })

       function GetUsers (db){

              let tx = db.transaction('users', 'readonly')
       
              tx.addEventListener('error', (err) => {
                     console.warn('tx Error', err);
              })
              tx.addEventListener('complete', (event) => {
                     console.log("tx success", event);
       
              })
              let store = tx.objectStore('users')
              let requset = store.getAll()
              requset.addEventListener('error', (err) => {
                     console.warn('  req:  Error', err);
              })
              let allUsres = null
              requset.addEventListener('success', (event) => {
                     console.log("  req: success", event);
                      allUsres = event.target.result
                     let UserLogin = allUsres.find((v)=>{
                            return v.Email === EmailUsersInput.value && v.password === passwordUsersInput.value
                     })
                     if(UserLogin){
                            console.log('you Logined', UserLogin);
                                  UserTableELm.innerHTML = 
                          `  <thead><tr><th class="header">User Id</th><th class="header">Name</th><th class="header">Email</th><th class="header">password</th></tr></thead><tbody><tr>
                                   <td> ${UserLogin.userID}</td><td>${UserLogin.name}</td><td>${UserLogin.Email}</td><td> ${UserLogin.password} </td></tr></tbody>`
                     




                     }else{
                            console.log('Your pass or elmail is inccrote');
                     }
                     //   UserTableELm.innerHTML =  allUsres.map((c)=>{
                     //     return `  <thead><tr><th class="header">User Id</th><th class="header">Name</th><th class="header">Email</th><th class="header">password</th></tr></thead><tbody><tr>
                     //               <td> ${c.userID}</td><td>${c.name}</td><td>${c.Email}</td><td> ${c.password} </td></tr></tbody>`
                     // })
                     console.log(allUsres);
              })
       
          } 
})
