<template>
    <div class="container mt-5">
      <h2>Ajouter un Module</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label">Nom du Module</label>
          <input
            type="text"
            id="name"
            v-model="modules.name"
            class="form-control"
            placeholder="Entrez le nom du module"
          />
        </div>
  
        <div class="mb-3">
          <label for="duration" class="form-label">Durée (en heures)</label>
          <input
            type="number"
            id="duration"
            v-model.number="modules.duration"
            class="form-control"
            placeholder="Entrez la durée"
          />
        </div>
  
        <div class="mb-3">
          <label for="price" class="form-label">Prix</label>
          <input
            type="number"
            id="price"
            v-model.number="modules.price"
            class="form-control"
            placeholder="Entrez le prix"
          />
        </div>
  
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            id="status"
            v-model="modules.status"
            class="form-check-input"
          />
          <label for="status" class="form-check-label">Statut Actif</label>
        </div>
  
        <button type="submit" class="btn btn-primary">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useModuleStore } from "../../store/moduleStore";
  const moduleStore = useModuleStore()
  
  const router = useRouter();
  
  // Initialisation du module vide
  const modules = ref({
    name: "",
    duration: null,
    price: null,
    status: true, 
  });
  
  // Soumission du formulaire
  const handleSubmit = async () => {
    try {
      // await moduleStore.addModule(modules.value);
      await moduleStore.addModule(modules.value)
      // Exemple d'envoi des données vers le backend
      console.log("Données envoyées au backend :", modules.value);
  
      // Redirection après ajout
      router.push({ name: 'list-module' });
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 80px;
  }
  </style>
  