<template>
    <div class="payment-list-container">
      <h2 class="text-center mb-4">Liste des Paiements</h2>
  
      <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
        <input
          type="text"
          class="form-control mb-2 mb-md-0 w-50 search-input"
          placeholder="Rechercher un paiement..."
          v-model="searchQuery"
        />
        <router-link to="/payment/new" class="btn btn-dark add-payment-button">
          <i class="fa-solid fa-plus"></i> Ajouter un paiement
        </router-link>
      </div>
  
      <div class="table-responsive shadow-lg rounded">
        <table class="table table-hover table-bordered payment-table">
          <thead class="table-header">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date de paiement</th>
              <th scope="col">Montant (€)</th>
              <th scope="col">Payeur</th>
              <th scope="col">Numéro du payeur</th>
              <th scope="col">Mode de paiement</th>
              <th scope="col">Inscription (ID)</th>
              <th scope="col">Étudiant (ID)</th>
              <th scope="col">Module (ID)</th>
              <th scope="col" class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(payment, index) in filteredPayments" :key="payment.id" class="table-row">
  <td>{{ index + 1 }}</td>
  <td>{{ new Date(payment.paymentDate).toLocaleDateString() }}</td>
  <td>{{ payment.amount }}</td>
  <td>{{ payment.payer }}</td>
  <td>{{ payment.payerNumber }}</td>
  <td>{{ payment.paymentMode }}</td>
  <td>{{ payment.registrationId }}</td>
  <td>{{ payment.student?.fullName || 'Non spécifié' }}</td>
  <td>{{ payment.module?.name || 'Non spécifié' }}</td>
  <td class="text-center action-icons">
    <font-awesome-icon
      icon="edit"
      class="text-warning me-2 cursor-pointer"
      @click="editPayment(payment.id)"
    />
    <!-- <font-awesome-icon
      icon="trash"
      class="text-danger cursor-pointer"
      @click="deletePayment(payment.id)"
    /> -->
  </td>
</tr>

          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import { usePaymentStore } from '@/store/paymentStore';
import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const paymentStore = usePaymentStore();
  const toast = useToast();
  const searchQuery = ref('');
  const payments = ref([]);
  
  // Charger les paiements
  const loadPayments = async () => {
    try {
      await paymentStore.loadPayments();
      payments.value = paymentStore.payments;
    } catch (error) {
      console.error('Erreur lors du chargement des paiements :', error);
    }
  };

  const editPayment = async (id) =>{
    router.push({ name: "edit-payment", params: { id } });
  }
  
  // Supprimer un paiement
  const deletePayment = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      try {
        await paymentStore.deletePayment(id);
        toast.success('Paiement supprimé avec succès !');
        payments.value = paymentStore.payments;
      } catch (error) {
        toast.error("Erreur lors de la suppression du paiement.");
      }
    }
  };
  
  // Paiements filtrés selon la recherche
  const filteredPayments = computed(() => {
    if (searchQuery.value) {
      return payments.value.filter((payment) =>
        payment.payer.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    return payments.value;
  });
  
  onMounted(() => {
    loadPayments();
  });
  </script>
  
  <style scoped>
  .payment-list-container {
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
  
  .add-payment-button {
    border-radius: 20px;
  }
  
  .table-responsive {
    overflow-x: auto;
  }
  
  .payment-table {
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
  