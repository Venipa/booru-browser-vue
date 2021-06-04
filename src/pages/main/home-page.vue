<template>
  <div class="post-grid h-full overflow-hidden">
    <d-posts :posts="posts"></d-posts>
    <d-content :post="activePost"></d-content>
  </div>
</template>

<script>
import DContent from "@/components/BooruContent.vue";
import DPosts from "@/components/BooruPosts.vue";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  components: { DContent, DPosts },
  subscriptions() {
    return {
      posts: this.$akita.queries.postsQuery.selectAll(),
      activePost: this.$akita.queries.postsQuery.selectActive(),
    };
  },
  async mounted() {
    const posts = await this.$booru.active().get(1);
    this.$akita.stores.posts.upsertMany(posts);
  },
});
</script>

<style lang="scss">
.post-grid {
  @apply grid;
  grid-template-columns: minmax(320px, 480px) 1fr;
}
</style>