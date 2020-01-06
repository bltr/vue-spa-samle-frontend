<template>
  <div class="vh-100" data-cy="auth-view">
    <header class="text-center h-25 d-flex flex-column justify-content-center">
      <h1 class="text-secondary">DenegUchet</h1>
      <p class="lead">personal finance accounting service</p>
    </header>
    <main>
      <div class="card col-md-5 mx-auto px-0">
        <div class="card-header">
          <ul class="nav justify-content-around">
            <li class="nav-item">
              <button
                class="btn btn-link text-decoration-none text-uppercase"
                @click="showLoginForm"
                :disabled="loginDisabled"
              >
                login
              </button>
            </li>
            <li class="nav-item">
              <button
                class="btn btn-link text-decoration-none text-uppercase"
                @click="showRegisterForm"
                :disabled="registerDisabled"
              >
                register
              </button>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <component :is="currentForm"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import LoginForm from '@/components/auth/LoginForm'
  import RegisterForm from '@/components/auth/RegisterForm'

  export default {
    name: "AuthView",

    components: {LoginForm, RegisterForm},

    data() {
      return {
        currentForm: LoginForm
      }
    },

    computed: {
      loginDisabled() {
        return this.currentForm === LoginForm
      },
      registerDisabled() {
        return this.currentForm === RegisterForm
      }
    },

    methods: {
      showLoginForm() {
        this.currentForm = LoginForm
      },
      showRegisterForm() {
        this.currentForm = RegisterForm
      }
    }
  }
</script>
