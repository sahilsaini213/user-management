export const TAXES = [
  {
    id: 1,
    tax: "0%"
  },
  {
    id: 2,
    tax: "5%"
  },
  {
    id: 3,
    tax: "12%"
  },
  {
    id: 4,
    tax: "18%"
  },
  {
    id: 4,
    tax: "25%"
  },
]

export const PAYMENT_TYPES = [
  {
    id: 1,
    type: "Card"
  },
  {
    id: 2,
    type: "Bank"
  },
  {
    id: 3,
    type: "Cash"
  },
]

export const STATUS = [
  {
    id: 1,
    status: "Completed"
  },
  {
    id: 2,
    status: "Pending"
  }
];

export const PAYMENT_STATUS = [
  {
    id: 1,
    status: "completed"
  },
  {
    id: 2,
    status: "pending"
  },
  {
    id: 3,
    status: "partial"
  },
];

export const getTaxById = (id) => {
  return TAXES.find(tax => tax.id === Number(id))
}

export const getPaymentTypesById = (id) => {
  return PAYMENT_TYPES.find(type => type.id === Number(id))
}

export const getStatusById = (id) => {
  return STATUS.find(status => status.id === Number(id))
}

export const getPaymentStatusById = (id) => {
  return PAYMENT_STATUS.find(status => status.id === Number(id))
}

export const getTaxes = () => {
  return TAXES
}

export const getAllPaymentTypes = () => {
  return PAYMENT_TYPES
}

export const getAllStatus = () => {
  return STATUS
}

export const getAllPaymentStatus = () => {
  return PAYMENT_STATUS
}