<template>
    <nav class="breadcrumbs" aria-label="breadcrumb">
        <ol class="breadcrumb-list">
            <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="flex items-center">
                <nuxt-link
                        v-if="index < breadcrumbs.length - 1"
                        :to="breadcrumb.link"
                        class="breadcrumb-link"
                        replace
                >
                    {{ breadcrumb.name }}
                </nuxt-link>
                <span v-else class="breadcrumb-current">{{ breadcrumb.name }}</span>
                <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">></span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { useBreadcrumbs } from "~/src/widgets/breadcrumbs/model/hooks";

const { getBreadcrumbs: breadcrumbs } = useBreadcrumbs();
</script>

<style scoped>
.breadcrumbs {
    display: flex;
    align-items: center;
    padding: 0 16px;
}

.breadcrumb-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
}

.breadcrumb-link {
    color: #0071e3;
    text-decoration: none;
    font-size: 14px;
}

.breadcrumb-current {
    color: #333;
    font-weight: bold;
    font-size: 14px;
}

.breadcrumb-separator {
    margin: 0 8px;
    color: #ccc;
}

@media (max-width: 768px) {
    .breadcrumbs {
        font-size: 12px;
        padding: 0 8px;
    }

    .breadcrumb-link {
        font-size: 12px;
    }

    .breadcrumb-current {
        font-size: 12px;
    }

    .breadcrumb-separator {
        margin: 0 4px;
    }
}
</style>
