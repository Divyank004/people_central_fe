<template>
  <q-dialog v-model="modal">
    <div class="modal-content">
      <div class="modal-header text-white">
        <p class="modal-title">{{ dialogHeader }}</p>
        <button class="close-btn" @click="$emit('closeModal')">&times;</button>
      </div>
      <div class="modal-body">
        <p>{{ dialogMessage }}</p>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn-secondary" @click="$emit('closeModal')">Cancel</button>
        <button type="submit" class="btn-primary" @click="$emit('confirmReq')">Confirm</button>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  dialogHeader: string;
  dialogMessage: string;
  showConfirmDialog: boolean;
}>();

const modal = ref(props.showConfirmDialog);

watchEffect(() => {
  modal.value = props.showConfirmDialog;
});
</script>
<style scoped>
.modal-content {
  background: white;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  background: rgb(89, 79, 228);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
}
.modal-body {
  margin: 1rem;
  padding: 1rem;
  font-size: 16px;
  color: #333;
}
.modal-title {
  padding-top: 20px;
  font-size: 1.3rem;
  font-weight: 600;
  color: #faf5f5;
}

.close-btn {
  padding-top: 4px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #e0dede;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin: 1.5rem;
}

.btn-secondary {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.7rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn-primary {
  background: hwb(229 29% 11%);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .apply-button {
    font-size: 0.5rem;
    font-weight: 400;
    padding: 0.5rem 1rem;
  }
  .main-content {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .apply-button {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
