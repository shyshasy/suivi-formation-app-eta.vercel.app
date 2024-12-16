<template>
    <div class="add-payment-container">
      <h2 class="text-center mb-4">Ajouter un Paiement</h2>
  
      <form @submit.prevent="onSubmit">
        <!-- Date de paiement -->
        <div class="mb-3">
          <label for="paymentDate" class="form-label">Date de paiement</label>
          <input
            type="date"
            id="paymentDate"
            class="form-control"
            v-model="newPayment.paymentDate"
             @blur="validateDate('paymentDate')"
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
  
        <!-- registration -->
        <div class="mb-3">
          <label for="registrationId" class="form-label">Inscription</label>
          <select
            id="registrationId"
            class="form-select"
            v-model="newPayment.registrationId"
            required
          >
          <option disabled value="">Sélectionnez un étudiant</option>
            <option v-for="registration in registrations" :key="registration.id" :value="registration.id">
              {{ registration.id }}
            </option>
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
          <option disabled value="">Sélectionnez un étudiant</option>
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
          <option disabled value="">Sélectionnez un module</option>
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
  import { useRoute, useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
import { useRegistrationStore } from '../../store/registrationStore';
import dayjs from 'dayjs';

  const paymentStore = usePaymentStore();
  const studentStore = useStudentStore();
  const moduleStore = useModuleStore();
  const registration = useRegistrationStore();
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  
  // Modèle de paiement vide
  const newPayment = ref({
    paymentDate: '',
    amount: '',
    payer: '',
    payerNumber: '',
    paymentMode: '',
    registrationId: '',
    studentId: '',
    moduleId: '',
  });

  const paymentId = route.params.id;
  
  onMounted(async () => {
    try {

        const payment = await paymentStore.getPayment(paymentId);

        if(payment) {
            newPayment.value = {
                ...payment,
                paymentDate:dayjs(payment.paymentDate).format('YYYY-MM-DD'),
            };
            console.log('Données r"cupéréeez:', newPayment.value);
        } else {
            toast.error('payment introvable');
            router.push({ name : 'list-payment'});
            return;
        }
      await studentStore.loadStudents();
      await moduleStore.loadModules();
      await registration.loadRegistrations();
      
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
      toast.error('Erreur lors du chargement des données.');
    }
  });

  const validateDate = (field) => {
    const date = newPayment.value[field];
    if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) {
      toast.error(`La date pour ${field} est invalide. Format attendu : YYYY-MM-DD`);
      newPayment.value[field] = '';
    }
  };

  const onSubmit = async () => {
    try {
        await paymentStore.updatePayment(paymentId, newPayment.value);
        toast.success('Paiement modifiée avec succès !')
        router.push({ name: 'list-payment' });
    } catch (error) {
        toast.error("Erreur lors de la modification de paiement.");
      console.error('Erreur complète:', error);
    }
  }

  const students = studentStore.students;
const modules = moduleStore.modules;
const registrations = registration.registrations;
  
  // Fonction d'envoi du paiement
//   const submitPayment = async () => {
//     console.log('Tentative d\'ajout du paiement avec les données :', newPayment.value);
  
//     try {
//       await paymentStore.addPayment(newPayment.value);
//       console.log('Paiement ajouté avec succès.');
//       toast.success('Paiement ajouté avec succès!');
//       router.push('/payment'); // Redirige vers la liste des paiements
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout du paiement :', error);
//       toast.error(`Erreur lors de l'ajout du paiement : ${error.message}`);
//     }
//   };
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
  