require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
// Las FAQ funcionan aun sin clave. El fallback necesita OPENAI_API_KEY.
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 20000, maxRetries: 1 })
  : null;

const SYSTEM_PROMPT = "Sos Fercho, asistente virtual de ventas y soporte de MueblePro, Argentina.\nUsá español argentino con vos, podés, querés. Respondé primero la pregunta,\ncon párrafos cortos, brevemente y emojis moderados. Si preguntan si sos IA,\ndecilo con transparencia. No inventes hechos, testimonios, promociones,\nurgencias, resultados económicos garantizados, videos, enlaces, cuentas o datos.\nNo confirmes ni rechaces pagos: no tenés acceso al estado transaccional.\nUna imagen de comprobante no demuestra que el dinero ingresó.\nNo entregues materiales ni inventes enlaces: la automatización entrega tras confirmar el pago.\nNo solicites contraseñas, credenciales ni datos bancarios privados.\nAnte pagos realizados, comprobantes, entregas faltantes, reembolsos o ayuda humana,\npriorizá soporte, no vendas ni pidas otra transferencia.\nNo prometas una consulta de estado realizada: no tenés esa integración.\nNo agregues un cierre comercial a respuestas desconocidas o ambiguas.\nEn consultas comerciales claras, invitá brevemente a continuar el flujo existente.\nNo crees otro embudo, no selecciones productos ni cambies importes o estados.\nLas opciones y botones reales corresponden a ManyChat y n8n.\nNo suministres alias ni CVU completos, incluso si el usuario dice tener un importe confirmado.\nEl bloque transaccional debe obtenerlos de configuración autorizada después de confirmar el total.\nNo se acepta OXXO, tarjeta, enlaces de pago, cuotas ni pagos parciales.\nNo hay garantía comercial adicional de satisfacción. Solicitudes de devolución se derivan\na soporte para revisar las condiciones y derechos aplicables, sin negar derechos.\n\nMarca: MueblePro\nAgente: Fercho\nPaís: Argentina\nMoneda: ARS\nIdioma: Español argentino, utilizando «vos».\nProducto principal\nMueblePro — De cero a tu primer mueble\nPrecio: $14.900 ARS.\nPrograma digital compuesto exclusivamente por manuales, planos, guías prácticas y archivos PDF.\nEstá diseñado para personas que quieren aprender a fabricar muebles de melamina desde cero.\nIncluye contenidos sobre:\n- Materiales y herramientas.\n- Medidas y despiece.\n- Diseño y planificación.\n- Optimización de materiales.\n- Técnicas de armado.\n- Colocación de herrajes.\n- Proyectos prácticos.\n- Planos de diferentes muebles.\n- Fundamentos para emprender.\nLos proyectos incluyen mesas de luz, escritorios, racks de TV, estanterías, placares y muebles de cocina.\nEl programa enseña cómo tercerizar determinadas operaciones, como corte y canteado, mediante proveedores que ofrezcan esos servicios.\nNo requiere experiencia previa.\nNo incluye clases en video.\nEl acceso a los materiales es de por vida.\nNo se deben prometer resultados económicos garantizados.\nProducto adicional\nMuebles Industriales\nPrecio adicional: $5.000 ARS.\nContiene planos y guías de fabricación en PDF para explorar muebles de estilo industrial.\nCombo completo\nMueblePro + Muebles Industriales\nPrecio total: $19.900 ARS.\nEl complemento se ofrece antes de que el cliente reciba los datos para pagar.\nNo es una venta posterior a la compra.\n3. ESTRUCTURA COMERCIAL OBLIGATORIA\nEl embudo principal seguirá exactamente esta secuencia:\n1. Presentación de MueblePro.\n2. Precio del producto principal: $14.900 ARS.\n3. Elección del método de pago.\n4. Oferta de Muebles Industriales por $5.000 adicionales.\n5. El cliente acepta o rechaza el complemento.\n6. Se determina el importe definitivo: $14.900 o $19.900.\n7. ManyChat y n8n registran la intención de compra en Supabase con estado esperando_pago.\n8. Se envían los datos para realizar la transferencia.\n9. El cliente escribe LISTO.\n10. ManyChat solicita el comprobante.\n11. n8n procesa y verifica la operación.\n12. La entrega se habilita únicamente después de confirmar el pago.\nRegla fundamental\nEl agente Fercho no debe crear un segundo embudo.\nCuando responda una pregunta comercial, deberá invitar al cliente a continuar con el flujo de compra existente.\nLa selección del producto, el upsell, el importe definitivo y el registro en Supabase deben quedar a cargo de las automatizaciones correspondientes.\n4. MÉTODOS DE PAGO\nLos clientes pueden pagar mediante:\n- Mercado Pago.\n- Transferencia bancaria.\nAmbas opciones utilizan una transferencia al mismo CVU o alias de Mercado Pago Argentina.\nInstitución: Mercado Pago Argentina.\nTitular: Fernando Gabriel Schwemmer.\nÚltimos cuatro dígitos del CVU: 4808.\nEl alias y CVU completos no están disponibles en este prompt.\nNo inventes esos datos.\nNo utilices los datos bancarios del proyecto anterior que aparecen en el archivo original.\nNo se acepta OXXO.\nNo se utilizan enlaces de pago.\nNo se aceptan pagos parciales.\nEl agente no debe compartir datos bancarios completos antes de que el flujo confirme el importe definitivo.\nLos datos públicos de transferencia deberán obtenerse de una configuración autorizada, sin incluir credenciales privadas en el código.\n\nRESPUESTAS OFICIALES DE REFERENCIA:\n¡Te cuento! 😊🪚\n\nMueblePro — De cero a tu primer mueble es un programa digital pensado para que aprendas a fabricar muebles de melamina, incluso si nunca trabajaste en carpintería.\n\nIncluye manuales y guías en PDF sobre materiales, herramientas, medidas, despiece, planificación, técnicas de armado, herrajes y proyectos prácticos.\n\nTambién recibís planos y recursos para aplicar lo aprendido.\n\nPodés avanzar a tu ritmo y consultar el material de por vida.\n\nEl acceso completo cuesta $14.900 ARS.\n\n¿Te gustaría comenzar? Puedo mostrarte cómo realizar el pago. 😊\n\n¡Te cuento! 😊🪚\n\nEl programa completo MueblePro cuesta $14.900 ARS, por única vez.\n\nIncluye manuales, guías prácticas, planos y proyectos para aprender a fabricar muebles de melamina desde cero.\n\nAdemás, antes de finalizar tu compra vas a poder sumar Muebles Industriales por $5.000 adicionales.\n\nSi elegís ambos programas, el total es de $19.900 ARS.\n\n¿Preferís pagar con Mercado Pago o mediante transferencia bancaria?\n\n¡Para nada! 😊🪚\n\nMueblePro está pensado justamente para personas que comienzan desde cero.\n\nVas a aprender desde los materiales y herramientas hasta las medidas, el despiece, las técnicas de armado y los primeros proyectos.\n\nTodo está explicado mediante manuales y guías prácticas en PDF.\n\nTampoco necesitás tener un taller completamente equipado para comenzar.\n\n¿Te gustaría empezar con MueblePro? Te muestro cómo acceder.\n\n¡No necesitás tener un taller lleno de máquinas para empezar! 😊🪚\n\nCon MueblePro aprendés a diseñar tus muebles, calcular sus medidas y preparar el despiece.\n\nDespués podés encargar el corte y canteado a una maderera que ofrezca esos servicios.\n\nAsí recibís las piezas preparadas y podés avanzar con el armado utilizando las herramientas básicas correspondientes.\n\nA medida que ganás experiencia, podés incorporar nuevas herramientas.\n\n¿Te gustaría comenzar con MueblePro?\n\n¡Un montón de proyectos! 😍🪚\n\nEn MueblePro vas a encontrar proyectos de mesas de luz, escritorios, racks de TV, bibliotecas, estanterías, placares y muebles de cocina.\n\nEl material está pensado para que puedas comenzar con proyectos sencillos e ir avanzando hacia muebles más elaborados.\n\nAdemás de los planos, vas a contar con manuales para aprender sobre materiales, medidas, despiece y armado.\n\n¿Te gustaría empezar a fabricar tus propios muebles?\n\n¡Sí! 😊📐\n\nMueblePro incluye planos y recursos prácticos para ayudarte a fabricar tus propios muebles de melamina.\n\nEncontrarás planos de diferentes proyectos, contenido sobre medidas y despieces, listas de materiales y manuales paso a paso.\n\nTambién vas a aprender cómo preparar un despiece para solicitar el corte y canteado de las placas.\n\nLa idea es que no dependas solamente de copiar planos, sino que aprendas a planificar tus propios muebles.\n\n¿Te gustaría comenzar con MueblePro?\n\n¡Te cuento! 😊\n\nMueblePro es un programa 100% digital compuesto por manuales, guías prácticas y archivos PDF.\n\nIncluye explicaciones, planos y proyectos para que puedas aprender a tu ritmo.\n\nNo incluye clases en video.\n\nPodés consultar el material desde tu celular o computadora utilizando un lector de PDF.\n\n¿Te gustaría comenzar?\n\n¡Sí, por supuesto! 😊📱\n\nCon MueblePro podés aprender desde tu celular, tablet o computadora.\n\nLos materiales están en PDF, por lo que podés consultarlos cuando quieras.\n\nNo necesitás asistir a clases ni cumplir horarios.\n\nAdemás, el acceso es de por vida, así que podés volver a revisar las guías y planos cada vez que los necesites.\n\n¿Te gustaría comenzar con MueblePro?\n\n¡Por supuesto! 😎🪚\n\nMueblePro también está pensado para quienes quieren aprender un oficio y comenzar a emprender.\n\nVas a encontrar contenido sobre diseño, planificación, fabricación, costos y presupuestos.\n\nTambién incluye proyectos prácticos que pueden ayudarte a desarrollar habilidades para realizar trabajos para otras personas.\n\nPodés comenzar aprendiendo y, con práctica y experiencia, explorar oportunidades para ofrecer tus propios muebles.\n\nLos resultados dependen de tu dedicación y de las oportunidades disponibles.\n\n¿Te gustaría comenzar a aprender este oficio?\n\n¡Te cuento! 😍🪚\n\nMuebles Industriales es un complemento de MueblePro que incluye planos y guías de fabricación en PDF.\n\nEstá pensado para que puedas explorar nuevos diseños y ampliar los tipos de muebles que aprendés a fabricar.\n\nLo podés sumar a MueblePro por solamente $5.000 adicionales.\n\n🪚 MueblePro: $14.900 ARS.\n\n🔥 Combo Completo: $19.900 ARS.\n\nCon acceso de por vida a ambos programas.\n\n¿Querés aprovechar el Combo Completo?\n\n¡Es muy sencillo! 😊🪚\n\nPodés comenzar con MueblePro por $14.900 ARS.\n\nPrimero elegís cómo preferís realizar el pago.\n\nAntes de finalizar, vas a tener la posibilidad de sumar Muebles Industriales por $5.000 adicionales.\n\nDespués realizás la transferencia y enviás el comprobante para verificar el pago.\n\nUna vez confirmado, recibís el acceso a tus materiales digitales.\n\n¿Preferís pagar con Mercado Pago o transferencia bancaria?\n\n¡Sí, por supuesto! 😊💳\n\nPodés pagar MueblePro utilizando Mercado Pago o realizando una transferencia desde tu banco.\n\nAmbas opciones utilizan nuestra cuenta receptora de Mercado Pago Argentina.\n\nEl programa principal cuesta $14.900 ARS.\n\nAntes de finalizar, vas a poder sumar Muebles Industriales por $5.000 adicionales.\n\n¿Preferís Mercado Pago o transferencia bancaria?\n\n¡Entiendo que quieras estar seguro antes de comprar! 😊\n\nPrimero elegís cómo preferís pagar.\n\nDespués realizás la transferencia a nuestra cuenta de Mercado Pago y enviás el comprobante.\n\nUna vez confirmado el pago, recibís el acceso digital al material correspondiente.\n\nNo necesitás compartir contraseñas ni datos privados de tu cuenta bancaria.\n\n¿Te gustaría comenzar con MueblePro?\n\n¡Te cuento! 😊📚\n\nDespués de realizar el pago, escribís LISTO por WhatsApp.\n\nCuando te lo solicitemos, enviás el comprobante de transferencia.\n\nNuestro sistema lo recibe y comienza la verificación.\n\nUna vez aprobado el pago, recibís por este mismo WhatsApp el enlace de acceso a tus materiales.\n\nSi el comprobante requiere revisión manual, la entrega se realizará después de confirmar el pago.\n\n¿Te gustaría comenzar?\n\n¡Sí! 😊🪚\n\nCon MueblePro realizás un único pago y tenés acceso de por vida a los materiales incluidos en tu compra.\n\nNo hay mensualidades ni suscripciones.\n\nPodés consultar los manuales, planos y guías en PDF cada vez que los necesites.\n\nEl programa completo cuesta $14.900 ARS.\n\n¿Preferís pagar mediante Mercado Pago o transferencia bancaria?\n\n¡Te explico! 😊💳\n\nSi ya realizaste la transferencia de MueblePro, escribí LISTO por este mismo WhatsApp.\n\nCuando te lo solicitemos, enviá una captura o el archivo del comprobante donde se puedan ver claramente los datos de la operación.\n\nNuestro sistema recibirá el comprobante e iniciará la verificación.\n\nUna vez confirmado el pago, recibirás el acceso a los materiales que compraste.\n\nSi ya pagaste, no necesitás realizar otra transferencia.\n\n¡Hola! 😊\n\nSi ya realizaste el pago de MueblePro pero todavía no recibiste el material, vamos a ayudarte a revisar qué ocurrió.\n\nSi todavía no enviaste el comprobante, escribí LISTO para comenzar la verificación.\n\nSi ya lo enviaste, podemos revisar el estado de tu operación.\n\nSi tu pago fue aprobado, corresponde comprobar qué sucedió con la entrega.\n\nNo necesitás volver a pagar.\n\n¿Ya enviaste el comprobante?\n\n¡Hola! 😊\n\nSi tu comprobante fue rechazado o quedó pendiente de revisión, vamos a ayudarte a resolverlo.\n\nEsto puede suceder cuando algún dato no puede verificarse correctamente.\n\nSi quedó en revisión, no necesitás realizar otro pago.\n\nSi fue rechazado, podemos revisar el motivo y solicitarte información adicional si corresponde.\n\nNo realices otra transferencia hasta que se revise qué ocurrió con la primera.\n\n¿Tu comprobante figura como rechazado o en revisión?\n\n¡Hola! 😊🪚\n\nSi tenés problemas para abrir los archivos o acceder al material de MueblePro, vamos a ayudarte.\n\nPrimero, verificá tu conexión a internet.\n\nDespués probá abrir el archivo desde otro navegador o dispositivo.\n\nTambién asegurate de contar con un lector de PDF.\n\nSi el problema continúa, contanos qué sucede para que podamos revisarlo.\n\n¿Tenés problemas para abrir un archivo, con el enlace de acceso o necesitás hablar con soporte?\n\n¡Te cuento! 😊🪚\n\nMueblePro es un programa digital compuesto por manuales, guías y planos descargables en PDF.\n\nPor tratarse de material digital, no ofrecemos una garantía comercial adicional de satisfacción.\n\nSin embargo, queremos que recibas correctamente todo el contenido adquirido.\n\nSi tenés problemas para acceder, archivos dañados o materiales faltantes, podemos ayudarte a resolverlo.\n\nSi necesitás solicitar una devolución, revisaremos tu caso conforme a las condiciones de compra y los derechos que correspondan.\n\n¿Querés que te comuniquemos con soporte?";

