<script setup lang="ts">
import { useAuthStore } from "../store/index";
import { message } from "ant-design-vue";
import { ref } from "vue";
import { loginSchema } from "../schema/login.schema";
import { useRouter } from "vue-router";
const { push } = useRouter();
const { stateGetMe, login } = useAuthStore();

const form = ref({
  email: "",
  password: "",
});

const validateForm = () => {
  if (!form.value.email || !form.value.password) {
    message.error("ກວດສອບອີເມວ ຫຼື ລະຫັດຜ່ານກ່ອນ.", 3);
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    message.error("ອີເມວບໍ່ຖືກຕ້ອງ", 3);
    return false;
  }
  return true;
};

const loginUser = async () => {
  if (!validateForm()) return;

  await login(form.value);

  if (stateGetMe.errorMessage) {
    message.error({
      content: stateGetMe.errorMessage,
      duration: 3,
    });
  } else {
    message.success({
      content: "ຍີນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ.",
      duration: 3,
    });
    form.value.email = "";
    form.value.password = "";
  }
};
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center bg-gray-200 items-center">
    <img
          src="/public/logo_beer.jpg"
          alt=""
          srcset=""
          class="ring-1 ring-slate-200 shadow-md w-[130px] h-[130px] mb-4 -mt-6 rounded-full"
        />
    <div
      class="flex flex-col w-[470px] h-[420px] bg-gray-100 rounded-md shadow-md justify-center p-6"
    >
      <div class="flex-col flex items-center px-4">
        
        <h1 class="text-lg -mt-[5.5rem]">ກຸ້ຄືນລະຫັດຜ່ານ</h1>
        <h2 class="text-[12px] text-gray-600">
            ໃສ່ທີ່ຢູ່ອີເມວຂອງທ່ານຢູ່ລຸ່ມນີ້ ແລ້ວພວກເຮົາຈະສົ່ງລະຫັດ OTP ໄປຫາທ່ານເພື່ອກູ້ຄືນລະຫັດຜ່ານຂອງທ່ານ.
        </h2>
      </div>
      <div class="p-4">
        <a-form
          :model="form"
          name="basic"
          class="myfont"
          :rules="loginSchema"
        >
          <a-form-item
            name="email">
            <span class="">ທີ່ຢູ່ອີເມວ</span>
            <a-input
              v-model:value="form.email"
              placeholder="ປ້ອນທີ່ຢູ່ອີເມວຂອງທ່ານ"
            />
          </a-form-item>
          <a-form-item class="mt-8">
              <a-button
              type="primary"
              @click="push({name: 'confirmPassword'})"
              html-type="submit"
              class="w-full btn"
              >
              ກູ້ຄືນ
            </a-button>
        </a-form-item>
        <span @click="push({name: 'login'})" class="text-blue-400 hover:text-sky-600 cursor-pointer">ເຂົ້າສູ່ລະບົບດຽວນີ້ບໍ່ ?</span>
        </a-form>
      </div>
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
