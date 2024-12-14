<template>
    <div class="module-list-container">
      <h2 class="text-center mb-4">Liste des modules</h2>
  
      <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
        <input 
          type="text" 
          class="form-control mb-2 mb-md-0 w-50 search-input"
          placeholder="Rechercher un module..."
          v-model="searchQuery"
        />
        <router-link to="/module/new" class="btn btn-dark add-module-button">
          <i class="fa-solid fa-plus"></i> Ajouter un module
        </router-link>
      </div>
  
      <div class="table-responsive shadow-lg rounded">
        <table class="table table-hover table-bordered module-table">
          <thead class="table-header">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Durée (heures)</th>
              <th scope="col">Prix ($)</th>
              <th scope="col">Statut</th>
              <th scope="col" class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredModules.length === 0">
              <td colspan="6" class="text-center">Aucun module trouvé</td>
            </tr>
            <tr v-for="(module, index) in filteredModules" :key="module.id" class="table-row">
              <td>{{ index + 1 }}</td>
              <td>{{ module.name }}</td>
              <td>{{ module.duration }}</td>
              <td>{{ module.price }}</td>
              <td>
                <span 
                  :class="{
                    'badge bg-success': module.status,
                    'badge bg-danger': !module.status
                  }">
                  {{ module.status ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="text-center action-icons">
                <font-awesome-icon 
                  icon="eye" 
                  class="text-info me-2 cursor-pointer" 
                  @click="viewDetails(module.id)" 
                />
                <font-awesome-icon 
                  icon="edit" 
                  class="text-warning me-2 cursor-pointer" 
                  @click="editModule(module.id)" 
                />
                <font-awesome-icon 
                  icon="trash" 
                  class="text-danger cursor-pointer" 
                  @click="removeModule(module.id)" 
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
  import { useModuleStore } from '@/store/moduleStore';
  
  const router = useRouter();
  const toast = useToast();
  const moduleStore = useModuleStore();
  const searchQuery = ref("");
  
  // Liste filtrée des modules
  const filteredModules = computed(() => {
    if (searchQuery.value) {
      return moduleStore.modules.filter((module) => 
        module.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    return moduleStore.modules;
  });
  
  // Navigation vers les détails
  const viewDetails = (id) => {
    router.push({ name: 'detail-module', params: { id } });
  };
  
  // Navigation vers la modification
  const editModule = (id) => {
    router.push({ name: 'edit-module', params: { id } });
  };
  
  // Suppression d'un module
  const removeModule = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce module ?")) {
      try {
        await moduleStore.deleteModule(id);
        toast.success("Module supprimé avec succès !");
      } catch (error) {
        toast.error("Erreur lors de la suppression du module.");
      }
    }
  };
  
  // Chargement initial des données
  onMounted(() => {
    moduleStore.loadModules();
  });
  </script>
  
  <style scoped>
  .module-list-container {
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
  
  .add-module-button {
    border-radius: 20px;
  }
  
  .table-responsive {
    overflow-x: auto;
  }
  
  .module-table {
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
  
  .badge {
    padding: 0.5em 1em;
    font-size: 0.9rem;
  }
  
  .bg-success {
    background-color: #28a745 !important;
    color: white;
  }
  
  .bg-danger {
    background-color: #dc3545 !important;
    color: white;
  }
  </style>
  