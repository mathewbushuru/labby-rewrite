import { combineReducers } from "redux";
import { SET_BILLABLE, SET_INVOICE_LIST, SET_OG_BILLABLE, SET_ACTIVE_ANALYTICS } from "../actions/billingActions";

const defaultBillingList = [];
const defaultInvoiceList = [];
const defaultServiceAnalytics = false;

const billingList = (state = defaultBillingList, action) => {
  switch (action.type) {
    case SET_BILLABLE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const billingListOG = (state = defaultBillingList, action) => {
  switch (action.type) {
    case SET_OG_BILLABLE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const invoiceList = (state = defaultInvoiceList, action) => {
  switch (action.type) {
    case SET_INVOICE_LIST: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const servicesAnalytics = (state = defaultServiceAnalytics, action) => {
  switch (action.type) {
    case SET_ACTIVE_ANALYTICS: {
      return !state;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  billingList,
  invoiceList,
  billingListOG,
  servicesAnalytics
});
