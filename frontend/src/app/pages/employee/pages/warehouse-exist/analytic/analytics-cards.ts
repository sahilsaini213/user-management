export const WAREHOUSE_DASHBOARD = [{
    heading: "Total Expense",
    key: '$200000.00',
    icon: "pi pi-shopping-cart"
},
{
    heading: "Total Employees",
    key: '10',
    icon: "pi pi-map-marker"
},
{
    heading: "Total Products",
    key: '50',
    icon: "pi pi-map-marker"
},
{
    heading: "Total Stock",
    key: '200',
    icon: "pi pi-inbox"
},
{
    heading: "Closing Stock",
    key: '$0.00',
    icon: "pi pi-comment"
},
{
    heading: "Total Sale",
    key: '$0.00',
    icon: "pi pi-inbox"
},
{
    heading: "Gross Profit",
    key: '$0.00',
    icon: "pi pi-map-marker"
},
{
    heading: "Sales Returns",
    key: "$0.00",
    icon: "pi pi-comment"
},
{
    heading: "Purchase Returns",
    key: "$0.00",
    icon: "pi pi-inbox"
},
{
    heading: "Total Transfer",
    key: '20',
    icon: "pi pi-comment"
}];

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