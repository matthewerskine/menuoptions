// import Nova from 'laravel-nova';

export default async () => {
    return [
        {
            id: 1,
            name: 'Cheese',
            option_values: [
                {
                    value: 'salt',
                    price: 10.20,
                    stock_quantity: 0,
                    subtract_stock: false,
                }, {
                    value: 'pepper',
                    price: 3.80,
                    stock_quantity: 0,
                    subtract_stock: false,
                }
            ]
        },
        {
            id: 1,
            name: 'Steak Sauces',
            option_values: [
                {
                    value: 'Peppercorn',
                    price: 3.20,
                    stock_quantity: 0,
                    subtract_stock: false,
                }, {
                    value: 'Diane',
                    price: 4,
                    stock_quantity: 0,
                    subtract_stock: false,
                }
            ]
        },
    ];

    // return await Nova.request().get(
    //     `/nova-vendor/location-menu-item-option-selector/get-location-menu-items/${this.resourceId}`
    // );
}
