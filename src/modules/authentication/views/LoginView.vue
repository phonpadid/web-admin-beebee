<script setup lang="ts">
import { useForm } from "vee-validate";
import { loginSchema } from "../schema/login.schema";
import { useAuthStore } from "../store/index";
import { message } from "ant-design-vue";
import FormInputText from "@/components/form/FormInputText.vue";
import FormInputPassword from "@/components/form/FormInputPassword.vue";
import { ref } from "vue";

const { state, login, form } = useAuthStore();

const { handleSubmit, resetForm } = useForm({
  validationSchema: loginSchema,
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const loginUser = handleSubmit(async (values) => {
  if (!values.email || !values.password) {
    checkEmailPassword();
    return true;
  }

  await login(values);

  if (state.errorMessage) {
    showWarningValidateBackend();
  } else {
    showToastSuccess();
    resetForm();
  }
});

const showToastSuccess = () => {
  message.success({
    content: "ຍີນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ.",
    duration: 3,
  });
};

const checkEmailPassword = () => {
  message.error("ກວດສອບອີເມວ ຫຼື ລະຫັດຜ່ານກ່ອນ.", 3);
};

const showWarningValidateBackend = () => {
  message.error({
    content: state.errorMessage,
    duration: 3,
  });
};
</script>

<template>
  <div class="w-full h-screen flex justify-center bg-gray-100 items-center">
    <div class="w-[1200px] h-[600px] bg-white shadow">
      <a-row>
        <a-col :sm="24" :md="12" :lg="12">
          <div
            class="w-full h-[600px] bg-blue-500 rounded-sm flex flex-col items-center justify-center"
          >
            <div
              class="w-[140px] h-[140px] bg-white rounded-full overflow-hidden"
            >
              <img
                class="w-full h-full object-contain"
                src="/public/logoBeer.png"
                alt=""
              />
            </div>
            <div class="text-center mt-6">
              <h1 class="text-xl text-white">ຮ້ານບັນເທີງ LPB-VT</h1>
              <h2 class="text-base text-white">
                May our customers be happy when they come to our store.
              </h2>
            </div>
          </div>
        </a-col>
        <a-col :sm="24" :md="12" :lg="12">
          <div class="w-full h-[600px] flex flex-col justify-center p-10">
            <!-- <h1 class="text-2xl mb-4">ໂປຣເຈັກຂາວດີ</h1> -->
            <h1 class="text-2xl mb-4">Master VueJs</h1>
            <form @click="loginUser" class="space-y-6 w-full">
              <div class="form-group">
                <label for="email" class="form-label">ອີເມວຜູ້ໃຊ້</label>
                <form-input-text
                  name="email"
                  v-model="form.email"
                  class="form-input"
                  placeholder="ປ້ອນອີເມວຜູ້ໃຊ້"
                  required
                />

                <label for="password" class="form-label">ລະຫັດຜ່ານ</label>
                <form-input-password
                  name="password"
                  v-model="form.password"
                  class="form-input"
                  placeholder="ລະຫັດຜ່ານ"
                  :show-password="showPassword"
                  @toggle-password="togglePasswordVisibility"
                  required
                />
              </div>
              <a-button
                class="w-full"
                type="primary"
                html-type="submit"
                :loading="state.isLoading"
              >
                ເຂົ້າສູ່ລະບົບ
              </a-button>
            </form>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.w-full {
  width: 100%;
}
.min-h-screen {
  min-height: 100vh;
}
.bg-gray-100 {
  background-color: #f7fafc;
}
.p-8 {
  padding: 2rem;
}
.border {
  border-width: 1px;
}
.border-gray-300 {
  border-color: #d2d6dc;
}
.shadow-xl {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.bg-white {
  background-color: #ffffff;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.max-w-md {
  max-width: 28rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.text-2xl {
  font-size: 1.5rem;
}
.font-bold {
  font-weight: 700;
}
.md\:text-3xl {
  font-size: 1.875rem;
}
.space-y-6 > :not(:last-child) {
  margin-bottom: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: #4a90e2;
  outline: none;
}
.text-red-500 {
  color: #f56565;
}
</style>
