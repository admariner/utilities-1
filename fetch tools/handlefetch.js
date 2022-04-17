async function handleFetch(url,params_obj,type){ //all arguments are required
  const rando = (n) => Math.round(Math.random() * n);
  const delay = (ms) => new Promise(res => setTimeout(res, ms));
  async function handleResponse(res,type){
    if(type == 'json') return await res.json().catch(err=> { console.log([err,url,params_obj]); return false });
    if(type == 'text') return await res.text().catch(err=> { console.log([err,url,params_obj]); return false });
    if(type == 'html') {
      let text = await res.text().catch(err=> { console.log([err,url,params_obj]); return false }); 
      return new DOMParser().parseFromString(text,'text/html');
    }else{ return false }
  }
  if(params_obj && url){
    var res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
    if(res.status > 199 && res.status < 300) return await handleResponse(res,type);

    if(res.status == 429) {
      await delay(300000);
      let res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
      if(res.status > 199 && res.status < 300) return await handleResponse(res,type);
      else return {action: 'stop', status: res.status};
    }
    if(res.status > 399 && res.status < 900){
      await delay(4410);
      let res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
      if(res.status > 199 && res.status < 300) return await handleResponse(res,type);
      else return {action: 'stop', status: res.status};
    }
    if(res.status > 899) return {action: 'stop', status: res.status};
  } else {return false;}
}
