<template>
<div id="user-creation-view">
    <h1>User here</h1>
</div>
</template>
<script>
// User should always be redirected to this View when he logs in
import axios from "axios";

export default {
    name: "UserView",
    async mounted() {
        const response = await axios.get("/user-state/");
        if (response.data.is_company == "Not Created") {
            // push router to create company or job seeker profile
        } else if (response.data.is_company) {
            // push router to company infos page
        } else {
            // push router to job seeker infos page
        }
    }
}
</script>
