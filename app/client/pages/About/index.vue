<!--
 * @Author: Klien
 * @Date: 2022-02-10 17:16:55
 * @LastEditTime: 2022-02-10 18:06:42
 * @LastEditors: Klien
-->
<template>
	<div class="test" @click="jump">Vue3------{{ title }}</div>
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

<style lang="less" scoped>
	.test {
		color: yellow;
	}
</style>
