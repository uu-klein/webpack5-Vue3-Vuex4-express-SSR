<!--
 * @Author: Klien
 * @Date: 2022-02-10 22:32:32
 * @LastEditTime: 2022-02-22 01:28:12
 * @LastEditors: Klien
-->
<template>
	<div class="test">Vue3------{{ title }}</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		setup() {
			const title = 'Vue3-App-Components-Text';

			return {
				title,
			};
		},
	});
</script>

<style lang="css" scoped>
	.test {
		color: greenyellow;
	}
</style>
