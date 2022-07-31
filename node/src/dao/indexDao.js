//db에접근하는 부분

const {pool} = require("../../database");

exports.insertTodo = async function(userIdx,contents,type){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const insertTodoQuery = "insert into Todos (userIdx,contents,type) values(?,?,?);";
            const insertTodoParams = [userIdx,contents,type];

    
            const [row] =await connection.query(insertTodoQuery,insertTodoParams);
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### insertTodo query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### insertTodo db error ##### ${err}');
        return false;
    }
};

exports.selectTodoByType = async function(userIdx,type){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const selectTodoByTypeQuery = "select todoIdx, contents from Todos where userIdx=? and type=? and not(status='D');";
            const selectTodoByTypeParams = [userIdx,type];

    
            const [row] =await connection.query(selectTodoByTypeQuery,selectTodoByTypeParams);
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### selectTodoByType query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### selectTodoByType db error ##### ${err}');
        return false;
    }
}


exports.selectValidTodo = async function(userIdx,todoIdx){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const selectValidTodoQuery = "select * from Todos where userIdx= ? and todoIdx= ? and not(status='D');";
            const selectValidTodoParams = [userIdx,todoIdx];

            const [row] =await connection.query(selectValidTodoQuery,selectValidTodoParams );
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### selectValidTodo query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### selectValidTodo db error ##### ${err}');
        return false;
    }
};


exports.updateTodo = async function(userIdx, todoIdx,contents,status){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const updateTodoQuery = "update Todos set contents= ifnull(?,contents), status=ifnull(?,status) where userIdx=? and todoIdx=?;";
            const updateTodoParams = [contents,status,userIdx, todoIdx];

            const [row] =await connection.query(updateTodoQuery,updateTodoParams  );
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### updateTodoQuery query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### updateTodoParams db error ##### ${err}');
        return false;
    }
}

exports.deleteTodo = async function(userIdx,todoIdx){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const deleteTodoQuery = "update Todos set status ='D' where userIdx= ? and todoIdx=?;";
            const deleteTodoParams = [userIdx,todoIdx];

            const [row] =await connection.query(deleteTodoQuery,deleteTodoParams  );
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### deleteTodoQuery query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### deleteTodoParams db error ##### ${err}');
        return false;
    }
}