<!--
 * @Author: Klien
 * @Date: 2022-02-10 17:17:01
 * @LastEditTime: 2022-07-26 02:30:05
 * @LastEditors: Klien
-->
<template>
	<div>
		<div class="home-test" @click="jump">Vue3------{{ title }}</div>
		<span>{{ store.state.counter }}</span>
		<button @click="addCount">addCount</button>

		<p>1111111111 {{ data }}</p>
		<TestComponents />
	</div>
</template>

<script lang="ts">
	// import { timeOut } from '@/app/language/zh';

	import { defineAsyncComponent, defineComponent } from 'vue';

	import { useRouter } from 'vue-router';

	import { useStore } from 'vuex';

	import { getUserInfo } from '@/api';

	import { useQuery } from '../../composables/query';

	const TestComponents = defineAsyncComponent(() => import('@/components/Text.vue'));

	export default defineComponent({
		components: { TestComponents },
		// asyncData({ store }: any) {
		// 	return store.dispatch('getCount');
		// },
		setup() {
			const title = 'Vue3-App-Home';

			const router = useRouter();

			const { data } = useQuery('getUserInfo', async () => {
				// const { data: result }: any = await getUserInfo();
				// return result;
				return { data: 123 };
			});

			const store: any = useStore();

			const jump = () => router.push({ path: '/about' });

			const addCount = () => {
				store.dispatch('addCount');
			};

			return {
				title,
				jump,
				addCount,
				store,
				data,
			};
		},
	});
</script>

<style lang="less" scoped>
	.home-test {
		color: red;
	}
</style>
