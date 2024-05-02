<template>
  <div class="mainLayout">
    <header class="mainLayout__header">
      <slot name="header"> </slot>
    </header>

    <div class="mainLayout__side">
      <slot name="side"> </slot>
    </div>

    <main class="mainLayout__body">
      <slot name="body"> </slot>
    </main>

    <div class="mainLayout__footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mainLayout {
  width: 100vw;
  height: 100vh;
  //   background-color: red;
  position: relative;

  &__header {
    display: block;
    height: 4rem;
    width: 100%;
    background-color: black;
    text-align: center;
    color: #fff;
  }

  &__footer {
    height: 4rem;
    text-align: center;
    background-color: blue;
    color: #fff;
  }

  &__side {
    display: inline-block;
    background-color: yellow;
    min-width: 10rem;
    width: 40%;
    // height: 100%;
  }

  &__body {
    display: inline-block;

    width: 60%;
    // background-color: green;
    padding: 2rem;
    border: solid 1px black;
  }
}
</style>
