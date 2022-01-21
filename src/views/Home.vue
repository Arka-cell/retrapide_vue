<template>
  <div>
    <JobOfferList />
  </div>
</template>

<script>
// @ is an alias to /src
import JobOfferList from "@/components/JobOfferList"

export default {
  name: "Home",
  components: {
    JobOfferList
  }
};
</script>
