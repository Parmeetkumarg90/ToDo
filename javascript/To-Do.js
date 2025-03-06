let data = [], flag1 = 0, i = 0, flag2 = 0;
let AddButton = document.getElementsByClassName('responsive-button')[0];
let choice = (elem) => {
   // console.log(elem, typeof (elem));
    flag2 = elem;
    AddButton.click();
}
document.addEventListener('DOMContentLoaded', () => {
    data = JSON.parse(localStorage.getItem("Todo")) || [];
    if (data != []) {
        flag2 = "all";
        AddButton.click();
    }
});
AddButton.addEventListener('click', () => {
    if ((document.getElementById('title').value === "" || document.getElementById('descrip').value === "") && flag2 === 0) {
        alert("Please Enter both fields");
        return 0;
    }
    if (flag2 === 0) {
        const obj = {
            title: document.getElementById('title').value,
            description: document.getElementById('descrip').value,
            mark: 0
        };
        if (flag1 == 1) {
            data.splice(i, 0, obj);
            flag1 = 0;
        }
        else {
            data.push(obj);
        }
        document.getElementById('title').value = "";
        document.getElementById('descrip').value = "";
    }
    document.getElementsByTagName('tbody')[0].innerHTML = "";
    if (data.length > 0) {
        data.forEach((value) => {
            // console.log(data.length);
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const button1 = document.createElement('button');
            const button2 = document.createElement('button');
            const button3 = document.createElement('button');
            button1.setAttribute('class', 'responsive-button');
            button1.setAttribute('style', 'width:90%; margin:auto;');
            button2.setAttribute('class', 'responsive-button');
            button2.setAttribute('style', 'width:90%; margin:auto; ');
            button1.innerText = "Edit";
            button2.innerText = "Delete";
            tr.setAttribute("align", "center");
            td3.setAttribute('style', 'display:flex; flex-direction:column; border:none; justify-content: center;');
            button3.setAttribute('class', 'responsive-button');
            button3.setAttribute('style', 'width:90%; margin:auto; background: none;');
            if (flag2 === "complete" && value.mark === 1) {
                td1.innerText = value.title;
                td2.innerText = value.description;
                button1.addEventListener('click', (e) => {
                    if(document.getElementById('title').value != "" || document.getElementById('descrip').value != ""){
                        return;
                    }
                    document.getElementById('title').value = td1.innerText;
                    document.getElementById('descrip').value = td2.innerText;
                    for (i = 0; i < data.length; i++) {
                        if (data[i].title == td1.innerText || data[i].description == td2.innerText) {
                            flag1 = 1;
                            break;
                        }
                    }
                    data = data.filter(elem => elem.title != td1.innerText || elem.description != td2.innerText);
                    localStorage.setItem("Todo", JSON.stringify(data));
                    button2.click(e);
                });
                button2.addEventListener('click', (e) => {
                    e.target.parentNode.parentNode.remove();
                    data = data.filter(elem => elem.title != td1.innerText || elem.description != td2.innerText);
                    localStorage.setItem("Todo", JSON.stringify(data));
                    // tr.remove(); //other way of removing parent of parent 
                });
                button3.innerHTML = '<img src= "image/check-mark.png" width="20vmax">';
                button3.addEventListener('click', (e) => {
                    // obj.mark = obj.mark==0?1:0;
                    if (value.mark == 0) {
                        button3.innerHTML = '<img src= "image/check-mark.png" width="20vmax">';
                        value.mark = 1;
                    }
                    else {
                        button3.innerHTML = '<img src= "image/uncomplete.png" width="20vmax">';
                        value.mark = 0;
                    }
                    localStorage.setItem("Todo", JSON.stringify(data));
                });
                td3.appendChild(button1);
                td3.appendChild(button2);
                td4.appendChild(button3);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
            }
            else if (flag2 === "pending" && value.mark === 0) {
                td1.innerText = value.title;
                td2.innerText = value.description;


                button3.innerHTML = '<img src= "image/uncomplete.png" width="20vmax">';
                button1.addEventListener('click', (e) => {
                    if(document.getElementById('title').value != "" || document.getElementById('descrip').value != ""){
                        return;
                    }
                    document.getElementById('title').value = td1.innerText;
                    document.getElementById('descrip').value = td2.innerText;
                    for (i = 0; i < data.length; i++) {
                        if (data[i].title == td1.innerText || data[i].description == td2.innerText) {
                            flag1 = 1;
                            break;
                        }
                    }
                    data = data.filter(elem => elem.title != td1.innerText || elem.description != td2.innerText);
                    localStorage.setItem("Todo", JSON.stringify(data));
                    button2.click(e);
                });
                button2.addEventListener('click', (e) => {
                    e.target.parentNode.parentNode.remove();
                    data = data.filter(elem => elem.title != td1.innerText || elem.description != td2.innerText);
                    localStorage.setItem("Todo", JSON.stringify(data));
                    // tr.remove(); //other way of removing parent of parent 
                });
                button3.innerHTML = '<img src= "image/uncomplete.png" width="20vmax">';
                button3.addEventListener('click', (e) => {
                    // obj.mark = obj.mark==0?1:0;
                    if (value.mark == 0) {
                        button3.innerHTML = '<img src= "image/check-mark.png" width="20vmax">';
                        value.mark = 1;
                    }
                    else {
                        button3.innerHTML = '<img src= "image/uncomplete.png" width="20vmax">';
                        value.mark = 0;
                    }
                    localStorage.setItem("Todo", JSON.stringify(data));
                });
                td3.appendChild(button1);
                td3.appendChild(button2);
                td4.appendChild(button3);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
            }
            else if (flag2 === "all") {
                td1.innerText = value.title;
                td2.innerText = value.description;
                button1.addEventListener('click', (e) => {
                    if(document.getElementById('title').value != "" || document.getElementById('descrip').value != ""){
                        return;
                    }
                    document.getElementById('title').value = td1.innerText;
                    document.getElementById('descrip').value = td2.innerText;
                    for (i = 0; i < data.length; i++) {
                        if (data[i].title == td1.innerText || data[i].description == td2.innerText) {
                            flag1 = 1;
                            break;
                        }
                    }
                    data = data.filter(elem => elem.title != td1.innerText || elem.description != td2.innerText);
                    localStorage.setItem("Todo", JSON.stringify(data));
                    button2.click(e);
                });
                button2.addEventListener('click', (e) => {
                    e.target.parentNode.parentNode.remove();
                    data = data.filter(elem => elem.title != td1.innerText || elem.description != td2.innerText);
                    localStorage.setItem("Todo", JSON.stringify(data));
                    // tr.remove(); //other way of removing parent of parent 
                });
                button3.innerHTML = value.mark == 1 ? '<img src= "image/check-mark.png" width="20vmax">' : '<img src= "image/uncomplete.png" width="20vmax">';
                button3.addEventListener('click', (e) => {
                    // obj.mark = obj.mark==0?1:0;
                    if (value.mark == 0) {
                        button3.innerHTML = '<img src= "image/check-mark.png" width="20vmax">';
                        value.mark = 1;
                    }
                    else {
                        button3.innerHTML = '<img src= "image/uncomplete.png" width="20vmax">';
                        value.mark = 0;
                    }
                    localStorage.setItem("Todo", JSON.stringify(data));
                });
                td3.appendChild(button1);
                td3.appendChild(button2);
                td4.appendChild(button3);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
            }
            if (tr.innerHTML != "") {
                document.getElementsByTagName('tbody')[0].appendChild(tr);
            }
        });
    }
    if (flag2 != 0) {
        flag2 = 0;
    }
    localStorage.setItem("Todo", JSON.stringify(data));
});