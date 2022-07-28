const indexDao = require("../dao/indexDao");

exports.createTodo = async function(req,res){
    const{userIdx,contents,type}=req.body;

    if(!userIdx || !contents || !type){
        return res.send({
            isSuccess: false,
            code:400,
            message: "입력값이 누락됐습니다."
        })
    }

    //contents 20글자 초과 불가
    if(contents.length>20){
        return res.send({
            isSuccess: false,
            code:400,
            message: "콘텐츠는 20글자 이하로 설정해주세요."
        }) 
    }
    //type : do, decide, delete, delegate 만 되야함
    const validTypes = ["do", "decide", "delete", "delegate"];
    if(!validTypes.includes(type)){
        return res.send({
            isSuccess: false,
            code:400,
            message: "유효한 타입이 아닙니다."
        })
    }


    const insertTodoRow = await indexDao.insertTodo(userIdx,contents,type);
    
    if(!insertTodoRow){
        return res.send({
            isSuccess: false,
            code:403,
            message: "요청에 실패했습니다. 관리자에게 문의하세요."
        })
    }
    
    return res.send({
        isSuccess: true,
        code:200,
        message: "일정 생성 성공",
    });
};

exports.readTodo = async function(req,res){
    const {userIdx} = req.params;
    
    const todos = {};
    const types = ["do","decide","delegate","delete"];
    
    for(let type of types){
        let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);
        
        if(!selectTodoByTypeRows){
            return res.send({
                isSuccess: true,
                code:400,
                message: "일정 조회 실패.",
            });
        }

        todos[type] = selectTodoByTypeRows;
    }


    return res.send({
        result: todos,
        isSuccess: true,
        code:200,
        message: "일정 조회 성공",
    });
}