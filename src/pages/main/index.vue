<template>
  <default-layout>
    <div class="main-grid">
      <sidebar></sidebar>
      <router-view></router-view>
    </div>
  </default-layout>
</template>

<script>
import Sidebar from "../../components/Sidebar";
import Toolbar from "../../components/Toolbar";
import DContent from "../../components/DanbooruContent";
import DPosts from "../../components/DanbooruPosts";
import { Options, Vue } from "vue-class-component";
import DefaultLayout from "../layouts/default.vue";
@Options({
  components: { DefaultLayout, Sidebar, Toolbar, DContent, DPosts },
})
export default class extends Vue {}
</script>

<style lang="scss">
.main-grid {
  @apply h-full w-full grid;
  grid-template-columns: 240px 1fr;
}
</style>
