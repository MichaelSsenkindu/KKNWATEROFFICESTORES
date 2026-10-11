

function toggle(id){
  const menu=document.getElementById(id)
  if(menu.style.display==='block'){
    menu.style.display='none'
    
  }else{
    menu.style.display='block'
    
  }
 
}
//signup user
const signupForm=document.getElementById('signupForm')

if(signupForm){
    signupForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const username=document.getElementById('username').value.toLowerCase().trim()
        const password=document.getElementById('password').value
        const role=document.getElementById('role').value
        const signupMsg=document.getElementById('signupMsg')
        if(!username || !password || !role){
            signupMsg.style.color='red'
            signupMsg.textContent='All fields are required..!'
            setTimeout(() => {
            signupMsg.style.color='black'
            signupMsg.textContent='Please Signup' 
            }, 2000);
            return
        }

  fetch('/signup',{
   method:'post' ,
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({username,password,role})
  }).then(res=>res.json())
  .then(data=>{
    if(data.success){
        signupMsg.style.color='green'
        signupMsg.textContent='Signup successfull please wait.....'
        setTimeout(() => {
          window.location='login.html'  
        }, 2000);

}else{
  signupMsg.style.color='red'
  signupMsg.textContent='Username already exists,try another..!'
  setTimeout(() => {
    signupMsg.style.color='black'
    signupMsg.textContent='Please Signup' 
            }, 2000);
            return
}



  })
 })
}


// login user
const loginForm=document.getElementById('loginForm')

if(loginForm){
    loginForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const username=document.getElementById('username').value.toLowerCase().trim()
        const password=document.getElementById('password').value
        const loginMsg=document.getElementById('loginMsg')
        if(!username || !password){
            loginMsg.style.color='red'
            loginMsg.textContent='All fields are required..!'
            setTimeout(() => {
            loginMsg.style.color='black'
            loginMsg.textContent='Please Login' 
            }, 2000);
            return
        }

  fetch('/login',{
   method:'post' ,
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({username,password})
  }).then(res=>res.json())
  .then(data=>{
    if(data.success){
        loginMsg.style.color='green'
        loginMsg.textContent='Login successfull please wait.....'
        localStorage.setItem('username',data.username)
        localStorage.setItem('role',data.role)
        setTimeout(() => {
          window.location='/dashboard'  
        }, 2000);

}else{
  loginMsg.style.color='red'
  loginMsg.textContent=data.message
  setTimeout(() => {
    loginMsg.style.color='black'
    loginMsg.textContent='Please Login' 
            }, 2000);
            return
        

}


  })
 })
}
// // logout
function logout(){

  window.location='/login'
}
// //home display
 function displayHome(){
  window.location='/dashboard'
 }

//show user role on dashboard
const workRole=localStorage.getItem('role')
const loginUser=localStorage.getItem('username')
const welcomeUser=document.getElementById('welcomeMsg')
welcomeUser.innerHTML=`<span class='title'>Welcome to KKN WATER OFFICE STORES ${loginUser} </span>
 <span class='roles'> ${workRole}</span>`

 // add stock
function addStock(){
const userRole=localStorage.getItem('role')
if(userRole !=='Admin' && userRole !=='Operations Manager'){
 return alert('only admins can add stock')
}
 
const materialName=document.getElementById('materialName').value
const materialSize=document.getElementById('materialSize').value
const materialType=document.getElementById('materialType').value
const quantity=document.getElementById('quantity').value
const date=document.getElementById('date').value
if(!materialName || !materialSize || !materialType || !quantity || !date){
  return alert('All fields are required...!')
}
fetch('/addStock',{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    materialName:materialName,
    materialSize:materialSize,
    materialType:materialType,
    quantity:quantity,
    date:date
  })
})
.then(res=>res.json())
.then(data=>{
  if(data.success){
    alert('Stock added successfully')
 document.getElementById('materialName').value=''
 document.getElementById('materialSize').value=''
 document.getElementById('materialType').value=''
 document.getElementById('quantity').value=''
 document.getElementById('date').value=''
  setTimeout(() => {
        window.location='/addStock'
      }, 2000);
  }else{
    return alert(data.message)
  }
}).catch(error=>{
  console.log(error)
  return 
})
}

//giveOutMaterials

