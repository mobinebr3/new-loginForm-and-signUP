const $ = document;

let Formregester = $.querySelector('.form')
let nameUsersInput = $.querySelector('.name')
let EmailUsersInput = $.querySelector('.Email')
let passwordUsersInput = $.querySelector('.password')
let UserTableELm = $.querySelector('table')

let db = null
let objStore = null
window.addEventListener('load', () => {
       let newDataB = indexedDB.open('mobinWeb', 17)




       newDataB.addEventListener('error', (err) => {
              console.warn('Error', err);
       })

       newDataB.addEventListener('success', (event) => {
              console.log("success", event.target.result);
              db = event.target.result
              GetUsers()
       })
       newDataB.addEventListener('upgradeneeded', (event) => {
              db = event.target.result

              console.log('oldVersion:', event.oldVersion);
              console.log('newVersion:', event.newVersion);

              if (!db.objectStoreNames.contains('users')) {
                     objStore = db.createObjectStore('users', {
                            keyPath: 'userID'

                     })

              }

              // if (db.objectStoreNames.contains('users')) {
              //        db.deleteObjectStore('users')
              // }

              console.log(db.objectStoreNames);
       })
})


Formregester.addEventListener('submit', (event) => {
       event.preventDefault()
       let newUser = {
              userID: Math.floor(Math.random() * 9999),
              name: nameUsersInput.value,
              Email: EmailUsersInput.value,
              password: passwordUsersInput.value

       }
       let tx = createTX('users', 'readwrite')
       let store = tx.objectStore('users')
       let requset = store.add(newUser)


       requset.addEventListener('error', (err) => {
              console.warn('  req:  Error', err);
       })
       requset.addEventListener('success', (event) => {
              console.log("  req: success", event);

              clearInputs()
       })
       GetUsers()
       console.log(newUser);
})
function clearInputs() {
       nameUsersInput.value = ''
       EmailUsersInput.value = ''
       passwordUsersInput.value = ''
}
function GetUsers() {

       let tx = createTX('users', 'readonly')
       let store = tx.objectStore('users')
       let requset = store.getAll()
       requset.addEventListener('error', (err) => {
              console.warn('  req:  Error', err);
       })
       let allUsres = null
       requset.addEventListener('success', (event) => {
              console.log("  req: success", event);
              let allUsres = event.target.result
              UserTableELm.innerHTML += allUsres.map((c) => {
                     return `  <tbody>
                                  <tr>
                            <td> ${c.userID}</td>
                            <td>${c.name}</td>
                            <td>${c.Email}</td>
                            <td> ${c.password} </td>
                            <td><a onclick="removeUser(${c.userID})">remove</a></td>
                                   </tr>
                            </tbody>`
              })
              console.log(allUsres);
       })

}
function createTX(USERS, modetion) {
       let tx = db.transaction(USERS, modetion)


       tx.addEventListener('error', (err) => {
              console.warn('tx Error', err);
       })
       tx.addEventListener('complete', (event) => {
              console.log("tx success", event);
       })
       return tx

}
function removeUser(userID) {
       console.log(event.target.parentElement.parentElement);
       console.log(userID);
       let tx = createTX('users', 'readwrite')

       console.log('txxxxxxx : ', tx);
       let store = tx.objectStore('users')
       store.delete(userID)
       event.target.parentElement.parentElement.remove()

}
