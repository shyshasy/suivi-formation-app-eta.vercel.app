<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <!-- Logo (si nécessaire, décommentez cette section) -->
        <!-- <router-link to="/" class="navbar-brand" activeClass="active">
          <img src="/src/assets/recipeLogo.jpg" alt="Logo" class="logo">
        </router-link> -->

        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/student" class="nav-link text-white" activeClass="active">Etudiant</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/module" class="nav-link text-white" activeClass="active">Modules</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/registration" class="nav-link text-white" activeClass="active">Inscriptions</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/payment" class="nav-link text-white" activeClass="active">Paiements</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Exemple d'utilisation de `ref` si nécessaire
const noResults = ref(false);
</script>

<style scoped>
/* Style pour le logo (si utilisé) */
.logo {
  height: 40px;
  width: auto;
}

/* Style pour la classe 'active' */
.active {
  font-weight: 600;
  border-bottom: 3px solid rgb(165, 164, 164);
  color: black;
  border-radius: 10px;
}

/* Espacement pour éviter que le contenu soit masqué par la barre de navigation */
.content {
  padding-top: 70px;
}

/* Centrage des menus */
.navbar-collapse {
  display: flex;
  justify-content: center; /* Centre horizontalement les éléments */
}

.navbar-nav {
  gap: 20px; /* Ajoute de l'espace entre les liens */
}
</style>
