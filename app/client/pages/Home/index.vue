<!--
 * @Author: Klien
 * @Date: 2022-02-10 17:17:01
 * @LastEditTime: 2022-02-14 15:44:09
 * @LastEditors: Klien
-->
<template>
	<div>
		<div class="test" @click="jump">Vue3------{{ title }}</div>
		<span>{{ store.state.counter }}</span>
		<button @click="addCount">addCount</button>
		<TestComponents />
	</div>
</template>

<script lang="ts">
	// import { timeOut } from '@/app/language/zh';

	import { defineAsyncComponent, defineComponent } from 'vue';

	import { useRouter } from 'vue-router';

	import { useStore } from 'vuex';

	import { getUserInfo } from '../../api';

	const TestComponents = defineAsyncComponent(() => import('@/components/Text.vue'));

	export default defineComponent({
		components: { TestComponents },
		// asyncData({ store }: any) {
		// 	return store.dispatch('getCount');
		// },
		setup() {
			const title = 'Vue3-App-Home';

			const router = useRouter();

			const store: any = useStore();

			const jump = () => router.push({ path: '/about' });

			const addCount = () => store.dispatch('addCount');

			getUserInfo().then((res: any) => {
				console.log('_getUserInfo', res);
			});

			return {
				title,
				jump,
				addCount,
				store,
			};
		},
	});
</script>

<style lang="less" scoped>
	.test {
		color: red;
	}
</style>
