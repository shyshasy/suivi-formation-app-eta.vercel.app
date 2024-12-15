<template>
  <div class="registration-add-container">
    <h2 class="text-center mb-4">Ajouter une inscription</h2>

    <form @submit.prevent="addRegistration" class="form-container">
      <div class="form-group">
        <label for="student">Étudiant</label>
        <select v-model="newRegistration.studentId" class="form-control" required>
          <option disabled value="">Sélectionnez un étudiant</option>
          <option v-for="student in students" :key="student.id" :value="student.id">
            {{ student.fullName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="module">Module</label>
        <select 
          v-model="newRegistration.moduleId" 
          class="form-control" 
          required 
          @change="updateModuleDetails"
        >
          <option disabled value="">Sélectionnez un module</option>
          <option v-for="module in modules" :key="module.id" :value="module.id">
            {{ module.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="dateRegister">Date d'inscription</label>
        <input
          type="date"
          id="dateRegister"
          v-model="newRegistration.dateRegister"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="startDate">Date de début</label>
        <input
          type="date"
          id="startDate"
          v-model="newRegistration.startDate"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="amount">Montant</label>
        <input
          type="number"
          id="amount"
          v-model="newRegistration.amount"
          class="form-control"
          placeholder="Montant de l'inscription"
          readonly
        />
      </div>

      <button type="submit" class="btn btn-dark w-100 mt-4">
        Ajouter l'inscription
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useRegistrationStore } from '@/store/registrationStore';
import { useStudentStore } from '@/store/studentStore';
import { useModuleStore } from '@/store/moduleStore';

const router = useRouter();
const toast = useToast();
const registrationStore = useRegistrationStore();
const studentStore = useStudentStore();
const moduleStore = useModuleStore();

const newRegistration = ref({
  studentId: '',
  moduleId: '',
  dateRegister: '',
  startDate: '',
  amount: 0,
});

onMounted(async () => {
  await studentStore.loadStudents();
  await moduleStore.loadModules();
});

// Chargement des données
const students = studentStore.students;
const modules = moduleStore.modules;

// Met à jour le montant et autres détails du module
const updateModuleDetails = () => {
  const selectedModule = modules.find((module) => module.id === newRegistration.value.moduleId);
  if (selectedModule) {
    newRegistration.value.amount = selectedModule.price;
  }
};

// Ajouter une inscription
const addRegistration = async () => {
  try {
    await registrationStore.addRegistration(newRegistration.value);
    toast.success('Inscription ajoutée avec succès !');
    router.push({ name: 'list-registration' });
  } catch (error) {
    toast.error("Erreur lors de l'ajout de l'inscription.");
  }
};
</script>
  
  <style scoped>
  .registration-add-container {
    padding: 20px 2em;
    margin-top: 50px;
    min-height: 80vh;
    max-width: 90%;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 1px 1px rgba(172, 170, 170, 0.1);
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-control {
    border-radius: 20px;
    padding: 0.5rem 1rem;
  }
  
  button[type="submit"] {
    border-radius: 20px;
    padding: 0.8rem;
    font-size: 1rem;
  }
  
  button[type="submit"]:hover {
    background-color: #343a40;
  }
  
  h2 {
    font-weight: 500;
  }
  </style>
  