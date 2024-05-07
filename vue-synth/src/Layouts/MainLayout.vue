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

    <!-- <div class="mainLayout__body"> -->
    <div class="mainLayout__components">
      <slot name="components"> </slot>
    </div>

    <div class="mainLayout__mainDisplay">
      <slot name="display"> </slot>
    </div>
    <!-- </div> -->

    <div class="mainLayout__piano">
      <slot name="piano"> </slot>
    </div>

    <div class="mainLayout__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
<<<<<<< HEAD
  $header-h: 5vh;
  $body-h: 70vh;
  $footer-h: 5vh;
  $piano-h: 20vh;
=======
$header-h: 5vh;
$body-h: 70vh;
$footer-h: 5vh;
$piano-h: 20vh;
>>>>>>> 9159e72 (added scroll controls and main wave sound)

  .mainLayout {
    box-sizing: border-box;
    background-color: #222222;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;

    display: grid;
    grid-template-columns: [cards-start] minmax(30rem, 2fr) [cards-end visualization-start] minmax(40rem, 3fr);

    grid-template-rows: [header-start] minmax(2rem, .5fr) [header-end body-start] minmax(7rem, 7fr) [body-end piano-start] minmax(2rem, 2fr) [piano-end footer-start] minmax(.5rem, .5fr);

    &__header {
      background-color: black;
      color: white;
      height: $header-h;
      text-align: center;
    }

    &__header {
      grid-column: 1 / -1;
      grid-row: header-start / header-end;
    }



    &__components {
      grid-row: body-start / body-end;
      grid-column: cards-start / cards-end;
      background-color: white;
      overflow: hidden;
    }

    &__mainDisplay {
      grid-row: body-start / body-end;
      grid-column: visualization-start / visualization-end;
      background-color: grey;
      overflow: hidden;
      resize: both;
    }

    &__piano {
      grid-row: piano-start / piano-end;
      grid-column: 1/ -1;
      // height: $piano-h;
    }

    &__footer {
      grid-row: footer-start / footer-end;
      grid-column: 1/ -1;
      // height: $footer-h;
      background-color: blueviolet;
    }
  }

<<<<<<< HEAD
  // .mainLayout {
  //   box-sizing: border-box;
  //   background-color: #222222;
  //   width: 100vw;
  //   height: 100vh;
  //   max-width: 100vw;
  //   max-height: 100vh;
  //   overflow: hidden;
=======
  &__components {
    background-color: white;
    overflow: hidden;
    // display: grid;

    // grid-template-columns: 1.5fr 1fr;
  }
>>>>>>> b5386c1 (correctly populated layout)

  //   &__header {
  //     background-color: black;
  //     color: white;
  //     height: $header-h;
  //     text-align: center;
  //   }

  //   &__body {
  //     display: grid;
  //     grid-template-columns: [cards-start] minmax(30rem, 2fr) [cards-end visualization-start] minmax(40rem, 3fr);
  //     height: $body-h;
  //   }

  //   &__components {
  //     background-color: white;
  //     overflow: hidden;
  //     // display: grid;

  //     // grid-template-columns: 1.5fr 1fr;
  //   }

  //   &__mainDisplay {
  //     background-color: grey;
  //     overflow: hidden;
  //     resize: both;
  //   }

  //   &__piano {
  //     height: $piano-h;
  //   }

  //   &__footer {
  //     height: $footer-h;
  //     background-color: blueviolet;
  //   }
  // }

</style>
