import axios from 'axios';
import { defineStore } from 'pinia';

export const useStudentStore = defineStore('studentStore', {
  state: () => ({
    students: [],
  }),

  actions: {
    async loadStudents() {
      try {
        const response = await axios.get('http://localhost:4000/student');
        this.students = response.data;
      } catch (error) {
        console.error('Error loading students:', error);
        this.students = [];
      }
    },

    async addStudent(student) {
      try {
        const response = await axios.post('http://localhost:4000/student', student);
        this.students.push(response.data);
      } catch (error) {
        console.error('Error adding student:', error);
        throw error;
      }
    },

    async updateStudent(id, student) {
      try {
        const response = await axios.put(`http://localhost:4000/student/${id}`, student);
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
          this.students[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating student:', error);
        throw error;
      }
    },

    async deleteStudent(id) {
      try {
        await axios.delete(`http://localhost:4000/student/${id}`);
        this.students = this.students.filter(s => s.id !== id);
      } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
      }
    },

    // Méthode pour récupérer un étudiant par son ID
    async getStudent(id) {
      try {
        const response = await axios.get(`http://localhost:4000/student/${id}`);
        return response.data;  // Retourne les données de l'étudiant
      } catch (error) {
        console.error('Error fetching student:', error);
        throw new Error('Erreur lors de la récupération des informations de l\'étudiant.');
      }
    },
  },
});
