<template>
  <div>
    <div class="base-box seisankun">
      <div id="title-container">
        <p class="title-description">旅行の立替精算を自動で計算！</p>
        <div class="title">
          <img class="seisankun-logo" src="@/assets/logo.003.png"><h1>Seisan-kun</h1>
        </div>
      </div>
      <div id="start-container">
        <p>こんな体験ありませんか？</p>
        <div class="example-container">
          <div class="example">
            <p>みんなで楽しく旅行！</p>
            <p>でも最後に立て替えた分を精算するのが面倒…</p>
          </div>
        </div>
        <p>そんな問題を「Seisan-kun」は解決します！</p>
        <router-link class="login-button" to="/top">ログインしてはじめる</router-link>
      </div>
      <div id="introduction-container">
        <p>最終的に誰が誰にいくら</p>
        <p>払えば良いのかが一目でわかる！</p>
        <img class="description-img description-img-type1" src="@/assets/seisankun-description1.png">
      </div>
      <div id="how-to-use-container">
        <h2>~ 使い方 ~</h2>
        <p>簡単 <span style="font-size:200%; font-weight: bold;">3</span>ステップ</p>
        <p>※ご利用には会員登録が必要です</p>
        <div id="step-container">
          <div class="step left">
            <p class="step-title">1.旅行の作成</p>
            <img class="description-img description-img-type2" src="@/assets/seisankun-description2.png">
          </div>
          <div class="step">
            <p class="step-title">2.仲間の招待</p>
            <img class="description-img description-img-type2" src="@/assets/seisankun-description3.png">
          </div>
          <div class="step">
            <p class="step-title">3.支払いの追加</p>
            <img class="description-img description-img-type2" src="@/assets/seisankun-description1.png">
          </div>
        </div>
      </div>
      <div class="how-to-use-details">
        <h3>1.旅行の作成</h3>
        <div class="step-details">
          <div class="step-details-left">
            <p>赤いボタンを押下</p>
            <img class="description-img description-img-type3" src="@/assets/seisankun-description4.png">
          </div>
          <p class="step-details-center">→</p>
          <div class="step-details-right">
            <p>旅行名/旅行日を指定して作成</p>
            <img class="description-img description-img-type3" src="@/assets/seisankun-description5.png">
          </div>
        </div>
      </div>
      <div class="how-to-use-details">
        <h3>2.仲間の招待</h3>
        <div class="step-details">
          <div class="step-details-left">
            <p>参加者追加ボタン押下</p>
            <img class="description-img description-img-type3" src="@/assets/seisankun-description6.png">
          </div>
          <p class="step-details-center">→</p>
          <div class="step-details-right">
            <p>招待URLをコピーして友達にシェア</p>
            <img class="description-img description-img-type3" src="@/assets/seisankun-description3.png">
          </div>
        </div>
      </div>
      <div class="how-to-use-details">
        <h3>3.支払いの追加</h3>
        <div class="step-details">
          <div class="step-details-left">
            <p>支払いの追加ボタン押下</p>
            <img class="description-img description-img-type3" src="@/assets/seisankun-description6.png">
          </div>
          <p class="step-details-center">→</p>
          <div class="step-details-right">
            <p>誰が/誰に/いくら立替たのかを入力して追加</p>
            <img class="description-img description-img-type3" src="@/assets/seisankun-description7.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#title-container {
  display: flex;
  flex-direction: column;
}

.title-description {
  font-size: 120%;
  padding-left: 20px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.seisankun {
  color: #707070;
}

.seisankun-logo {
  width: 16%;
  max-width: 80px;
}

.example-container {
  border: solid 3px #707070;
  padding: 5px;
  margin: 10px 0px;
}

.example {
  border: solid 1px #707070;
  padding: 5px;
}

.login-button {
  padding: 10px 30px;
  border-radius: 15px;
  color: #fff;
  background-color: #1db8a3;
  letter-spacing: 5px;
  display: inline-block;
  margin-top: 10px;
}

.login-button:hover {
  border: solid 1px #1db8a3;
  color: #1db8a3;
  background-color: #fff;
}

#introduction-container {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
}

.description-img {
  box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.2)
}

.description-img-type1 {
  width: 70%;
  margin-top: 10px;
}

.description-img-type2 {
  width: 100%;
}

.description-img-type3 {
  width: 100%;
}

#how-to-use-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

#step-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  align-items: flex-end;
}

.step {
  width: 30%;
  margin-left: 20px;
}

.how-to-use-details {
  text-align: left;
  margin-top: 20px;
}

.step-details {
  display: flex;
  text-align: center;
  align-items: flex-end;
}

.step-details-left {
  width: 45%;
  margin-right: 10px;
}

.step-details-right {
  width: 45%;
  margin-left: 10px;
}

.step-details-center {
  align-self: center;
}

.left {
  margin:0;
}

</style>
