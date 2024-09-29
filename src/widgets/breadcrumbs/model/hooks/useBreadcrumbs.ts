// Define the interface for breadcrumbs
interface Breadcrumbs {
    name: string;
    link: string;
}

let breadcrumbs: Ref<Breadcrumbs[]> | null = null;

export const useBreadcrumbs = () => {
    if (!breadcrumbs) {
        console.log('Initializing global breadcrumbs state');
        breadcrumbs = ref<Breadcrumbs[]>([
            { name: 'Смартфоны и гаджеты', link: '/' },
            { name: 'Смартфоны', link: '/' },
        ]);
    }

    const getBreadcrumbs = computed(() => breadcrumbs!.value);

    const addBreadcrumb = (product: { name: string; id: number }) => {

        const exists = breadcrumbs!.value.some(
            (breadcrumb) => breadcrumb.link === `/product/${product.id}`
        );

        if (!exists) {
            breadcrumbs!.value.push({
                name: product.name,
                link: `/product/${product.id}`,
            });
            console.log('Updated breadcrumbs:', getBreadcrumbs.value);
        }
    };

    const removeBreadcrumb = (id: number) => {
        breadcrumbs!.value = breadcrumbs!.value.filter(
            (breadcrumb) => breadcrumb.link !== `/product/${id}`
        );
    };

    return {
        getBreadcrumbs,
        addBreadcrumb,
        removeBreadcrumb,
    };
};
