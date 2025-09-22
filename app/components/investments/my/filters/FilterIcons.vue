<template>
  <div class="filter-section">
    <div class="filter-icons">
      <div
        class="filter-icon"
        @click="$emit('toggle-search')"
        :class="{ active: showSearch }"
      >
        <img :src="showSearch ? searchCloseIcon : searchIcon" alt="Search" />
      </div>
      <div class="filter-icon" @click="" :class="{}">
        <img src="~/assets/images/menu.svg" alt="Sort" />
      </div>
      <div
        class="filter-icon"
        @click="$emit('toggle-filter-dropdown')"
        :class="{ active: showFilterDropdown }"
      >
        <img :src="showFilterDropdown ? openIcon : closeIcon" alt="Filter" />
      </div>
    </div>
  </div>
</template>

<script setup>
import searchIcon from '~/assets/images/search.svg';
import searchCloseIcon from '~/assets/images/search_opn.svg';
import openIcon from '~/assets/images/page.svg';
import closeIcon from '~/assets/images/page_close.svg';

defineProps({
  showSearch: {
    type: Boolean,
    default: false,
  },
  showFilterDropdown: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['toggle-search', 'toggle-filter-dropdown']);
</script>

<style scoped>
.filter-section {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.filter-icons {
  height: 40px;
  background: #06251e;
  border: 2px solid #0000001a;
  display: flex;
  gap: 24px;
  border-radius: 32px;
  padding: 4px;
}

.filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 8px;
}

.filter-icon img {
  width: 24px;
  height: 24px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .filter-section {
    padding: 10px;
  }

  .filter-icons {
    gap: 16px;
    height: 36px;
  }

  .filter-icon {
    padding: 6px;
  }

  .filter-icon img {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .filter-icons {
    gap: 12px;
    height: 32px;
  }

  .filter-icon {
    padding: 4px;
  }

  .filter-icon img {
    width: 16px;
    height: 16px;
  }
}
</style>
