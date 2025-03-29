<template>
  <div class="container">
    <div>
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div v-if="card">
          <div class="card">
            <div class="card__swiper">
              <Swiper
                :slides-per-view="1"
                :autoplay="{
                  delay: 2500,
                  disableOnInteraction: false,
                }"
                :navigation="true"
                :modules="modules"
                centeredSlides: true
                class="card__swiper"
              >
                <SwiperSlide class="card__swiper-slide" v-for="(img, i) in card.images" :key="i">
                  <img class="card__img" :src="img" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div class="card__content">
              <h2 class="card__content-title">{{ card.title }}</h2>
              <p class="card__content-description">{{ card.description }}</p>
              <div class="card__buy">
                <h3 class="card__buy-price">{{ card.price + '$' }}</h3>
                <button class="card__buy-btn" @click="addToCart">Купить</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="!isLoading">
          <p>Карточка с идентификатором {{ route.params.id }} не найдена.</p>
        </div>
        <div v-else>
          <p>Ошибка при получении карточки</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCards } from "@/stores/cards.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

const route = useRoute();
const storeCards = useCards();
const card = ref(null);
const isLoading = ref(true);

const modules = [Autoplay, Navigation];

onMounted(async () => {
  try {
    await storeCards.getCards();
    const cardId = Number(route.params.id);
    card.value = storeCards.products.find((item) => item.id === cardId);
    isLoading.value = false;
    console.log(card.value);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    isLoading.value = false;
  }
});
</script>
