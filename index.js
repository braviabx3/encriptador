let $encript = document.getElementById("encript"),
  $decrypt = document.getElementById("decrypt"),
  content = document.getElementById("get__text"),
  $output = document.getElementById("output"),
  $copy = document.querySelector(".copy"),
  $message = document.getElementById("message"),
  $paste = document.querySelector(".paste"),
  $fragment = document.createDocumentFragment(),
  copiado = "";
let i = 0;
let files;

function Encript() {
  let text = content.value;
  let textEncript = "";
  const encoder = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };
  i++;
  text = text.replace(/a|e|i|o|u/gim, function (matched) {
    return encoder[matched];
  });

  copiado = content.value;
  let $files = document.createElement("textarea");
  $files.innerHTML = `${text}`;
  $files.id = `texto${i}`;
  let $btnCopy = document.createElement("div");
  $btnCopy.innerHTML = `
   <button id="${i}" class="copy">Copy Encripted</button>`;
  $fragment.appendChild($files);
  $fragment.appendChild($btnCopy);
  textEncript = $output.appendChild($fragment);
  content.value = "";
  Message("Texto encriptado exitosamente!");
  return textEncript;
}

function Decript() {
  let text = content.value;
  let textDencript = "";
  const decoder = {
    enter: "e",
    ober: "o",
    imes: "i",
    ai: "a",
    ufat: "u",
  };

  i++;
  text = text.replace(/enter|ober|imes|ai|ufat/gim, function (matched) {
    return decoder[matched];
  });
  copiado = content.value;
  let $files = document.createElement("textarea");
  $files.id = `texto${i}`;
  $files.innerHTML = `${text}`;
  let $btnCopy = document.createElement("div");
  $btnCopy.innerHTML = `
    <button id="${i}" class="copy">Copy Decripted</button>`;
  $fragment.appendChild($files);
  $fragment.appendChild($btnCopy);
  textDencript = $output.appendChild($fragment);
  content.value = "";
  Message("Texto desencriptado exitosamente!");
  return textDencript;
}

function Copy(id) {
  let $textArea = document.getElementById(`texto${id}`);
  files = $textArea.value;
  Message("Texto copiado correctamente");
}

function Paste() {
  if (files) {
    let copy = files;
    content.value = copy;
  } else {
    Message("No hay texto para copiar");
  }
}

function Message(error) {
  let $note = document.createElement("p");
  $note.classList.add("message__text");
  $note.innerHTML = `${error}`;
  $fragment.appendChild($note);
  $message.appendChild($fragment);
  setTimeout(() => {
    document.querySelector(".message__text").remove();
  }, 3000);
}

function Upper(opc) {
  let abc = "ABCDEFGHYJKLMNÑñOPQRSTUVWXYZáéíóú~@#-^*%&/()=?¿¡!$¬+-_.:,;<>";
  let correct = false;
  let texto = content.value;

  if (texto.length > 0) {
    for (i = 0; i < texto.length; i++) {
      if (abc.indexOf(texto.charAt(i), 0) != -1) correct = true;
    }

    switch (opc) {
      case "encript":
        correct
          ? Message(
              "ERROR: El texto ingresado contiene mayusculas o caracteres especiales"
            )
          : Encript();
        break;
      case "decrypt":
        correct
          ? Message(
              "ERROR: El texto ingresado contiene mayusculas o caracteres especiales"
            )
          : Decript();
        break;
    }
  } else {
    Message("No se ingreso ningun texto");
  }
}

document.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.matches(".copy")) Copy(e.target.id);
  if (e.target.matches(".decrypt")) Upper(e.target.id);
  if (e.target.matches(".encript")) Upper(e.target.id);
  if (e.target.matches(".paste")) Paste();
  if (e.target.matches(".get__text")) content.value = "";
});
