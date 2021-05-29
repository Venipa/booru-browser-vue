<template>
  <div class="d-posts" v-if="posts">
    <div class="d-posts-content">
      <div class="bg-black bg-opacity-50 text-white flex w-full items-center gap-2 px-2 py-3 cursor-pointer hover:bg-opacity-70" v-for="p in posts" :key="p.id" :class="{ 'bg-purple-800': selectedPostId === p.id }" @click="() => selectPost(p.id)">
        <div class="flex">
          <img v-if="hasThumbnail" class="w-24 h-24 rounded object-cover" :class="{ 'filter-blur': !isSafeRating(p.rating) }" :src="p.thumbnail" @error="hasThumbnail = false" alt="Thumbnail">
          <div v-else class="w-24 h-24 bg-white rounded"></div>
        </div>
        <div class="flex flex-col leading-none self-start my-1 flex-1">
          <div>{{p.id}}</div>
          <div>{{p.rating}}</div>
        </div>
        <div class="flex flex-col self-start my-1">
          <template v-if="p.score && p.score > 0">
            <div v-for="(s, index) in (p.score / 2 + 1)" :key="index">⭐</div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div class="d-posts justify-center items-center" v-else>
    No Posts
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { EntityStore } from "node_modules/@datorama/akita";
import { map } from "rxjs/operators";
export default defineComponent({
  props: {
    posts: {
      type: Array,
      default: () => null,
    },
  },
  subscriptions() {
    return {
      selectedPostId: this.$akita.queries.postsQuery.selectActive().pipe(map((x: any) => x && x.id)),
    };
  },
  data() {
    return {
      hasThumbnail: true,
    };
  },
  methods: {
    isSafeRating(rating: string) {
      return ["safe"].includes(rating);
    },
    selectPost(id: string) {
      (this.$akita.stores.posts as EntityStore<any>).setActive(id);
    },
  },
});
</script>

<style lang="scss" scoped>
.d-posts {
  @apply flex flex-col bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg h-full pt-toolbar -mt-toolbar overflow-hidden;
  &-content {
    @apply overflow-y-auto;
  }
}
</style>