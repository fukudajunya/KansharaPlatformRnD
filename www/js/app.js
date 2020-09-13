// Mobile Backend config
const applicationKey = 'f7567c6df41b6c1f2ac9d37ff4c726214f70d4e3a94b51df5859b27b5bb8053f';
const clientKey = '32b5cf5d98fbc11a9cf9ad16499e7b0f7c46e7a78404582d150ec4caf12f89a5';
const applicationId = 'rwIDQxFJnkviPVqJ';
const ncmb = new NCMB(applicationKey, clientKey);
ons.ready(function () {
  console.log("Onsen UI is ready!");
});

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}

document.addEventListener('init', function (event) {
  var page = event.target;
  const user = ncmb.User.getCurrentUser();
  if (page.id === 'main') {
    if (!user) {
      // ログインページを表示
      document.querySelector('#navigator').pushPage('register.html', { animation: 'fade' });
    } else {
      document.querySelector('#navigator').pushPage('main.html', { animation: 'fade' });
    }
  }
});

// ユーザ登録/ログイン処理
const login = () => {
  const userName = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = new ncmb.User();
  user
    .set("userName", userName)
    .set("password", password);

  // 登録処理
  user.signUpByAccount()
    .then(() => {
      // 初回ログイン
      console.log("登録成功");
      return ncmb.User.login(userName, password)
    })
    .catch((err) => {
      // 通常時ログイン
      console.log("ログイン試行開始")
      return ncmb.User.login(userName, password)
    })
    .then((user) => {
      // ログイン後、ページ遷移
      console.log("ページ移動")
      document.querySelector('#navigator').pushPage('main.html', { animation: 'fade' });
    })
    .catch((err) => {
      ons.notification.alert({
        title: 'ログイン失敗',
        message: 'ユーザー名またはパスワードが間違っています。'})
    });
};

// ログアウト処理
const logout = () => {
  ons.notification.confirm({
    title: '',
    message: 'ログアウトしますか？'
  })
    .then((id) => {
      // id == 1 はOKボタンを押した場合です
      if (id != 1) {
        throw 1;
      }
      // ログアウト処理
      return ncmb.User.logout();
    })
    .then(() => {
      // 登録/ログイン画面に遷移
      document.querySelector('#navigator').pushPage('register.html', { animation: 'fade' });
    })
    .catch(() => {
      // 確認ダイアログでCancelを選んだ場合
    })
};

// 入力した文字をデータストアに格納する
function send_to_datastore(text) {
  var DataStore = ncmb.DataStore('text');
  var dataStore = new DataStore;
  dataStore.set('memo', text);
  dataStore.save().then(function () {
    alert('saved!');
  });
}

/* アイテム一覧 */
// 画像クリック時
function imageClick() {
  var dialog = document.getElementById('my-dialog');
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function (dialog) {
        dialog.show();
      });
  }
}

// ダイアログを閉じる
function hideDialog(id) {
  document
    .getElementById(id)
    .hide();
}
/* 持ち物確認 */
// 準備完了
function checkComplete() {
  ons.notification.alert({
    title: '',
    message: '行ってらっしゃい！'
  });
}

/* 振り動画 */
// youtubeを開く
function openURL(urlText){
  var url = urlText;
  window.open = cordova.InAppBrowser.open;
  window.open(url, "_system", 'location=yes');
}