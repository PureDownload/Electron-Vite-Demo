<template>
    <div class="app-container">Hello World!!!</div>
    <button @click="getEnv">查询环境变量</button>
</template>
<script setup>
    function getEnv() {
        console.log('<===== winURL', process.env)
    }
</script>