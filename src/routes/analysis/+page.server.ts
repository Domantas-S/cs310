// import { connectToDB } from "$lib/db/db";

// export async function load({ locals }) {
//     let result = await locals.dbCon.query(`select record_id, info, context from get_info('Subject', 'Age') join dev2 ON record_id=dev2.id`);
//     return {
//         body: {
//             result: result.rows
//         }
//     }
// }

// async function getInfo(key : string, subkey : string){
//     let result = await dbConn.query(`SELECT * FROM get_info($1, $2)`, [key, subkey]);
//     return result.rows;
//   }
  
// async function executeSQLquery(query : string) {
//     return (await pool.query(query)).rows;
//   }
