const config = require('config');
const { Pool } = require('pg');

// const host = config.get('host');
// const port = config.get('port');
// const dbUser = config.get('dbUser');
// const dbPassword = config.get('dbPassword');

// console.log(host, port, dbUser, dbPassword);

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'sdb_course',
});

const doQuery = async () => {
  const schema = 'public';
  const view = 'baea_nests';
  const client = await pool.connect();
  try {
    // const sql = `SELECT * FROM '${schema}'.'${view}' LIMIT 1`;
    // 上記はエラーとなるが、test002ではこの方法使っている、よくわからない。
    const sql = `SELECT * FROM ${schema}.${view} LIMIT 1`;
    const cols = await client.query(sql);
    console.log(cols.rows[0]);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
doQuery();
