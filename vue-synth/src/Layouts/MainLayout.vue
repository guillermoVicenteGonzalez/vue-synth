<template>
  <!-- <div class="mainLayout">
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
  </div> -->
  <div class="mainLayout">
    <header class="mainLayout__header">
      <slot name="header"> </slot>
    </header>

    <div class="mainLayout__body">
      <div class="mainLayout__components">
        <slot name="components"> </slot>
      </div>

      <div class="mainLayout__mainDisplay">
        <slot name="display"> </slot>
      </div>
    </div>

    <div class="mainLayout__piano">
      <slot name="piano"> </slot>
    </div>

    <div class="mainLayout__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
$header-h: 5vh;
$body-h: 60vh;
$footer-h: 5vh;
$piano-h: 30vh;

.mainLayout {
  box-sizing: border-box;
  background-color: #222222;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;

  &__header {
    background-color: black;
    color: white;
    height: $header-h;
    text-align: center;
  }

  &__body {
    display: grid;
    grid-template-columns: 2fr 3fr;
    height: $body-h;
  }

  &__components {
    background-color: white;
    overflow: hidden;
  }

  &__mainDisplay {
    background-color: grey;
    overflow: hidden;
  }

  &__piano {
    height: $piano-h;
  }

  &__footer {
    height: $footer-h;
    background-color: blueviolet;
  }
}
</style>
