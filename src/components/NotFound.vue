<template>
    <div>
      <div class="not-found-display">
        <h1 id="notfound_code">404</h1>
        <h2 id="notfound_message">PAGE NOT FOUND</h2>
        <router-link to="/top" class="top-back-link">Topページへ</router-link>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.top-back-link {
  font-weight: bold;
  margin-top: 30px;
  width: 30%;
  border-bottom: solid 2px #cf5271;
  color: #cf5271;
}
.top-back-link:hover {
  opacity: 70%;
}
.not-found-display {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px 10px;
}
#notfound_code{
  font-size: 500%;
  margin: 0;
  padding: 0;
}
#notfound_message{
  font-size: 100%;
  margin: 0;
  padding: 0;
}
</style>
