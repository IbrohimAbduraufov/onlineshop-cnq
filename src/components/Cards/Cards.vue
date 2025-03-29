<template>
  <section class="cards">
    <div class="container">
      <div class="search">
        <div class="filter__box">
          <ul
            class="filter__list"
            @click="turn = !turn"
            :class="{ active: turn }"
          >
            <li class="filter__list-item">
              {{ activeCategory }}<img src="/img/arrow.svg" alt="" />
            </li>
          </ul>
          <ul class="filter__dropdown" @click="turn = !turn">
            <li class="filter__dropdown-item" @click="filterByPrice">
              По цене
            </li>
            <li class="filter__dropdown-item" @click="filterByName">
              По назв...
            </li>
            <li class="filter__dropdown-item" @click="filterByQuantity">
              По кол-ву
            </li>
          </ul>
          <button class="filter__btn" @click="applyFilter">Применить</button>
        </div>
        <h2 class="products-quantity">
          Общее кол-во товаров - {{ filteredProducts.length }}
        </h2>
      </div>
      <div class="cards__block">
        <div
          class="cards__item"
          @click="getId(el)"
          v-for="el in currentPageProducts"
          :key="el.id"
        >
          <img :src="el.thumbnail" alt="" class="cards__img" />
          <h2 class="cards__title">{{ el.title }}</h2>
          <div class="cards__buy">
            <p class="cards__buy-price">{{ el.price + " $ " }}</p>
            <button class="cards__buy-btn">Купить</button>
          </div>
        </div>
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page="changePage"
        v-if="currentPageProducts"
      />
      <p class="error" v-else>Nothing found...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCards } from "@/stores/cards.js";
import Pagination from "@/components/UI/Pagination.vue";
import { useRouter } from "vue-router";

const storeCards = useCards();
const router = useRouter();

const currentPage = ref(1);
const totalPages = ref(9);
const itemsPerPage = 12;

const turn = ref(false);
const activeCategory = ref("По цене");

const filteredProducts = ref([]);
const sortType = ref("");

function filterByPrice() {
  sortType.value = "price";
  setActiveCategory("По цене");
}

function filterByQuantity() {
  sortType.value = "stock";
  setActiveCategory("По кол-ву");
}

function filterByName() {
  sortType.value = "title";
  setActiveCategory("По назв...");
}

function applyFilter() {
  if (sortType.value === "price") {
    filteredProducts.value = storeCards.products
      .slice()
      .sort((a, b) => a.price - b.price);
  } else if (sortType.value === "stock") {
    filteredProducts.value = storeCards.products
      .slice()
      .sort((a, b) => a.stock - b.stock);
  } else if (sortType.value === "title") {
    filteredProducts.value = storeCards.products
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  }
}

function paginateArray(array, itemsPerPage) {
  const pages = [];
  for (let i = 0; i < array.length; i += itemsPerPage) {
    pages.push(array.slice(i, i + itemsPerPage));
  }
  return pages;
}

const paginatedPages = computed(() => {
  if (!storeCards.products) return [];
  return paginateArray(filteredProducts.value, itemsPerPage);
});

const currentPageProducts = computed(
  () => paginatedPages.value[currentPage.value - 1]
);

function changePage(newPage) {
  currentPage.value = newPage;
}

function getId(el) {
  if (el && el.id) {
    router.push({ name: "CardPage", params: { id: el.id } });
  } else {
    console.error("Ошибка при переходе на страницу карточки");
  }
}

function setActiveCategory(category) {
  activeCategory.value = category;
}

onMounted(async () => {
  await storeCards.getCards();
  filteredProducts.value = storeCards.products
    .slice()
    .sort((a, b) => a.price - b.price);
});
</script>
