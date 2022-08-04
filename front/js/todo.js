readTodo();

async function readTodo(){
    //토큰 없으면 return
    const token = localStorage.getItem("x-access-token");
    if(!token){
        return;
    }

    //일정 조회 api 호출
    const config = {
        method: "get",
        url: url+"/todos",
        headers:{
            "x-access-token": token
        }
    };
    try{
        const res = await axios(config);

        if(res.data.code !==200){
            alert(res.data.message);
            return false;
        }
        const todoDataSet = res.data.result;

        for(let section in todoDataSet){
            //각섹션의 ul태그 선택하게됨
            const sectionUl = document.querySelector(`#${section} ul`);
            //각섹션에 해당하는 데이터
            const arrayForEachSection = todoDataSet[section];

            let result ="";
            for(let todo of arrayForEachSection){
                let element = `
                <li class="list-item" id=${todo.todoIdx}>
                    <div class="done-text-container">
                        <input type="checkbox" class="todo-done" ${todo.status==='C'?"checked" : ""}>
                        <p class="todo-text">
                            ${todo.contents}
                        </p>
                    </div>
                    <!-- done-text-container -->

                    <div class="update-delete-container">
                        <i class="todo-update fa-solid fa-pen"></i>
                        <i class="todo-delete fa-solid fa-trash-can"></i>
                    </div>
                </li>
                `;
                result +=element;
            }

            sectionUl.innerHTML = result;
        }
        
    } catch(err){
        console.error(err);
    }
}

//일정 CUD
const matrixContainer = document.querySelector(".matrix-container");
matrixContainer.addEventListener("keypress",cudController);
matrixContainer.addEventListener("click",cudController);



function cudController(event){
    const token = localStorage.getItem("x-access-token");
    if(!token){
        alert("로그인이 필요합니다.");
        return;
    }
    
    const target = event.target;
    const targetTagName = target.tagName;
    const eventType = event.type;
    const key = event.key;

    //creat 처리
    if(targetTagName === "INPUT" && key ==="Enter"){
        createTodo(event,token);
        
    }
    
    //update 이벤트 처리
    
    //체크박스 업데이트
    if(target.className === "todo-done" && eventType ==="click"){
        updateTodoDone(event,token);
    } 

    //컨텐츠 업데이트
    const firstClassName = target.className.split(" ")[0];
    if(firstClassName ==="todo-update"&&eventType==="click"){
        updateTodoContents(event,token);
    }

    //delete 이벤트 처리
    if(firstClassName ==="todo-delete"&&eventType==="click"){
        deleteTodo(event,token);
    }
    
}

async function createTodo(event,token){
    const contents = event.target.value;
    const type = event.target.closest(".matrix-item").id;

    if(!contents){
        alert("내용을 입력해주세요.");
        return false;
    }

    const config = {
        method: "post",
        url: url+"/todo",
        headers: {"x-access-token": token},
        data:{
            contents : contents,
            type: type,
        },
    };
    try{
        const res = await axios(config);

        if(res.data.code!== 200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        event.target.value="";
        return true;
    } catch(err){
        console.error(err);
        return false;
    }

};

async function updateTodoDone(event,token){
    const status = event.target.checked ? "C" : "A";
    
    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "patch",
        url: url+"/todo",
        headers: {"x-access-token": token},
        data:{
            todoIdx : todoIdx,
            status: status,
        },
    };

    try{
        const res = await axios(config);
 
        if(res.data.code!== 200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();

    } catch(err){
        console.error(err);
        return false;
    }
}

async function updateTodoContents(event,token){
    const content = prompt("내용을 입력해주세요");

    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "patch",
        url: url+"/todo",
        headers: {"x-access-token": token},
        data:{
            todoIdx : todoIdx,
            contents: content,
        },
    };

    try{
        const res = await axios(config);
 
        if(res.data.code!== 200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();

    } catch(err){
        console.error(err);
        return false;
    }
}


async function deleteTodo(event,token){
    const isValidReq = confirm("삭제하시겠습니까? 삭제 후에는 복구가 불가합니다.");

    if(!isValidReq){
        return false;
    }

    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "delete",
        url: url+"/todo/"+todoIdx,
        headers: {"x-access-token": token},
    };

    try{
        const res = await axios(config);
 
        if(res.data.code!== 200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();

    } catch(err){
        console.error(err);
        return false;
    }
}