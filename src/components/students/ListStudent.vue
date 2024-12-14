<template>
    <div class="student-list-container">
      <h2 class="text-center mb-4">Liste des étudiants</h2>
  
      <div class="actions-container d-flex flex-column flex-md-row justify-content-between mb-4">
        <input 
          type="text" 
          class="form-control mb-2 mb-md-0 w-50 search-input"
          placeholder="Rechercher un étudiant..."
          v-model="searchQuery"
        />
        <router-link to="/student/new" class="btn btn-dark add-student-button">
        <i class="fa-solid fa-plus"></i> Ajouter un étudiant
        </router-link>

      </div>
  
      <div class="table-responsive shadow-lg rounded">
        <table class="table table-hover table-bordered student-table">
          <thead class="table-header">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom complet</th>
              <th scope="col">Email</th>
              <th scope="col">Numéro de téléphone</th>
              <th scope="col">Adresse</th>
              <th scope="col">Tuteur</th>
              <th scope="col">Statut</th>
              <th scope="col" class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredStudents.length === 0">
              <td colspan="8" class="text-center">Aucun étudiant trouvé</td>
            </tr>
            <tr v-for="(student, index) in filteredStudents" :key="student.id" class="table-row">
              <td>{{ index + 1 }}</td>
              <td>{{ student.fullName }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.phoneNumber }}</td>
              <td>{{ student.address }}</td>
              <td>{{ student.tutor || 'N/A' }}</td>
              <td :class="{
                'text-success': student.status === true,
                'text-danger': student.status === false
                }">
                {{ student.status === true ? 'Actif' : 'Inactif' }}
                </td>
                            <td class="text-center action-icons">
                <font-awesome-icon 
                  icon="eye" 
                  class="text-info me-2 cursor-pointer" 
                  @click="viewDetails(student.id)" 
                />
                <font-awesome-icon 
                  icon="edit" 
                  class="text-warning me-2 cursor-pointer" 
                  @click="editStudent(student.id)" 
                />
                <font-awesome-icon 
                  icon="trash" 
                  class="text-danger cursor-pointer" 
                  @click="removeStudent(student.id)" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { useStudentStore } from '@/store/studentStore';
  
  const router = useRouter();
  const toast = useToast();
  const studentStore = useStudentStore();
  const searchQuery = ref("");
  
  // Liste filtrée des étudiants
  const filteredStudents = computed(() => {
    if (searchQuery.value) {
      return studentStore.students.filter((student) => 
        student.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
        student.email.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    return studentStore.students;
  });
  
  // Navigation vers les détails
  const viewDetails = (id) => {
    router.push({ name: 'detail-student', params: { id } });

  };
  
  // Navigation vers la modification
  const editStudent = (id) => {
    router.push({ name: 'edit-student', params: { id } });
  };
  
  // Suppression d'un étudiant
  const removeStudent = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
      try {
        await studentStore.deleteStudent(id);
        toast.success("Étudiant supprimé avec succès !");
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'étudiant.");
      }
    }
  };
  
  // Chargement initial des données
  onMounted(() => {
    studentStore.loadStudents();
  });
  </script>
  
  <style scoped>
  .student-list-container {
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
  
  .add-student-button {
    border-radius: 20px;
  }
  
  .table-responsive {
    overflow-x: auto;
  }
  
  .student-table {
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
  