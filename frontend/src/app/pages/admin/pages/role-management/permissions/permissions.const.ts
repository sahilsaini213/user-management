const LEAF_NODES = [
    {
        id: "add",
        title: "Add"
    },
    {
        id: "view",
        title: "View"
    },
    {
        id: "edit",
        title: "Edit"
    },
    {
        id: "delete",
        title: "Delete"
    }
]

export const MODULES = [

    {
        id: "product",
        title: "Product",
        childs: LEAF_NODES
    },
    {
        id: "barcode",
        title: "Barcode",
        childs: LEAF_NODES
    },
    {
        id: "transfer",
        title: "Transfer",
        childs: LEAF_NODES
    },
    {
        id: "sale",
        title: "Sale",
        childs: LEAF_NODES
    },
    {
        id: "stock_report",
        title: "Stock Report",
        childs: LEAF_NODES
    }
]