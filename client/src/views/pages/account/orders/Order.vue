<template>
  <Content title="Your Order">
    <template #header>
      <Button v-if="id" class="mt-3" theme="danger" @click="cancel">
        Cancel
      </Button>
    </template>
    <div v-for="(item, index) in items" :key="index">
      <p>{{ item.product.name }}</p>
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      order: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    items() {
      return this.order.items;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const user = this.$store.state.user.user._id;
      const id = this.$route.params.id;
      const param = `${user}/${id}`;
      if (param) {
        const order = await this.$store.dispatch('get', {
          api: 'order',
          param,
        });
        this.order = order;
      }
    },
    async cancel() {
      if (!window.confirm('Are you sure?')) return;
      // cancel order
    },
  },
};
</script>
