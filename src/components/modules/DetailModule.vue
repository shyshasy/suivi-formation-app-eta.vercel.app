<template>
  <div class="module-details-container">
    <h3 class="text-center mb-4">Détails du Module</h3>
    <div v-if="module" class="card shadow-lg">
      <div class="card-body">
        <h5 class="card-title mb-3">Informations sur le Module</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <strong>Nom du module:</strong> {{ module.name }}
          </li>
          <li class="list-group-item">
            <strong>Durée (en jours):</strong> {{ module.duration }}
          </li>
          <li class="list-group-item">
            <strong>Prix:</strong> {{ module.price }} €
          </li>
          <li class="list-group-item">
            <strong>Statut:</strong>
            <span :class="module.status ? 'badge bg-success' : 'badge bg-danger'">
              {{ module.status ? 'Actif' : 'Inactif' }}
            </span>
          </li>
        </ul>
        <div class="mt-3">
          <router-link class="btn btn-primary" :to="{ name: 'list-module' }">
            Retour à la liste
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-warning" role="alert">
        Chargement des détails du module...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useModuleStore } from '@/store/moduleStore';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const moduleStore = useModuleStore();
const toast = useToast();
const route = useRoute();

const module = ref(null);
const moduleId = route.params.id; // Récupère l'ID du module depuis la route

onMounted(async () => {
  try {
    module.value = await moduleStore.getModule(moduleId); // Charge les détails du module
  } catch (error) {
    toast.error("Erreur lors du chargement des détails du module.");
  }
});
</script>

<style scoped>
.module-details-container {
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
