const inputs=document.querySelectorAll("input");
const buttn=document.querySelector(".btn");
let users=document.querySelector("#users");
let msg=document.querySelector('.msg');
buttn.addEventListener('click', (e)=>{
    e.preventDefault();
    //storing data in object format
    let obj={ 
        amount:document.getElementById("am").value,
        description:document.getElementById("desc").value,
        category:document.getElementById("cat").value,
    };
    const amount=obj["amount"];
    const description=obj["description"];
    const category=obj["category"];
 

    if(amount==''||description==''||category==''){
        msg.classList.add('error');
        msg.innerHTML="Please fill the below 3";
        setTimeout(()=>msg.remove(), 3000);
    }
    else{

    let obj_string=JSON.stringify(obj);
    localStorage.setItem(description, obj_string);

    const li = document.createElement('li');
    li.className = 'list-group-item';
    let divv=document.createElement('button');
    divv.className="btn btn-danger btn-sm float-right delete";
    divv.appendChild(document.createTextNode("Delete"));
    let edit=document.createElement('button');
    edit.className="btn btn-success btn-sm float-right edit";
    edit.appendChild(document.createTextNode("Edit"));
        
        // Add text node with input values
        li.appendChild(document.createTextNode(amount+" - "+category+" - "+description+" - "));
        li.appendChild(divv);
        li.appendChild(edit);

        // Append to ul
        users.appendChild(li);
    
        // Clear fields
        inputs.forEach(element => {
            element.value="";
        });
    }
});

var itemList = document.getElementById('users');
// Delete event
itemList.addEventListener('click', removeItem);

function removeItem(e){
    if(e.target.classList.contains('delete')){
        var li = e.target.parentElement;
        var temp=li.textContent;
        itemList.removeChild(li);
        var emailstr=temp.split(" - ");
        localStorage.removeItem(emailstr[2]);
    }
    else if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;
        var temp=li.innerHTML;
        itemList.removeChild(li);
        var each=temp.split(" - ");
        localStorage.removeItem(each[2]);
        var i=0;
        inputs.forEach(element => {
            element.value=each[i];
            i++;
        });
    }
}