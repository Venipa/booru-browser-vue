<template>
  <div class="h-full w-full flex flex-col z-10">
    <toolbar></toolbar>
    <div class="h-full w-full">
      <slot></slot>
    </div>
    <div class="app-background"></div>
  </div>
</template>

<script>
import Toolbar from "../../components/Toolbar";
export default {
  components: { Toolbar },
};
</script>
