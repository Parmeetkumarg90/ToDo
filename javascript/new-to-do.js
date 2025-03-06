let data = [], edit_index = [0,0], edit_flag1 = 0, select_flag2 = 0, token = 0;
let AddButton = document.getElementsByClassName('responsive-button')[0];
// console.log(typeof(edit_index))
document.addEventListener('DOMContentLoaded', () => {
    data = JSON.parse(localStorage.getItem("Todo")) || [];
    if (data.length != 0) {
        select_flag2  = "all";
        token = data.length;
        AddButton.click();
    }
});
let choice = (elem) => {
    // console.log(elem, typeof (elem));
     select_flag2  = elem;
     AddButton.click();
}
AddButton.addEventListener('click', () => {
    if ((document.getElementById('title').value === "" || document.getElementById('descrip').value === "") && select_flag2  === 0) {
        alert("Please Enter both fields");
        return 0;
    }
    // console.log("addbutton",select_flag2);
    if(select_flag2 === 0){
        createTask(edit_flag1);
    }
    document.getElementsByTagName('tbody')[0].innerHTML = "";
    if(data.length > 0){   
        data.forEach((value)=>{
            if(select_flag2 === "all" || select_flag2 === 0){
                insertData(value);
            }     
            else if(select_flag2 === "complete" && value.mark === 1){
                insertData(value);
            }     
            else if(select_flag2 === "pending" && value.mark === 0){
                insertData(value);
            }
        });
    }    
    if (select_flag2 != 0) {
        select_flag2 = 0;
    }
    localStorage.setItem("Todo", JSON.stringify(data));
});
function createTask(edit_flag1){
    const obj = {
        id: edit_flag1 === 1 ? edit_index[1] : ++token,
        title: document.getElementById('title').value,
        description: document.getElementById('descrip').value,
        mark: 0
    };
    if (edit_flag1 == 1) {
        data.splice(edit_index[0], 0, obj);
        edit_flag1 = 0;
        edit_index = [0,0];
    }
    else {
        data.push(obj);
    }
    console.log(data);
    document.getElementById('title').value = "";
    document.getElementById('descrip').value = "";
    // console.log(obj);
    // console.log(data);
}
function createRow(value){
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    const button3 = document.createElement('button');
    tr.setAttribute("align", "center");
    td3.setAttribute('style', 'display:flex; flex-direction:column; border:none; justify-content: center;');
    button1.setAttribute('class', 'responsive-button');
    button1.setAttribute('style', 'width:90%; margin:auto;');
    button1.innerText = "Edit";
    button1.addEventListener('click',(e)=>{
        editTask(e,value);
    });
    button2.setAttribute('class', 'responsive-button');
    button2.setAttribute('style', 'width:90%; margin:auto; ');
    button2.innerText = "Delete";
    button2.addEventListener('click',(e)=>{
        deleteTask(e,value);
    });
    button3.setAttribute('class', 'responsive-button');
    button3.setAttribute('style', 'width:90%; margin:auto; background: none;');
    button3.addEventListener('click',(e)=>{
        checkMark(value,button3);
    });
    td3.appendChild(button1);
    td3.appendChild(button2);
    td4.appendChild(button3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    if (tr.innerHTML != "") {
        document.getElementsByTagName('tbody')[0].appendChild(tr);
    }
    return tr;
};
function editTask(e,value){
    if(document.getElementById('title').value != "" || document.getElementById('descrip').value != ""){
        alert("Another Task is already in editing part.........");
        return;
    }
    document.getElementById('title').value = value.title;
    document.getElementById('descrip').value = value.description;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == value.id) {
            edit_flag1 = 1;
            edit_index[0] = i;
            edit_index[1] = data[i].id;
            break;
        }
    }
    data = data.filter(elem => elem.id != value.id);
    deleteTask(e);
}
function deleteTask(e,value){
    e.target.parentNode.parentNode.remove();
    data = data.filter(elem => elem.id != value.id);
    localStorage.setItem("Todo", JSON.stringify(data));
}
function checkMark(value,button3){
    value.mark = value.mark==0?1:0;
    button3.innerHTML = value.mark==1 ? '<img src= "image/check-mark.png" width="20vmax">': '<img src= "image/uncomplete.png" width="20vmax">';
    // console.log(button3,value.mark);
    // if (value.mark == 0) {
    //     button3.innerHTML = '<img src= "image/check-mark.png" width="20vmax">';
    //     value.mark = 1;
    // }
    // else {
    //     button3.innerHTML = '<img src= "image/uncomplete.png" width="20vmax">';
    //     value.mark = 0;
    // }
    localStorage.setItem("Todo", JSON.stringify(data));
}
function insertData(value){
    let tr = createRow(value);
    tr.children[0].innerText = value.title;
    tr.children[1].innerText = value.description;
    tr.children[3].querySelector("button").innerHTML = value.mark==0 ? '<img src= "image/uncomplete.png" width="20vmax">': '<img src= "image/check-mark.png" width="20vmax">';
    // console.log(tr.children);
}