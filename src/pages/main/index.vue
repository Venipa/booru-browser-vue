<template>
  <default-layout>
    <div class="main-grid">
      <sidebar></sidebar>
      <router-view></router-view>
    </div>

    <b-server-dialog ref="booruServerDialog"></b-server-dialog>
  </default-layout>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import DefaultLayout from "@/pages/layouts/default.vue";
import BServerDialog from "@/components/BooruServerDialog.vue";
import { defineComponent, ref } from "@vue/runtime-core";
export default defineComponent({
  components: { DefaultLayout, Sidebar, BServerDialog },
  setup() {
    const booruServerDialog = ref<any>(null);
    return { booruServerDialog };
  },
  provide() {
    return {
      openServerDialog: (...args: any[]) => this.booruServerDialog?.open(...args),
    };
  },
});
</script>

<style lang="scss">
.main-grid {
  @apply h-full w-full grid;
  grid-template-columns: 240px 1fr;
}
</style>
