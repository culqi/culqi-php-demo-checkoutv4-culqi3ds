import config from "./index.js";

const culqiConfig = (jsonParams) => {

  Culqi.publicKey = config.PUBLIC_KEY;
  Culqi.settings({
    currency: config.CURRENCY,
    amount: jsonParams.amount,
    title: 'TAXI MAXIN', //Obligatorio para yape
    order: jsonParams.orderId,
    xculqirsaid: config.RSA_ID,
    rsapublickey: config.RSA_PUBLIC_KEY,
  });

  Culqi.options({
    lang: 'auto',
    installments: jsonParams.installments,
    paymentMethods: {
      tarjeta: true,
      bancaMovil: true,
      agente: true,
      billetera: true,
      cuotealo: true,
      yape: true,
    },
    style: {
      //logo: 'https://culqi.com/LogoCulqi.png',
      bannerColor: '', // hexadecimal
      buttonBackground: '', // hexadecimal
      menuColor: '', // hexadecimal
      linksColor: '', // hexadecimal
      buttonText: jsonParams.buttonTex, // texto que tomará el botón
      buttonTextColor: '', // hexadecimal
      priceColor: '' // hexadecimal
    }
  });
}
export default culqiConfig;