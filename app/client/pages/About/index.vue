<!--
 * @Author: Klien
 * @Date: 2022-02-10 17:16:55
 * @LastEditTime: 2022-02-22 01:28:23
 * @LastEditors: Klien
-->
<template>
	<div class="about" @click="jump">Vue3------{{ title }}</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	import { useRouter } from 'vue-router';

	export default defineComponent({
		setup() {
			const title = 'Vue3-App-About';

			const router = useRouter();

			const jump = () => router.push({ path: '/' });

			return {
				title,
				jump,
			};
		},
	});
</script>

<style lang="css" scoped>
	.about {
		color: yellow;
	}
</style>
