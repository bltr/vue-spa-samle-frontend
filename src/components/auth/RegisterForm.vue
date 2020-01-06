<template>
  <form @submit.prevent="register" data-cy="register-form">
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

    <div class="form-group">
      <label for="password_confirmation" class="text-capitalize">password confirmation</label>
      <input
        id="password_confirmation"
        type="password"
        class="form-control"
        :class="v.class.password_confirmation"
        v-model="form.password_confirmation"
        @input="validate('password_confirmation')"
        @blur="validate('password_confirmation')"
      >
      <div class="invalid-feedback" data-cy="password_confirmation-feedback" v-text="v.msg.password_confirmation"></div>
    </div>

    <button data-cy="register-button" class="btn btn-primary btn-block text-capitalize" :disabled="isRequested">
      <span v-if="isRequested" class="spinner-border spinner-border-sm" data-cy="register-spinner"> </span>
      <span v-if="!isRequested">register</span>
    </button>

    <div data-cy="register-alert" class="alert alert-danger mt-4" v-if="requestError" v-text="requestError"></div>
  </form>
</template>

<script>
  import validator from "@/js/utils/validator"
  import router from "@/js/router"

  export default {
    name: "RegisterForm",

    mixins: [validator],

    data() {
      return {
        form: {
          email: null,
          password: null,
          password_confirmation: null,
        },

        rules: {
          email: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
          ],
          password: [
            v => !!v || 'Password is required',
            v => v.length >= 8 || 'Password must be more than 8'
          ],
          password_confirmation: [
            v => !!v || 'Password must be confirmed',
            (v, form) => v === form.password || 'Password confirmation does not match'
          ]
        },

        requestError: null,
        isRequested: false,
      }
    },

    methods: {
      register() {
        if (!this.valid()) {

          return
        }

        this.isRequested = true
        this.$store.dispatch('register', this.form)
          .then(() => this.$router.push('/profile'))
          .catch(error => {
            this.requestError = error.message
            this.isRequested = false
          })
      }
    }
  }
</script>
