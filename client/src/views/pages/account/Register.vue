<template>
  <Splash :image="image">
    <div class="py-4">
      <h1 class="h1">Register</h1>
    </div>
    <Form
      :fields="fields"
      dispatch="user/register"
      @success="success"
      submitLabel="Register"
      submitClass="w-full"
      class="shadow-lg px-4 py-8 rounded bg-gray-200 bg-opacity-75"
    >
      <router-link
        to="/login"
        class="block mt-3 text-center duration-300 transition hover:text-secondary-700"
        >Login</router-link
      >
    </Form>
  </Splash>
</template>

<script>
import image from '@/assets/images/mountains.jpg';

export default {
  data() {
    return {
      image: image,
      fields: [
        {
          label: 'Username',
          name: 'username',
          required: true,
          focus: true,
        },
        {
          label: 'Email',
          name: 'email',
          required: true,
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
          required: true,
        },
        {
          label: 'Confirm Password',
          name: 'passwordConfirm',
          type: 'password',
          required: true,
        },
      ],
    };
  },
  methods: {
    success(response) {
      const { message } = response;
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$router.push('/login');
    },
  },
};
</script>
