<!--
 * @Author: Klien
 * @Date: 2022-02-09 21:38:42
 * @LastEditTime: 2022-02-22 14:03:36
 * @LastEditors: Klien
-->
<template>
	<div class="aaaa">
		<nav>
			<ul>
				<li>
					<router-link :to="{ name: 'Home' }"> Home </router-link>
				</li>
				<li>
					<router-link :to="{ name: 'About' }"> About </router-link>
				</li>
			</ul>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'App',

		setup() {},
	});
</script>
