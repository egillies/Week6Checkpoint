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

            <!--NOTE raw data dump works-->
                       
                <!-- <div class="col-12">
                    {{ profilePosts }}
                </div>  -->
                
                            <div class="col-12" v-for="post in profilePosts" :key="post.id">
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

    onMounted(() => {
        getProfile()
        getProfilePosts()
    })

    return {
        profile: computed(() => AppState.activeProfile),
        profilePosts: computed(() => AppState.posts),
        coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`)
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