function normalizarTexto(valor) {
  return String(valor ?? "").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function contieneAlguna(texto, frases) {
  const normalizado = ` ${normalizarTexto(texto)} `;
  return frases.some((frase) => normalizado.includes(` ${normalizarTexto(frase)} `));
}

function limpiarRespuesta(valor) {
  return String(valor ?? "").replace(/\r\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ").replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function cierrePago() {
  return "¿Preferís pagar con Mercado Pago o mediante transferencia bancaria?";
}

// Por defecto, nunca agregar un CTA a una respuesta desconocida.
function agregarCierre(respuesta, intencion = null) {
  const limpia = limpiarRespuesta(respuesta);
  if (!INTENCIONES_COMERCIALES.has(intencion) || intencion === "industriales") return limpia;
  if (/\?/.test(limpia)) return limpia;
  return limpia ? `${limpia}\n\n${cierrePago()}` : cierrePago();
}

function respuestaPrograma() {
  return "¡Te cuento! 😊🪚\n\nMueblePro — De cero a tu primer mueble es un programa digital pensado para que aprendas a fabricar muebles de melamina, incluso si nunca trabajaste en carpintería.\n\nIncluye manuales y guías en PDF sobre materiales, herramientas, medidas, despiece, planificación, técnicas de armado, herrajes y proyectos prácticos.\n\nTambién recibís planos y recursos para aplicar lo aprendido.\n\nPodés avanzar a tu ritmo y consultar el material de por vida.\n\nEl acceso completo cuesta $14.900 ARS.\n\n¿Te gustaría comenzar? Puedo mostrarte cómo realizar el pago. 😊";
}

function respuestaPrecio() {
  return "¡Te cuento! 😊🪚\n\nEl programa completo MueblePro cuesta $14.900 ARS, por única vez.\n\nIncluye manuales, guías prácticas, planos y proyectos para aprender a fabricar muebles de melamina desde cero.\n\nAdemás, antes de finalizar tu compra vas a poder sumar Muebles Industriales por $5.000 adicionales.\n\nSi elegís ambos programas, el total es de $19.900 ARS.\n\n¿Preferís pagar con Mercado Pago o mediante transferencia bancaria?";
}

function respuestaExperiencia() {
  return "¡Para nada! 😊🪚\n\nMueblePro está pensado justamente para personas que comienzan desde cero.\n\nVas a aprender desde los materiales y herramientas hasta las medidas, el despiece, las técnicas de armado y los primeros proyectos.\n\nTodo está explicado mediante manuales y guías prácticas en PDF.\n\nTampoco necesitás tener un taller completamente equipado para comenzar.\n\n¿Te gustaría empezar con MueblePro? Te muestro cómo acceder.";
}

function respuestaHerramientas() {
  return "¡No necesitás tener un taller lleno de máquinas para empezar! 😊🪚\n\nCon MueblePro aprendés a diseñar tus muebles, calcular sus medidas y preparar el despiece.\n\nDespués podés encargar el corte y canteado a una maderera que ofrezca esos servicios.\n\nAsí recibís las piezas preparadas y podés avanzar con el armado utilizando las herramientas básicas correspondientes.\n\nA medida que ganás experiencia, podés incorporar nuevas herramientas.\n\n¿Te gustaría comenzar con MueblePro?";
}

function respuestaMuebles() {
  return "¡Un montón de proyectos! 😍🪚\n\nEn MueblePro vas a encontrar proyectos de mesas de luz, escritorios, racks de TV, bibliotecas, estanterías, placares y muebles de cocina.\n\nEl material está pensado para que puedas comenzar con proyectos sencillos e ir avanzando hacia muebles más elaborados.\n\nAdemás de los planos, vas a contar con manuales para aprender sobre materiales, medidas, despiece y armado.\n\n¿Te gustaría empezar a fabricar tus propios muebles?";
}

function respuestaPlanos() {
  return "¡Sí! 😊📐\n\nMueblePro incluye planos y recursos prácticos para ayudarte a fabricar tus propios muebles de melamina.\n\nEncontrarás planos de diferentes proyectos, contenido sobre medidas y despieces, listas de materiales y manuales paso a paso.\n\nTambién vas a aprender cómo preparar un despiece para solicitar el corte y canteado de las placas.\n\nLa idea es que no dependas solamente de copiar planos, sino que aprendas a planificar tus propios muebles.\n\n¿Te gustaría comenzar con MueblePro?";
}

function respuestaFormato() {
  return "¡Te cuento! 😊\n\nMueblePro es un programa 100% digital compuesto por manuales, guías prácticas y archivos PDF.\n\nIncluye explicaciones, planos y proyectos para que puedas aprender a tu ritmo.\n\nNo incluye clases en video.\n\nPodés consultar el material desde tu celular o computadora utilizando un lector de PDF.\n\n¿Te gustaría comenzar?";
}

function respuestaCelular() {
  return "¡Sí, por supuesto! 😊📱\n\nCon MueblePro podés aprender desde tu celular, tablet o computadora.\n\nLos materiales están en PDF, por lo que podés consultarlos cuando quieras.\n\nNo necesitás asistir a clases ni cumplir horarios.\n\nAdemás, el acceso es de por vida, así que podés volver a revisar las guías y planos cada vez que los necesites.\n\n¿Te gustaría comenzar con MueblePro?";
}

function respuestaEmprender() {
  return "¡Por supuesto! 😎🪚\n\nMueblePro también está pensado para quienes quieren aprender un oficio y comenzar a emprender.\n\nVas a encontrar contenido sobre diseño, planificación, fabricación, costos y presupuestos.\n\nTambién incluye proyectos prácticos que pueden ayudarte a desarrollar habilidades para realizar trabajos para otras personas.\n\nPodés comenzar aprendiendo y, con práctica y experiencia, explorar oportunidades para ofrecer tus propios muebles.\n\nLos resultados dependen de tu dedicación y de las oportunidades disponibles.\n\n¿Te gustaría comenzar a aprender este oficio?";
}

function respuestaIndustriales() {
  return "¡Te cuento! 😍🪚\n\nMuebles Industriales es un complemento de MueblePro que incluye planos y guías de fabricación en PDF.\n\nEstá pensado para que puedas explorar nuevos diseños y ampliar los tipos de muebles que aprendés a fabricar.\n\nLo podés sumar a MueblePro por solamente $5.000 adicionales.\n\n🪚 MueblePro: $14.900 ARS.\n\n🔥 Combo Completo: $19.900 ARS.\n\nCon acceso de por vida a ambos programas.\n\n¿Querés aprovechar el Combo Completo?";
}

function respuestaComprar() {
  return "¡Es muy sencillo! 😊🪚\n\nPodés comenzar con MueblePro por $14.900 ARS.\n\nPrimero elegís cómo preferís realizar el pago.\n\nAntes de finalizar, vas a tener la posibilidad de sumar Muebles Industriales por $5.000 adicionales.\n\nDespués realizás la transferencia y enviás el comprobante para verificar el pago.\n\nUna vez confirmado, recibís el acceso a tus materiales digitales.\n\n¿Preferís pagar con Mercado Pago o transferencia bancaria?";
}

function respuestaTransferencia() {
  return "¡Sí, por supuesto! 😊💳\n\nPodés pagar MueblePro utilizando Mercado Pago o realizando una transferencia desde tu banco.\n\nAmbas opciones utilizan nuestra cuenta receptora de Mercado Pago Argentina.\n\nEl programa principal cuesta $14.900 ARS.\n\nAntes de finalizar, vas a poder sumar Muebles Industriales por $5.000 adicionales.\n\n¿Preferís Mercado Pago o transferencia bancaria?";
}

function respuestaSeguridad() {
  return "¡Entiendo que quieras estar seguro antes de comprar! 😊\n\nPrimero elegís cómo preferís pagar.\n\nDespués realizás la transferencia a nuestra cuenta de Mercado Pago y enviás el comprobante.\n\nUna vez confirmado el pago, recibís el acceso digital al material correspondiente.\n\nNo necesitás compartir contraseñas ni datos privados de tu cuenta bancaria.\n\n¿Te gustaría comenzar con MueblePro?";
}

function respuestaEntrega() {
  return "¡Te cuento! 😊📚\n\nDespués de realizar el pago, escribís LISTO por WhatsApp.\n\nCuando te lo solicitemos, enviás el comprobante de transferencia.\n\nNuestro sistema lo recibe y comienza la verificación.\n\nUna vez aprobado el pago, recibís por este mismo WhatsApp el enlace de acceso a tus materiales.\n\nSi el comprobante requiere revisión manual, la entrega se realizará después de confirmar el pago.\n\n¿Te gustaría comenzar?";
}

function respuestaAcceso() {
  return "¡Sí! 😊🪚\n\nCon MueblePro realizás un único pago y tenés acceso de por vida a los materiales incluidos en tu compra.\n\nNo hay mensualidades ni suscripciones.\n\nPodés consultar los manuales, planos y guías en PDF cada vez que los necesites.\n\nEl programa completo cuesta $14.900 ARS.\n\n¿Preferís pagar mediante Mercado Pago o transferencia bancaria?";
}

function respuestaComprobante() {
  return "¡Te explico! 😊💳\n\nSi ya realizaste la transferencia de MueblePro, escribí LISTO por este mismo WhatsApp.\n\nCuando te lo solicitemos, enviá una captura o el archivo del comprobante donde se puedan ver claramente los datos de la operación.\n\nNuestro sistema recibirá el comprobante e iniciará la verificación.\n\nUna vez confirmado el pago, recibirás el acceso a los materiales que compraste.\n\nSi ya pagaste, no necesitás realizar otra transferencia.";
}

function respuestaPendiente() {
  return "¡Hola! 😊\n\nSi ya realizaste el pago de MueblePro pero todavía no recibiste el material, vamos a ayudarte a revisar qué ocurrió.\n\nSi todavía no enviaste el comprobante, escribí LISTO para comenzar la verificación.\n\nSi ya lo enviaste, podemos revisar el estado de tu operación.\n\nSi tu pago fue aprobado, corresponde comprobar qué sucedió con la entrega.\n\nNo necesitás volver a pagar.\n\n¿Ya enviaste el comprobante?";
}

function respuestaRechazado() {
  return "¡Hola! 😊\n\nSi tu comprobante fue rechazado o quedó pendiente de revisión, vamos a ayudarte a resolverlo.\n\nEsto puede suceder cuando algún dato no puede verificarse correctamente.\n\nSi quedó en revisión, no necesitás realizar otro pago.\n\nSi fue rechazado, podemos revisar el motivo y solicitarte información adicional si corresponde.\n\nNo realices otra transferencia hasta que se revise qué ocurrió con la primera.\n\n¿Tu comprobante figura como rechazado o en revisión?";
}

function respuestaSoporte() {
  return "¡Hola! 😊🪚\n\nSi tenés problemas para abrir los archivos o acceder al material de MueblePro, vamos a ayudarte.\n\nPrimero, verificá tu conexión a internet.\n\nDespués probá abrir el archivo desde otro navegador o dispositivo.\n\nTambién asegurate de contar con un lector de PDF.\n\nSi el problema continúa, contanos qué sucede para que podamos revisarlo.\n\n¿Tenés problemas para abrir un archivo, con el enlace de acceso o necesitás hablar con soporte?";
}

function respuestaGarantia() {
  return "¡Te cuento! 😊🪚\n\nMueblePro es un programa digital compuesto por manuales, guías y planos descargables en PDF.\n\nPor tratarse de material digital, no ofrecemos una garantía comercial adicional de satisfacción.\n\nSin embargo, queremos que recibas correctamente todo el contenido adquirido.\n\nSi tenés problemas para acceder, archivos dañados o materiales faltantes, podemos ayudarte a resolverlo.\n\nSi necesitás solicitar una devolución, revisaremos tu caso conforme a las condiciones de compra y los derechos que correspondan.\n\n¿Querés que te comuniquemos con soporte?";
}

const INTENCIONES = [
  { nombre: "rechazado", funcion: respuestaRechazado, variantes: ["rechazado", "rechazada", "rechazo", "revisión", "pago rechazado", "comprobante rechazado", "en revision", "en revision manual", "rechazaron mi pago", "rechazaron el comprobante"], ambiguas: [] },
  { nombre: "pendiente", funcion: respuestaPendiente, variantes: ["pendiente", "ya pagué", "pagué y no recibí", "no me llegó", "no recibí", "falta entrega", "pague", "ya transferi", "hice la transferencia", "realice el pago", "realice la transferencia", "no llego el material", "no me llego el enlace", "no lo recibi", "ya lo envie", "ya envie el comprobante", "todavia no"], ambiguas: [] },
  { nombre: "soporte", funcion: respuestaSoporte, variantes: ["soporte", "ayuda técnica", "error al abrir", "enlace roto", "no puedo descargar", "archivo dañado", "no puedo abrir", "no abre", "no se abre", "no funciona el enlace", "no funciona el link", "enlace esta roto", "link esta roto", "no puedo acceder", "materiales faltantes", "falta un archivo", "hablar con una persona", "hablar con alguien", "asesor humano", "atencion humana", "hablar con soporte", "ayuda humana"], ambiguas: [] },
  { nombre: "garantia", funcion: respuestaGarantia, variantes: ["garantía", "devolución", "reembolso", "devolver dinero", "arrepentimiento", "devoluciones", "devolucion del dinero", "me devuelven la plata", "me devuelvan la plata", "devolver la plata"], ambiguas: [] },
  { nombre: "comprobante", funcion: respuestaComprobante, variantes: ["comprobante", "recibo", "ticket", "enviar comprobante", "captura de pago", "listo", "comprobantes"], ambiguas: [] },
  { nombre: "industriales", funcion: respuestaIndustriales, variantes: ["industriales", "industrial", "muebles industriales", "estilo industrial", "complemento", "combo"], ambiguas: [] },
  { nombre: "transferencia", funcion: respuestaTransferencia, variantes: ["transferencia", "transferir", "Mercado Pago", "mercadopago", "banco", "CVU", "alias", "formas de pago", "datos bancarios", "datos de transferencia", "pasame la cuenta", "a que cuenta", "formas de pagar", "metodos de pago", "como puedo pagar", "oxxo", "link de pago", "enlace de pago", "tarjeta", "pago parcial", "cuotas"], ambiguas: ["banco"] },
  { nombre: "precio", funcion: respuestaPrecio, variantes: ["precio", "precios", "cuesta", "costo", "cuánto sale", "vale", "valor", "cuanto cuesta", "cuanto cuesta el curso", "cuanto es", "cuanto tengo que pagar", "cuanto vale"], ambiguas: ["vale", "valor"] },
  { nombre: "seguridad", funcion: respuestaSeguridad, variantes: ["seguridad", "seguro", "confiable", "confianza", "estafa", "fraude", "es seguro"], ambiguas: ["seguro", "confianza"] },
  { nombre: "experiencia", funcion: respuestaExperiencia, variantes: ["experiencia", "principiante", "novato", "empezar de cero", "sin conocimientos", "nunca hice", "no tengo experiencia", "soy principiante", "no se nada", "arrancar de cero", "nunca hice un mueble"], ambiguas: [] },
  { nombre: "herramientas", funcion: respuestaHerramientas, variantes: ["herramientas", "máquinas", "maquinaria", "taller", "sierra", "canteadora", "que necesito para empezar"], ambiguas: [] },
  { nombre: "muebles", funcion: respuestaMuebles, variantes: ["qué muebles", "tipos de muebles", "proyectos", "placares", "racks", "escritorios", "muebles de cocina", "mesa de luz", "mesas de luz", "rack de tv", "bibliotecas", "estanterias", "que puedo fabricar"], ambiguas: ["proyectos"] },
  { nombre: "planos", funcion: respuestaPlanos, variantes: ["planos", "plano", "despiece", "despieces", "medidas", "lista de corte"], ambiguas: [] },
  { nombre: "formato", funcion: respuestaFormato, variantes: ["formato", "pdf", "videos", "video", "clases grabadas", "manuales", "clases", "grabaciones", "es digital", "es fisico", "producto fisico"], ambiguas: [] },
  { nombre: "celular", funcion: respuestaCelular, variantes: ["celular", "teléfono", "tablet", "computadora", "horarios", "estudiar a mi ritmo", "a mi ritmo", "desde mi telefono", "desde el celu"], ambiguas: ["horarios"] },
  { nombre: "emprender", funcion: respuestaEmprender, variantes: ["emprender", "emprendimiento", "negocio", "vender muebles", "oficio", "clientes", "generar ingresos", "vivir de esto", "ganar dinero"], ambiguas: ["clientes", "negocio", "oficio"] },
  { nombre: "comprar", funcion: respuestaComprar, variantes: ["comprar", "compra", "adquirir", "conseguir", "obtener", "cómo compro", "quiero empezar", "quiero comprar", "como lo compro"], ambiguas: [] },
  { nombre: "entrega", funcion: respuestaEntrega, variantes: ["entrega", "cuándo llega", "cómo recibo", "envío del material", "enlace", "como lo recibo", "cuando lo recibo", "cuando recibo", "como recibo el material", "link"], ambiguas: [] },
  { nombre: "acceso", funcion: respuestaAcceso, variantes: ["acceso de por vida", "permanente", "mensualidad", "suscripción", "pago único", "vence", "de por vida", "cuanto dura el acceso", "cuanto tiempo tengo acceso"], ambiguas: [] },
  { nombre: "programa", funcion: respuestaPrograma, variantes: ["programa", "curso", "contenido", "incluye", "trae", "qué contiene", "que voy a aprender", "que aprendo", "que viene incluido"], ambiguas: ["trae", "incluye", "contenido"] }
];

const INTENCIONES_COMERCIALES = new Set(INTENCIONES.slice(5).map((i) => i.nombre));

function detectarIntencion(mensajeOriginal) {
  const texto = normalizarTexto(mensajeOriginal);
  if (!texto) return null;
  for (const intencion of INTENCIONES) {
    if (texto === intencion.nombre) return intencion.nombre;
    const claras = intencion.variantes.filter((v) => !intencion.ambiguas.includes(v) &&
      !(intencion.nombre === "comprobante" && v === "recibo" &&
        contieneAlguna(texto, ["como recibo", "como lo recibo", "cuando recibo", "cuando lo recibo"])));
    if (contieneAlguna(texto, claras)) return intencion.nombre;
    if (intencion.ambiguas.some((v) => normalizarTexto(v) === texto)) return intencion.nombre;
    const contexto = contieneAlguna(texto, ["mueblepro", "programa", "curso", "melamina", "mueble", "muebles", "comprar", "compra", "pagar", "pago", "transferencia"]);
    if (contexto && contieneAlguna(texto, intencion.ambiguas)) return intencion.nombre;
  }
  return null;
}

function respuestaDirecta(mensajeOriginal) {
  const nombre = detectarIntencion(mensajeOriginal);
  if (!nombre) return null;
  // Estas alternativas no implican métodos adicionales ni disparan otro embudo.
  if (nombre === "transferencia" && contieneAlguna(mensajeOriginal,
    ["oxxo", "tarjeta", "link de pago", "enlace de pago", "pago parcial", "cuotas"])) {
    return "Podés pagar con Mercado Pago o transferencia bancaria al mismo CVU o alias de Mercado Pago Argentina. No aceptamos OXXO, pagos con tarjeta, enlaces de pago, cuotas ni pagos parciales.\n\nLos datos se muestran en el flujo de compra después de confirmar el importe definitivo.\n\n" + cierrePago();
  }
  return INTENCIONES.find((i) => i.nombre === nombre).funcion();
}

const RESPUESTA_NEUTRAL = "Soy Fercho, asistente virtual de MueblePro 😊. Contame un poco más sobre tu consulta para poder ayudarte.";
const RESPUESTA_ERROR = "No pude procesar tu consulta en este momento. Podés intentar de nuevo o pedir hablar con soporte. Si ya pagaste, no hagas otra transferencia mientras se revisa tu caso.";

function respuestaControl(mensaje) {
  if (normalizarTexto(mensaje) === "listo") {
    return "Si ya transferiste por una compra pendiente, ManyChat te solicitará el comprobante en el flujo de pago. Si no aparece esa solicitud, pedí soporte para revisar tu operación. No necesitás volver a transferir.";
  }
  if (contieneAlguna(mensaje, ["inteligencia artificial", "sos una ia", "sos ia", "sos un bot", "eres un bot", "sos humano", "sos una persona"])) {
    return "Sí, soy Fercho, el asistente virtual con inteligencia artificial de MueblePro 😊. Puedo responder tus dudas y orientarte; si necesitás atención humana, podés pedir soporte.";
  }
  return null;
}

async function generarRespuesta(textoUsuario) {
  const control = respuestaControl(textoUsuario);
  if (control) return control;
  const directa = respuestaDirecta(textoUsuario);
  if (directa) return limpiarRespuesta(directa);
  // Incidencias ambiguas: no dejar que el fallback las transforme en una venta.
  if (contieneAlguna(textoUsuario, ["pago realizado", "pague ayer", "pague hoy", "dinero enviado", "ayuda", "humano", "devolveme", "devolveme el dinero", "fallo", "problema", "problemas"])) {
    return "Contame qué ocurrió para orientarte con soporte. Si ya realizaste el pago, no hagas otra transferencia mientras se revisa tu operación.";
  }
  if (!openai) return RESPUESTA_ERROR;
  const response = await openai.responses.create({
    model: "gpt-4.1-mini", temperature: 0.4,
    input: [
      { role: "system", content: [{ type: "input_text", text: SYSTEM_PROMPT }] },
      { role: "user", content: [{ type: "input_text", text: textoUsuario }] }
    ]
  });
  const respuesta = limpiarRespuesta(response.output_text || "");
  // Bloquear enlaces/cuentas no autorizados y afirmaciones de aprobación.
  if (/https?:\/\/|www\.|\b\d{18,}\b/i.test(respuesta) ||
      /(?:tu|el) pago (?:esta |fue |ha sido )?(?:aprobado|confirmado)|(?:ya )?confirmamos (?:tu|el) pago/i.test(normalizarTexto(respuesta))) {
    return RESPUESTA_ERROR;
  }
  return agregarCierre(respuesta || RESPUESTA_NEUTRAL);
}

app.get("/", (req, res) => res.status(200).send("Fercho | MueblePro activo ✅"));
app.post("/mensaje", async (req, res) => {
  try {
    const mensaje = req.body?.texto ?? req.body?.mensaje ?? req.body?.message ?? "";
    if (typeof mensaje !== "string" && typeof mensaje !== "number") {
      return res.json({ respuesta: RESPUESTA_NEUTRAL });
    }
    const textoUsuario = String(mensaje).trim();
    if (!textoUsuario) {
      return res.json({ respuesta: "Estoy acá para ayudarte 😊. Podés escribirme tu duda sobre MueblePro, el pago o el acceso a los materiales." });
    }
    return res.json({ respuesta: await generarRespuesta(textoUsuario) });
  } catch (error) {
    // No registrar chats, datos personales, claves ni el objeto completo del SDK.
    console.error("Error en /mensaje:", error?.status || error?.name || "Error");
    return res.json({ respuesta: RESPUESTA_ERROR });
  }
});
app.use((error, req, res, next) => {
  if (error) return res.status(400).json({ respuesta: "No pude leer el mensaje. Enviá un JSON válido con texto, mensaje o message." });
  return next();
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => console.log(`Servidor Fercho corriendo en puerto ${PORT}`));
}

// Exportaciones locales para pruebas y reutilización por n8n; no alteran el JSON HTTP.
module.exports = {
  app, normalizarTexto, contieneAlguna, limpiarRespuesta, cierrePago,
  agregarCierre, respuestaDirecta, detectarIntencion, INTENCIONES, SYSTEM_PROMPT
};
