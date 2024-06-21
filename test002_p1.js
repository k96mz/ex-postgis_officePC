const config = require('config');
const { Pool } = require('pg');

// const host = config.get('host');
// const port = config.get('port');
// const dbUser = config.get('dbUser');
// const dbPassword = config.get('dbPassword');

// console.log(host, port, dbUser, dbPassword);

// 接続設定
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
  // 雪像するオブジェクトを定義
  try {
    const sqlForColumn = `SELECT column_name FROM information_schema.columns WHERE table_schema = '${schema}' AND table_name = '${view}' ORDER BY ordinal_position`;
    const colForColumn = await client.query(sqlForColumn);
    console.log(colForColumn.rows);
    // baea_nestsテーブルで使用されているcolumnsを取得

    let cols = colForColumn.rows
      .map(r => r.column_name)
      .filter(r => r !== 'geom');
    console.log(cols);
    // columnsからgeomを削除

    cols.push(`ST_AsGeoJSON(${schema}.${view}.geom)`);
    console.log(cols);
    // 配列であるcolumnsに'ST_AsGeoJSON(public.baea_nests.geom})'を追加。つまり新しくcolumnを加えている。

    cols = cols.toString();
    console.log(cols);
    // 配列からカンマ区切りの文字列に変換

    await client.query('BEGIN');
    const sql = `SELECT ${cols} FROM ${schema}.${view}`;
    cols = await client.query(sql);
    console.log(cols.rows);
    // 実際のクエリの実行

    await client.query('COMMIT');
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
doQuery();
