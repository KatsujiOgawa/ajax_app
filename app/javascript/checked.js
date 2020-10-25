
function check() {
  // 表示中の全てのメモを取得
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックしたときの処理を定義
    post.addEventListener("click", () => {
      // どのメモをクリックしているのかをカスタムデータを利用して判別
      const postId = post.getAttribute("data-id");
      // ajaxに必要なオブジェクトの生成
      const XHR = new XMLHttpRequest();
      // openにより、リクエストタイプを指定
      XHR.open("GET", `/posts/${postId}`, true);
      // responseTypeにより、レスポンスの形式をjsonに指定
      XHR.responseType = "json";
      // sendによりリクエストを送信
      XHR.send();
      // レスポンスを受け取ったときの処理
      XHR.onload = () => {
        // レスポンスステータスを取得して、２００以外の場合にエラ〜メッセージをアラート
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了
          return null;
        }
        // レスポンスされたデータをitemに代入
        const item = XHR.response.post;
        // 既読状態の場合は”data-check”のカスタムデータを追加（data-checkがtrueならば、CSSが反映される）
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        // 未読状態であれば、カスタムデータを削除
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);