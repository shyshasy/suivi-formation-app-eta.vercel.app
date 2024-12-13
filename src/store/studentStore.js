import axios from 'axios';
import { defineStore } from 'pinia';

export const useStudentStore = defineStore('studentStore', {
  state: () => ({
    students: [],
  }),

  actions: {
    async loadStudents() {
      try {
        const response = await axios.get('http://localhost:4000/students');
        this.students = response.data;
      } catch (error) {
        console.error('Error loading students:', error);
        this.students = [];
      }
    },

    async addStudent(student) {
      try {
        const response = await axios.post('http://localhost:4000/students', student);
        this.students.push(response.data);
      } catch (error) {
        console.error('Error adding student:', error);
        throw error;
      }
    },

    async updateStudent(id, student) {
      try {
        const response = await axios.put(`http://localhost:4000/students/${id}`, student);
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
        await axios.delete(`http://localhost:4000/students/${id}`);
        this.students = this.students.filter(s => s.id !== id);
      } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
      }
    },
  },
});
