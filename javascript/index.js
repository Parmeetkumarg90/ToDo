var flag = 0;
let check = (elem) => {
    let cpass = document.getElementById("pass");
    if (elem.value.length == cpass.value.length) {
        console.log(elem.value.length, " = ", cpass.value.length);
        console.log(elem.value, " = ", cpass.value);
        if (elem.value == cpass.value) {
            document.getElementById('error').innerText = '';
            flag = 1;
        }
        else {
            document.getElementById('error').innerText = 'There is Error in your UserName or Password';
            flag = 0;
        }
    }
    else {
        document.getElementById('error').innerText = 'There is Error in your UserName or Password';
        flag = 0;
    }
}
function veri() {
    if (flag == 1) {
        window.open("Loader.html", '_blank');
        window.close();
        return true;
    }
    else {
        return false;
    }
}