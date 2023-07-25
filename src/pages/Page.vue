<template>
    <div></div>
</template>

<script>

export default()
    setup(){
        const editable = ref({})

  async function getPosts(){
    try {
      await postsService.getPosts()
        } catch (error) {
          Pop.error('[ERROR GETTING POSTS]', error.message);
            }
          }

          async function getPostById(postId){
              try {
              await postsService.getPostById(postId)
                } catch (error) {
              Pop.error('[ERROR GETTING POSTS BY ID]', error.message);
              }
          }

          async function getAds(){
            try {
                await adsService.getAds()
                    } catch (error) {
                        Pop.error('[ERROR GETTING ADS]', error.message);
                        }
                            }
                        }

    return {
editable,

    onMounted(() => {
      // NOTE used to set up our defaults when this component is mounted
      setFormDefaults()
    })

    return {
      editable,

}

</script>

