const {pool} = require("../../database");


exports.insertUser = async function(email, password, nickname){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const insertUserQuery = "insert into Users (email,password,nickname) values (?,?,?);";
            const insertUserParams = [email, password, nickname];

    
            const [row] =await connection.query(insertUserQuery,insertUserParams);
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### insertUser query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### insertUser db error ##### ${err}');
        return false;
    }
};

exports.selectUserByEmail= async function(email){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const selectUserByEmailQuery = "select * from Users where email = ?";
            const selectUserByEmailParams = [email];

    
            const [row] =await connection.query(selectUserByEmailQuery,selectUserByEmailParams);
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### selectUserByEmail query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### selectUserByEmail db error ##### ${err}');
        return false;
    }
};

exports.selectUser = async function(email,password){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const insertUserQuery = "insert into Users (email,password,nickname) values (?,?,?);";
            const insertUserParams = [email, password, nickname];

    
            const [row] =await connection.query(insertUserQuery,insertUserParams);
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### insertUser query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### insertUser db error ##### ${err}');
        return false;
    }
};

exports.selectUserByEmail= async function(email){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const selectUserByEmailQuery = "select * from Users where email = ?";
            const selectUserByEmailParams = [email];

    
            const [row] =await connection.query(selectUserByEmailQuery,selectUserByEmailParams);
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### selectUserByEmail query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### selectUserByEmail db error ##### ${err}');
        return false;
    }
}


exports.selectUser= async function(email,password){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const selectUserQuery = "select * from Users where email = ? and password=?";
            const selectUserParams = [email,password];

    
            const [row] =await connection.query(selectUserQuery,selectUserParams);
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### selectUser query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### selectUser db error ##### ${err}');
        return false;
    }
}

exports.selectNicknmaeByUserIdx = async function(userIdx){
    try{
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try{
            //쿼리
            const selectNicknameByUserQuery = "select * from Users where userIdx=?";
            const selectNicknameByUserParams = [userIdx];

    
            const [row] =await connection.query(selectNicknameByUserQuery,selectNicknameByUserParams);
            connection.release();
            return row;
        } catch(err){
        
            console.error('##### selectNicknameByUserQuery query error #####\n ${err}');
            connection.release();
            return false;
        }

    } catch(err){
        console.error('##### selectNicknameByUserParams db error ##### ${err}');
        return false;
    }


}