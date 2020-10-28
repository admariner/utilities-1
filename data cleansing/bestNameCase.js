const fixNameCase = (s) => s && typeof s == 'string' ? s.split(/(?=[^ğᴀғʀńŃŌŌŚŠśšŪūÿłžźżŁŽŹŻçćčÇĆČáāàâäãåÁÀÂÄÃĀĀÅĀÆæéèêëęēėÉÈÊËíìîïīįñÑóòôöõøœÓÒÔÖÕØŒßÚÙÛÜúùûüřa-zA-Z])\b/).map(el=> el.replace(/\w\S*/g, txt=> txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('').replace(/(?<=\bMc)\w/ig, t=> t.charAt(0).toUpperCase()) : s;
