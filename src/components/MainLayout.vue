<template>
  <w-flex justify-center class="lh5">
    <w-form class="xs10 pa1 mt12" style="border: 1px solid darkblue; border-radius: 5px; height: 25%;"
      @submit="onFormSubmit">
      <w-input v-model="currentPost.header" class="mt5" label="Заголовок статьи" :validators="[validators.required]"
        style="font-size: 16px;"></w-input>

      <w-textarea v-model="currentPost.body" class="mt5" label="Текст статьи" :validators="[validators.required]"
        style="font-size: 16px;">
      </w-textarea>

      <w-flex justify-center>
        <w-button xl class="mt5" type="submit" style="font-size: 24px;">Добавить запись</w-button>
      </w-flex>
    </w-form>
  </w-flex>
  <w-flex column align-center class="mt5">
    <w-card v-for="post in posts" class="xs10 pa1 mb5" :title="`<b>${post.header}</b>`"
      style="border-radius: 5px; height: 30%;">
      <i>{{ post.body.slice(0, 100) }} {{ post.body.length > 100 ? '...' : '' }}</i>
      <template #actions>
        <w-flex align-left>
          <b>Создан: </b>
          {{ new Date(post.date_create).toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          }) }}
        </w-flex>
        <w-flex align-left>
          <b>Изменен: </b>
          {{ new Date(post.date_update).toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          }) }}
        </w-flex>

        <div class="spacer"></div>
        <w-button class="mr2"
          @click="dialog.show = true; editedPost = Object.assign({}, posts.find(i => i.id === post.id))">Редактировать</w-button>
        <w-button class="mr2" bg-color="error" @click="deletePost(post.id)">Удалить</w-button>
      </template>
    </w-card>
  </w-flex>

  <w-dialog v-model="dialog.show" :title="editedPost.header" persistent width="50%">
    <w-input v-model="editedPost.header" class="mt5" label="Заголовок статьи" :validators="[validators.required]"
      style="font-size: 16px;"></w-input>

    <w-textarea v-model="editedPost.body" class="mt5" label="Текст статьи" :validators="[validators.required]"
      style="font-size: 16px;">
    </w-textarea>
    <template #actions>
      <w-flex align-left>
        <b>Создан: </b>
        {{ new Date(editedPost.date_create).toLocaleDateString("ru", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }) }}
      </w-flex>
      <w-flex align-left>
        <b>Изменен: </b>
        {{ new Date(editedPost.date_update).toLocaleDateString("ru", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }) }}
      </w-flex>
      <div class="spacer" />
      <w-button class="mr2" @click="dialog.show = false; editedPost = {};" bg-color="error">
        Не сохранять
      </w-button>
      <w-button @click="dialog.show = false; savePost(editedPost)" bg-color="success">
        Сохранить
      </w-button>
    </template>
  </w-dialog>
</template>

<script>
import PostService from '../services/posts.service';
import * as _ from 'ramda';

export default {
  created() {
    this.postService = new PostService();
  },

  mounted() {
    this.loadPosts();
  },

  data() {
    return {
      validators: {
        required: value => !!value || 'Поле должно быть заполнено'
      },
      posts: [],
      currentPost: {
        header: '',
        body: ''
      },
      editedPost: {},
      dialog: { show: false },
    }
  },

  methods: {
    async loadPosts() {
      this.posts = await this.postService.getPosts();
    },

    async onFormSubmit() {
      await this.postService.createPost(this.currentPost);
      this.loadPosts();
    },

    async deletePost(postId) {
      await this.postService.deletePost(postId);
      this.loadPosts();
    },

    async savePost(editedPost) {
      await this.postService.updatePost(_.pick(['header', 'body'], editedPost), editedPost.id);
      this.loadPosts();
    }
  },

}
</script>

<style scoped></style>