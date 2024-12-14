<template>
    <div class="module-parent-container mt-5">
      <!-- <h1 class="text-center my-4">Gestion des Modules</h1> -->
      <!-- Affichage des sous-composants selon la route active -->
      <router-view />
    </div>
  </template>
  
  <script setup>
  // Aucun script spécifique n'est nécessaire pour ce composant parent
  </script>
  
  <style scoped>
  .module-parent-container {
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  