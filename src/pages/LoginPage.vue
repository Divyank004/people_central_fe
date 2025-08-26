<template>
  <div class="login-page">
    <div class="floating-shapes">
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
    </div>

    <div class="login-container">
      <div class="logo-section">
        <div class="logo">
          <span class="logo-text">PC</span>
        </div>
        <h1 class="company-name">People Central</h1>
        <p class="tagline">Welcome back! Please sign in to your account.</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group" :style="{ transform: emailFocused ? 'scale(1.02)' : 'scale(1)' }">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            required
            @focus="emailFocused = true"
            @blur="emailFocused = false"
            :class="{ error: validationErrors.email }"
          />
          <span v-if="validationErrors.email" class="error-message">{{
            validationErrors.email
          }}</span>
        </div>

        <div
          class="form-group"
          :style="{ transform: passwordFocused ? 'scale(1.02)' : 'scale(1)' }"
        >
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
            @focus="passwordFocused = true"
            @blur="passwordFocused = false"
            :class="{ error: validationErrors.password }"
          />
          <span v-if="validationErrors.password" class="error-message">{{
            validationErrors.password
          }}</span>
        </div>

        <div class="row justify-between forgot-password">
          <div v-if="loginFailed" class="invalid-credentials">
            <p>Invalid Credentials</p>
          </div>
          <a href="#" @click.prevent="handleForgotPassword">Forgot Password?</a>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="divider"></div>

      <div class="signup-link">
        Don't have an account? <a href="#" @click.prevent="handleSignup">Sign up</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { validate, sanitize, messages } from '../utils/validation';

const userStore = useUserStore();
const router = useRouter();

interface LoginForm {
  email: string;
  password: string;
}
const loginFailed = ref<boolean>(false);
const form = reactive<LoginForm>({
  email: '',
  password: '',
});
const isLoading = ref<boolean>(false);
const emailFocused = ref<boolean>(false);
const passwordFocused = ref<boolean>(false);
const validationErrors = reactive<Record<string, string>>({});

function validateForm(): boolean {
  // Clear previous errors
  Object.keys(validationErrors).forEach((key) => delete validationErrors[key]);

  let isValid = true;

  // Validate email
  const cleanEmail = sanitize.email(form.email);
  if (!validate.required(cleanEmail)) {
    validationErrors.email = messages.required;
    isValid = false;
  } else if (!validate.email(cleanEmail)) {
    validationErrors.email = messages.invalidEmail;
    isValid = false;
  }

  // Validate password
  const cleanPassword = sanitize.input(form.password);
  if (!validate.required(cleanPassword)) {
    validationErrors.password = messages.required;
    isValid = false;
  } else if (!validate.minLength(cleanPassword, 6)) {
    validationErrors.password = messages.minLength(6);
    isValid = false;
  }

  return isValid;
}

async function handleLogin(): Promise<void> {
  loginFailed.value = false;

  if (!validateForm()) {
    return;
  }

  isLoading.value = true;
  try {
    // Sanitize inputs before sending
    const sanitizedCredentials = {
      username: sanitize.email(form.email),
      password: sanitize.input(form.password),
    };

    await userStore.login(sanitizedCredentials);
    await router.push({ path: '/username' });
  } catch (error) {
    loginFailed.value = true;
    console.error('Login error:', error);
  } finally {
    isLoading.value = false;
  }
}

function handleForgotPassword(): void {
  console.log('Forgot password clicked');
  alert('Forgot password flow to be implemented');
}

function handleSignup(): void {
  console.log('Signup clicked');
  alert('Navigate to signup page');
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.login-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  animation: slideIn 0.6s ease-out;
  z-index: 2;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.logo-section {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.logo-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.company-name {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.tagline {
  color: #718096;
  font-size: 14px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
  transition: transform 0.3s ease;
}

.form-group label {
  display: block;
  color: #4a5568;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-group input::placeholder {
  color: #a0aec0;
}

.forgot-password {
  text-align: right;
  margin-bottom: 25px;
}

.forgot-password a {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-password a:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.login-btn:active {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  margin: 50px 0px;
  position: relative;
  color: #a0aec0;
  font-size: 14px;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e2e8f0;
  z-index: 1;
}

.divider span {
  background: white;
  padding: 0 15px;
  position: relative;
  z-index: 2;
}

.social-login {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.signup-link {
  text-align: center;
  color: #718096;
  font-size: 14px;
  margin-top: 80px;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape:nth-child(1) {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.shape:nth-child(3) {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.invalid-credentials {
  color: #dc2525;
}

.error-message {
  color: #dc2525;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-group input.error {
  border-color: #dc2525;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 30px 20px;
    margin: 10px;
  }

  .company-name {
    font-size: 24px;
  }
}
</style>
