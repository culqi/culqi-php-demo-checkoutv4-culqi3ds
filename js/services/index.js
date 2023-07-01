class Service {
  #BASE_URL = "http://localhost/culqi-php-demo-checkoutv4-culqi3ds";

  #http = async ({ endPoint, method = 'POST', body = {}, headers = {} }) => {
    const authentication_3DS = body.authentication_3DS ? {
      eci: body.authentication_3DS.eci,
      xid: body.authentication_3DS.xid,
      cavv: body.authentication_3DS.cavv,
      protocolVersion: body.authentication_3DS.protocolVersion,
      directoryServerTransactionId: body.authentication_3DS.directoryServerTransactionId,
    } : null;
    try {
      const response = await fetch(`${this.#BASE_URL}/${endPoint}`,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers },
          body: new URLSearchParams({
            amount: body.amount,
            currency_code: body.currency_code,
            email: body.email,
            token: body.source_id,
            customer_id: body.customer_id,
            deviceId: body.antifraud_details.device_finger_print_id,
            ...authentication_3DS,
          }),
          method
        });
      const responseJSON = await response;
      return { statusCode: response.status, data: responseJSON }
    } catch (err) {
      return { statusCode: 502, data: null }
    }
  }

  #http2 = async () => {
    
    const response = await $.ajax({
      type: 'GET',
      url: 'http://localhost/culqi-php-demo-checkoutv4-culqi3ds/ajax/order.php',
    });
    const responseJSON = await JSON.parse(response);
    if (responseJSON.object === "order") {
      return { statusCode: 200, data: responseJSON }
    } else {
      return { statusCode: 401, data: responseJSON }
    }
  }

  createOrder = async (bodyOrder) => {
    return this.#http2();
  }
  createCard = async (bodyCard) => {
    return this.#http({ endPoint: "ajax/card.php", body: bodyCard });
  }
  createCharge = async (bodyCharge) => {
    return this.#http({ endPoint: "ajax/charge.php", body:bodyCharge});
  }
}
export default Service;
