<!--
 * @Author: Klien
 * @Date: 2022-02-10 22:32:32
 * @LastEditTime: 2022-02-10 22:32:33
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

<style lang="less" scoped>
	.test {
		color: greenyellow;
	}
</style>