function giveOutMaterials(){
  const userRole=localStorage.getItem('role')
if(userRole !=='Admin' && userRole !=='Operations Manager'){
 return alert('only admins can add stock')
}
const GIVENTO=document.getElementById('givenTo').value
const materialName=document.getElementById('materialName').value
const materialSize=document.getElementById('materialSize').value
const materialType=document.getElementById('materialType').value
const quantity=document.getElementById('quantity').value
const date=document.getElementById('date').value

if(!GIVENTO || !materialName ||!materialSize || !materialType || !quantity || !date){
  return alert('all fields are required')
}
fetch('/stocks/giveOutMaterials',{
  method:'post',
  headers:{'Content-Type': 'application/json'},
  body:JSON.stringify({
    GIVENTO:GIVENTO,materialName:materialName,materialSize:materialSize,materialType:materialType,quantity:quantity,date:date
  })
}).then(res=>res.json())
.then(data=>{
  if(data.success){
    alert('Materials given out successfully')
    document.getElementById('givenTo').value=''
    document.getElementById('materialName').value=''
    document.getElementById('materialSize').value=''
    document.getElementById('materialType').value=''
    document.getElementById('quantity').value=''
    document.getElementById('date').value=''
     setTimeout(() => {
        window.location='/dashboard'
      }, 2000);
  }else{
    return alert(data.message)
  }
}).catch(error=>{
  console.log(error)
  return
})
}

// show dashboard cards
 function couplersOD20mm(){
  fetch('/couplersOD20mm')
  .then(res=>res.json())
  .then(data=>{
    if(data.success){
document.getElementById('couplersOD20mm').textContent=`Couplers: ${data.total20mm}`
document.getElementById('pipesOD20mm').textContent=`Pipes: ${data.totalPipe20mm} meters`
document.getElementById('couplersOD25mm').textContent=`Couplers: ${data.total25mm}`
document.getElementById('pipesOD25mm').textContent=`Pipes: ${data.totalPipe25mm} meters`
document.getElementById('couplersOD32mm').textContent=`Couplers: ${data.total32mm}`
document.getElementById('pipesOD32mm').textContent=`Pipes: ${data.totalPipe32mm} meters`
document.getElementById('couplersOD40mm').textContent=`Couplers: ${data.total40mm}`
document.getElementById('pipesOD40mm').textContent=`Pipes: ${data.totalPipe40mm} meters`
document.getElementById('couplersOD50mm').textContent=`Couplers: ${data.total50mm}`
document.getElementById('pipesOD50mm').textContent=`Pipes: ${data.totalPipe50mm} meters`
document.getElementById('couplersOD63mm').textContent=`Couplers: ${data.total63mm}`
document.getElementById('pipesOD63mm').textContent=`Pipes: ${data.totalPipe63mm} meters`
document.getElementById('couplersOD75mm').textContent=`Couplers: ${data.total75mm}`
document.getElementById('pipesOD75mm').textContent=`Pipes: ${data.totalPipe75mm} meters`
document.getElementById('couplersOD90mm').textContent=`Couplers: ${data.total90mm}`
document.getElementById('pipesOD90mm').textContent=`Pipes: ${data.totalPipe90mm} meters`
document.getElementById('couplersOD110mm').textContent=`Couplers: ${data.total110mm}`
document.getElementById('pipesOD110mm').textContent=`Pipes: ${data.totalPipe110mm} meters`
document.getElementById('couplersOD160mm').textContent=`Couplers: ${data.total160mm}`
document.getElementById('pipesOD160mm').textContent=`Pipes: ${data.totalPipe160mm} meters`



    }})}

couplersOD20mm()


//  function search(){
//   const searchedStock=document.getElementById('searchedStock')
//   searchedStock.innerHTML=''
//  const searchInput=document.getElementById('searchInput').value.toLowerCase().trim()
//  if(!searchInput){return alert('Please enter an Item')}
//  fetch(`/stocks/search?searchInput=${searchInput}`,{
//   method:'get'
//  })
//  .then(res=>res.json())
//  .then(data=>{
//   if(data.success){
//     data.searches.forEach(search => {
//       const li=document.createElement('li')
//     li.textContent=`${search.materialName}-${search.materialSize}  ${search.quantity}`
//   searchedStock.appendChild(li)
//     });
    
//   }
//  })

//  }


    //SEARCH STOCK
function search(){
  const searchInput=document.getElementById('searchInput').value.toLowerCase().trim()
  if(!searchInput){return alert('Please Enter Item')}
  fetch(`/stocks/searchStock?searchInput=${searchInput}`,{
    method:'get'
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.success){
      const searchList=document.getElementById('searchList')
      searchList.innerHTML=''
      data.stocks.forEach((stock,i) => {
        const li=document.createElement('li')
        li.textContent=`${1+i}.${stock.materialName}/${stock.materialSize}-${stock.quantity}`
        searchList.appendChild(li)
      });
    }else{document.getElementById('searchInput').value=''  
    return  alert(data.message)
    }
  }).catch((error)=>{
  console.log(error)
  return
})
}

 function viewAllRequests(){
window.location='/viewAllRequests'
 }
