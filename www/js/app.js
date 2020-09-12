// This is a JavaScript file
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
    }else{
      document.querySelector('#navigator').pushPage('main.html', { animation: 'fade' });
    }
  }
});

// ユーザ登録/ログイン処理です
const login = () => {
  // 入力された情報です
  const userName = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // ユーザを作成します
  const user = new ncmb.User();
  user
    .set("userName", userName)
    .set("password", password);

    // 登録処理を実行します
    user.signUpByAccount()
      .then(() => {
      // 成功したらログイン処理を行います
      console.log("登録成功");
      return ncmb.User.login(userName, password)
    })
    .catch((err) => {
      // 失敗したらログイン処理を行います
      console.log("登録失敗。ログイン試行開始")
      return ncmb.User.login(userName, password)
    })
    .then((user) => {
      // ログイン成功したらメイン画面に遷移します
      console.log("ページ移動")
      document.querySelector('#navigator').pushPage('main.html', {animation: 'fade'});
    })
    .catch((err) => {
      // 失敗したらアラートを出します
      ons.notification.alert('Login failed.')
    });
};

// ログアウト処理です
const logout = () => {
  // 確認ダイアログを出します
  ons.notification.confirm({
    message: 'Are you sure?'
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
    // 処理完了したら登録/ログイン画面に遷移します
    document.querySelector('#navigator').pushPage('register.html', {animation: 'fade'});
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

// 画像クリック時にダイアログを出現させる
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

