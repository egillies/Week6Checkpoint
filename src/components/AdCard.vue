<template>
  <div class="card">
        <img class="img-fluid" :src="ad.linkUrl" alt="">
        <div class="d-flex align-items-center">
          <h3> {{ ad.title }}</h3>
          <p> {{ ad.linkUrl }}</p>
          <p> {{ ad.banner }}</p>
        </div>
        <div class="d-flex align-items-center">
          <h3> {{ ad.title }}</h3>
          <p> {{ ad.linkUrl }}</p>
          <p> {{ ad.banner }}</p>
        </div>
  </div>
</template>

<script>

export default {

}
</script>

