<template>
  <div class="post-grid h-full overflow-hidden">
    <d-posts :posts="posts"></d-posts>
    <d-content :post="activePost"></d-content>
  </div>
</template>

<script lang="ts">
import { DanbooruHost } from "@/api/BooruInterface";
import DContent from "@/components/BooruContent";
import DPosts from "@/components/BooruPosts";
import { defineComponent } from "@vue/runtime-core";
import { EntityStore } from "node_modules/@datorama/akita";
export default defineComponent({
  components: { DContent, DPosts },
  subscriptions() {
    return {
      posts: this.$akita.queries.postsQuery.selectAll(),
      activePost: this.$akita.queries.postsQuery.selectActive(),
    }
  },
  async mounted() {
    const testBooru: DanbooruHost = this.$booru.safebooru as any;
    const posts = await testBooru.get(1);
    (this.$akita.stores as EntityStore<any>).posts.upsertMany(posts);
  },
});
</script>

<style lang="scss">
.post-grid {
  @apply grid;
  grid-template-columns: minmax(320px, 480px) 1fr;
}
</style>