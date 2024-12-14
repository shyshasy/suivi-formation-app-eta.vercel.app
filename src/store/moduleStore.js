import axios from 'axios';
import { defineStore } from 'pinia';

export const useModuleStore = defineStore('moduleStore', {
  state: () => ({
    modules: [], // Stocke la liste des modules
  }),

  actions: {
    // Charger tous les modules
    async loadModules() {
      try {
        const response = await axios.get('http://localhost:4000/module');
        this.modules = response.data;
      } catch (error) {
        console.error('Error loading modules:', error);
        this.modules = [];
      }
    },

    // Ajouter un nouveau module
    async addModule(module) {
        try {
          console.log('Adding module:', module);
          const response = await axios.post('http://localhost:4000/module', module);
          this.modules.push(response.data);
        } catch (error) {
          console.error('Error adding module:', error.response?.data || error.message);
          throw error;
        }
      }
      ,

    // Mettre à jour un module existant
    async updateModule(id, module) {
      try {
        const response = await axios.put(`http://localhost:4000/module/${id}`, module);
        const index = this.modules.findIndex(m => m.id === id);
        if (index !== -1) {
          this.modules[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating module:', error);
        throw error;
      }
    },

    // Supprimer un module
    async deleteModule(id) {
      try {
        await axios.delete(`http://localhost:4000/module/${id}`);
        this.modules = this.modules.filter(m => m.id !== id);
      } catch (error) {
        console.error('Error deleting module:', error);
        throw error;
      }
    },

    // Récupérer un module par son ID
    async getModule(id) {
      try {
        const response = await axios.get(`http://localhost:4000/module/${id}`);
        return response.data; // Retourne les données du module
      } catch (error) {
        console.error('Error fetching module:', error);
        throw new Error('Erreur lors de la récupération des informations du module.');
      }
    },
  },
});
