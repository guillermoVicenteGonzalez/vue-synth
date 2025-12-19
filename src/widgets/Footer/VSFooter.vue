<template>
	<footer class="VSFooter">
		<a
			class="VSFooter__link"
			href="https://github.com/guillermoVicenteGonzalez"
			target="_blank"
			>github.com/guillermoVicenteGonzalez</a
		>
	</footer>
</template>

<style scoped lang="scss">
.VSFooter {
	width: 100%;
	height: 100%;
	background-color: $tertiary-color;

	color: $text-color;
	font-size: 1.6rem;
	text-align: center;

	display: flex;
	align-items: center;
	justify-content: center;

	&__link {
		color: $text-color;
		text-decoration: none;

		&:hover {
			color: salmon;
		}

		// &:visited {
		// 	color: $text-color;
		// }

		&:active {
			color: salmon;
		}
	}
}
</style>
