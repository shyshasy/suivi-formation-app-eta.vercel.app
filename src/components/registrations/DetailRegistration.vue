<template>
    <div class="student-details-container">
      <h3 class="text-center mb-4">Détails de l'inscription</h3>
      <div v-if="registration" class="card shadow-lg">
        <div class="card-body">
          <h5 class="card-title mb-3">Informations de l'inscription</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Nom de l'etudiant:</strong> {{ registration.student.fullName }}
            </li>
            <li class="list-group-item">
              <strong>Module:</strong> {{ registration.module.name }}
            </li>
            <li class="list-group-item">
              <strong>Date d'inscription:</strong> {{ registration.dateRegister }}
            </li>
            <li class="list-group-item">
              <strong>Date de début:</strong> {{ registration.startDate }}
            </li>
            <li class="list-group-item">
              <strong>Date de début:</strong> {{ registration.endDate }}
            </li>
            <li class="list-group-item">
              <strong>Montant:</strong> {{ registration.amount }}
            </li>
            <li class="list-group-item">
              <strong>Montant restant:</strong> {{ registration.remainingAmount }}
            </li>
          </ul>
          <div class="mt-3">
            <router-link class="btn btn-primary" :to="{ name: 'list-registration' }">Retour à la liste</router-link>
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
  import { useRoute } from 'vue-router';
  import { useToast } from 'vue-toastification';
import { useRegistrationStore } from '../../store/registrationStore';
  
  const store = useRegistrationStore();
  const toast = useToast();
  const route = useRoute();
  
  const registration = ref(null);
  const registrationId = route.params.id; // Récupère l'ID de l'étudiant à partir de la route
  
  onMounted(async () => {
    try {
      registration.value = await store.getRegistration(registrationId); // Récupère les informations de l'étudiant
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
  