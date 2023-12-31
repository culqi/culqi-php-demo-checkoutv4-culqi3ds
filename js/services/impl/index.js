import Service from "../index.js"
import config , { customerInfo } from "../../config/index.js"

const service = new Service();

export const generateOrderImpl = async () => {
  const bodyRequest = {
    amount: config.TOTAL_AMOUNT,
    currency_code: config.CURRENCY,
    //description: 'Venta de prueba',
    //order_number: 'pedido-' +(new Date).getTime(),
    client_details: {
      first_name: customerInfo.firstName,
      last_name: customerInfo.lastName,
      email: customerInfo.email,
      phone_number: customerInfo.phone
    },
  }
  return service.createOrder(bodyRequest);
}

export const generateCardImpl = async ({ customerId, email, tokenId, deviceId, parameters3DS = null }) => {
  const bodyRequest = {
    amount: config.TOTAL_AMOUNT,
    currency_code: config.CURRENCY,
    email: email,
    source_id: tokenId,
    customer_id: customerId,
    antifraud_details: {
      device_finger_print_id: deviceId,
    },
  }
  return service.createCard(parameters3DS ? { ...bodyRequest, authentication_3DS: { ...parameters3DS } } : bodyRequest);
}


export const generateChargeImpl = async ({tokenId, deviceId, email, parameters3DS = null}) => {
  var data_fraud = {
   phone_number: "961778965",
   device_finger_print_id: deviceId,
}
  var data = {
    amount : config.TOTAL_AMOUNT,
    currency_code : config.CURRENCY,
    email : email,
    source_id : tokenId,
    antifraud_details : data_fraud
    };
    console.log("json");
    console.log(data);

  return service.createCharge(parameters3DS ? { ...data, authentication_3DS: { ...parameters3DS } } : data);
}