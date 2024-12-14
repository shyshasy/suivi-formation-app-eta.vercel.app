<template>
    <div class="student-details-container">
      <h3 class="text-center mb-4">Détails de l'Étudiant</h3>
      <div v-if="student" class="card shadow-lg">
        <div class="card-body">
          <h5 class="card-title mb-3">Informations personnelles</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Nom complet:</strong> {{ student.fullName }}
            </li>
            <li class="list-group-item">
              <strong>Email:</strong> {{ student.email }}
            </li>
            <li class="list-group-item">
              <strong>Numéro de téléphone:</strong> {{ student.phoneNumber }}
            </li>
            <li class="list-group-item">
              <strong>Adresse:</strong> {{ student.address }}
            </li>
            <li class="list-group-item">
              <strong>Tuteur:</strong> {{ student.tutor }}
            </li>
            <li class="list-group-item">
              <strong>Status:</strong> 
              <span :class="student.status ? 'badge bg-success' : 'badge bg-danger'">
                {{ student.status ? 'Actif' : 'Inactif' }}
              </span>
            </li>
          </ul>
          <div class="mt-3">
            <router-link class="btn btn-primary" :to="{ name: 'list-student' }">Retour à la liste</router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-warning" role="alert">
          Chargement des détails...
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useStudentStore } from '@/store/studentStore';
  import { useRoute } from 'vue-router';
  import { useToast } from 'vue-toastification';
  
  const studentStore = useStudentStore();
  const toast = useToast();
  const route = useRoute();
  
  const student = ref(null);
  const studentId = route.params.id; // Récupère l'ID de l'étudiant à partir de la route
  
  onMounted(async () => {
    try {
      student.value = await studentStore.getStudent(studentId); // Récupère les informations de l'étudiant
    } catch (error) {
      toast.error("Erreur lors du chargement des détails de l'étudiant.");
    }
  });
  </script>
  
  <style scoped>
  .student-details-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
  }
  
  .card {
    border-radius: 15px;
  }
  
  .card-title {
    font-weight: bold;
  }
  
  .list-group-item {
    font-size: 1.1rem;
  }
  
  .badge {
    font-size: 1rem;
  }
  </style>
  