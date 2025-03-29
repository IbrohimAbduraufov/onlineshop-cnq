<template>
  <header class="header">
    <div class="container">
      <div class="header__nav">
        <router-link to="/" class="header__logo">
          <img src="/img/logo.png" alt="" />
        </router-link>
        <ul
          class="header__nav-list"
          :class="{ active: burger }"
          @click="burger = false"
        >
          <li><a class="header__nav-link" href="#">Новинки</a></li>
          <li><a class="header__nav-link" href="#">Категории</a></li>
          <li><a class="header__nav-link" href="#">Скидки</a></li>
          <li><a class="header__nav-link" href="#">Контакты</a></li>
          <li><a class="header__nav-link" href="#">О нас</a></li>
        </ul>
        <div class="header__both">
          <a href="">
            <img class="header__cart" src="/img/cart.svg" alt="" />
          </a>
          <button
            class="menu"
            @click="burger = !burger"
            :class="{ active: burger }"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const burger = ref(false);
</script>
