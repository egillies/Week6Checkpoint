import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getPosts() {

        const res = await api.get('api/posts')
        logger.log('GETTING POSTS]', res.data);

        const posts = res.data.posts.map(p => new Post(p))

        AppState.posts = posts
        // TODO need to save the older and newer posts here when getting data
        // TODO makre suer you do this on ALL requests to retrieve posts
        // REVIEW pokedex vue firesides
    }

    async getPostById(postData) {
        const res = await api.get('api/posts/:id/', postData)

        logger.log('GOT POST BY ID', res.data);

    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)

        logger.log('CREATED POST', res.data);

        const post = new Post(res.data)

        AppState.posts.unshift(post)
    }

    async removePost(postId) {

        const res = await api.delete(`api/posts/${postId}'`)

        logger.log('[removed post]', res.data);

        const postIndex = AppState.posts.findIndex(post => post.id == postId)

        AppState.posts.splice(postIndex, 1)
    }

    // async getNewPageOfPosts(pageNumber) {
    //     const res = await api.get('posts?=${pageNumber}')

    //     const posts = res.data.map(postPojo => new Post(new Post(postPojo)))

    //     logger.log('[GOT NEXT PAGE OF POSTS', res.data);

    //     AppState.posts = posts

    //     AppState.page = res.data.page

    // }

    async changePage(url) {
        const res = await api.get(url)
        logger.log('[CHANGING PAGE]', res.data)
        AppState.posts = res.data.posts
        AppState.newer = res.data.next
        AppState.older = res.data.previous
    }

    async getProfilePosts(profileId) {

        const res = await api.get('api/posts', {
            params: {
                creatorId: profileId,
            }
        })

        logger.log('[GETTING PROFILES]', res.data);
        const profilePosts = res.data.posts.map(p => new Post(p))

        AppState.posts = profilePosts
    }

    setActivePost(post) {
        AppState.activePost = post
    }
}
export const postsService = new PostsService()