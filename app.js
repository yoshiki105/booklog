// おまじない
const express = require('express');
const app = express();
const post = 3000;
let booklogs = [];

// jsonを扱えるようにする
app.use(express.json());

// '/booklog'にPOSTされた時の処理
app.post('/booklog', (req, res) => {
  // リクエストで送られてきたパラメータ
  const booklog = req.body;

  // バリデーション(name, textパラメータのいずれかでもfalseのとき)
  if (!(booklog.name && booklog.text)) {
    // returnを付けると、ここで処理を終える
    return res.json({
      "ok": false,
      "error": "invalid parameter"
    });
  }

  // booklogを保存
  booklogs.push(booklog);

  // json形式のレスポンスを返す
  res.json({
    "ok": true,
    "booklog": booklog
  });
});

// GET
app.get('/booklog', (_req, res) => {
  res.json({
    "ok": true,
    "booklogs": booklogs
  });
});

// リクエストを待ち受ける(起動コマンド=> % node app.js)
app.listen(post, () => {
  console.log(`App listening at http://localhost:${post}`);
});
