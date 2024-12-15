import axios from 'axios';
import { defineStore } from 'pinia';

export const usePaymentStore = defineStore('paymentStore', {
  state: () => ({
    payments: [], // Stocke la liste des paiements
  }),

  actions: {
    // Charger tous les paiements
    async loadPayments() {
      try {
        const response = await axios.get('http://localhost:4000/payment');
        this.payments = response.data;
      } catch (error) {
        console.error('Error loading payments:', error);
        this.payments = [];
      }
    },

    // Ajouter un nouveau paiement
    async addPayment(payment) {
      try {
        const response = await axios.post('http://localhost:4000/payment', payment);
        this.payments.push(response.data);
      } catch (error) {
        console.error('Error adding payment:', error.response?.data || error.message);
        throw error;
      }
    },

    // Mettre à jour un paiement existant
    async updatePayment(id, payment) {
      try {
        const response = await axios.put(`http://localhost:4000/payment/${id}`, payment);
        const index = this.payments.findIndex(p => p.id === id);
        if (index !== -1) {
          this.payments[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating payment:', error);
        throw error;
      }
    },

    // Supprimer un paiement
    async deletePayment(id) {
      try {
        await axios.delete(`http://localhost:4000/payment/${id}`);
        this.payments = this.payments.filter(p => p.id !== id);
      } catch (error) {
        console.error('Error deleting payment:', error);
        throw error;
      }
    },

    // Récupérer un paiement par son ID
    async getPayment(id) {
      try {
        const response = await axios.get(`http://localhost:4000/payment/${id}`);
        return response.data; // Retourne les données du paiement
      } catch (error) {
        console.error('Error fetching payment:', error);
        throw new Error('Erreur lors de la récupération des informations du paiement.');
      }
    },
  },
});
