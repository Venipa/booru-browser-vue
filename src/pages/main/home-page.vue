<template>
  <div class="post-grid">
    <d-posts></d-posts>
    <d-content></d-content>
  </div>
</template>

<script>
import DContent from "@/components/DanbooruContent";
import DPosts from "@/components/DanbooruPosts";
import { Options, Vue } from "vue-class-component";
@Options({
  components: { DContent, DPosts },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.post-grid {
  @apply grid;
  grid-template-columns: 240px 1fr;
}
</style>