<template>
  <div class="post-grid">
    <d-posts></d-posts>
    <d-content></d-content>
  </div>
</template>

<script>
import DContent from "@/components/BooruContent";
import DPosts from "@/components/BooruPosts";
import { Options, Vue } from "vue-class-component";
@Options({
  components: { DContent, DPosts },
})
export default class extends Vue {}
</script>

<style lang="scss">
.post-grid {
  @apply grid;
  grid-template-columns: 240px 1fr;
}
</style>