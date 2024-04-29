<template>
  <div class="Gcard card">
    <div class="cardTitle">
      <slot name="title"></slot>
    </div>
    <div class="cardBody">
      <slot name="body"> </slot>
    </div>

    <div class="cardActions">
      <slot name="actions"> </slot>
    </div>
  </div>
</template>

<style scoped>
.Gcard {
  max-width: 100%;
  height: 100%;
  min-width: fit-content;
  min-height: fit-content;

  display: grid;
  grid-template-rows: 1.5fr 6fr 1.5fr;

  box-shadow: 0 2rem 2rem rgba(0,0,0,.6);
  /* box-shadow: 0px 5px 10px 0px rgba(0,255,255,0.7);   */
}

.cardBody {
  margin: 0 5%;
  background-color: var(--card-surface);
  border-radius: 20px;
}

.cardActions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
