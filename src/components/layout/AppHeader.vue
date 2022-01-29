<template>
  <header>
    <button class="close">
      <img alt="close" src="../../assets/ico-close.png" />
    </button>
    <p class="title-help">구해주세요!</p>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
  max-width: 750px;
  min-width: 375px;
  width: 100%;
  background-color: white;
  padding: 10px 19px;
  margin: 0 auto;
  position: relative;
}

.close {
  width: 24px;
  height: 24px;
  vertical-align: top;
  position: absolute;
  background-color: #fff;
}

.close img {
  width: 14px;
  height: 14px;
}

.title-help {
  font-size: 16px;
  text-align: center;
}
</style>
