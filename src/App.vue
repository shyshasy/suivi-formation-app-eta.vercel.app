<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <!-- <router-link to="/" class="navbar-brand" activeClass="active">
          <img src="/src/assets/recipeLogo.jpg" alt="Logo" class="logo">
        </router-link> -->

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/student" class="nav-link text-white" activeClass="active">Students</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/categorie" class="nav-link text-white" activeClass="active">Catégories</router-link>
            </li> -->
          </ul>
        </div>

      </div>
    </nav>

  
      <router-view />
      
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useRecetteStore } from './store/recetteStore';

const noResults = ref(false);
</script>

<style scoped>
.logo {
  height: 40px;
  width: auto;
}
.active {
  font-weight: 600;
  border-bottom: 3px solid rgb(165, 164, 164);
  color: black;
  border-radius: 10px;
}

.content {
  padding-top: 70px; 
}
</style>
