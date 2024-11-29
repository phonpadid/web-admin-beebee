
<script setup lang="ts">

// import { ref } from "vue";
// import { message } from "ant-design-vue";
// import { useRouter } from "vue-router";

// const { push } = useRouter();
// const otp = ref(["", "", "", "", "", ""]);
// const phoneMasked = "admin@gmail.com";

// // Handle individual OTP input
// const handleOTPInput = (event, index) => {
//   const value = event.target.value;
//   const key = event.inputType || event.key;

//   if (value.length === 1) {
//     // Insert single character and move focus forward if within bounds
//     otp.value[index] = value;
//     if (index < otp.value.length - 1) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   } else if (key === "deleteContentBackward" || key === "Backspace") {
//     // Clear current input and move focus backward if within bounds
//     otp.value[index] = "";
//     if (index > 0) {
//       document.getElementById(`otp-${index - 1}`).focus();
//     }
//   } else if (value === "") {
//     otp.value[index] = ""; // Clear the current input if it's empty
//   }
// };

// Handle paste event to fill all OTP fields at once
// const handleOTPPaste = (event) => {
//   const pastedData = event.clipboardData.getData("Text").slice(0, otp.value.length);
//   pastedData.split("").forEach((char, index) => {
//     otp.value[index] = char;
//   });
//   event.preventDefault(); // Prevent the default paste behavior
// };

// const resendOTP = () => {
//   console.log("code:", otp.value.join("")); // Display OTP as a single string
//   message.success("OTP has been resent.");
//   // Implement your resend OTP logic here.
// };
</script>

<template> 
  <div class="otp-container flex flex-col justify-center items-center h-screen bg-gray-200">
    <!-- <div class="otp-box bg-white rounded-md shadow-md p-6 text-center">
      <h1 class="text-2xl font-bold mb-2">OTP Verification</h1>
      <p class="text-gray-600 mb-6">
        ໃສ່ລະຫັດ OTP ທີ່ທ່ານໄດ້ຮັບຈາກອີເມວ
        <span class="font-semibold">{{ phoneMasked }}</span>
      </p>

      OTP Input Boxes
      <a-form :model="form" name="basic" class="myfont" :rules="loginSchema">
        <div class="otp-inputs flex space-x-2 md:gap-7 justify-center mb-4">
          <input
            v-for="(digit, index) in otp"
            :key="index"
            v-model="otp[index]"
            @input="(e) => handleOTPInput(e, index)"
            @paste="handleOTPPaste"
            type="text"
            maxlength="1"
            :id="`otp-${index}`"
            class="otp-input w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-xl font-semibold"
          />
        </div>
        <div class="">
          <a-form-item
            class="form-item-centered"
            label="ສ້າງລະຫັດຜ່ານໃໝ່"
            name="new_password"
          >
            <a-input-password placeholder="ໃສ່ລະຫັດຜ່ານໃໝ່ຂອງທ່ານ" />
          </a-form-item>
          <a-form-item
            class="form-item-centered"
            label="ຢືນຢັນລະຫັດຜ່ານ"
            name="confirm_password"
          >
            <a-input-password placeholder="ຢືນຢັນລະຫັດຜ່ານ" />
          </a-form-item>
        </div>
      </a-form>
       Resend OTP Link 
      <a-form-item class="mt-8">
        <a-button
          type="primary"
          @click="resendOTP"
          html-type="submit"
          class="w-full btn"
        >
          ປ່ຽນລະຫັດຜ່ານ
        </a-button>
      </a-form-item>
      <span @click="push({name: 'login'})" class="text-blue-400 hover:text-sky-600 cursor-pointer">ເຂົ້າສູ່ລະບົບດຽວນີ້ບໍ່ ?</span>
    </div> -->
  </div>
</template>

<style scoped>

.otp-box {
  width: 470px;
  max-width: 90%;
  background-color: #fff;
}

.otp-input {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.25rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}
</style>
