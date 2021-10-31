const checkLength = () =>{
    const notice1 = document.getElementById('notice')
    const notice2 = document.getElementById('notice2')
    const name = document.getElementById('name')
    const password = document.getElementById('password')
    const btn = document.getElementById('btn')
     if (name.value.length >= 3){
        notice1.style.display = 'none'
     }else{
        notice1.style.display = 'block'
     }

     if (password.value.length >= 3){
        notice2.style.display = 'none'
     }else{
        notice2.style.display = 'block'
     }

     if (name.value.length >= 3 && password.value.length >= 3){
        btn.disabled = false
     }else {
        btn.disabled = true
    }
     
}
