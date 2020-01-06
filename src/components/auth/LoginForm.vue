<template>
  <form @submit.prevent="login" data-cy="login-form">
    <div class="form-group">
      <label for="email" class="text-capitalize">email</label>
      <input
        id="email"
        type="text"
        class="form-control"
        :class="v.class.email"
        v-model="form.email"
        @input="validate('email')"
        @blur="validate('email')"
      >
      <div class="invalid-feedback" data-cy="email-feedback" v-text="v.msg.email"></div>
    </div>

    <div class="form-group">
      <label for="password" class="text-capitalize">password</label>
      <input
        id="password"
        type="password"
        class="form-control"
        :class="v.class.password"
        v-model="form.password"
        @input="validate('password')"
        @blur="validate('password')"
      >
      <div class="invalid-feedback" data-cy="password-feedback" v-text="v.msg.password"></div>
    </div>
    <button data-cy="login-button" class="btn btn-primary btn-block text-capitalize" :disabled="isRequested">
      <span class="spinner-border spinner-border-sm" data-cy="login-spinner" v-if="isRequested"></span>
      <span v-if="!isRequested">login</span>
    </button>

    <div data-cy="alert" class="alert alert-danger mt-4" v-if="requestError" v-text="requestError"></div>
  </form>
</template>

<script>
  import validator from '@/js/utils/validator'

  export default {
    name: "LoginForm",
    mixins: [validator],

    data() {
      return {
        form: {
          email: null,
          password: null
        },

        rules: {
          email: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
          ],
          password: [
            v => !!v || 'Password is required'
          ]
        },

        requestError: null,
        isRequested: false,
      }
    },

    methods: {
      login() {
        if (!this.valid()) {
          return
        }

        this.isRequested = true
        this.$store.dispatch('login', this.form)
          .catch((error) => {
            this.requestError = error.message
            this.isRequested = false
          })
      }
    }
  }
</script>
