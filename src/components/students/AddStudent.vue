<template>
    <div class="add-student-form-container">
      <h3 class="text-center mb-4">Ajouter un étudiant</h3>
      <form @submit.prevent="onSubmit" class="form-card">
        <div class="mb-3">
          <label for="fullName" class="form-label">Nom complet</label>
          <input
            type="text"
            class="form-control"
            id="fullName"
            v-model="form.fullName"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="form.email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Numéro de téléphone</label>
          <input
            type="text"
            class="form-control"
            id="phoneNumber"
            v-model="form.phoneNumber"
            required
          />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Adresse</label>
          <input
            type="text"
            class="form-control"
            id="address"
            v-model="form.address"
            required
          />
        </div>
        <div class="mb-3">
          <label for="tutor" class="form-label">Tuteur</label>
          <input
            type="text"
            class="form-control"
            id="tutor"
            v-model="form.tutor"
          />
        </div>
        <div class="mb-3">
        <input
          type="checkbox"
          id="status"
          v-model="form.status"
          class="form-check-input"
        />
        <label for="status" class="form-check-label">Actif</label>
      </div>
        <button type="submit" class="btn btn-success">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStudentStore } from '@/store/studentStore';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  const studentStore = useStudentStore();
  const toast = useToast();
  const router = useRouter();
  
  const form = ref({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    tutor: '',
    status: true,
  });
  
  const onSubmit = async () => {
    try {
      await studentStore.addStudent(form.value);
      toast.success('Étudiant ajouté avec succès!');
      router.push({ name: 'list-student' }); 
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'étudiant.");
    }
  };
  </script>
  
  <style scoped>
  .add-student-form-container {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  