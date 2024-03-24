export const ADMIN_DASHBOARD = [{
    heading: "User",
    key: 'userCount',
    icon: "pi pi-user"
}, 
{
    heading: "Brand",
    key: 'brandCount',
    icon: "pi pi-briefcase"
},
{
    heading: "Supplier",
    key: 'supplierCount',
    icon: "pi pi-shopping-cart"
},
{
    heading: "Warehouse",
    key: 'warehouseCount',
    icon: "pi pi-building"
},
{
    heading: "Role",
    key: 'roleCount',
    icon: "pi pi-check-circle"
},
{
    heading: "Biller",
    key: 'billerCount',
    icon: "pi pi-wallet"
}]

const LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const LOSS_PROFIT_DATA = {
    labels: LABELS,
    datasets: [
        {
            label: 'Profit',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            tension: .4
        },
        {
            label: 'Loss',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#ff0000',
            borderColor: '#ff0000',
            tension: .4
        }
    ]
};

export const STOCK_ANALYSIS_DATA = {
    labels: LABELS,
    datasets: [
        {
            label: 'Opening Stock',
            backgroundColor: '#2f4860',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'Closing Stock',
            backgroundColor: '#00bb7e',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

export const OVERALL_REPORT_DATA = {
    labels: ['Purchase', 'Sales', 'Expense', 'Gross Profit'],
    datasets: [
        {
            data: [100, 250, 200, 50],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#ff0000",
                "#4caf50"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#ff0000",
                "#4caf50"
            ]
        }
    ]
};