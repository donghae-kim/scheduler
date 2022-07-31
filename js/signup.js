 // 입력값 유효성 검사

 //이메일 유효성 검사
 const inputemail = document.getElementById("email");
 const emailMessage = document.querySelector("div.email-message");
 inputemail.addEventListener("input",isValidEmail);

 //비밀번호 유효성 검사
const inputPassword = document.getElementById("password");
const passwordMessage = document.querySelector("div.password-message");
inputPassword.addEventListener("input",isValidPassword);

//비밀번호 확인
const inputPasswordConfirm = document.getElementById("password-confirm");
const passwordConfirmMessage = document.querySelector("div.password-confirm-message");
inputPasswordConfirm.addEventListener("input",isValidPasswordConfirm);


//닉네임 
const inputNickname = document.getElementById("nickname");
const inputNicknameMessage = document.querySelector("div.nickname-message"  );
inputNickname.addEventListener("input",isValidNickname);

 //이메일 형식 검사
 function isValidEmail(event){
    const currentEmail = inputemail.value;

    const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if(!emailReg.test(currentEmail)){
        emailMessage.style.visibility = "visible";
        return false;
    }
    emailMessage.style.visibility = "hidden";

    return true;
 }
 
 //비밀번호 형식 검사
 function isValidPassword(event){
    const currentPassword = inputPassword.value;

    const passwordReg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/;

    if(!passwordReg.test(currentPassword)){
        passwordMessage.style.visibility = "visible";
        return false;
    }
    passwordMessage.style.visibility = "hidden";
    return true;
 }

 //비밀번호 확인 검사
 function isValidPasswordConfirm(event){
    const currentPassword = inputPassword.value;
    const currentPasswordConfirm = inputPasswordConfirm.value;

    if(currentPassword !== currentPasswordConfirm){
        passwordConfirmMessage.style.visibility="visible";
        return false;
    }

    passwordConfirmMessage.style.visibility = "hidden";
    return true;
 }

 //닉네임 검사

function isValidNickname(event){
    const currentNickname = inputNickname.value;

    if(currentNickname.length<2 || currentNickname>10){
        inputNicknameMessage.style.visibility="visible";
        return false;
    }
    inputNicknameMessage.style.visibility="hidden";
    return true;
}