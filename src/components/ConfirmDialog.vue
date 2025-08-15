<template>
  <q-dialog v-model="modal" >
    <div class="modal-content">
        <div class="modal-header text-white">
            <h2 class="modal-title">{{ dialogHeader }}</h2>
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

<script setup lang='ts'>
import { ref, watchEffect } from 'vue';

const props = defineProps<({
    dialogHeader: string,
    dialogMessage: string,
    showConfirmDialog: boolean
})>();

const modal = ref(props.showConfirmDialog)

watchEffect(() => {
  modal.value = props.showConfirmDialog
})

</script>
<style scoped>
.leave-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
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
            padding: 2px;
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
            font-size: 1.3rem;
            font-weight: 600;
            color: #faf5f5;
        }

        .close-btn {
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
            background: #667eea;
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
