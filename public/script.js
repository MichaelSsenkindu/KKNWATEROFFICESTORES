
function toggle(id){
  const menu=document.getElementById(id)
  if(menu.style.display==='block'){
    menu.style.display='none'
    
  }else{
    menu.style.display='block'
    
  }
 
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
          window.location='dashboard.html'  
        }, 2000);

}else{
  loginMsg.style.color='red'
  loginMsg.textContent='Invalid Username/Password'
  setTimeout(() => {
    loginMsg.style.color='black'
    loginMsg.textContent='Please Login' 
            }, 2000);
            return
        

}


  })
 })
}

// add stock
function addStock(){
 
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
        window.location='dashboard.html'
      }, 2000);
  }else{
    return alert('Failed to add Stock please try again......')
  }
}).catch(error=>{
  console.log(error)
  return 
})

}
const addUserRole=document.getElementById('addStockContainer')
const userRole=localStorage.getItem('role')
if(userRole !=='Admin' && userRole !=='Operations Manager'){
  addUserRole.style.pointerEvents='none'
  addUserRole.style.opacity=0.5
}
// logout
function logout(){
  window.location='login.html'
}
//show user role on dashboard
const workRole=localStorage.getItem('role')
const loginUser=localStorage.getItem('username')
document.getElementById('welcomeMsg').textContent=`Welcome to KKN WATER OFFICE STORES ${loginUser}---${workRole}`
// const userForm=document.getElementById('addUser')

//home display
 function displayHome(){
  window.location='dashboard.html'
 }
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


function viewStock(){

  const stockList=document.getElementById('availableStock')
  stockList.innerHTML=''
  fetch('/viewStock',{
    method:'get'
  }).then(res=>res.json())
  .then(data=>{
    if(data.success){
data.availableStocks.forEach(availableStock => {
    const li=document.createElement('li')
    li.textContent=availableStock.materialName
    stockList.appendChild(li)
  });
    }else{return alert('no Stock found')}
   
  })
  
}
viewStock()