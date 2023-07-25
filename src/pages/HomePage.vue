<template>
  <div class="container-fluid">
    <!-- TODO need a form for creatinga  post -->

      <div class="col-6">

      <div class="row">
        <button @click="createPost()" v-if="account.id" class="btn btn-secondary fs-4">Create Post</button>
        <form @submit.prevent="handleSubmit()">
          
          <div class="form-floating mb-3">
            <input v-model="editable.body" required type="text" class="form-control" id="body" placeholder="Body...">
            <label for="Body">Body</label>
          </div>
          <div class="form-floating mb-3">
      <input v-model="editable.imgUrl" required type="url" class="form-control" id="imgUrl" placeholder="ImgUrl...">
      <label for="imgUrl">ImgUrl</label>
    </div>
   
    <button type="submit" button class="btn btn-success">Submit</button> Submit
  </form>
</div> 
  
    </div> 

      <h1>Posts</h1>
<div v-if="account.id">
  <div  class="col-9" v-for="post in posts" :key="post.id">
    <!-- <button v-on:click="post.likeId++">Like Post</button> -->
    <!--STUB PostCard-->
    <PostCard :post="post" />
    
    <!-- <div class="card">
      <img class="img-fluid" :src="post.imgUrl" alt="">
      <div class="d-flex align-items-center">
        <h3> {{ post.body }}</h3>
      </div>
    </div> -->
  </div>

</div>
      
      <div class="d-flex justify-content-around">
        <button class="btn btn-success" @click="changePage(older)" :disabled="!older">Older</button>
            <button class="btn btn-success" @click="changePage(newer)">Newer</button>
          </div>
  
  
      <div class="col-3" v-for="ad in ads" :key="ad.title">
        
        <!--STUB ad request to api-->
      <!-- <AdCard :ad="ad" /> -->
      <div class="card">
        <img class="img-fluid" :src="ad.banner" alt="" />
        <div class="d-flex align-items-center">
          <!-- TODO need an image tag to actually see the adss -->
          <!-- <img class="img-fluid" :src="ad.linkUrl" alt="ad.title"> -->
          <!-- <p> {{ ad.banner }}</p> -->
        
          <!-- <p> {{ ad.linkUrl }}</p>
          <p> {{ ad.banner }}</p> -->
        </div>
        <div class="d-flex align-items-center">
          <p> {{ ad.title }}</p>
          <!-- <p> {{ ad.linkUrl }}</p> -->
          <!-- <p> {{ ad.banner }}</p> -->
        </div>
  </div>
      </div>
    
    </div> 

    <!-- </div> -->

</template>

<script>
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';
import { logger } from '../utils/Logger.js';

export default {
  setup() {
    const editable = ref({})

    function setFormDefaults(){
      editable.value = {}
    }
  

    async function getPosts(){
      try {
      await postsService.getPosts()
    } catch (error) {
      Pop.error('[ERROR GETTING POSTS]', error.message)
    }
  }

  async function getAds(){
    try {
      await adsService.getAds()
    } catch (error) {
      Pop.error('[ERROR GETTING ADS]', error.message)
    }

    // setAdImages(){

    // const newAds = AppState.ads
    
    // const htmlBody = document.body
    
    // const htmlBody.style.backgroundImage = `url(${ads.banner})`

    // }
  }


  onMounted(() => {
    getPosts()
    getAds()
    setFormDefaults()
  })

  return {
editable,


    posts: computed(() => AppState.posts),
    account: computed(() => AppState.account),
    ads: computed(() => AppState.ads),
    older: computed(() => AppState.older),
    newer: computed(() => AppState.newer),

    async changePage(url) {
      try {
        logger.log('change page', url)
        await postsService.changePage(url)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
        }
    }
  }
  }
}

</script>

<style scoped lang="scss">

</style>
