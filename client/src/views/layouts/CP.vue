<template>
  <div class="h-full">
    <Header>
      <template #left>
        <div class="flex items-center justify-between">
          <router-link to="/" class="link"
            ><Icon icon="home" class="text-xl"
          /></router-link>
        </div>
      </template>
      <template #right>
        <div class="flex items-center justify-between">
          <div class="mr-10">
            <div class="flex items-center space-between space-x-4">
              <Avatar :src="user && user.avatar" />
              <router-link class="link" :to="`/cp/users/${user._id}`">{{
                user && user.username
              }}</router-link>
            </div>
          </div>
          <Button type="submit" theme="danger" @click="logout"> Logout </Button>
        </div>
      </template>
    </Header>
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
    <Toast />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Avatar from '@/components/Avatar.vue';

export default {
  components: {
    Header,
    Avatar,
  },
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    async logout() {
      const success = await this.$store.dispatch('user/logout');
      if (success) {
        this.$router.push('/cp/login');
      }
    },
  },
};
</script>
