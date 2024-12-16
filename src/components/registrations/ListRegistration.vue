<template>
  <div class="registration-list-container">
    <h2 class="text-center mb-4">Liste des inscriptions</h2>

    <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
      <input 
        type="text" 
        class="form-control mb-2 mb-md-0 w-50 search-input"
        placeholder="Rechercher une inscription..."
        v-model="searchQuery"
      />
      <router-link to="/registration/new" class="btn btn-dark add-registration-button">
        <i class="fa-solid fa-plus"></i> Ajouter une inscription
      </router-link>
    </div>

    <div class="table-responsive shadow-lg rounded">
      <table class="table table-hover table-bordered registration-table">
        <thead class="table-header">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom de l'étudiant</th>
            <th scope="col">Module</th>
            <th scope="col">Date d'inscription</th>
            <th scope="col">Date de début</th>
            <th scope="col">Montant</th>
            <!-- <th scope="col">Montant restant à payer </th> -->
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRegistrations.length === 0">
            <td colspan="7" class="text-center">Aucune inscription trouvée</td>
          </tr>
          <tr v-for="(registration, index) in filteredRegistrations" :key="registration.id" class="table-row">
            <td>{{ index + 1 }}</td>
            <td>{{ registration.student.fullName }}</td>
            <td>{{ registration.module.name }}</td>
            <td>{{ new Date(registration.dateRegister).toLocaleDateString() }}</td>
            <td>{{ new Date(registration.startDate).toLocaleDateString() }}</td>
            <td>{{ registration.amount }} €</td>
            <!-- <td>{{ registration.remainingAmount }} €</td> -->
            <td class="text-center action-icons">
              <font-awesome-icon 
                icon="eye" 
                class="text-info me-2 cursor-pointer" 
                @click="viewDetails(registration.id)" 
              />
              <font-awesome-icon 
                icon="edit" 
                class="text-warning me-2 cursor-pointer" 
                @click="editRegistration(registration.id)" 
              />
              <font-awesome-icon 
                icon="trash" 
                class="text-danger cursor-pointer" 
                @click="removeRegistration(registration.id)" 
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useRegistrationStore } from '@/store/registrationStore';

const router = useRouter();
const toast = useToast();
const registrationStore = useRegistrationStore();
const searchQuery = ref("");

// Liste filtrée des inscriptions
const filteredRegistrations = computed(() => {
  if (searchQuery.value) {
    return registrationStore.registrations.filter((registration) => 
      registration.student.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      registration.module.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return registrationStore.registrations;
});

// Navigation vers les détails
const viewDetails = (id) => {
  router.push({ name: 'detail-registration', params: { id } });
};

// Navigation vers la modification
const editRegistration = (id) => {
  router.push({ name: 'edit-registration', params: { id } });
};

// Suppression d'une inscription
const removeRegistration = async (id) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette inscription ?")) {
    try {
      await registrationStore.deleteRegistration(id);
      toast.success("Inscription supprimée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'inscription.");
    }
  }
};

// Chargement initial des données
onMounted(() => {
  registrationStore.loadRegistrations();
});
</script>

<style scoped>
.registration-list-container {
  padding: 20px 2em;
  margin-top: 50px;
  min-height: 80vh;
  max-width: 90%;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 1px 1px rgba(172, 170, 170, 0.1);
}

.actions-container {
  align-items: center;
}

.search-input {
  max-width: 300px;
  border-radius: 20px;
  padding: 0.5rem 1rem;
}

.add-registration-button {
  border-radius: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.registration-table {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  background-color: hsl(211, 100%, 50%);
  color: white;
}

.table-header th {
  font-weight: bold;
}

.table-row:hover {
  background-color: #f1f1f1;
}

.action-icons .cursor-pointer {
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.action-icons .cursor-pointer:hover {
  color: gray;
}
</style>
