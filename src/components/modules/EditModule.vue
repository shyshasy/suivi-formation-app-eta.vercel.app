<template>
  <div class="container mt-5">
    <h2>Modifier un Module</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Nom du Module</label>
        <input
          type="text"
          id="name"
          v-model="module.name"
          class="form-control"
          placeholder="Entrez le nom du module"
        />
      </div>

      <div class="mb-3">
        <label for="duration" class="form-label">Durée (en jours)</label>
        <input
          type="number"
          id="duration"
          v-model.number="module.duration"
          class="form-control"
          placeholder="Entrez la durée"
        />
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Prix</label>
        <input
          type="number"
          id="price"
          v-model.number="module.price"
          class="form-control"
          placeholder="Entrez le prix"
        />
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox"
          id="status"
          v-model="module.status"
          class="form-check-input"
        />
        <label for="status" class="form-check-label">Statut Actif</label>
      </div>

      <button type="submit" class="btn btn-primary">Modifier</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useModuleStore } from "../../store/moduleStore";

const moduleStore = useModuleStore();
const router = useRouter();
const route = useRoute();

// Récupération de l'ID du module depuis les paramètres de la route
const moduleId = route.params.id;

// Initialisation du module à modifier
const module = ref({
  name: "",
  duration: null,
  price: null,
  status: true,
});

// Charger les données du module à modifier
onMounted(async () => {
  try {
    const existingModule = await moduleStore.getModule(moduleId); // Utilisez le bon nom de méthode
    module.value = { ...existingModule };
  } catch (error) {
    console.error("Erreur lors du chargement du module :", error);
  }
});


// Soumission des modifications
const handleSubmit = async () => {
  try {
    await moduleStore.updateModule(moduleId, module.value);
    console.log("Module modifié :", module.value);

    // Redirection après modification
    router.push({ name: "list-module" });
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
