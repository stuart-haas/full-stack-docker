<template>
  <Content title="Users">
    <template #header>
      <Button theme="secondary" tag="router-link" to="/cp/users/register"
        >Register User</Button
      >
    </template>
    <Panel>
      <Table
        :data="data"
        :fields="fields"
        :options="{ orderBy: 'username', sort: 'desc' }"
      />
    </Panel>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      fields: [
        {
          label: 'Avatar',
          name: 'avatar',
          tag: 'img',
          attrs: {
            src: 'avatar',
            class: 'w-8 h-8 rounded-full',
          },
        },
        {
          label: 'Username',
          name: 'username',
        },
        {
          label: 'Email',
          name: 'email',
        },
        {
          label: 'Role',
          name: 'role',
        },
        {
          label: 'Active Since',
          name: 'createdAt',
          format: {
            filter: 'date',
          },
        },
        {
          value: 'Edit',
          name: 'edit',
          tag: 'router-link',
          param: '_id',
          boolQuery: `item['role'] === 'superadmin' && ${
            this.$store.state.user.user.role !== 'superadmin'
          }`,
          attrs: {
            class: 'text-secondary-500',
            to: '/cp/users/:param',
          },
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTable(this.users, this.fields, {
        active: {
          name: '_id',
          value: this.$store.state.user.user && this.$store.state.user.user._id,
        },
      });
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const users = await this.$store.dispatch('get', { api: 'user' });
      if (users) {
        this.users = users;
      }
    },
  },
};
</script>
