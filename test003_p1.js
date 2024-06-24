const config = require('config');
const { Pool, Query } = require('pg');

const host = config.get('host');
const port = config.get('port');
const dbUser = config.get('dbUser');
const dbPassword = config.get('dbPassword');
const relations = config.get('relations');
const fetchSize = config.get('fetchSize');

// console.log(host, port, dbUser, dbPassword, relations);
const [database, schema, view] = relations[0].split('::');

// 接続設定
const pool = new Pool({
  host: host,
  port: port,
  user: dbUser,
  password: dbPassword,
  database: database,
});

const fetch = (client, database, view) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let features = [];
    client
      .query(new Query(`FETCH ${fetchSize} FROM cur`))
      // 一番最後は何もないから、いきなり'end'に飛び、そこでcount = 0になるのだと思う。
      .on('row', row => {
        console.log('１行ずつ表示；' + (count + 1) + '回目');
        console.log(row);
        // ここではfetchSizeで指定した分だけ取り出され、それが1行ずつ処理される。つまりはこのループを全て回してから、endに移る。
        let f = {
          type: 'Feature',
          properties: row,
          geometry: JSON.parse(row.st_asgeojson),
        };
        console.log('fを表示');
        console.log(f);
        delete f.properties.st_asgeojson;
        f.properties._database = database;
        f.properties._view = view;
        count++;
        console.log('修正後のfを表示');
        console.log(f);
        if (f) features.push(f);
        console.log('featuresの表示');
        // console.log(features);
      })
      .on('error', err => {
        console.error(err.stack);
        reject();
      })
      .on('end', async () => {
        for (f of features) {
          try {
            console.log('修正後のfを表示2');
            console.log(f);
          } catch (e) {
            throw e;
          }
        }
        resolve(count);
        console.log('countを表示: ' + count);
      });
  });
};

const doQuery = async () => {
  const client = await pool.connect();
  // 接続するオブジェクトを定義
  const startTime = new Date();
  try {
    const sqlForColumn = `SELECT column_name FROM information_schema.columns WHERE table_schema = '${schema}' AND table_name = '${view}' ORDER BY ordinal_position`;
    const colForColumn = await client.query(sqlForColumn);
    console.log('------------------------------');
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

    const sql = `DECLARE cur CURSOR FOR 
    SELECT ${cols} FROM ${schema}.${view}`;
    cols = await client.query(sql);
    // console.log(cols.rows);
    // 実際のクエリの実行、この時点では全ての行が実行されている。

    try {
      while ((await fetch(client, database, view)) !== 0) {}
      // await fetch(client, database, view);
    } catch (e) {
      throw e;
    }

    await client.query('COMMIT');
    const endTime = new Date();
    const diffTime = (endTime.getTime() - startTime.getTime()) / 1000;
    console.log(
      `workingTime for ${schema}.${view} in database is ${diffTime} (sec). End`
    );
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
doQuery();
