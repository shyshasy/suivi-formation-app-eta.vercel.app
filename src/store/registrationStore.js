import axios from 'axios';
import { defineStore } from 'pinia';

export const useRegistrationStore = defineStore('registrationStore', {
  state: () => ({
    registrations: [], // Liste des enregistrements
  }),

  actions: {
    // Charger tous les enregistrements
    async loadRegistrations() {
      try {
        const response = await axios.get('http://localhost:4000/registration');
        this.registrations = response.data;
      } catch (error) {
        console.error('Error loading registrations:', error);
        this.registrations = [];
      }
    },

    // Ajouter un nouvel enregistrement
    async addRegistration(registration) {
      try {
        const response = await axios.post('http://localhost:4000/registration', registration);
        this.registrations.push(response.data);
      } catch (error) {
        console.error('Error adding registration:', error);
        throw error;
      }
    },

    // Mettre à jour un enregistrement existant
    async updateRegistration(id, registration) {
      try {
        const response = await axios.put(`http://localhost:4000/registration/${id}`, registration);
        const index = this.registrations.findIndex(r => r.id === id);
        if (index !== -1) {
          this.registrations[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating registration:', error);
        throw error;
      }
    },

    // Supprimer un enregistrement
    async deleteRegistration(id) {
      try {
        await axios.delete(`http://localhost:4000/registration/${id}`);
        this.registrations = this.registrations.filter(r => r.id !== id);
      } catch (error) {
        console.error('Error deleting registration:', error);
        throw error;
      }
    },

    // Récupérer un enregistrement par son ID
    async getRegistration(id) {
      try {
        const response = await axios.get(`http://localhost:4000/registration/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching registration:', error);
        throw new Error('Erreur lors de la récupération des informations de l\'enregistrement.');
      }
    },
  },
});
