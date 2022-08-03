setHeader();


async function setHeader(){
    //로컬스토리지에 토큰이 존재하는지
    const token=localStorage.getItem("x-access-token");
    
    //토큰이 없다면 signed에 hidden 클래스 추가
    if(!token){
        const signed = document.querySelector(".signed");
        signed.classList.add("hidden");
        return;
    }

    const config = {
        method: "get",
        url: url + "/jwt",
        headers: {
            "x-access-token": token,
        },
    };

    const res = await axios(config);

    if(res.data.code !== 200){
         console.log("잘못된 토큰");
    }

    const nickname = res.data.result.nickname;
    const spanNickname = document.querySelector("span.nickname");
    spanNickname.innerText = nickname;

    //토큰이 있다면 unsigned에 hidden클래스 추가
    const unsigned = document.querySelector(".unsigned");
    unsigned.classList.add("hidden");
}


// 로그아웃 기능

const buttonSignout= document.getElementById("sign-out");
buttonSignout.addEventListener("click",signout);

function signout(){
    localStorage.removeItem("x-access-token");
    location.reload();
}