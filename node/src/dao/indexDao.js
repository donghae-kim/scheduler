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
            const selectTodoByTypeQuery = "select todoIdx, contents from Todos where userIdx=? and type=? and status='A';";
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