function memo() {
  // idでHTMLの要素を取得
  const submit = document.getElementById("submit");
  // クリックした時のイベントを定義
  submit.addEventListener("click", (e) => {
  // 入力フォームに入力された内容を取得
  const formData = new FormData(document.getElementById("form"));
  // XHRHttpRequestオブジェクトを生成
  const XHR = new XMLHttpRequest();
  // openメソッドを用いて、リクエストタイプを指定
  XHR.open("POST", "/posts", true);
  // レスポンスのデータ形式をjsonに指定
  XHR.responseType = "json";
  // sendを使用して、入力フォームに入力された送信
  XHR.send(formData);
 
  XHR.onload = () => {
    if (XHR.status != 200) {
      alert(`Error ${XHR.status}: ${XHR.statusText}`);
      return null;
    }
    const item = XHR.response.post;
    const list = document.getElementById("list");
    const formText = document.getElementById("content");
    const HTML = `
    <div class="post" data-id=${item.id}>
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
    list.insertAdjacentHTML("afterend", HTML);
    formText.value = "";
    };  
    e.preventDefault();
  });
}
window.addEventListener("load", memo);