<template>
    <div class="add-payment-container">
      <h2 class="text-center mb-4">Ajouter un Paiement</h2>
  
      <form @submit.prevent="submitPayment">
        <!-- Date de paiement -->
        <div class="mb-3">
          <label for="paymentDate" class="form-label">Date de paiement</label>
          <input
            type="date"
            id="paymentDate"
            class="form-control"
            v-model="newPayment.paymentDate"
            required
          />
        </div>
  
        <!-- Montant -->
        <div class="mb-3">
          <label for="amount" class="form-label">Montant (€)</label>
          <input
            type="number"
            id="amount"
            class="form-control"
            v-model="newPayment.amount"
            required
            min="0"
          />
        </div>
  
        <!-- Payeur -->
        <div class="mb-3">
          <label for="payer" class="form-label">Payeur</label>
          <input
            type="text"
            id="payer"
            class="form-control"
            v-model="newPayment.payer"
            required
          />
        </div>
  
        <!-- Numéro du payeur -->
        <div class="mb-3">
          <label for="payerNumber" class="form-label">Numéro du payeur</label>
          <input
            type="text"
            id="payerNumber"
            class="form-control"
            v-model="newPayment.payerNumber"
            required
          />
        </div>
  
        <!-- Mode de paiement -->
        <div class="mb-3">
          <label for="paymentMode" class="form-label">Mode de paiement</label>
          <select
            id="paymentMode"
            class="form-select"
            v-model="newPayment.paymentMode"
            required
          >
            <option value="cash">Espèces</option>
            <option value="card">Carte</option>
            <option value="bank_transfer">Virement bancaire</option>
          </select>
        </div>
  
        <!-- Étudiant -->
        <div class="mb-3">
          <label for="studentId" class="form-label">Étudiant</label>
          <select
            id="studentId"
            class="form-select"
            v-model="newPayment.studentId"
            required
          >
            <option v-for="student in students" :key="student.id" :value="student.id">
              {{ student.fullName }}
            </option>
          </select>
        </div>
  
        <!-- Module -->
        <div class="mb-3">
          <label for="moduleId" class="form-label">Module</label>
          <select
            id="moduleId"
            class="form-select"
            v-model="newPayment.moduleId"
            required
          >
            <option v-for="module in modules" :key="module.id" :value="module.id">
              {{ module.name }}
            </option>
          </select>
        </div>
  
        <div class="text-center">
          <button type="submit" class="btn btn-dark">Ajouter le paiement</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { usePaymentStore } from '@/store/paymentStore';
  import { useStudentStore } from '@/store/studentStore';
  import { useModuleStore } from '@/store/moduleStore';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  
  const paymentStore = usePaymentStore();
  const studentStore = useStudentStore();
  const moduleStore = useModuleStore();
  const router = useRouter();
  const toast = useToast();
  
  // Modèle de paiement vide
  const newPayment = ref({
    paymentDate: '',
    amount: '',
    payer: '',
    payerNumber: '',
    paymentMode: '',
    studentId: '',
    moduleId: '',
  });
  
  // Liste des étudiants et des modules
  const students = ref([]);
  const modules = ref([]);
  
  // Charger les étudiants et les modules
  const loadData = async () => {
    try {
      students.value = await studentStore.loadStudents();
      modules.value = await moduleStore.loadModules();
    } catch (error) {
      toast.error("Erreur lors du chargement des données.");
      console.error('Erreur :', error);
    }
  };
  
  // Fonction d'envoi du paiement
  const submitPayment = async () => {
    try {
      await paymentStore.addPayment(newPayment.value);
      toast.success('Paiement ajouté avec succès!');
      router.push('/payments'); // Redirige vers la liste des paiements
    } catch (error) {
      toast.error("Erreur lors de l'ajout du paiement.");
    }
  };
  
  onMounted(() => {
    loadData();
  });
  </script>
  
  <style scoped>
  .add-payment-container {
    padding: 20px 2em;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 1px 1px rgba(172, 170, 170, 0.1);
  }
  
  .form-label {
    font-weight: bold;
  }
  
  .form-control,
  .form-select {
    border-radius: 20px;
    padding: 0.5rem 1rem;
  }
  </style>
  