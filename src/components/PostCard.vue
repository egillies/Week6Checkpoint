<template>
    <div class="card" v-if="post"> 
        <!-- TODO need all properties for the post -->
        <!-- TODO need to add like count and createdAt -->
        <img class="img-fluid post-img" :src="post.imgUrl" alt="">
        <div class="d-flex align-items-center">
            <h3> {{ post.body }} </h3>
            <div class="d-flex">
                <p> {{ post.creator.name }}</p>
                <!-- <p> {{ post.creator.picture }}</p> -->
                <p> {{ post.createdAt.toLocaleString() }}</p>
                <!-- <p> {{ post.likeIds }}</p> -->
            </div>
            <router-link :to="{name: 'Profiles', params: {profileId: post.creatorId}}">
                <img class="img-fluid avatar" :src="post.imgUrl">
            </router-link>
        </div>
        <div class="p-2">
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="postModal" @click="setActivePost()">See Post</button></div>
        </div>
        <div v-if="post?.creatorId == account?.id">
        <button @click="removePost(post.postId)" class="btn btn-danger" title="Delete this Post" type="button">
        <i class="mdi mdi-delete"></i> 
          </button>
        </div> 


        <!-- TODO need to finish the delete here -->
        <!-- TODO make sure to pass down the post id here when calling the remove function -->
</template>

<script>
import { AppState } from '../AppState.js';
import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';


export default {

    props: {
        post: {type: Post, required: true
        },

        setup(props){
            return {
                account: computed(() => AppState.account),

                    setActivePost(){
                    postsService.setActivePost(props.post)
                    },
                
                async removePost(){
                    
                                try {
                                    const wantsToRemovePost = await Pop.confirm(`Are you sure you want to delete ${props.postProp.id}?`)
                
                                    if (!wantsToRemovePost){
                                    return
                                }
                
                                const postId = props.post.id
                
                                logger.log(postId)
                    
                                await postsService.removePost(postId)
                                } catch (error) {
                                    Pop.error(error.message)
                                }
                            }
            }
        }
    }
}

</script>

<style lang="scss" scoped>

.post-img {
    width: 20%;
    object-fit: cover;
    object-position: center;
}
.avatar{
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    object-fit: cover;
object-position: center;
}
</style>