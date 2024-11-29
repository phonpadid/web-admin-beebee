<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
import ButtonDefault from "@/components/Button/ButtonDefault.vue";
import { useAuthStore } from "../store/index";
import { MeEntity } from "../entity/me.entity";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";
import { ChangePasswordSchema } from "../schema/change-password.schema";

const { changePassword } = useAuthStore();
const { push } = useRouter();
const form = ref();

// Define props and emit events
defineProps({
  openModalChangePassword: Boolean,
});
const emit = defineEmits(["update:openModalChangePassword"]);
const closeModal = () => {
  changePasswordFormState.value = { ...initialFormState }; // Reset form data
  form.value?.resetFields();
  emit("update:openModalChangePassword", false); // Notify parent to set open to false
};

const initialFormState: MeEntity = {
  id: "",
  old_password: "",
  new_password: "",
  confirm_password: "",
};
const loading = ref(false);
const changePasswordFormState = ref<MeEntity>({
  ...initialFormState,
});
const handleOrderSubmit = async () => {
  form.value
    .validate()
    .then(async () => {
      try {
        if (
          changePasswordFormState.value.new_password ===
          changePasswordFormState.value.confirm_password
        ) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          await changePassword(changePasswordFormState.value);
          notification.success({
            message: "Update Success",
            description: "ອັບເດດສຳເລັດ",
          });
          loading.value = false;
          push({ name: "getMe.index" });
        } else {
          notification.error({
            message: "ຜິດພາດ.",
            description: "ການຢືນຢັນລະຫັດບໍ່ຖືກຕ້ອງ.",
          });
        }
      } catch (error: any) {
        if (error.status === 400) {
          notification.error({
            message: "ຜິດພາດ",
            description: "ລະຫັດຜ່ານເກົ່າບໍ່ຖືກຕ້ອງ.",
          });
        }
      }
    })
    .catch((error: unknown) => {
      console.log("error", error);
    });
};

//disable button submit
const isDisabled = computed(() => {
  const { old_password, new_password, confirm_password } =
    changePasswordFormState.value;
  return (
    loading.value || // Disable if loading
    !old_password || // Disable if old password is empty
    !new_password || // Disable if new password is empty
    !confirm_password || // Disable if confirm password is empty
    new_password !== confirm_password // Disable if passwords do not match
  );
});
</script>

<template>
  <div class="change-password ring-1 bg-slate-400">
    <a-modal
      :visible="openModalChangePassword"
      @cancel="closeModal"
      @close="closeModal"
      :maskClosable="false"
      width="480px"
      title="ປ່ຽນລະຫັດຜ່ານຂອງທ່ານ"
    >
      <div>
        <p class="text-slate-600 ml-6">
          ໃຫ້ທ່ານປ້ອນລະຫັດເກົ່າຂອງທ່ານເພື່ອຢືນຢັນທີ່ຈະປ່ຽນລະຫັດຜ່ານເກົ່າ
        </p>
      </div>
      <a-form
        layout="vertical"
        ref="form"
        :rules="ChangePasswordSchema"
        :model="changePasswordFormState"
      >
        <a-form-item
          class="form-item-centered"
          label="ລະຫັດຜ່ານເກົ່າຂອງທ່ານ"
          name="old_password"
        >
          <a-input-password
            placeholder="ໃສ່ລະຫັດຜ່ານເກົ່າຂອງທ່ານ"
            v-model:value="changePasswordFormState.old_password"
          />
        </a-form-item>
        <a-form-item
          class="form-item-centered"
          label="ສ້າງລະຫັດຜ່ານໃໝ່"
          name="new_password"
        >
          <a-input-password
            placeholder="ໃສ່ລະຫັດຜ່ານໃໝ່ຂອງທ່ານ"
            v-model:value="changePasswordFormState.new_password"
          />
        </a-form-item>
        <a-form-item
          class="form-item-centered"
          label="ຢືນຢັນລະຫັດຜ່ານໃໝ່"
          name="confirm_password"
        >
          <a-input-password
            placeholder="ຢືນຢັນລະຫັດຜ່ານ"
            v-model:value="changePasswordFormState.confirm_password"
          />
        </a-form-item>
        <a-button
          key="submit"
          class="w-full"
          type="primary"
          :loading="loading"
          @click="handleOrderSubmit"
          :disabled="isDisabled"
          >ປ່ຽນລະຫັດຜ່ານ</a-button
        >
        <a-button key="back" class="w-full mt-2" @click="closeModal"
          >ຍົກເລີກ</a-button
        >
      </a-form>
      <template #footer>
        <ButtonDefault @click="closeModal">Close</ButtonDefault>
      </template>
    </a-modal>
  </div>
</template>

<style scoped>
.modal {
  text-align: center;
}
</style>
