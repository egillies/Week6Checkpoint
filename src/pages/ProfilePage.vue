<template>
<div class="container-fluid" v-if="profile">
        <div class="row justify-content-center">
            <div class="col-12">
                <img :src="profile.coverImg" class="profile-img" alt="">
                <h1>{{ profile.name }}</h1>
                <p> {{ profile.bio }}</p>
                <a v-if="profile.linkedin" :href="profile.linkedin"><i class="mdi mdi-linkedin"></i></a>
                <a v-if="profile.github" :href="profile.github"><i class="mdi mdi-github"></i></a>
                <p v-if="profile.graduated">graduated </p>
                <p v-if="profile.class"> {{ profile.class }}</p>
            </div>
                
                            <div class="col-12" v-for="post in profilePosts" :key="post.id">
                                <div class="d-flex justify-content-around">
        <button class="btn btn-success" @click="changePage(older)" :disabled="!older">Older</button>
            <button class="btn btn-success" @click="changePage(newer)">Newer</button>
          </div>
                                <PostCard :post="post" />
                            </div>
        </div>
    </div>
    <!-- TODO add ads here -->



</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { computed, onMounted, reactive } from 'vue';
import { profilesService } from '../services/ProfilesService.js'
import { adsService } from '../services/AdsService.js';



export default {
    setup(){
        const route = useRoute()
        
        async function getProfile(){
            try {
                const profileId = route.params.profileId
                logger.log('route', route)  
                await profilesService.getProfile(profileId)
                
            } catch (error) {
                Pop.error(error.message)
            }
        }
        
        async function getProfilePosts(){
            try {
                const profileId = route.params.profileId
                await postsService.getProfilePosts(profileId)
            } catch (error) {
                Pop.error(error.message);
            }
        }

        async function getAds(){
            try {
                await adsService.getAds()
            } catch (error) {
                Pop.error('[ERROR GETTING ADS]', error.message)
            }
    }

    onMounted(() => {
        getProfile()
        getProfilePosts()
        getAds()
    })
    
    return {
        profile: computed(() => AppState.activeProfile),
        posts: computed(() => AppState.posts),
        ads: computed(() => AppState.ads),
        older: computed(() => AppState.older),
        newer: computed(() => AppState.newer),
        profilePosts: computed(() => AppState.posts),
        coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),


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

<style lang="scss" scoped>
.profile-img {
    width: 20%;
    object-fit: cover;
    object-position: center;
}
.profileInfo{
  width: 60%;
  display: flex;
}
.profileCover{
  height: 30vh;
  background-image: v-bind(imgUrl);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}


</style>