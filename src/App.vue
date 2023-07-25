<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h1 class="modal-title fs-5" id="postModalLabel">{{ activePost.name }}</h1> -->
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row">
            <!-- {{ activePost.imgUrl }} -->
            
            <!-- <div class="col-12 mb-3" v-for="img in activePost.imgUrl" :key="img">
            
              <img class="img-fluid" :src="img" alt=""> -->
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
  </div> 

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


export default {
  setup() {
    return {
      appState: computed(() => AppState),
      activePost: computed(() => AppState),
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
